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
  await Promise.all(
    blockNumbersToScan.map((currentBlockNumber) => {
      return new Promise(async function (resolve, reject) {
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

        resolve(true);
      });
    })
  );

  return blockArray;
}
