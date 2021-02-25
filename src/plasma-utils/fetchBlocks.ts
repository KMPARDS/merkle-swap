import { ethers } from 'ethers';
import { CustomJsonRpcProvider } from 'eraswap-sdk';

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
  // provider: { send(method: string, params: any[]): Promise<any> }
  provider: CustomJsonRpcProvider
): Promise<BlockCompact[]> {
  const blockNumbersToScan = [...Array(2 ** bunchDepth).keys()].map((n) => n + startBlockNumber);
  const blockArray: BlockCompact[] = new Array(2 ** bunchDepth);

  for (let i = 0; i < blockNumbersToScan.length; i++) {
    const currentBlockNumber = blockNumbersToScan[i];

    if (bunchDepth > 14 && i % 200 === 0) {
      // console.log(`waiting at ${currentBlockNumber}`);
      // await delay(1500);
      // console.log('resumed');
      provider = switchProvider(provider);
      console.log(`switched provider to ${provider.connection.url} at block ${currentBlockNumber}`);
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

function switchProvider(provider: CustomJsonRpcProvider){
  const networks = [
    window.providerESN,
    window.providerESN1,
    window.providerESN2
  ];
  const currentNetworkIndex = networks.findIndex((network => provider.connection.url === network.connection.url));
  const nextProviderIndex = (currentNetworkIndex+1)%networks.length;
  return networks[nextProviderIndex];
}

function delay(delayInms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
