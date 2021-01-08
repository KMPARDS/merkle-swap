import { ethers } from 'ethers';
import { CustomJsonRpcProvider, CustomProvider } from 'eraswap-sdk';
import { Erc20, PlasmaManager, FundsManagerEth } from 'eraswap-sdk/dist/typechain/ETH';
import { ReversePlasma, FundsManagerEsn } from 'eraswap-sdk/dist/typechain/ESN';

declare global {
  interface Window {
    providerETH: ethers.providers.InfuraProvider;
    // providerESN: CustomJsonRpcProvider;
    providerESN: CustomProvider;
    wallet: ethers.Wallet | undefined;
    esInstanceETH: Erc20;
    plasmaManagerInstanceETH: PlasmaManager;
    fundsManagerInstanceETH: FundsManagerEth;
    reversePlasmaInstanceESN: ReversePlasma;
    fundsManagerInstanceESN: FundsManagerEsn;
    ethereum: ethers.providers.ExternalProvider;
  }

  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_KAMI_URLS?: string;
      REACT_APP_ENV?: 'development' | 'production';
    }
  }
}
