import React, { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import { parseEthersJsError } from 'eraswap-sdk/dist/utils';
import { Alert, FormControl, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Step3(props: { setCurrentStep: (currentStep: number) => any; txHash: string }) {
  // const [latestEthBlock, setLatestEthBlock] = useState<number | null>(null);
  const [confirmationBlocks, setConfirmationBlocks] = useState<number>(15);
  const [lastEthBlockOnEsn, setLastEthBlockOnEsn] = useState<number | null>(null);
  useEffect(() => {
    const fetchAndSetBlockNumber = async () => {
      // try {
      //   const blockNumber = await window.providerETH.getBlockNumber();
      //   setLatestEthBlock(blockNumber);
      // } catch (e) {
      //   console.error(e);
      // }

      try {
        const blockNumber = await window.reversePlasmaInstanceESN.latestBlockNumber();
        setLastEthBlockOnEsn(blockNumber.toNumber());
      } catch (e) {
        console.error(e);
      }
    };
    fetchAndSetBlockNumber();
    const intervalId = setInterval(fetchAndSetBlockNumber, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [txBlockNumber, setTxBlockNumber] = useState<number | null>(null);
  useEffect(() => {
    (async () => {
      const tx = await window.providerETH.getTransactionReceipt(props.txHash);
      setTxBlockNumber(tx.blockNumber);
    })().catch(console.error);
  }, []);

  let progress = 0;

  if (txBlockNumber !== null && lastEthBlockOnEsn !== null) {
    progress = 100 - Math.floor(((txBlockNumber - lastEthBlockOnEsn) / confirmationBlocks) * 100);
    if (progress > 100) progress = 100;
    if (progress < 0) progress = 0;

    if (txBlockNumber - lastEthBlockOnEsn > confirmationBlocks) {
      setConfirmationBlocks(txBlockNumber - lastEthBlockOnEsn);
    }
  }

  return (
    <div className="exchange-box-wht-modal">
      <div className="exchange-container mt20 mb20">
        <h3 className="main-prf">Step 3: Wait for block to be posted</h3>
        <p>Confirmed Ethereum Block: {lastEthBlockOnEsn ?? 'Loading...'}</p>
        <p>Current Tx's Block: {txBlockNumber ?? 'Loading...'}</p>
        <ProgressBar striped variant="danger" now={progress} />
        {progress === 100 ? (
          <button
            className="tr-pn-btn p-1 px-4 mt-2 mx-auto"
            onClick={props.setCurrentStep.bind(null, 4)}
          >
            Proceed to generate merkle proof
          </button>
        ) : null}
      </div>
    </div>
  );
}
