import React, { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import { parseEthersJsError, parseSecondsRemaining } from 'eraswap-sdk/dist/utils';
import { Alert, FormControl, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Step3(props: { setCurrentStep: (currentStep: number) => any; txHash: string }) {
  const [lastEsnBlockOnEth, setLastEsnBlockOnEth] = useState<number | null>(null);
  useEffect(() => {
    const fetchAndSetBlockNumber = async () => {
      try {
        const lastBunchIndex = await window.plasmaManagerInstanceETH.lastBunchIndex();
        if (lastBunchIndex.eq(ethers.constants.MaxUint256)) {
          setLastEsnBlockOnEth(-1);
          return;
        }
        const lastBunchHeader = await window.plasmaManagerInstanceETH.getBunchHeader(
          lastBunchIndex
        );
        const lastBlock = lastBunchHeader.startBlockNumber
          .add(BigNumber.from(2).pow(lastBunchHeader.bunchDepth))
          .sub(1);
        setLastEsnBlockOnEth(lastBlock.toNumber());
      } catch (e) {
        console.error(e);
      }
    };
    fetchAndSetBlockNumber();
    const intervalId = setInterval(fetchAndSetBlockNumber, 15000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [txBlockNumber, setTxBlockNumber] = useState<number | null>(null);
  useEffect(() => {
    (async () => {
      const tx = await window.providerESN.getTransactionReceipt(props.txHash);
      setTxBlockNumber(tx.blockNumber);
    })().catch(console.error);
  }, []);

  const [esnLatestBlock, setEsnLatestBlock] = useState<number | null>(null);
  useEffect(() => {
    const updateEsnBlock = async () => {
      const blockNumber = await window.providerESN.getBlockNumber();
      setEsnLatestBlock(blockNumber);
    };

    const intervalId = setInterval(() => {
      updateEsnBlock().catch(console.error);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  let immediateBunchDepth = -1;
  let includesTx: boolean | null = null;
  let immediateBunchLastBlock: number | null = null;
  if (esnLatestBlock !== null && lastEsnBlockOnEth !== null && txBlockNumber !== null) {
    immediateBunchDepth = esnLatestBlock - lastEsnBlockOnEth;
    immediateBunchDepth = Math.floor(Math.log2(immediateBunchDepth));
    immediateBunchLastBlock = lastEsnBlockOnEth + 2 ** immediateBunchDepth;
    includesTx = immediateBunchLastBlock >= txBlockNumber;
  }

  return (
    <div className="exchange-box-wht-modal">
      <div className="exchange-container mt20 mb20">
        <h3 className="main-prf">Step 3: Wait for Bunch to be posted</h3>
        <p>Your tx hash: {props.txHash ?? 'Loading...'}</p>

        {txBlockNumber !== null && lastEsnBlockOnEth !== null ? (
          <Alert variant={lastEsnBlockOnEth > txBlockNumber ? 'success' : 'warning'}>
            Your transaction is included in block {txBlockNumber} on ESN. The latest bunch on Plasma
            Smart Contract on Ethereum has last block number {lastEsnBlockOnEth}.{' '}
            {lastEsnBlockOnEth > txBlockNumber
              ? 'Your tx is already included! And you can proceed to submit proof!'
              : 'Your tx needs to be posted through a bunch proposal.'}
          </Alert>
        ) : (
          'Please wait...'
        )}

        {esnLatestBlock !== null &&
        lastEsnBlockOnEth !== null &&
        txBlockNumber !== null &&
        immediateBunchLastBlock !== null &&
        lastEsnBlockOnEth < txBlockNumber ? (
          <Alert variant="info">
            Immediate bunch with higest bunch depth is {immediateBunchDepth}.{' '}
            {immediateBunchLastBlock >= txBlockNumber ? (
              <>This bunch would include your tx!</>
            ) : (
              <>
                This bunch doesn't includes your tx, since it includes blocks only upto{' '}
                {immediateBunchLastBlock}. Bunch with depth {immediateBunchDepth + 1} would include
                your tx, but for that you need to wait for{' '}
                {lastEsnBlockOnEth !== null && esnLatestBlock !== null
                  ? (() => {
                      const blocks =
                        lastEsnBlockOnEth + 2 ** (immediateBunchDepth + 1) - esnLatestBlock;

                      const seconds = blocks * 5;

                      return (
                        <>
                          {blocks} blocks ({parseSecondsRemaining(seconds)})
                        </>
                      );
                    })()
                  : '[Loading]'}{' '}
                to be sealed on ESN. If you need withdrawal on Ethereum urgently, then you can
                submit the multiple bunches with depths:{' '}
                {(() => {
                  const depths = [];
                  let depth = immediateBunchDepth;
                  let latestBlock = lastEsnBlockOnEth ?? 0;
                  while (depth >= 0) {
                    if (latestBlock + 2 ** depth <= esnLatestBlock) {
                      depths.push(depth);
                      latestBlock += 2 ** depth;
                    }
                    depth--;
                    if (latestBlock >= (txBlockNumber ?? 0)) {
                      break;
                    }
                  }

                  return depths.join(', ');
                })()}
                .
              </>
            )}
          </Alert>
        ) : null}

        {lastEsnBlockOnEth !== null &&
        txBlockNumber !== null &&
        lastEsnBlockOnEth > txBlockNumber ? (
          <>
            <button className="tr-pn-btn" onClick={props.setCurrentStep.bind(null, 4)}>
              Proceed to generate proof
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
