import React, { useState, useEffect } from 'react';
import { SignedBunchProposal } from './Step2';
import { parseEthersJsError } from 'eraswap-sdk/dist/utils';
import { stringify } from 'querystring';
import { Alert } from 'react-bootstrap';

export function Step3(props: {
  setCurrentStep: (currentStep: number) => any;
  signedBunch: SignedBunchProposal;
}) {
  const [displayBunchProposal, setDisplayBunchProposal] = useState<boolean>(false);

  const [display, setDisplay] = useState<{ message: string; variant: 'success' | 'danger' } | null>(
    null
  );
  const [busy, setBusy] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  return (
    <div className="exchange-box-wht-modal">
      <div className="exchange-container mt20 mb20">
        <h3 className="main-prf">STEP 3: Make Submission</h3>

        <button
          onClick={setDisplayBunchProposal.bind(null, !displayBunchProposal)}
          className="tr-pn-btn p-1 px-4"
        >
          {!displayBunchProposal ? 'View' : 'Hide'} Bunch Proposal
        </button>
        {displayBunchProposal ? (
          <div
            style={{
              fontFamily: 'monospace',
              backgroundColor: '#222e',
              borderRadius: '5px',
              overflow: 'scroll',
              color: '#ddd',
            }}
            className="p-4"
          >
            {JSON.stringify(props.signedBunch, null, 2)
              .split('\n')
              .map((line) => (
                <p>{line.replace(/ /g, '\u00a0')}</p>
              ))}
          </div>
        ) : null}

        <br />
        {display ? <Alert variant={display.variant}>{display.message}</Alert> : null}
        <br />
        <button
          onClick={async () => {
            try {
              if (!window.wallet) {
                throw new Error('Wallet is not loaded');
              }

              setBusy(true);
              // @ts-ignore
              const isMetamask = window.wallet.provider?.connection?.url === 'metamask';

              if (isMetamask) {
                const network = await window.wallet.provider.getNetwork();
                const desiredChainid = process.env.REACT_APP_ENV === 'production' ? 1 : 4;
                if (network.chainId !== desiredChainid) {
                  throw new Error(
                    `Please hange metamask network to ${
                      process.env.REACT_APP_ENV === 'production'
                        ? 'Ethereum mainnet'
                        : 'Kovan Ethereum'
                    }`
                  );
                }
              }

              const tx = await window.plasmaManagerInstanceETH
                .connect(isMetamask ? window.wallet : window.wallet.connect(window.providerETH))
                .submitBunchHeader(
                  props.signedBunch.startBlockNumber,
                  props.signedBunch.bunchDepth,
                  props.signedBunch.transactionsMegaRoot,
                  props.signedBunch.receiptsMegaRoot,
                  props.signedBunch.lastBlockHash,
                  props.signedBunch.signatures
                );

              setDisplay({ message: `Tx sent to ethereum network!`, variant: 'success' });
              setTxHash(tx.hash);
            } catch (error) {
              setDisplay({ message: parseEthersJsError(error), variant: 'danger' });
            }
            setBusy(false);
          }}
          className="tr-pn-btn p-1 px-4"
        >
          {busy ? 'Submitting...' : 'Submit Transaction'}
        </button>

        {txHash ? (
          <a
            target="_blank"
            href={`https://${
              process.env.REACT_APP_ENV === 'production' ? '' : 'rinkeby.'
            }etherscan.io/tx/${txHash}`}
          >
            View Tx on EtherScan
          </a>
        ) : null}
      </div>
    </div>
  );
}
