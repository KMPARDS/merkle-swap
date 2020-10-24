import { ethers } from 'ethers';
import { addresses, CustomProvider } from 'eraswap-sdk';

import {
  Erc20Factory,
  PlasmaManagerFactory,
  FundsManagerETHFactory,
} from 'eraswap-sdk/dist/typechain/ETH';
import { ReversePlasmaFactory, FundsManagerESNFactory } from 'eraswap-sdk/dist/typechain/ESN';

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
  // esContractETH: addresses[env].ETH.esContract,
  // plasmaManagerETH: addresses[env].ETH.plasmaManager,
  // fundsManagerETH: addresses[env].ETH.fundsManager,
  // reversePlasmaESN: addresses[env].ESN.reversePlasma,
  // fundsManagerESN: addresses[env].ESN.fundsManager,
  esContractETH: '0x237027559f6C07A20EBa97C837b60b9815840a42',
  plasmaManagerETH: '0xaaF33029B457A773C14DFdab4eDc4039E80fC5BF',
  fundsManagerETH: '0x10A23bbfAfc7cc3b94fa268D965F8B78543eCFE0',
  reversePlasmaESN: '0x3bEb087e33eC0B830325991A32E3F8bb16A51317',
  fundsManagerESN: '0xc4cfb05119Ea1F59fb5a8F949288801491D00110',
};

window.esInstanceETH = Erc20Factory.connect(address.esContractETH, window.providerETH);

window.plasmaManagerInstanceETH = PlasmaManagerFactory.connect(
  address.plasmaManagerETH,
  window.providerETH
);

window.fundsManagerInstanceETH = FundsManagerETHFactory.connect(
  address.fundsManagerETH,
  window.providerETH
);

window.reversePlasmaInstanceESN = ReversePlasmaFactory.connect(
  address.reversePlasmaESN,
  window.providerESN
);

window.fundsManagerInstanceESN = FundsManagerESNFactory.connect(
  address.fundsManagerESN,
  window.providerESN
);
