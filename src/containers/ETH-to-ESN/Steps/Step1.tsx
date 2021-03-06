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
        {display ? <Alert variant={display.variant}>{display.message}</Alert> : null}
        {!props.amountToESN.eq(0) ? (
          <button
            className="tr-pn-btn p-1 px-4"
            onClick={async () => {
              setDisplay(null);
              setBusy(true);
              try {
                if (!window.wallet) {
                  throw new Error('Wallet is not there');
                }

                // @ts-ignore
                const isMetamask: boolean = window.wallet.isMetamask;

                if (isMetamask) {
                  const correctChainId = process.env.REACT_APP_ENV === 'production' ? 1 : 4;
                  const network = await window.wallet.provider.getNetwork();
                  if (network.chainId !== correctChainId) {
                    throw new Error(
                      `Please switch to ${
                        correctChainId === 1 ? 'Ethereum Mainnet' : 'Rinkeby Network'
                      } in your Metamask to and try again...`
                    );
                  }

                  const tx = await window.esInstanceETH
                    .connect(window.wallet)
                    .transfer(window.fundsManagerInstanceETH.address, props.amountToESN);

                  setDisplay({
                    message: `Tx sent: ${tx.hash}`,
                    variant: 'success',
                  });
                  props.setTxHash(tx.hash);
                } else {
                  const tx = await window.esInstanceETH
                    .connect(window.wallet.connect(window.providerETH))
                    .transfer(window.fundsManagerInstanceETH.address, props.amountToESN);

                  setDisplay({
                    message: `Tx sent: ${tx.hash}`,
                    variant: 'success',
                  });
                  props.setTxHash(tx.hash);
                }
                props.setCurrentStep(2);
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
