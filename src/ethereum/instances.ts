import { ethers } from 'ethers';
import { addresses, CustomProvider } from 'eraswap-sdk';

import {
  Erc20Factory,
  PlasmaManagerFactory,
  FundsManagerEthFactory,
} from 'eraswap-sdk/dist/typechain/ETH';
import { ReversePlasmaFactory, FundsManagerEsnFactory } from 'eraswap-sdk/dist/typechain/ESN';

window.providerETH = new ethers.providers.InfuraProvider(
  process.env.REACT_APP_ENV === 'production' ? 'homestead' : 'rinkeby'
);

window.providerESN = new CustomProvider(
  process.env.REACT_APP_ENV === 'production' ? 'mainnet' : 'testnet'
);

// Temporary wallet
// if (process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY) {
//   window.wallet = new ethers.Wallet(process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY);
// }

const env = process.env.REACT_APP_ENV ?? 'development';

const address = {
  esContractETH: addresses[env].ETH.esContract,
  plasmaManagerETH: addresses[env].ETH.plasmaManager,
  fundsManagerETH: addresses[env].ETH.fundsManager,
  reversePlasmaESN: addresses[env].ESN.reversePlasma,
  fundsManagerESN: addresses[env].ESN.fundsManager,
  // esContractETH: '0x2C94a51e1ffc2a43c3d88B645c3de007eeaccB75',
  // plasmaManagerETH: '0x7c43dcA5752c59e12B79b605E7C6866E4bCAa4bE',
  // fundsManagerETH: '0x7BdE3BfbFb22B6237C2145EbF3bACaF55Cd88000',
  // reversePlasmaESN: '0x3bEb087e33eC0B830325991A32E3F8bb16A51317',
  // fundsManagerESN: '0xc4cfb05119Ea1F59fb5a8F949288801491D00110',
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
