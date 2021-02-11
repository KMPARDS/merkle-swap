import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { routine } from 'eraswap-sdk/dist/utils';

type State = {
  walletAddress: string | null;
};

export class NavbarMain extends Component<{}, State> {
  state: State = {
    walletAddress: null,
  };

  intervalIds: NodeJS.Timeout[] = [];

  componentDidMount = async () => {
    this.intervalIds.push(routine(this.updateWalletStatus, 500));
  };

  componentWillUnmount = () => {
    this.intervalIds.forEach(clearInterval);
  };

  updateWalletStatus = async () => {
    const isWalletLoaded = !!window.wallet;

    const currentWalletAddress: string | null = window.wallet
      ? (await window.wallet?.getAddress()) ?? window.wallet.address
      : null;

    if (currentWalletAddress !== this.state.walletAddress) {
      this.setState({ walletAddress: currentWalletAddress });
    }
  };

  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
          <Navbar.Brand>
            <Link to="/">
              <img className="asset-logo" src="./images/eralogo.png" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto ml10">
              {/* <Nav.Link href="#">About</Nav.Link>
                <Nav.Link href="#">FAQ</Nav.Link> */}
              {/* <Link to="/transactions">Transactions </Link> */}
              <a href="https://eraswap.info/layerbridge" target="_blank">
                Transactions
              </a>
              {/* <NavDropdown title="Services" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Services</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Services action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Services</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Services</NavDropdown.Item>
                </NavDropdown> */}
            </Nav>

            <Nav>
              <Link to="/load-wallet" className="btn btn-primary btn-color text-white">
                <img className="wallet-img" src="./images/wallet-white.png" />
                {this.state.walletAddress ?? 'Load Wallet'}
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
