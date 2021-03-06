import React, { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import { parseEthersJsError, EraswapInfo } from 'eraswap-sdk/dist/utils';
import { Alert, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Step2(props: { setCurrentStep: (currentStep: number) => any; txHash: string }) {
  // const [busy, setBusy] = useState<boolean>(false);
  const [display, setDisplay] = useState<{
    message: string;
    variant: 'success' | 'danger' | 'warning' | 'info';
  } | null>(null);

  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setDisplay({
        message: 'Waiting for the transaction to confirm...',
        variant: 'warning',
      });

      let receipt: ethers.providers.TransactionReceipt | null = null;
      try {
        // receipt = await window.providerETH.getTransactionReceipt(props.txHash);
        const tx = await window.providerESN.getTransaction(props.txHash);
        receipt = await tx.wait();
      } catch {}

      if (receipt === null) {
        setDisplay({
          message: 'Transaction not found. Please check if it is visible on Eraswap Info.',
          variant: 'danger',
        });
        return;
      }

      if (receipt.to !== window.fundsManagerInstanceESN.address) {
        setDisplay({
          message: 'The transaction is sent to funds manager ESN contract',
          variant: 'danger',
        });
        return;
      }

      setDisplay({
        message: 'Tx is confirmed on Era Swap Network!',
        variant: 'success',
      });
      setReady(true);
    })().catch(console.error);
  }, []);

  return (
    <div className="exchange-box-wht-modal">
      <div className="exchange-container mt20 mb20">
        <h3 className="main-prf">Step 2: Wait for transaction to confirm</h3>
        <a target="_blank" href={EraswapInfo.getTxHref(props.txHash)}>
          View Tx on Eraswap Info
        </a>
        {display ? <Alert variant={display.variant}>{display.message}</Alert> : null}
      </div>

      {ready ? (
        <button className="tr-pn-btn" onClick={props.setCurrentStep.bind(null, 3)}>
          Proceed to next step
        </button>
      ) : null}
    </div>
  );
}
