import React, { useState, useEffect } from 'react';
import { BigNumber } from 'ethers';

export function ModalBody(props: { setShowModal: (newState: boolean) => any }) {
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
          This step would cost you around 0.05 ETH (depending on gwei fee). You currently have
        </p>
        <div className="exc-btn-box">
          <button className="tr-pn-btn" onClick={props.setShowModal.bind(null, false)}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
