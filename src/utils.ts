import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

export function lessDecimals(input: string | BigNumber, decimals: number = 2) {
  // @ts-ignore
  if (input._isBigNumber || input instanceof BigNumber) {
    input = formatEther(input);
  }

  const seperated = input.split('.');
  if (seperated[1].length > decimals) {
    seperated[1] = seperated[1].slice(0, decimals);
  }

  return seperated.join('.');
}

export async function wait(msec: number) {
  return await new Promise((res) => setTimeout(res, msec));
}
