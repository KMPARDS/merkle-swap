import React, { Component, useState } from 'react';
import './EsbtoEs.css';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { Form, Button } from 'react-bootstrap';
type State = {
  bunchModal: boolean;
};

export function EsbtoEs() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return (
    <div>
      <div className="bridge-bgd">
        <div className="wrapper-container">
          <div className="container">
            <div className="row  mt80">
              <div className="col-lg-8 text-left mt80">
                <h2 className="text-uppercase text-white font-weight-bold">
                  The most trustless way
                  <br />
                  to swap your tokens
                </h2>
                <div className="divider my-4"></div>
              </div>
              <div className="col-lg-4 text-left ">
                <h5 className="mrg-home text-left">
                  Convert ESB to ES Na
                  <br />
                  <small className="text-warning font-weight-bold">
                    Please load wallet first to Start transaction
                  </small>
                </h5>

                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="420 ESB" />
                  </Form.Group>
                  <div className="converticon">
                    <i className="fa fa-arrow-down" aria-hidden="true"></i>
                  </div>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="420 ES Na" />
                  </Form.Group>
                </Form>
                <Button
                  className="btn btn-primary btn-color btn-lg btn-block text-white"
                  onClick={handleShow}
                >
                  Swap Now
                </Button>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="text-center mt40 mb40">
          <div>
            <i className="fa fa-spinner fa-5x themetextcolor" aria-hidden="true"></i>
          </div>
          <h4 className="text-center mt20 mb20 font-weight-bold "> Conversion in Progress</h4>
          <p>
            <b>Note:</b> This is the one-way swap, once converted to ES Na, can`t be converted back
            to ESB
          </p>
          <Button
            className="btn btn-primary btn-color btn-lg text-white mt10"
            onClick={handleClose}
          >
            Done
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Body className="text-center mt40 mb40">
          <div>
            <i className="fa fa-spinner fa-5x themetextcolor" aria-hidden="true"></i>
          </div>
          <h4 className="text-center mt20 mb20 font-weight-bold ">
            {' '}
            Please load wallet first to Start transaction
          </h4>

          <Button
            className="btn btn-primary btn-color btn-lg text-white mt10"
            onClick={handleClose1}
          >
            Okay
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
