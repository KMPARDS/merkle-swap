import { ethers } from 'ethers';
import { GetProof } from 'eth-proof';
import { fetchBlocks } from './fetchBlocks';

// ---------------------------------------
// ----------- For Deposits -------------
// ---------------------------------------

interface DepositProof {
  blockNumber?: string;
  path?: string;
  rawTransaction?: string;
  parentNodesTx?: string;
  rawReceipt?: string;
  parentNodesReceipt?: string;
}

export async function generateDepositProof(
  txHash: string,
  pushLine: (line: { text: string; color: string }) => any
): Promise<string> {
  const gp = new GetProof(window.providerETH.connection.url);

  pushLine({
    text: 'Loading raw transaction from blockchain...',
    color: 'white',
  });
  const tx = await window.providerETH.getTransaction(txHash);
  const rawTransaction = ethers.utils.serializeTransaction(
    {
      to: tx.to,
      nonce: tx.nonce,
      gasPrice: tx.gasPrice,
      gasLimit: tx.gasLimit,
      data: tx.data,
      value: tx.value,
      chainId: tx.chainId,
    },
    {
      r: tx.r || '0x',
      s: tx.s,
      v: tx.v,
    }
  );

  pushLine({
    text: 'Loading raw receipt from blockchain...',
    color: 'white',
  });
  const rawReceipt = await getRawReceipt(txHash, window.providerETH);

  pushLine({
    text: 'Generating Merkle Patricia Proof for Transaction...',
    color: 'white',
  });
  const txProof = await gp.transactionProof(txHash);

  pushLine({
    text: 'Generating Merkle Patricia Proof for Receipt...',
    color: 'white',
  });
  const rcProof = await gp.receiptProof(txHash);

  if (tx.blockNumber === undefined) {
    throw new Error('Transaction is not yet confirmed');
  }

  pushLine({
    text: 'Packing up the proofs for submitting to the smart contract...',
    color: 'white',
  });
  const preparingValues: DepositProof = {
    blockNumber: ethers.utils.hexlify(tx.blockNumber),
    path: getPathFromTransactionIndex(+txProof.txIndex),
    rawTransaction,
    parentNodesTx: ethers.utils.RLP.encode(txProof.txProof),
    rawReceipt,
    parentNodesReceipt: ethers.utils.RLP.encode(rcProof.receiptProof),
  };

  const proofArray = Object.values(preparingValues);

  return ethers.utils.RLP.encode(proofArray);
}

async function getRawReceipt(
  txHash: string,
  provider: ethers.providers.JsonRpcProvider
): Promise<string> {
  const receiptObj = await provider.getTransactionReceipt(txHash);
  const _status = receiptObj.status ?? receiptObj.root;
  if (_status === undefined) {
    throw new Error('Status is undefined');
  }
  const status = ethers.utils.hexlify(_status);

  return ethers.utils.RLP.encode([
    status === '0x00' ? '0x' : status,
    receiptObj.cumulativeGasUsed.toHexString(),
    receiptObj.logsBloom,
    receiptObj.logs.map((log) => {
      return [log.address, log.topics, log.data];
    }),
  ]);
}

export function getPathFromTransactionIndex(txIndex: number | string) {
  let hex;
  if (typeof txIndex === 'string') {
    if (txIndex.slice(0, 2) === '0x') {
      hex = txIndex.slice(2);
    } else {
      throw new Error('transactionIndexHex being a string should start with 0x or a number');
    }
  } else {
    if (typeof txIndex === 'number') {
      hex = txIndex.toString(16);
    } else {
      throw new Error('transactionIndexHex is not a number or hex string');
    }
  }

  // @dev strippin' off zeros
  while (hex.length && hex[0] === '0') {
    hex = hex.slice(1);
  }

  return ethers.utils.RLP.encode('0x' + (hex.length % 2 === 0 ? hex : '0' + hex));
}

// ---------------------------------------
// ---------- For Withdrawals ------------
// ---------------------------------------

interface WithdrawProof {
  bunchIndex?: string;
  blockNumber?: string;
  blockInBunchMerkleProof?: string;
  txRoot?: string;
  rawTransaction?: string;
  path?: string;
  parentNodesTx?: string;
}

export async function generateWithdrawalProof(
  txHash: string,
  pushLine: (line: { text: string; color: string }) => any,
  overides: WithdrawProof = {}
) {
  const gp = new GetProof(window.providerESN.connection.url);

  pushLine({
    text: 'Loading raw transaction from blockchain...',
    color: 'white',
  });
  const tx = await window.providerESN.getTransaction(txHash);

  pushLine({
    text: 'Generating transaction merkle patricia proof on eth blockchain...',
    color: 'white',
  });
  const txProof = await gp.transactionProof(txHash);

  if (!tx) {
    throw new Error(`${txHash} does not exist on ESN`);
  }

  const rawTransaction = ethers.utils.serializeTransaction(
    {
      to: tx.to,
      nonce: tx.nonce,
      gasPrice: tx.gasPrice,
      gasLimit: tx.gasLimit,
      data: tx.data,
      value: tx.value,
      chainId: tx.chainId,
    },
    {
      r: tx.r || '0x',
      s: tx.s,
      v: tx.v,
    }
  );

  pushLine({
    text: 'Loading raw transaction receipt from blockchain...',
    color: 'white',
  });
  const receipt = await window.providerESN.getTransactionReceipt(tx.hash);

  pushLine({
    text: 'Searching for bunch index using binary search algorithm...',
    color: 'white',
  });
  const bunchIndex = await getBunchIndex(receipt.blockNumber);
  if (bunchIndex === null) {
    throw new Error('Block is not yet in the bunch');
  }

  pushLine({
    text: `Tx found in Bunch with index ${bunchIndex}, fetching bunch headers...`,
    color: 'white',
  });
  const bunch = await window.plasmaManagerInstanceETH.getBunchHeader(bunchIndex);
  const block = await window.providerESN.send('eth_getBlockByNumber', [
    ethers.utils.hexlify(receipt.blockNumber),
    false,
  ]);

  pushLine({
    text: `Preparing proof of bunch inclusion...`,
    color: 'white',
  });
  const preparingValues: WithdrawProof = {
    bunchIndex: overides.bunchIndex || ethers.utils.hexlify(bunchIndex),
    blockNumber: overides.blockNumber || ethers.utils.hexlify(receipt.blockNumber),
    blockInBunchMerkleProof:
      overides.blockInBunchMerkleProof ||
      (await getProofOfBunchInclusion(
        bunch.startBlockNumber.toNumber(),
        bunch.bunchDepth.toNumber(),
        receipt.blockNumber
      )),
    txRoot: overides.txRoot || block.transactionsRoot,
    rawTransaction: overides.rawTransaction || rawTransaction,
    path: overides.path || getPathFromTransactionIndex(receipt.transactionIndex),
    parentNodesTx: overides.parentNodesTx || ethers.utils.RLP.encode(txProof.txProof),
  };

  const proofArray = Object.values(preparingValues);

  return ethers.utils.RLP.encode(proofArray);
}

async function getProofOfBunchInclusion(
  startBlockNumber: number,
  bunchDepth: number,
  blockNumber: number
) {
  if (blockNumber < startBlockNumber || startBlockNumber + 2 ** bunchDepth - 1 < blockNumber) {
    throw new Error(`Block ${blockNumber} is not in bunch ${startBlockNumber},${bunchDepth}`);
  }

  function _getProofOfBunchInclusion(
    inputArray: any[],
    index: number,
    proof: string = '0x'
  ): string {
    if (inputArray.length === 1) return proof;
    if (inputArray.length && (inputArray.length & (inputArray.length - 1)) !== 0) {
      throw new Error('inputArray should be of length of power 2');
    }

    // index%2 === 1 (odd) then it must be right side
    // index%2 === 0 (even) then it must be left side
    if (index % 2) {
      proof += '' + inputArray[index - 1].slice(2);
    } else {
      proof += '' + inputArray[index + 1].slice(2);
    }

    // computing hash of two pairs and storing them in reduced array
    const reducedArray: any[] = [];
    inputArray.reduce((accumulator, currentValue) => {
      if (accumulator) {
        reducedArray.push(ethers.utils.keccak256(accumulator + currentValue.slice(2)));
        return null;
      } else {
        return currentValue;
      }
    });

    return _getProofOfBunchInclusion(reducedArray, Math.floor(index / 2), proof);
  }

  const blockArray = await fetchBlocks(startBlockNumber, bunchDepth, window.providerESN);

  return _getProofOfBunchInclusion(
    blockArray.map((block) => block.transactionsRoot),
    blockNumber - startBlockNumber
  );
}

async function getBunchIndex(txHashOrBlockNumber: string | number) {
  let blockNumber: number;
  if (typeof txHashOrBlockNumber === 'number') {
    blockNumber = txHashOrBlockNumber;
  } else if (typeof txHashOrBlockNumber === 'string') {
    const receipt = await window.providerESN.getTransactionReceipt(txHashOrBlockNumber);
    blockNumber = receipt.blockNumber;
  } else {
    throw new Error('txHash string or blockNumber number allowed');
  }

  const lastBunchIndex = (await window.plasmaManagerInstanceETH.lastBunchIndex()).toNumber();
  if (lastBunchIndex === 0) return null;

  async function checkMiddle(start: number, end: number): Promise<number | null> {
    const current = Math.floor((start + end) / 2);
    const bunch = await window.plasmaManagerInstanceETH.getBunchHeader(current);
    const startBlockNumber = bunch.startBlockNumber.toNumber();
    const endBlockNumber = bunch.startBlockNumber.toNumber() + 2 ** bunch.bunchDepth.toNumber() - 1;

    if (startBlockNumber <= blockNumber && blockNumber <= endBlockNumber) {
      // the block is in bunch with index current
      return current;
    } else if (blockNumber < startBlockNumber) {
      // the block is in a bunch earlier than in bunch with index current
      return await checkMiddle(start, Math.floor((start + end) / 2));
    } else if (blockNumber > endBlockNumber) {
      // the block is in a bunch later than in bunch with index current
      return await checkMiddle(Math.ceil((start + end) / 2), end);
    } else if (start === end) {
      // the block is not even in the last bunch
      return null;
    }
    return null;
  }

  const bunchIndex = await checkMiddle(0, lastBunchIndex);
  return bunchIndex;
}
