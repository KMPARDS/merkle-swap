import React, { useState, useEffect } from 'react';
import { generateWithdrawalProof } from '../../../plasma-utils/proof';
import { GlobalEventEmitter,Events } from '../../../events';
import { ProgressBar } from 'react-bootstrap';

export function Step4(props: {
  setCurrentStep: (currentStep: number) => any;
  setWithdrawalProof: (withdrawalProof: string) => any;
  txHash: string;
  withdrawalProof: string | null;
}) {
  const [lines, setLines] = useState<{ text: string; color: string }[]>([]);
  function pushLine(line: { text: string; color: string }) {
    setLines((l) => [...l, line]);
  }

  const [progress, setProgress] = useState<number>(0);
  GlobalEventEmitter.subscribe(Events.SET_PROGRESS,progress =>{
      console.log({progress});
     setProgress(progress)
    });
  
  const [ready, setReady] = useState<boolean>(false);
  const [showProof, setShowProof] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      pushLine({
        text: 'Prepaing proof generation process...',
        color: 'white',
      });
      try {
        const proof = await generateWithdrawalProof(props.txHash, pushLine);
        props.setWithdrawalProof(proof);
        pushLine({
          text: 'Proof ready to be submitted!',
          color: 'green',
        });
        setReady(true);
      } catch (error) {
        pushLine({
          text: error.message,
          color: 'orangered',
        });
      }
    })().catch(console.error);
  }, []);


  return (
    <div className="exchange-box-wht-modal">
      <div className="exchange-container mt20 mb20">
        <h3 className="main-prf">Step 4: Generate Proof of Withdrawal</h3>
        <div
          style={{ fontFamily: 'monospace', backgroundColor: '#222e', borderRadius: '5px' }}
          className="p-4"
        >
          {lines.map((line) => (
            <p style={{ color: line.color }}>{line.text}</p>
          ))}
          {progress !== 0 && progress < 100 
          ?
            <ProgressBar animated now={progress} />
            :
            null
          }
        </div>

        {ready ? (
          <>
            <button
              className="tr-pn-btn p-1 px-4 mt-2 mx-auto"
              onClick={setShowProof.bind(null, !showProof)}
            >
              {showProof ? "That's all, now hide Proof" : 'Show proof'}
            </button>
            {showProof ? (
              <div
                style={{
                  fontFamily: 'monospace',
                  backgroundColor: '#222e',
                  borderRadius: '5px',
                  overflow: 'scroll',
                }}
                className="p-4"
              >
                {props.withdrawalProof}
              </div>
            ) : null}
            <button
              className="tr-pn-btn p-1 px-4 mt-2 mx-auto"
              onClick={props.setCurrentStep.bind(null, 5)}
            >
              Submit the proof to ETH
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
