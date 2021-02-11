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

  const promises = [];
  for (let i = 0; i < blockNumbersToScan.length; i++) {
    if (bunchDepth > 14 && i % 1000 === 0){
      console.log('waiting');
      await delay(1000);
      console.log('resumed');
    }

    const currentBlockNumber = blockNumbersToScan[i];
    const tmpPromise = new Promise(async function (resolve, reject) {
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
    promises.push(tmpPromise);
  }
  await Promise.all(promises);

  return blockArray;
}

function delay(delayInms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
