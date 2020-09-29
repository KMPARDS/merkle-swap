import { ethers } from 'ethers';
import { addresses, CustomProvider } from 'eraswap-sdk';

import {
  Erc20Factory,
  PlasmaManagerFactory,
  FundsManagerETHFactory,
} from 'eraswap-sdk/dist/typechain/ETH';
import { ReversePlasmaFactory, FundsManagerESNFactory } from 'eraswap-sdk/dist/typechain/ESN';

window.providerETH = ethers.getDefaultProvider(
  process.env.NODE_ENV === 'production' ? 'homestead' : 'rinkeby'
);

window.providerESN = new CustomProvider('testnet');

// Temporary wallet
if (process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY) {
  window.wallet = new ethers.Wallet(process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY);
}

window.esInstanceETH = Erc20Factory.connect(
  addresses[process.env.NODE_ENV].ESN.nrtManager,
  window.providerETH
);

window.plasmaManagerInstanceETH = PlasmaManagerFactory.connect(
  addresses[process.env.NODE_ENV].ETH.plasmaManager,
  window.providerETH
);

window.fundsManagerInstanceETH = FundsManagerETHFactory.connect(
  addresses[process.env.NODE_ENV].ETH.fundsManager,
  window.providerETH
);

window.reversePlasmaInstanceESN = ReversePlasmaFactory.connect(
  addresses[process.env.NODE_ENV].ESN.reversePlasma,
  window.providerESN
);

window.fundsManagerInstanceESN = FundsManagerESNFactory.connect(
  addresses[process.env.NODE_ENV].ESN.fundsManager,
  window.providerESN
);
