import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './containers/Home/Home';
import { NavbarMain } from './containers/Navbar/Navbar';
import { TokenExchange } from './containers/TokenExchange/TokenExchange';
import { Transfer } from './containers/Transfer/Transfer';
import { EsbtoEs } from './containers/EsbtoEs/EsbtoEs';
import { Transactions } from './containers/Transactions/Transactions';
import './App.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarMain />

        <Switch>
          <Route path="/" exact component={Home} />
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
