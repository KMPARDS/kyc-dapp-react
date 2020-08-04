import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ethers } from 'ethers';
import { browserHistory} from 'react-router';

//Pages
import Homepage from './Container/Homepage/Index';
import Header from './Component/Header/';
import Kyclevel from './Container/Kyclevel/';
import KycUserValidationLevel from './Container/KycUserValidationLevel/';
import Kycpublicprivate from './Container/Kycpublicprivate/';
import Conservator from './Container/Conservator/';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Component/Footer/';
import User from './models/User';
import NotFound from './Container/NotFound';
import MetamaskLogin from './Container/MetamaskLogin/MetamaskLogin';
import { UserContext } from './utils/user.context';
import { PROVIDER, CONTRACT_ADDRESS } from './config/config';
// TODO: remove after wallet load setup
// window.wallet = new ethers.Wallet(
//   '0x20466fa75ef4ec2e81ace4206e0d021a83befc8ebfc81a7598c51e73827991ba'
// ).connect(ethers.getDefaultProvider('kovan'));
// window.esInstance = new ethers.Contract(
//   '0x53e750ee41c562c171d65bcb51405b16a56cf676',
//   require('./ethereum/ERC20.json').abi,
//   window.wallet
// );


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        token: null,
        data: null,
        wallet: null,
        esInstance: null,
        walletAddress: null,
        provider: new ethers.providers.InfuraProvider(
          PROVIDER,
          '064069bca26c4a59aa2e449205b14862'
        ),
      },
    };
  }

  setUserData = data => {
    if (data?.wallet)
      data.esInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        require('./ethereum/ERC20.json').abi,
        data.wallet
      );
    this.setState({
      user: {
        ...this.state.user,
        ...data,
        provider: new ethers.providers.InfuraProvider(
          PROVIDER,
          '064069bca26c4a59aa2e449205b14862'
        ),
      },
    });
  }

  render() {
    return (
      <div className="App">
        <UserContext.Provider value={{ user: this.state.user, setUserData: this.setUserData }}>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/form" component={Kyclevel} />
              <Route
                exact
                path="/user-validation"
                component={KycUserValidationLevel}
              />
              <Route exact path="/privacy" component={Kycpublicprivate} />
              <Route exact path="/conservator" component={Conservator} />
              <Route exact path="/metamask" component={MetamaskLogin} />
              <Route path="" component={NotFound} />
            </Switch>
          </Router>
          <Footer />
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
