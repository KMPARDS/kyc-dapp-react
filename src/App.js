import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


//Pages
import Homepage from './Container/Homepage/Index';
import Header from './Component/Header/Index';
import KycLevel from './Container/KycLevel/Index';
import MyDocument from './Container/MyDocument/Index';
import MyKyckey from './Container/Mykyckey/Index';
import Myaccount from './Container/Myaccount/Index';
import Kycpublicprivate from './Container/Kycpublicprivate/Index';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/" component={Header} />
          <Route exact path="/form" component={KycLevel} />
          <Route exact path="/MyDocument" component={MyDocument} />
          <Route exact path="/MyKyckey" component={MyKyckey} />
          <Route exact path="/Myaccount" component={Myaccount} />
          <Route exact path="/Kycpublicprivate" component={Kycpublicprivate} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
