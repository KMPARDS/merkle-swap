import { ethers } from 'ethers';
import { addresses, CustomProvider, CustomProviderBase } from 'eraswap-sdk';

import {
  Erc20Factory,
  PlasmaManagerFactory,
  FundsManagerEthFactory,
} from 'eraswap-sdk/dist/typechain/ETH';
import { ReversePlasmaFactory, FundsManagerEsnFactory } from 'eraswap-sdk/dist/typechain/ESN';

window.providerETH = new ethers.providers.InfuraProvider(
  process.env.REACT_APP_ENV === 'production' ? 'homestead' : 'rinkeby'
);

// window.providerESN = new CustomProvider(
//   process.env.REACT_APP_ENV === 'production' ? 'mainnet' : 'testnet'
// );

window.providerESN = new CustomProviderBase('https://rpc-temp.mainnet.eraswap.network');

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
  esContractETH: '0x72108a8CC3254813C6BE2F1b77be53E185abFdD9',
  plasmaManagerETH: '0x952Aa6073386f4a23F72cC1012138a6aaFD02d81',
  fundsManagerETH: '0x933A43a0F6368B38212A725029314E74F8379EEa',
  reversePlasmaESN: '0x952Aa6073386f4a23F72cC1012138a6aaFD02d81',
  fundsManagerESN: '0x933A43a0F6368B38212A725029314E74F8379EEa',
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
