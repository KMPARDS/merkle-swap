import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Step1, Step2, Step3, Step4 } from './Steps';
import { BigNumber } from 'ethers';

export function StepsModal(props: {
  setShowModal: (newState: boolean) => any;
  amountToESN: BigNumber;
}) {
  const [txHash, setTxHash] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [depositProof, setDepositProof] = useState<string | null>(null);
  switch (currentStep) {
    case 1:
      return (
        <Step1
          setCurrentStep={setCurrentStep}
          amountToESN={props.amountToESN}
          setTxHash={setTxHash}
        />
      );
    case 2:
      return txHash !== null ? (
        <Step2 setCurrentStep={setCurrentStep} txHash={txHash} />
      ) : (
        <>Tx hash is not set</>
      );
    case 3:
      return txHash !== null ? (
        <Step3 setCurrentStep={setCurrentStep} txHash={txHash} />
      ) : (
        <>Tx hash is not set</>
      );
    case 4:
      return txHash !== null ? (
        <Step4
          setCurrentStep={setCurrentStep}
          txHash={txHash}
          depositProof={depositProof}
          setDepositProof={setDepositProof}
        />
      ) : (
        <>Tx hash is not set</>
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
