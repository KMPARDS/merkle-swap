import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

type State = {
  bunchModal: boolean;
};

export class Home extends Component<State> {
  state: State = {
    bunchModal: false,
  };

  handleClose = () => {
    this.setState({
      bunchModal: false,
    });
  };

  render() {
    return (
      <div>
        <div className="bridge-bgd">
          <div className="wrapper-container">
            <div className="container">
              <div className="row  align-items-center justify-content-center text-center mt80">
                <div className="col-lg-10 align-self-end">
                  <h1 className="text-uppercase text-white font-weight-bold">
                    Eraswap Token Bridge
                  </h1>
                  <div className="divider my-4"></div>
                </div>
                <div className="col-lg-8 align-self-baseline">
                  <h5 className="mrg-home">
                    Transfer Tokens between Ethereum's Main network, and Eraswap network
                  </h5>

                  <Link
                    to="/token-exchange"
                    className="btn btn-primary btn-xl js-scroll-trigger prcd-btn"
                  >
                    ETH to ESN
                  </Link>
                  <Link
                    to="/token-exchange"
                    className="btn btn-primary btn-xl js-scroll-trigger prcd-btn"
                  >
                    ESN to ETH
                  </Link>
                  <br />
                  <Link
                    to="/bunch-submission"
                    className="btn btn-primary btn-xl js-scroll-trigger prcd-btn"
                  >
                    Bunch Submission
                  </Link>
                </div>

                {/* <div className="proceed-box-flex">
                  <div className="inner-box">
                    <div className="frst-link">
                      <Link to="/token-exchange" className="prcd-btn">
                        Proceed to Token exchange
                      </Link>
                    </div>
                    <button className="prcd-btn">Proceed to Bunch Submission</button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for proof */}

        <Modal
          show={this.state.bunchModal}
          onHide={this.handleClose}
          className="date-modal-container"
        >
          <Modal.Body>
            <div className="exchange-box-wht-modal">
              <div className="exchange-container">
                <p className="prf-md-txt">Submit ESN bunch and get rewards </p>
                <div className="bunch-btn-flex">
                  <div className="exc-btn-box">
                    <button
                      className="tr-pn-btn"
                      onClick={() => this.setState({ bunchModal: false })}
                    >
                      Default
                    </button>
                  </div>
                  <div className="exc-btn-box">
                    <button
                      className="tr-pn-btn"
                      onClick={() => this.setState({ bunchModal: false })}
                    >
                      Advance
                    </button>
                  </div>
                </div>
                <div className="exc-btn-box">
                  <button
                    className="tr-pn-btn"
                    onClick={() => this.setState({ bunchModal: false, depositModal: true })}
                  >
                    GENERATE BUNCH STRIVES
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
