import React, { Component } from 'react';
import './Home.css'
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

type State = {
  bunchModal: boolean;
  showModalProof: boolean;
  esnGenratedModal: boolean;
  advanceModal: boolean;

};


export class Home extends Component<State> {

  state: State = {
    bunchModal: false,
    showModalProof: false,
    esnGenratedModal: false,
    advanceModal: false,
  };

  handleClose = () => {
    this.setState({
      bunchModal: false,
      showModalProof: false,
      esnGenratedModal: false,
    })
  }


  render() {
    return (
      <div>
        <div className="bridge-bgd">
          <div className="wrapper-container">
            <h1>Eraswap Token Bridge</h1>
            <h5 className="mrg-home">Transfer Tokens between Ethereum's Main network, and Eraswap network</h5>
            <div className="proceed-box-flex">
              <div className="inner-box">
                <div className="frst-link">
                  <Link to="/token-exchange" className="prcd-btn">Proceed to Token exchange</Link>
                </div>
                <button className="prcd-btn" onClick={() => this.setState({ bunchModal: true })}>Proceed to Bunch Submission</button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for proof */}

        <Modal show={this.state.bunchModal} onHide={this.handleClose} className="date-modal-container" >
          <Modal.Body >
            <div className="exchange-box-wht-modal">
              <div className="exchange-container">
                <p className="bunch-hd-txt">Submit ESN bunch and get rewards </p>
                <div className="bunch-btn-flex">
                  <div className="exc-btn-box">
                    <button className="bunch-btn" onClick={() => this.setState({ bunchModal: false })}>Default</button>
                  </div>
                  <div className="exc-btn-box">
                    <button className="bunch-btn" onClick={() => this.setState({ advanceModal: true })}>Advance</button>
                  </div>
                </div>
                <div className="exc-btn-box">
                  <button className="main-genBunch-btn">GENERATE BUNCH STRIVES</button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Bootstrap Generate Proof Modal */}
        <Modal show={this.state.showModalProof} onHide={this.handleClose} className="date-modal-container" >

          <Modal.Body >
            <div className="exchange-box-wht-modal">
              <div className="exchange-container">
                <h3 className="main-prf">YOUR ESN BUNCH DEPTH IS</h3>
                <h3 className="main-prf">GENERATED</h3>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text grey-color">Generating Proof</span>
                  </div>
                  <input type="text" className="form-control" />
                </div>
                <div className="exc-btn-box">
                  <button className="tr-pn-btn-modal" onClick={() => this.setState({ bunchModal: false, showModalProof: true })}>COPY AND PROCEED</button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Bootstrap Generate Proof Modal */}
        <Modal show={this.state.showModalProof} onHide={this.handleClose} className="date-modal-container" >

          <Modal.Body >
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
                  <button className="tr-pn-btn-modal" onClick={() => this.setState({ showModalProof: false, esnGenratedModal: true })}>COPY AND PROCEED</button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Bootstrap Esn bumch generated Modal */}
        <Modal show={this.state.esnGenratedModal} onHide={this.handleClose} className="date-modal-container" >
          <Modal.Body >
            <div className="exchange-box-wht-modal">
              <div className="exchange-container">
                <h3 className="main-prf"> GENERATE PROOF</h3>
                <h3 className="main-prf">Please wait proof is generating</h3>
                <div className="exc-btn-box">
                  <button className="submit-modal">Submit</button>
                </div>
                <div className="exc-btn-box">
                  <button className="submit-modal">Main Page</button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Bootstrap ESN bunch Advance Modal */}
        <Modal show={this.state.advanceModal} onHide={this.handleClose} className="date-modal-container" >
          <Modal.Body >
            <div className="exchange-box-wht-modal">
              <div className="exchange-container">
                <p className="bunch-hd-txt">Submit ESN bunch and get rewards </p>
                <div className="bunch-btn-flex">
                  <div className="exc-btn-box">
                    <button className="bunch-btn" >Default</button>
                  </div>
                  <div className="exc-btn-box">
                    <button className="bunch-btn">Advance</button>
                  </div>
                </div>
                <div className="bunch-dropdown-center">
                  {/* <Dropdown >
                    <Dropdown.Toggle  variant="light" id="dropdown-basic">
                   
                       </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item >1</Dropdown.Item>
                      <Dropdown.Item>2</Dropdown.Item>
                      <Dropdown.Item >3</Dropdown.Item>
                      <Dropdown.Item >4</Dropdown.Item>
                      <Dropdown.Item >5</Dropdown.Item>
                      <Dropdown.Item >6</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                  <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                      <Form.Label></Form.Label>
                      <Form.Control as="select" custom className="bunch-border">
                        <option>ENTER BUNCH DEPTHS</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </div>
                <div className="gen-bunch-center">
                  <Link className="bnch-link" to="">GENERATE BUNCH STRIVES</Link>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </div>

    );

  }
}
