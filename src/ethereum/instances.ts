import { ethers } from 'ethers';
import { CustomProvider } from './custom-provider';

import { Erc20Factory } from './typechain/ETH/Erc20Factory';
import { PlasmaManagerFactory } from './typechain/ETH/PlasmaManagerFactory';
import { FundsManagerFactory as FundsManagerETHFactory } from './typechain/ETH/FundsManagerFactory';
import { ReversePlasmaFactory } from './typechain/ESN/ReversePlasmaFactory';
import { FundsManagerFactory as FundsManagerESNFactory } from './typechain/ESN/FundsManagerFactory';

const config = {
  ETH: {
    network: 'rinkeby',
    esContract: '0x206949aD387Ce7F35B71e9db3cB576D103123D27',
    plasmaManager: '0x1c5b6e1ff599D1aCEd9cfCE73efab34f0688977e',
    fundsManager: '0xBf2B93384948f57f6927C72baDEA5e0dd0182Aa5',
  },
  ESN: {
    reversePlasma: '0x3bEb087e33eC0B830325991A32E3F8bb16A51317',
    fundsManager: '0xc4cfb05119Ea1F59fb5a8F949288801491D00110',
    nrtManager: 'NRT_MANAGER',
    timeallyManager: 'TIMEALLY_MANAGER',
    timeallyStakingTarget: 'TIMEALLY_STAKING_TARGET',
    validatorSet: 'VALIDATOR_SET',
    validatorManager: 'VALIDATOR_MANAGER',
    randomnessManager: 'RANDOMNESS_MANAGER',
    blockRewardManager: 'BLOCK_REWARD',
    prepaidEs: 'PREPAID_ES',
    dayswappers: 'DAYSWAPPERS',
    kycdapp: '0xC4336494606203e3907539d5b462A5cb7853B3C6',
    timeallyclub: 'TIMEALLY_CLUB',
    timeAllyPromotionalBucket: 'TIMEALLY_PROMOTIONAL_BUCKET',
  },
};

window.providerETH = ethers.getDefaultProvider(config.ETH.network);

window.providerESN = new CustomProvider('https://testnet.eraswap.network', {
  name: 'EraSwapNetwork',
  chainId: 5196,
  ensAddress: config.ESN.kycdapp,
});

// Temporary wallet
if (process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY) {
  window.wallet = new ethers.Wallet(process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY);
}

window.esInstanceETH = Erc20Factory.connect(config.ESN.nrtManager, window.providerETH);

window.plasmaManagerInstanceETH = PlasmaManagerFactory.connect(
  config.ETH.plasmaManager,
  window.providerETH
);

window.fundsManagerInstanceETH = FundsManagerETHFactory.connect(
  config.ETH.fundsManager,
  window.providerETH
);

window.reversePlasmaInstanceESN = ReversePlasmaFactory.connect(
  config.ESN.reversePlasma,
  window.providerESN
);

window.fundsManagerInstanceESN = FundsManagerESNFactory.connect(
  config.ESN.fundsManager,
  window.providerESN
);
