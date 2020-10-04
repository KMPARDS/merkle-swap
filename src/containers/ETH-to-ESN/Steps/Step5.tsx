import React, { useState, useEffect } from 'react';
import { parseEthersJsError } from 'eraswap-sdk/dist/utils';

export function Step5(props: {
  setCurrentStep: (currentStep: number) => any;
  depositProof: string;
}) {
  const [lines, setLines] = useState<{ text: string; color: string }[]>([]);
  function pushLine(line: { text: string; color: string }) {
    setLines((l) => [...l, line]);
  }

  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      pushLine({
        text: 'Please wait submitting proof to FundsManager smart contract on ESN...',
        color: 'white',
      });
      try {
        if (!window.wallet) {
          throw new Error('Wallet is not loaded. Please load wallet');
        }
        const tx = await window.fundsManagerInstanceESN
          .connect(window.wallet.connect(window.providerESN))
          .claimDeposit(props.depositProof);
        setTxHash(tx.hash);
        pushLine({
          text: `Tx submitted.. waiting for confirmation`,
          color: 'white',
        });

        await tx.wait();
        pushLine({
          text: `Tx confirmed! You should have received tokens from smart contract`,
          color: 'lightgreen',
        });
      } catch (error) {
        pushLine({
          text: `There was an error: ${parseEthersJsError(error)}`,
          color: 'orangered',
        });
      }
    })().catch(console.error);
  }, []);

  return (
    <div className="exchange-box-wht-modal">
      <div className="exchange-container mt20 mb20">
        <h3 className="main-prf">Step 5: Submit to ESN Reverse Plasma Smart Contract</h3>
        <div
          style={{ fontFamily: 'monospace', backgroundColor: '#222e', borderRadius: '5px' }}
          className="p-4"
        >
          {lines.map((line) => (
            <p style={{ color: line.color }}>{line.text}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
