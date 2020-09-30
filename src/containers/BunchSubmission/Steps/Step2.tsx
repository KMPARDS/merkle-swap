import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { getProposalFromKami, kamiRpc } from '../../../plasma-utils/kami-rpc';
import { wait } from '../../../utils';

interface BunchProposal {
  startBlockNumber: number;
  bunchDepth: number;
  transactionsMegaRoot: string;
  receiptsMegaRoot: string;
  lastBlockHash: string;
}

interface SignedBunchProposal {
  startBlockNumber: number;
  bunchDepth: number;
  transactionsMegaRoot: string;
  receiptsMegaRoot: string;
  lastBlockHash: string;
  signatures: string[];
}

export function Step2(props: {
  setCurrentStep: (currentStep: number) => any;
  plasmaState: { lastEsnBlockOnEth: number; latestEsnBlock: number };
  selectedBunchDepth: number;
}) {
  // const [displayElement, setDisplayElement] = useState<JSX.Element>(<></>);
  const [lines, setLines] = useState<{ text: string; color: string }[]>([]);
  // const [displayMessage, setDisplayMessage] = useState<{
  //   message: string;
  //   variant: 'danger' | 'success' | 'warning' | 'info';
  // }>({ message: '', variant: 'info' });
  function pushLine(line: { text: string; color: string }) {
    setLines((l) => [...l, line]);
  }

  useEffect(() => {
    (async () => {
      if (!process.env.REACT_APP_KAMI_URLS) {
        // setDisplayElement(
        //   <Alert variant="danger">
        //     REACT_APP_KAMI_URLS env is not set. Please set it in the env file
        //   </Alert>
        // );
        pushLine({
          text: 'REACT_APP_KAMI_URLS env is not set. Please set it in the env file',
          color: 'red',
        });
        return;
      }
      const kamiUrls = process.env.REACT_APP_KAMI_URLS?.split(',');

      if (kamiUrls.length < 3) {
        // setDisplayElement(
        //   <Alert variant="danger">REACT_APP_KAMI_URLS env should contain atleast 3 Kami URLs</Alert>
        // );
        pushLine({
          text: 'REACT_APP_KAMI_URLS env should contain atleast 3 Kami URLs',
          color: 'red',
        });
      }

      // setDisplayElement(<Alert variant="danger">Please checking if Kamis are active...</Alert>);
      pushLine({
        text: 'Please checking if Kamis are active...',
        color: 'white',
      });
      const blockNumberResponses: (number | null)[] = [];
      for (const url of kamiUrls) {
        try {
          const resp = await kamiRpc(url, 'blockc_getBlockNumber', []);
          // console.log('resp', url, resp);
          blockNumberResponses.push(resp);
        } catch {
          blockNumberResponses.push(null);
        }
      }

      if (blockNumberResponses.includes(null)) {
        const nullResponseIndexes: number[] = [];
        blockNumberResponses.forEach((resp, index) => {
          if (resp === null) nullResponseIndexes.push(index);
        });
        // setDisplayElement(
        //   <Alert variant="danger">
        //     The kamis: {nullResponseIndexes.map((index) => kamiUrls[index]).join(', ')} are
        //     malfunctioning.
        //   </Alert>
        // );
        pushLine({
          text: `The kamis: ${nullResponseIndexes
            .map((index) => kamiUrls[index])
            .join(', ')} are malfunctioning.`,
          color: 'white',
        });
        return;
      } else {
        // setDisplayElement(
        //   <Alert variant="info">All Kami's are active. Requesting for Bunch Proposal.</Alert>
        // );
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
        // setDisplayElement(
        //   <Alert variant="danger">
        //     There was an error generating the Bunch Proposal, this can happen for higher bunch
        //     depths, you try with a lower bunch depth.
        //   </Alert>
        // );
        pushLine({
          text:
            'There was an error generating the Bunch Proposal, this can happen for higher bunch depths, you try with a lower bunch depth.',
          color: 'white',
        });
        return;
      } else {
        // setDisplayElement(
        //   <Alert variant="info">Bunch Proposal prepared! Starting to collect signatures.</Alert>
        // );
        pushLine({
          text: 'Bunch Proposal prepared! Starting to collect signatures.',
          color: 'white',
        });
      }

      await wait(1000);

      const signBunchResponses: (SignedBunchProposal | null)[] = [];
      for (const [index, url] of kamiUrls.entries()) {
        let signedBunchProposal: SignedBunchProposal | null = null;
        try {
          signedBunchProposal = await kamiRpc(url, 'informer_signBunch', [bunchProposal]);
        } catch {}

        signBunchResponses.push(signedBunchProposal);
        // setDisplayElement(
        //   <Alert variant="info">Requesting Kami#{index + 1} for signature on this bunch...</Alert>
        // );
        pushLine({
          text: `Requesting Kami#${index + 1} for signature on this bunch...`,
          color: 'white',
        });
        await wait(1000);
      }

      if (signBunchResponses.includes(null)) {
        const nullResponseIndexes: number[] = [];
        signBunchResponses.forEach((resp, index) => {
          if (resp === null) nullResponseIndexes.push(index);
        });
        // setDisplayElement(
        //   <Alert variant="danger">
        //     There was error getting signatures from these Kamis:{' '}
        //     {nullResponseIndexes.map((index) => kamiUrls[index]).join(', ')}. You can try using a
        //     lower bunch depth.
        //   </Alert>
        // );
        pushLine({
          text: `There was error getting signatures from these Kamis: ${nullResponseIndexes
            .map((index) => kamiUrls[index])
            .join(', ')}. You can try using a lower bunch depth.`,
          color: 'white',
        });
      }

      // setDisplayElement(<Alert variant="info">Signatures are received!</Alert>);
      pushLine({
        text: 'Signatures are received!',
        color: 'lightgreen',
      });
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
      </div>
    </div>
  );
}
