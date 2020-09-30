import React, { useState, useEffect } from 'react';
import { parseEther } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import { lessDecimals } from '../../../utils';
import { Alert } from 'react-bootstrap';

const requiredBalance = parseEther('0.05');

export function Step0(props: { setCurrentStep: (currentStep: number) => any }) {
  const [ethBalance, setEthBalance] = useState<BigNumber | null>(null);
  useEffect(() => {
    (async () => {
      if (!window.wallet) {
        throw new Error('Wallet is not loaded');
      }
      const ethBalance = await window.providerETH.getBalance(window.wallet.address);
      setEthBalance(ethBalance);
    })().catch(console.error);
  }, []);

  return (
    <div className="exchange-box-wht-modal">
      <div className="exchange-container mt20 mb20">
        <h3 className="main-prf">Bunch Submission</h3>
        <p className="prf-md-txt">
          This step would cost you around {lessDecimals(requiredBalance)} ETH (depending on gwei
          fee).
          {ethBalance !== null ? <> You currently have {lessDecimals(ethBalance, 5)} ETH</> : null}
        </p>
        <div className="exc-btn-box">
          {ethBalance !== null ? (
            ethBalance.gte(requiredBalance) ? (
              <button className="tr-pn-btn" onClick={props.setCurrentStep.bind(null, 1)}>
                Proceed
              </button>
            ) : (
              <Alert variant="danger">Please acquire 0.05 ETH balance before continuing</Alert>
            )
          ) : (
            'Please wait...'
          )}
        </div>
      </div>
    </div>
  );
}
