import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './TokenExchange.css';

import Modal from 'react-bootstrap/Modal';

type State = {
  showModal: boolean;
  proofModal: boolean;
  depositModal: boolean;
};

export class TokenExchange extends Component<State> {
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

                    <p className="font-weight-bold">0.0 ES</p>
                  </div>

                  <div className="col-md-4 text-center">
                    <div className="input-group">
                      <input type="text" className="form-control" />
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
                        TRANSFER
                      </button>
                    </div>
                    <div className="exc-btn-box">
                      <Link to="/transfer" className="tr-pn-btn">
                        {' '}
                        REVERSE
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-4 text-center">
                    <p className="font-weight-bold">0.0 ES</p>
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
              <div className="exchange-container mt20 mb20">
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
                    className="tr-pn-btn-modal tr-pn-btn"
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
              <div className="exchange-container mt20 mb20">
                <h3 className="main-prf">YOUR PROOF IS GENERATED</h3>
                <p className="prf-md-txt">
                  {' '}
                  Submit the proof to eraswap network to claim <br />
                  your deposit
                </p>
                <div className="exc-btn-box">
                  <button
                    className="tr-pn-btn"
                    onClick={() => this.setState({ proofModal: false, depositModal: true })}
                  >
                    SUBMIT
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
              <div className="eexchange-container mt20 mb20">
                <h3 className="main-prf">YOUR DEPOSIT IS DONE </h3>
                <p className="prf-md-txt">YOUR UPDATED ERASWAP NETWORK BALANCE-5000 ES. </p>
                <div className="exc-btn-box">
                  <button
                    className="tr-pn-btn"
                    onClick={() => this.setState({ depositModal: false })}
                  >
                    DONE
                  </button>
                </div>
                <div className="exc-btn-box">
                  <button className="tr-pn-btn">Proceed to main screen</button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
