import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { getProposalFromKami, kamiRpc } from '../../../plasma-utils/kami-rpc';
import { wait } from '../../../utils';
import { concat, hexZeroPad, keccak256, recoverAddress } from 'ethers/lib/utils';
import { ethers, BigNumber } from 'ethers';

interface BunchProposal {
  startBlockNumber: number;
  bunchDepth: number;
  transactionsMegaRoot: string;
  receiptsMegaRoot: string;
  lastBlockHash: string;
}

export interface SignedBunchProposal {
  startBlockNumber: number;
  bunchDepth: number;
  transactionsMegaRoot: string;
  receiptsMegaRoot: string;
  lastBlockHash: string;
  signatures: string[];
}

export function Step2(props: {
  setCurrentStep: (currentStep: number) => any;
  setSignedBunch: (signedBunch: SignedBunchProposal) => any;
  plasmaState: { lastEsnBlockOnEth: number; latestEsnBlock: number };
  selectedBunchDepth: number;
}) {
  const [lines, setLines] = useState<{ text: string; color: string }[]>([]);
  function pushLine(line: { text: string; color: string }) {
    setLines((l) => [...l, line]);
  }

  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      if (!process.env.REACT_APP_KAMI_URLS) {
        pushLine({
          text: 'REACT_APP_KAMI_URLS env is not set. Please set it in the env file',
          color: 'orangered',
        });
        return;
      }
      const kamiUrls = process.env.REACT_APP_KAMI_URLS?.split(',');

      if (kamiUrls.length < 3) {
        pushLine({
          text: 'REACT_APP_KAMI_URLS env should contain atleast 3 Kami URLs',
          color: 'orangered',
        });
      }

      pushLine({
        text: 'Please wait, checking if Kamis are active...',
        color: 'white',
      });

      const blockNumberResponses: (number | null)[] = [];
      const addressResponses: (string | null)[] = [];
      for (const url of kamiUrls) {
        try {
          const resp = await kamiRpc(url, 'blockc_getBlockNumber', []);
          blockNumberResponses.push(resp);

          const address = await kamiRpc(url, 'kami_getAddress', []);
          addressResponses.push(address);
        } catch {
          blockNumberResponses.push(null);
          addressResponses.push(null);
        }
      }

      if (blockNumberResponses.includes(null)) {
        const nullResponseIndexes: number[] = [];
        blockNumberResponses.forEach((resp, index) => {
          if (resp === null) nullResponseIndexes.push(index);
        });

        pushLine({
          text: `The kamis: ${nullResponseIndexes
            .map((index) => kamiUrls[index])
            .join(', ')} are malfunctioning.`,
          color: 'white',
        });
        return;
      } else {
        pushLine({
          text: `All Kami's are active. Requesting for Bunch Proposal.`,
          color: 'white',
        });
      }

      let bunchProposal: BunchProposal | null = null;

      try {
        bunchProposal = await kamiRpc(kamiUrls[0], 'informer_computeBunchProposal', [
          props.plasmaState.lastEsnBlockOnEth + 1,
          props.selectedBunchDepth,
        ]);
      } catch {}

      if (bunchProposal === null) {
        pushLine({
          text:
            'There was an error generating the Bunch Proposal, this can happen for higher bunch depths, you try with a lower bunch depth.',
          color: 'white',
        });
        return;
      } else {
        pushLine({
          text: 'Bunch Proposal prepared! Starting to collect signatures.',
          color: 'white',
        });
      }

      await wait(1000);

      const signBunchResponses: (SignedBunchProposal | null)[] = [];
      for (const [index, url] of kamiUrls.entries()) {
        let signedBunchProposal: SignedBunchProposal | null = null;

        pushLine({
          text: `Requesting Kami#${index + 1} for signature on this bunch...`,
          color: 'white',
        });

        try {
          signedBunchProposal = await kamiRpc(url, 'informer_signBunch', [bunchProposal]);
        } catch {}

        signBunchResponses.push(signedBunchProposal);

        await wait(1000);
      }

      if (signBunchResponses.includes(null)) {
        const nullResponseIndexes: number[] = [];
        signBunchResponses.forEach((resp, index) => {
          if (resp === null) nullResponseIndexes.push(index);
        });
        pushLine({
          text: `There was error getting signatures from these Kamis: ${nullResponseIndexes
            .map((index) => kamiUrls[index])
            .join(', ')}. You can try using a lower bunch depth.`,
          color: 'white',
        });
      }

      pushLine({
        text: 'Signatures are received!',
        color: 'lightgreen',
      });

      await wait(2000);

      pushLine({
        text: 'Verifying the signatures...',
        color: 'white',
      });

      const bunchDigest = keccak256(
        concat([
          '0x1900',
          window.plasmaManagerInstanceETH.address,
          hexZeroPad('0x' + bunchProposal.startBlockNumber.toString(16), 32),
          hexZeroPad('0x' + bunchProposal.bunchDepth.toString(16), 32),
          bunchProposal.transactionsMegaRoot,
          bunchProposal.receiptsMegaRoot,
          bunchProposal.lastBlockHash,
        ])
      );

      const addrSigs: { address: string; signature: string }[] = [];
      for (const [index, signedBunch] of signBunchResponses.entries()) {
        await wait(800);
        if (!signedBunch) {
          pushLine({
            text: `Bunch from Kami#${index} is not available`,
            color: 'orangered',
          });
          return;
        }

        const kamiAddress = addressResponses[index];
        if (!kamiAddress) {
          pushLine({
            text: `Address of Kami#${index} is not available`,
            color: 'orangered',
          });
          return;
        }

        const signature = signedBunch.signatures[0];
        const address = recoverAddress(bunchDigest, signature);

        if (kamiAddress.toLowerCase() === address.toLowerCase()) {
          pushLine({
            text: `Signature of Kami#${index + 1} is correct!`,
            color: 'lightgreen',
          });
        } else {
          pushLine({
            text: `Signature of Kami#${index + 1} is incorrect :(`,
            color: 'orangered',
          });
        }

        addrSigs.push({
          address: kamiAddress,
          signature,
        });
      }

      await wait(2000);

      pushLine({
        text: 'Arranging the signatures in ascending order...',
        color: 'white',
      });

      const sortedSignatures = addrSigs
        .sort((a, b) => (BigNumber.from(a.address).gt(b.address) ? 1 : -1))
        .map((addrSig) => addrSig.signature);

      await wait(1000);

      props.setSignedBunch({
        ...bunchProposal,
        signatures: sortedSignatures,
      });

      pushLine({
        text: 'Bunch Proposal is prepared for submiting!',
        color: 'lightgreen',
      });
      setReady(true);
    })().catch(console.error);
  }, []);

  return (
    <div className="exchange-box-wht-modal">
      <div className="exchange-container mt20 mb20">
        <h3 className="main-prf">STEP 2: Collect Signatures</h3>
        <div
          style={{ fontFamily: 'monospace', backgroundColor: '#222e', borderRadius: '5px' }}
          className="p-4"
        >
          {lines.map((line) => (
            <p style={{ color: line.color }}>{line.text}</p>
          ))}
        </div>
        {ready ? (
          <button onClick={props.setCurrentStep.bind(null, 3)} className="tr-pn-btn p-1 px-4">
            Select
          </button>
        ) : null}
      </div>
    </div>
  );
}
