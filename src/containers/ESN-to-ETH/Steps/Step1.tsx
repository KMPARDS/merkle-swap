import React, { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import { parseEthersJsError } from 'eraswap-sdk/dist/utils';
import { Alert, FormControl } from 'react-bootstrap';

export function Step1(props: {
  setCurrentStep: (currentStep: number) => any;
  setTxHash: (txHash: string) => any;
  amountToESN: BigNumber;
}) {
  const [busy, setBusy] = useState<boolean>(false);
  const [display, setDisplay] = useState<{ message: string; variant: 'success' | 'danger' } | null>(
    null
  );
  const [txHashInput, setTxHashInput] = useState<string>('');

  return (
    <div className="exchange-box-wht-modal">
      <div className="exchange-container mt20 mb20">
        <h3 className="main-prf">Step 1: Transfer ES to Funds Manager Smart Contract</h3>
        <p>
          You need to transfer your Native funds to ESN contract{' '}
          {window.fundsManagerInstanceESN.address}. You can use any wallet.
        </p>
        {display ? <Alert variant={display.variant}>{display.message}</Alert> : null}
        {!props.amountToESN.eq(0) ? (
          <button
            className="tr-pn-btn p-1 px-4"
            disabled={(display !== null && display.variant === 'success') || busy}
            onClick={async () => {
              setBusy(true);
              try {
                if (!window.wallet) {
                  throw new Error('Wallet is not there');
                }

                // @ts-ignore
                const isMetamask: boolean = window.wallet.isMetamask;

                if (isMetamask) {
                  const correctChainId = process.env.REACT_APP_ENV === 'production' ? 5197 : 5196;
                  const network = await window.wallet.provider.getNetwork();
                  if (network.chainId !== correctChainId) {
                    throw new Error(
                      `Please switch to ${
                        correctChainId === 5197 ? 'Era Swap Alpha Mainnet' : 'Era Swap Test Network'
                      } in your Metamask to and try again...`
                    );
                  }
                }

                const tx = await (isMetamask
                  ? window.wallet
                  : window.wallet.connect(window.providerESN)
                ).sendTransaction({
                  to: window.fundsManagerInstanceESN.address,
                  value: props.amountToESN,
                });

                setDisplay({
                  message: `Tx sent: ${tx.hash}. PLEASE SAVE COPY OF THIS HASH !!`,
                  variant: 'success',
                });
                // props.setTxHash(tx.hash);
                setTxHashInput(tx.hash);

                // props.setCurrentStep(2);
              } catch (error) {
                setDisplay({
                  message: parseEthersJsError(error),
                  variant: 'danger',
                });
              }
              setBusy(false);
            }}
          >
            {busy ? 'Sending tx..' : 'Transfer'}
          </button>
        ) : null}
        <br />
        OR resume with a transaction hash
        <FormControl
          type="text"
          className="form-control"
          placeholder="Enter tx hash if transferred already"
          value={txHashInput}
          onChange={(event) =>
            setTxHashInput(event.target.value.replace(/\s/g, '').replace(/"/g, ''))
          }
          isInvalid={
            !!txHashInput && (!ethers.utils.isHexString(txHashInput) || txHashInput.length !== 66)
          }
          isValid={
            !!txHashInput && ethers.utils.isHexString(txHashInput) && txHashInput.length === 66
          }
        />
        <button
          className="tr-pn-btn"
          onClick={() => {
            if (
              !!txHashInput &&
              ethers.utils.isHexString(txHashInput) &&
              txHashInput.length === 66
            ) {
              props.setTxHash(txHashInput);
              props.setCurrentStep(2);
            }
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
}
