import React, { Component, useState } from 'react';
import './Transactions.css';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { Form, Button, Card, Tabs, Tab, Table, Col, } from 'react-bootstrap';
type State = {
  bunchModal: boolean;
};


export function Transactions () {
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
              <div className="row  mt40">
                <div className="col-lg-12 text-left ">
             
                   <div className=" text-center mt20 multiexchange-box">
                        <Tabs
                          defaultActiveKey="insta"
                          className="maintab"
                          id="uncontrolled-tab-example"
                        >
                          <Tab eventKey="insta" title="ESB TO ES Na">
                            <div className="tabcontent-box">
                                  <div className="table-responsive">
                                     <Table responsive="sm">
                                        <thead>
                                          <tr>
                                            <th>TRANSACTION ID</th>
                                            <th>WALLET ADDRESS</th>
                                            <th>AMOUNT</th>
                                            <th>TO</th>
                                            <th>REMAINING TIME</th>
                                            <th>ACTIONS</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>8ajzvo8upvt9uq6u</td>
                                            <td>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</td>
                                            <td>250 ES</td>
                                            <td>ESB to ES Na</td>
                                            <td>36:00:00</td>
                                            <td><a  className="text-success" onClick={handleShow}><small className="text-success font-weight-bold">VIEW TRANSACTIONS</small></a></td>
                                          </tr>
                                          <tr>
                                            <td>8ajzvo8upvt9uq6u</td>
                                            <td>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</td>
                                            <td>250 ES</td>
                                            <td>ESB to ES Na</td>
                                            <td>36:00:00</td>
                                            <td><a  className="text-success" onClick={handleShow}><small className="text-success font-weight-bold">VIEW TRANSACTIONS</small></a></td>
                                          </tr>
                                          <tr>
                                            <td>8ajzvo8upvt9uq6u</td>
                                            <td>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</td>
                                            <td>250 ES</td>
                                            <td>ESB to ES Na</td>
                                            <td>36:00:00</td>
                                            <td><a  className="text-success" onClick={handleShow}><small className="text-success font-weight-bold">VIEW TRANSACTIONS</small></a></td>
                                          </tr>
                                          <tr>
                                            <td>8ajzvo8upvt9uq6u</td>
                                            <td>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</td>
                                            <td>250 ES</td>
                                            <td>ESB to ES Na</td>
                                            <td>36:00:00</td>
                                            <td><a  className="text-success" onClick={handleShow}><small className="text-success font-weight-bold">VIEW TRANSACTIONS</small></a></td>
                                          </tr>
                                          <tr>
                                            <td>8ajzvo8upvt9uq6u</td>
                                            <td>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</td>
                                            <td>250 ES</td>
                                            <td>ESB to ES Na</td>
                                            <td>36:00:00</td>
                                            <td><a  className="text-success" onClick={handleShow}><small className="text-success font-weight-bold">VIEW TRANSACTIONS</small></a></td>
                                          </tr>
                                         
                                        </tbody>
                                      </Table>
                                  </div>
                            
                            </div>
                          </Tab>
                          <Tab eventKey="bid" title="ES TO ES Na">
                          <div className="tabcontent-box">
                                  <div className="table-responsive">
                                     <Table responsive="sm">
                                        <thead>
                                          <tr>
                                            <th>TRANSACTION ID</th>
                                            <th>WALLET ADDRESS</th>
                                            <th>AMOUNT</th>
                                            <th>TO</th>
                                            <th>REMAINING TIME</th>
                                            <th>ACTIONS</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>8ajzvo8upvt9uq6u</td>
                                            <td>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</td>
                                            <td>250 ES</td>
                                            <td>ESB to ES Na</td>
                                            <td>36:00:00</td>
                                            <td><a  className="text-success" onClick={handleShow}><small className="text-success font-weight-bold">VIEW TRANSACTIONS</small></a></td>
                                          </tr>
                                          <tr>
                                            <td>8ajzvo8upvt9uq6u</td>
                                            <td>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</td>
                                            <td>250 ES</td>
                                            <td>ESB to ES Na</td>
                                            <td>36:00:00</td>
                                            <td><a  className="text-success" onClick={handleShow}><small className="text-success font-weight-bold">VIEW TRANSACTIONS</small></a></td>
                                          </tr>
                                          <tr>
                                            <td>8ajzvo8upvt9uq6u</td>
                                            <td>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</td>
                                            <td>250 ES</td>
                                            <td>ESB to ES Na</td>
                                            <td>36:00:00</td>
                                            <td><a  className="text-success" onClick={handleShow}><small className="text-success font-weight-bold">VIEW TRANSACTIONS</small></a></td>
                                          </tr>
                                          <tr>
                                            <td>8ajzvo8upvt9uq6u</td>
                                            <td>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</td>
                                            <td>250 ES</td>
                                            <td>ESB to ES Na</td>
                                            <td>36:00:00</td>
                                            <td><a  className="text-success" onClick={handleShow}><small className="text-success font-weight-bold">VIEW TRANSACTIONS</small></a></td>
                                          </tr>
                                          <tr>
                                            <td>8ajzvo8upvt9uq6u</td>
                                            <td>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</td>
                                            <td>250 ES</td>
                                            <td>ESB to ES Na</td>
                                            <td>36:00:00</td>
                                            <td><a  className="text-success" onClick={handleShow}><small className="text-success font-weight-bold">VIEW TRANSACTIONS</small></a></td>
                                          </tr>
                                         
                                        </tbody>
                                      </Table>
                                  </div>
                            
                            </div>
                          </Tab>
                        </Tabs>
                      </div>




                  <div className="divider my-4"></div>
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
              <div><i className="fa fa-check fa-5x themetextcolor" aria-hidden="true"></i></div>
              <h4 className="text-center mt20 mb20 font-weight-bold ">Conversion Successful</h4>
              <p><b>Note:</b> Token Conversion is Successful</p>
              <Button className="btn btn-primary btn-color btn-lg text-white mt10" onClick={handleClose}>
                     Done
                  </Button>
            </Modal.Body>
            
          </Modal>

        
      </div>
    );
  
}
