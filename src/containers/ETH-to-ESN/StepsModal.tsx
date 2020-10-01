import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Step1 } from './Steps';
import { BigNumber } from 'ethers';

export function StepsModal(props: {
  setShowModal: (newState: boolean) => any;
  amountToESN: BigNumber;
}) {
  const [txHash, setTxHash] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  switch (currentStep) {
    case 0:
      return (
        <Step1
          setCurrentStep={setCurrentStep}
          amountToESN={props.amountToESN}
          setTxHash={setTxHash}
        />
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
