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

window.providerESN = new CustomProvider('testnet');

// Temporary wallet
if (process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY) {
  window.wallet = new ethers.Wallet(process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY);
}

const env = process.env.REACT_APP_ENV ?? 'development';

window.esInstanceETH = Erc20Factory.connect(addresses[env].ETH.esContract, window.providerETH);

window.plasmaManagerInstanceETH = PlasmaManagerFactory.connect(
  addresses[env].ETH.plasmaManager,
  window.providerETH
);

window.fundsManagerInstanceETH = FundsManagerETHFactory.connect(
  addresses[env].ETH.fundsManager,
  window.providerETH
);

window.reversePlasmaInstanceESN = ReversePlasmaFactory.connect(
  addresses[env].ESN.reversePlasma,
  window.providerESN
);

window.fundsManagerInstanceESN = FundsManagerESNFactory.connect(
  addresses[env].ESN.fundsManager,
  window.providerESN
);
