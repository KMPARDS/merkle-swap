import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Transfer.css';

import Modal from 'react-bootstrap/Modal';

type State = {
  showModal: boolean;
  proofModal: boolean;
  depositModal: boolean;
};

export class Transfer extends Component<State> {
  state: State = {
    showModal: false,
    proofModal: false,
    depositModal: false,
  };

  handleClose = () => {
    this.setState({
      showModal: false,
      proofModal: false,
      depositModal: false,
    });
  };

  render() {
    return (
      <div>
        <div className="bridge-bgd">
          <div className="wrapper-container">
            <h1>Eraswap Token Bridge</h1>
            <h5>Transfer Tokens between Ethereum's Main network, and Eraswap network</h5>
            <div className="exchange-box-wht transfer-ht">
              <div className="exchange-container">
                <div className="row">
                  <div className="col-md-4 pinside40">
                    <span className="er-value">
                      <p className="main-er-txt">Eraswap</p>
                      <p className="sm-exch-txt">(Native)</p>
                    </span>
                    <p className="es-p-margin">0.0 ES</p>
                  </div>

                  <div className="col-md-4 pinside40">
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <div className="input-group-append">
                        <span className="input-group-text bgd-color">ES</span>
                      </div>
                    </div>
                    <div className="exc-btn-box">
                      <button
                        className="tr-pn-btn"
                        onClick={() => this.setState({ showModal: true })}
                      >
                        {' '}
                        Transfer
                      </button>
                    </div>
                  </div>

                  <div className="col-md-4 pinside40">
                    <span className="er-value2">
                      <p className="main-er-txt">Eraswap</p>
                      <p className="sm-exch-txt2">(ERC20)</p>
                    </span>
                    <p className="es-p-margin">0.0 ES</p>
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
          <Modal.Body>
            <div className="exchange-box-wht-modal">
              <div className="exchange-container">
                <h3 className="main-prf"> GENERATE PROOF</h3>
                <h3 className="main-prf">Please wait proof is generating</h3>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text grey-color">Generating Proof</span>
                  </div>
                  <input type="text" className="form-control" />
                </div>
                <div className="exc-btn-box">
                  <button
                    className="tr-pn-btn-modal"
                    onClick={() => this.setState({ showModal: false, proofModal: true })}
                  >
                    COPY AND PROCEED
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/* Modal for proof */}

        <Modal
          show={this.state.proofModal}
          onHide={this.handleClose}
          className="date-modal-container"
        >
          <Modal.Body>
            <div className="exchange-box-wht-modal">
              <div className="exchange-container">
                <h3 className="main-prf">YOUR PROOF IS GENERATED</h3>
                <p className="prf-md-txt">
                  {' '}
                  Submit the proof to eraswap network to claim <br />
                  your deposit
                </p>
                <div className="exc-btn-box">
                  <button
                    className="submit-modal"
                    onClick={() => this.setState({ proofModal: false, depositModal: true })}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/* Modal for deposit */}

        <Modal
          show={this.state.depositModal}
          onHide={this.handleClose}
          className="date-modal-container"
        >
          <Modal.Body>
            <div className="exchange-box-wht-modal">
              <div className="exchange-container">
                <h3 className="main-prf">YOUR DEPOSIT IS DONE </h3>
                <p className="prf-md-txt">YOUR UPDATED ERASWAP NETWORK BALANCE-5000 ES. </p>
                <div className="exc-btn-box">
                  <button
                    className="tr-pn-btn-modal"
                    onClick={() => this.setState({ depositModal: false })}
                  >
                    DONE
                  </button>
                </div>
                <div className="exc-btn-box">
                  <button className="tr-pn-btn-modal">Proceed to main screen</button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
