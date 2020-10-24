import React, { useState, useEffect } from 'react';
import { parseEthersJsError } from 'eraswap-sdk/dist/utils';

export function Step5(props: {
  setCurrentStep: (currentStep: number) => any;
  withdrawalProof: string;
}) {
  const [lines, setLines] = useState<{ text: string; color: string }[]>([]);
  function pushLine(line: { text: string; color: string }) {
    setLines((l) => [...l, line]);
  }

  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      pushLine({
        text: 'Please wait submitting proof to FundsManager smart contract on ETH...',
        color: 'white',
      });
      try {
        if (!window.wallet) {
          throw new Error('Wallet is not loaded. Please load wallet');
        }

        // @ts-ignore
        const isMetamask: boolean = window.wallet.isMetamask;

        if (isMetamask) {
          const correctChainId = process.env.REACT_APP_ENV === 'production' ? 1 : 4;
          let network = await window.wallet.provider.getNetwork();
          if (network.chainId !== correctChainId) {
            pushLine({
              text: `Please switch to ${
                correctChainId === 1 ? 'Ethereum Mainnet' : 'Rinkeby Network'
              } in your Metamask to continue...`,
              color: 'orangered',
            });

            while (1) {
              await new Promise((res) => setTimeout(res, 500));
              network = await window.wallet.provider.getNetwork();
              if (network.chainId === correctChainId) {
                pushLine({
                  text: `On the correct network! Proceeding! Check Metamask..`,
                  color: 'lightgreen',
                });
                break;
              }
            }
          }
        }

        const tx = await window.fundsManagerInstanceETH
          .connect(isMetamask ? window.wallet : window.wallet.connect(window.providerETH))
          .claimWithdrawal(props.withdrawalProof);
        setTxHash(tx.hash);
        pushLine({
          text: `Tx submitted (${tx.hash}).. waiting for confirmation`,
          color: 'white',
        });

        await tx.wait();
        pushLine({
          text: `Tx confirmed! You should have received tokens from smart contract. You can close this popup.`,
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
        <h3 className="main-prf">Step 5: Submit to ETH Reverse Plasma Smart Contract</h3>
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
