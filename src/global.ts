import { ethers } from 'ethers';
import { Erc20 } from './ethereum/typechain/ETH/Erc20';
import { PlasmaManager } from './ethereum/typechain/ETH/PlasmaManager';
import { FundsManager as FundsManagerETH } from './ethereum/typechain/ETH/FundsManager';
import { ReversePlasma } from './ethereum/typechain/ESN/ReversePlasma';
import { FundsManager as FundsManagerESN } from './ethereum/typechain/ESN/FundsManager';
import { CustomProvider } from './ethereum/custom-provider';

declare global {
  interface Window {
    providerETH: ethers.providers.BaseProvider;
    providerESN: CustomProvider;
    wallet: ethers.Wallet | undefined;
    esInstanceETH: Erc20;
    plasmaManagerInstanceETH: PlasmaManager;
    fundsManagerInstanceETH: FundsManagerETH;
    reversePlasmaInstanceESN: ReversePlasma;
    fundsManagerInstanceESN: FundsManagerESN;
    ethereum: ethers.providers.ExternalProvider;
  }
}
