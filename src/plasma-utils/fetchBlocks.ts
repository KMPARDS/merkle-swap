import { ethers } from 'ethers';

interface BlockCompact {
  blockNumber: number;
  transactionsRoot: string;
  receiptsRoot: string;
}

interface ParityBlock {
  transactionsRoot: string;
  receiptsRoot: string;
}

export async function fetchBlocks(
  startBlockNumber: number,
  bunchDepth: number,
  provider: { send(method: string, params: any[]): Promise<any> }
): Promise<BlockCompact[]> {
  const blockNumbersToScan = [...Array(2 ** bunchDepth).keys()].map((n) => n + startBlockNumber);
  const blockArray: BlockCompact[] = new Array(2 ** bunchDepth);

  for (let i = 0; i < blockNumbersToScan.length; i++) {
    const currentBlockNumber = blockNumbersToScan[i];

    if (bunchDepth > 14 && i % 200 === 0) {
      console.log(`waiting at ${currentBlockNumber}`);
      await delay(1500);
      console.log('resumed');
    }

    const blockNumberHex = ethers.utils.hexStripZeros(ethers.utils.hexlify(currentBlockNumber));

    const block: ParityBlock = await provider.send('eth_getBlockByNumber', [
      blockNumberHex,
      true,
    ]);

    blockArray[currentBlockNumber - startBlockNumber] = {
      blockNumber: currentBlockNumber,
      transactionsRoot: block.transactionsRoot,
      receiptsRoot: block.receiptsRoot,
    };
  }

  return blockArray;
}

function delay(delayInms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
