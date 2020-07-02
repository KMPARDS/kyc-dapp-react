import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ethers } from 'ethers';

//Pages
import Homepage from './Container/Homepage/Index';
import Header from './Component/Header/';
import Kyclevel from './Container/Kyclevel/';
import MyDocument from './Container/MyDocument/Index';
import MyKyckey from './Container/Mykyckey/Index';
import Myaccount from './Container/Myaccount/Index';
import Kycpublicprivate from './Container/Kycpublicprivate/';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Component/Footer/';

// TODO: remove after wallet load setup
window.wallet = new ethers.Wallet(
  '0x20466fa75ef4ec2e81ace4206e0d021a83befc8ebfc81a7598c51e73827991ba'
).connect(ethers.getDefaultProvider('kovan'));
window.esInstance = new ethers.Contract(
  '0x53e750ee41c562c171d65bcb51405b16a56cf676',
  require('./ethereum/ERC20.json').abi,
  window.wallet
);

function App() {
  return (
    <div className="App">

        <Router>
          <Header/>
          <Switch>
            <Route exact path="/" component={Homepage} />
            {/* <Route exact path="/" component={Header} /> */}
            <Route exact path="/form" component={Kyclevel} />
            {/* <Route exact path="/MyDocument" component={MyDocument} />
            <Route exact path="/MyKyckey" component={MyKyckey} />
            <Route exact path="/Myaccount" component={Myaccount} /> */}
            <Route exact path="/privacy" component={Kycpublicprivate} />
          </Switch>
        </Router>
        <Footer/>
      </div>
  );
}

export default App;
