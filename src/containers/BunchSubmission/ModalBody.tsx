import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Step0, Step1 } from './Steps';

export function ModalBody(props: {
  setShowModal: (newState: boolean) => any;
  plasmaState: { lastEsnBlockOnEth: number; latestEsnBlock: number };
}) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [bunchDepth, setBunchDepth] = useState<number | null>(null);
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
    // <Step2 />;
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
