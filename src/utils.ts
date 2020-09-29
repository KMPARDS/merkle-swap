import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

export function lessDecimals(input: string | BigNumber, decimals: number = 2) {
  if (input instanceof BigNumber) {
    input = formatEther(input);
  }

  const seperated = input.split('.');
  if (seperated[1].length > decimals) {
    seperated[1] = seperated[1].slice(0, decimals);
  }

  return seperated.join('.');
}
