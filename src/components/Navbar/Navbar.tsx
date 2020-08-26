import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export class NavbarMain extends Component {
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" >
            <Navbar.Brand href="/"><img className="asset-logo" src="./images/eralogo.png" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto ml10">
                {/* <Nav.Link href="#">About</Nav.Link>
                <Nav.Link href="#">FAQ</Nav.Link> */}
                <Nav.Link href="/transactions">Transactions </Nav.Link>
                {/* <NavDropdown title="Services" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Services</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Services action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Services</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Services</NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
             
              <Nav>
                <Nav.Link href="/esb-to-es" className=" pdr20 ">
                <img className="wallet-img" src="./images/tap.png" />  ESB to ES Na
                </Nav.Link>
               
               <Nav.Link className="btn btn-primary btn-color text-white" href="">
                <img className="wallet-img" src="./images/wallet-white.png" />
                  0xdb9e4bfe51b22lkjbn
              </Nav.Link> 
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        {/* <Navbar collapseOnSelect expand="lg" bg="white">
          <Navbar.Brand href="/">
            
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav.Link href="#deets">
                <img className="event-img" src="./images/plusevent.png" /> EVENT
              </Nav.Link>
              <Nav.Link href="#deets">
                <img className="stat-img" src="./images/bar-chart.png" />
                STATS
              </Nav.Link>
              <Nav.Link className="right-border" href="#deets">
                <img className="event-img" src="./images/stats.png" />
                STATISTICS
              </Nav.Link>
              <Nav.Link className="btn-border" href="#deets">
                <img className="wallet-img" src="./images/wallet.png" />
                Login with wallet
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar> */}
      </div>
    );
  }
}
