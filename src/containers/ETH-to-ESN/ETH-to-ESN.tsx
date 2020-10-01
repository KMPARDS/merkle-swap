import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import Modal from 'react-bootstrap/Modal';
import { BigNumber, ethers } from 'ethers';
import { lessDecimals } from '../../utils';
import { parseEther } from 'ethers/lib/utils';
import { FormControl } from 'react-bootstrap';
import { StepsModal } from './StepsModal';

type State = {
  showModal: boolean;
  esErc20Balance: BigNumber | null;
  esNativeBalance: BigNumber | null;
  amountInput: string;
};

export class ETHtoESN extends Component<{}, State> {
  state: State = {
    showModal: false,
    esErc20Balance: null,
    esNativeBalance: null,
    amountInput: '',
  };

  componentDidMount = async () => {
    if (window.wallet) {
      const esErc20Balance = await window.esInstanceETH.balanceOf(window.wallet.address);
      const esNativeBalance = await window.providerESN.getBalance(window.wallet.address);

      this.setState({ esErc20Balance, esNativeBalance });
    }
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const isAmountValid: boolean = !!this.state.amountInput && !isNaN(+this.state.amountInput);
    return (
      <div>
        <div className="bridge-bgd">
          <div className="wrapper-container mt80">
            <h1 className="text-uppercase text-white font-weight-bold">Eraswap Token Bridge</h1>

            <h5>Transfer Tokens between Ethereum's Main network, and Eraswap network</h5>
            <div className="exchange-box-wht mt40 arrow-bg-right ">
              <div className="exchange-container">
                <div className="row pinside40">
                  <div className="col-md-4 text-center">
                    <p className="main-er-txt">
                      Eraswap <span className="sm-exch-txt">(ERC20)</span>
                    </p>

                    <p className="font-weight-bold">
                      {this.state.esErc20Balance !== null
                        ? lessDecimals(this.state.esErc20Balance)
                        : 'Loading...'}
                    </p>
                    {this.state.esErc20Balance !== null && isAmountValid ? (
                      <p className="font-weight-bold">
                        New Balance ={' '}
                        {lessDecimals(
                          this.state.esErc20Balance.sub(parseEther(this.state.amountInput))
                        )}
                      </p>
                    ) : null}
                  </div>

                  <div className="col-md-4 text-center">
                    <div className="input-group">
                      <FormControl
                        type="text"
                        className="form-control"
                        onChange={(event) => this.setState({ amountInput: event.target.value })}
                        isInvalid={
                          isAmountValid &&
                          !!this.state.esErc20Balance &&
                          parseEther(this.state.amountInput).gt(this.state.esErc20Balance)
                        }
                      />
                      <div className="input-group-append">
                        <span className="input-group-text bgd-color">ES</span>
                      </div>
                    </div>
                    <div className="exc-btn-box ">
                      <button
                        className="tr-pn-btn"
                        onClick={() => this.setState({ showModal: true })}
                      >
                        {' '}
                        TRANSFER ERC20
                      </button>
                    </div>
                  </div>

                  <div className="col-md-4 text-center">
                    <p className="main-er-txt">
                      Eraswap <span className="sm-exch-txt">(Native)</span>
                    </p>

                    <p className="font-weight-bold">
                      {this.state.esNativeBalance !== null
                        ? lessDecimals(this.state.esNativeBalance)
                        : 'Loading...'}
                    </p>
                    {this.state.esNativeBalance !== null && isAmountValid ? (
                      <p className="font-weight-bold">
                        New Balance ={' '}
                        {lessDecimals(
                          this.state.esNativeBalance.add(parseEther(this.state.amountInput))
                        )}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bootstrap Modal */}
        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
          className="date-modal-container"
        >
          <Modal.Header closeButton>
            <Modal.Title>Era Swap Plasma Framework</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {isAmountValid ? (
              <StepsModal
                setShowModal={(showModal: boolean) => this.setState({ showModal })}
                amountToESN={parseEther(this.state.amountInput)}
              />
            ) : (
              'Amount is not valid'
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}