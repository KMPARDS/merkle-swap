import { ethers } from 'ethers';
import { addresses, CustomJsonRpcProvider, CustomProvider } from 'eraswap-sdk';

import {
  Erc20Factory,
  PlasmaManagerFactory,
  FundsManagerEthFactory,
} from 'eraswap-sdk/dist/typechain/ETH';
import { ReversePlasmaFactory, FundsManagerEsnFactory } from 'eraswap-sdk/dist/typechain/ESN';

window.providerETH = new ethers.providers.InfuraProvider(
  process.env.REACT_APP_ENV === 'production' ? 'homestead' : 'rinkeby'
);

window.providerESN = new CustomJsonRpcProvider('https://mainnet.eraswap.network', {
  name: 'EraSwapNetwork',
  chainId: 5197,
  ensAddress: addresses['production'].ESN.kycdapp,
});
// window.providerESN = new CustomProvider('mainnet');

// Temporary wallet
// if (process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY) {
//   window.wallet = new ethers.Wallet(process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY);
// }

const env = process.env.REACT_APP_ENV ?? 'development';

const address = {
  esContractETH: addresses.production.ETH.esContract,
  plasmaManagerETH: addresses.production.ETH.plasmaManager,
  fundsManagerETH: addresses.production.ETH.fundsManager,
  reversePlasmaESN: addresses.production.ESN.reversePlasma,
  fundsManagerESN: addresses.production.ESN.fundsManager,
};

window.esInstanceETH = Erc20Factory.connect(address.esContractETH, window.providerETH);

window.plasmaManagerInstanceETH = PlasmaManagerFactory.connect(
  address.plasmaManagerETH,
  window.providerETH
);

window.fundsManagerInstanceETH = FundsManagerEthFactory.connect(
  address.fundsManagerETH,
  window.providerETH
);

window.reversePlasmaInstanceESN = ReversePlasmaFactory.connect(
  address.reversePlasmaESN,
  window.providerESN
);

window.fundsManagerInstanceESN = FundsManagerEsnFactory.connect(
  address.fundsManagerESN,
  window.providerESN
);
