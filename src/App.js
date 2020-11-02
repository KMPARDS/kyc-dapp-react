import React from 'react';
import './App.css';
import Modal from 'react-bootstrap/Modal';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ethers } from 'ethers';
import { browserHistory } from 'react-router';
import { addresses, CustomProvider, typechain } from 'eraswap-sdk';
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
import { dayswappersInst, providerESN, kycInst } from './ethereum';
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
  referalAddress = null;

  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
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
      showModal: false,
      referalAddressError: null,
      submitReferalMessage: null,
      seat: null,
      isReferalSubmitting: false
    };
  }

  componentDidMount() {
    // if (process.env.REACT_APP_NODE_ENV === 'development') {
    //   const wallet = new ethers.Wallet('0x26dfe99b98515fc4fd53a811b7db194afaaf6d4133aa371e7270b477bc086b07');

    //   this.setUserData({
    //     walletAddress: wallet.address,
    //     wallet: wallet,
    //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZhNDFkYTE4OTkyNTY1NjRkNWQ4OWUiLCJ1c2VybmFtZSI6IjB4MzBiYTI2MmI0ZTI1YThlN2FmMGM1MGE4M2JlNTk0YzQxZjE2NDc5ZCIsImVtYWlsIjoiIiwiaWF0IjoxNjAyNjA0MjQxLCJleHAiOjE2MzE0MDQyNDF9.AuhbGh-OMHdTD_IZOgEgPkj2GXx-73apakEJrw5ZCtU",
    //     data: {
    //       email: "",
    //       expiresIn: 28800000,
    //       kycdappVerified: true,
    //       mobile: "",
    //       profile: "5d6d1979c60ee56cf628aeb5",
    //       tsfpxe: 1602631620762,
    //       username: "0x30ba262b4e25a8e7af0c50a83be594c41f16479d",
    //       _id: "5d6a41da1899256564d5d89e",
    //     }
    //   });
    // }

  }

  async fetchAndSetUsername(){
    try{
      const username = await kycInst.resolveUsername(this.state.user.wallet.address);
      console.log({username});
      if(username?.length)
        this.setState({
          user: {
            ...this.state.user,
            username: ethers.utils.parseBytes32String(username)
          }
        });
    }catch(e){
      console.log(e);
    }
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
    },() => {
      this.fetchAndSetUsername();
      this.askForIntroducer();
    });
  }

  async askForIntroducer() {
    if (this.state.user?.wallet) {
      try {
        const seat = await this.fetchSeat();
        console.log({ seat });
        if (!seat) this.showModal();
      } catch (e) {
        console.log(e);
      }
    }
  }

  async fetchSeat() {
    try {
      const walletConn = this.state.user.wallet.connect(providerESN);
      const dayswappersWallet = dayswappersInst.connect(walletConn);
      const seat = (await dayswappersWallet.getSeatByAddressStrict(
        this.state.user.wallet.address
      ));
      this.setState({ seat: seat });
      return seat;
    } catch (e) {
      console.error({ 'fetchSeat': e });
      // this.setState({ submitReferalMessage: e.message })
    }
    return null;
  }

  async submitReferalAddress(address) {
    let message;
    try {
      console.log({message});
      const walletConn = this.state.user.wallet.connect(providerESN);
      const tx = await dayswappersInst.connect(walletConn).join(address);
      await tx.wait();
      // const resp = await dayswappersInst.connect(this.state?.wallet);
      this.submitReferalStatus = true;
      message = 'Success';
      this.fetchSeat();
      setTimeout(this.handleClose, 1000);

    } catch (e) {
      console.log(e);
      this.submitReferalStatus = false;
      message = e.message;
    } finally {
      this.setState({
        submitReferalMessage: message,
      });
    }
  }

  showModal() {
    this.setState({
      showModal: true,
    });
  }

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  }

  handleClick = (e) => {
    const name = e.target.name;
    this.setState({
      isReferalSubmitting: true
    }, async () => {
      switch (name) {
        case 'connectToIntroducer':
          if (!this.referalAddress?.length) {
            this.setState({ referalAddressError: 'Please Enter Introducer Address' });
            return null;
          } else {
            this.setState({ referalAddressError: null });
          }
          await this.submitReferalAddress(this.referalAddress);
          break;
        case 'noIntroducer':
          console.log('calling');
          await this.submitReferalAddress(ethers.constants.AddressZero);
          break;
        default:
          break;
      }
    this.setState({ isReferalSubmitting: false })
    });
  };

  render() {
    return (
      <div className="App">
        <UserContext.Provider value={{ user: this.state.user, setUserData: this.setUserData }}>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route
                // exact
                path="/form" component={Kyclevel} />
              <Route
                // exact
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

          <Modal
            show={this.state.showModal}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>
                <i className="fa fa-arrow-circle-right text-danger" aria-hidden="true"></i>Connect to
              Introducer
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center">
                <label>Please enter your Referal Address</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    this.referalAddress = e.target.value;
                  }}
                />
                <p>{this.state.referalAddressError}</p>
                <button
                  type="button"
                  className="btn btn-default btn-danger"
                  name="connectToIntroducer"
                  onClick={this.handleClick}
                  disabled={this.state.isReferalSubmitting}
                >
                  Connect to Introducer
              </button>
                <h3 className="mt10 mb10">Or</h3>
                <button
                  type="button"
                  className="btn btn-defaultc btn-dark mb10"
                  name="noIntroducer"
                  onClick={this.handleClick}
                  disabled={this.state.isReferalSubmitting}
                >
                  I do not have Referal
              </button>
              {this.state.isReferalSubmitting ? <><br></br><i className="fa fa-spinner fa-spin" style={{fontSize:'24px'}}></i></> : null}
                {this.state.submitReferalMessage?.length && (
                  <div
                    className={
                      this.submitReferalStatus ? 'alert alert-success' : 'alert alert-danger'
                    }
                  >
                    {this.state.submitReferalMessage}
                  </div>
                )}
                <p className="mt20">
                  Note : Referral ID is entered only once at the time of joining Era Swap Ecosystem.
                  If you donot enter the referral ID now, you won't be able to add it later on.
              </p>
              </div>
            </Modal.Body>
          </Modal>
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
