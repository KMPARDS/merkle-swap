import React, { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
// import { Link } from 'react-router-dom';

export function BunchSubmission() {
  const [lastEsnBlockOnEth, setLastEsnBlockOnEth] = useState<number | null>(null);
  useEffect(() => {
    (async () => {
      const lastBunchIndex = await window.plasmaManagerInstanceETH.lastBunchIndex();
      if (lastBunchIndex.eq(ethers.constants.MaxUint256)) {
        setLastEsnBlockOnEth(-1);
        return;
      }
      const lastBunchHeader = await window.plasmaManagerInstanceETH.getBunchHeader(lastBunchIndex);
      const lastBlock = lastBunchHeader.startBlockNumber
        .add(BigNumber.from(2).pow(lastBunchHeader.bunchDepth))
        .sub(1);
      setLastEsnBlockOnEth(lastBlock.toNumber());
    })().catch(console.error);
  }, []);

  const [latestEsnBlock, setLatestEsnBlock] = useState<number | null>(null);
  useEffect(() => {
    const fetchAndSetBlockNumber = async () => {
      try {
        const blockNumber = await window.providerESN.getBlockNumber();
        setLatestEsnBlock(blockNumber);
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

  const blocksPending: number | null =
    lastEsnBlockOnEth !== null && latestEsnBlock !== null
      ? latestEsnBlock - lastEsnBlockOnEth
      : null;

  return (
    <>
      <div className="bridge-bgd">
        <div className="wrapper-container mt80">
          <h1 className="text-uppercase text-white font-weight-bold">Era Swap Plasma</h1>

          <h5>
            Posting bunch to Ethereum helps to users to convert their tokens in to Ethereum ERC20
            EraSwaps
          </h5>
          <div className="exchange-box-wht mt40">
            <div className="exchange-container p-4">
              <p>Last ESN block on Ethereum: {lastEsnBlockOnEth ?? 'Loading...'}</p>
              <p>
                Latest Block on ESN: {latestEsnBlock ?? 'Loading...'}{' '}
                {<>({blocksPending} pending)</>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
