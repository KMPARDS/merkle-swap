import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { NavbarMain } from './components/Navbar/Navbar';
import { TokenExchange } from './components/TokenExchange/TokenExchange';
import { Transfer } from './components/Transfer/Transfer';
import { EsbtoEs } from './components/EsbtoEs/EsbtoEs';
import { Transactions } from './components/Transactions/Transactions';
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
