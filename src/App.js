import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


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
