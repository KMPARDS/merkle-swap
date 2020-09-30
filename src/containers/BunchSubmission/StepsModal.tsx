import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Step0, Step1, Step2, SignedBunchProposal } from './Steps';
import { Step3 } from './Steps/Step3';

export function StepsModal(props: {
  setShowModal: (newState: boolean) => any;
  plasmaState: { lastEsnBlockOnEth: number; latestEsnBlock: number };
}) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [bunchDepth, setBunchDepth] = useState<number | null>(null);
  const [signedBunch, setSignedBunch] = useState<SignedBunchProposal | null>(null);
  switch (currentStep) {
    case 0:
      return <Step0 setCurrentStep={setCurrentStep} />;
    case 1:
      return (
        <Step1
          setCurrentStep={setCurrentStep}
          setBunchDepth={setBunchDepth}
          plasmaState={props.plasmaState}
        />
      );
    case 2:
      return bunchDepth !== null ? (
        <Step2
          setCurrentStep={setCurrentStep}
          setSignedBunch={setSignedBunch}
          selectedBunchDepth={bunchDepth}
          plasmaState={props.plasmaState}
        />
      ) : (
        <>Bunch depth is not selected</>
      );
    case 3:
      return signedBunch !== null ? (
        <Step3 setCurrentStep={setCurrentStep} signedBunch={signedBunch} />
      ) : (
        <>Signed Bunch is not yet prepared</>
      );
    default:
      return (
        <Alert variant="warning">
          There is nothing to show. This is probably a bug. Please report it on{' '}
          <Link target="_blank" to="https://github.com/KMPARDS/merkle-swap">
            Github
          </Link>
          !
        </Alert>
      );
  }
}
