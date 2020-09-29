import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './containers/Home';
import { NavbarMain } from './components/Navbar';
import { TokenExchange } from './components/TokenExchange';
import { Transfer } from './components/Transfer';
import { EsbtoEs } from './components/EsbtoEs';
import { Transactions } from './components/Transactions';
import { BunchSubmission } from './containers/BunchSubmission';
import './App.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarMain />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/bunch-submission" exact component={BunchSubmission} />
          <Route path="/token-exchange" exact component={TokenExchange} />
          <Route path="/transfer" exact component={Transfer} />
          <Route path="/esb-to-es" exact component={EsbtoEs} />
          <Route path="/transactions" exact component={Transactions} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
