import React, { Component } from 'react';
import Images from '../../Container/Images/Images';
import { Col, Button, Container, Row, Card } from 'react-bootstrap';
import { PROVIDER } from '../../config/config';
import { ethers } from 'ethers';
import Axios from 'axios';
import User from '../../models/User';
import { baseUrl } from '../../config/config';
import { UserContext } from '../../utils/user.context';
import { withRouter } from 'react-router-dom';

const instance = Axios.create({
  withCredentials: true,
});

class MetamaskLogin extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      displayText: '',
    };
  }

  componentDidMount = async () => {
    console.log('this.context', this.context);
    let countOfSession = 0,
      signature = '';
    this.setState({ displayText: 'Please wait connecting to metamask...' });
    if (window.ethereum) {
      await window.ethereum.enable();
      console.log(window.web3.currentProvider);

      const onCorrectNetwork =
        window.web3.currentProvider.networkVersion ===
        (PROVIDER === 'homestead' ? '1' : '42');
      console.log('onCorrectNetwork', onCorrectNetwork);
      if (!onCorrectNetwork) {
        this.setState({
          displayText: `You are on different network in MetaMask. Please select ${
            PROVIDER === 'homestead' ? 'Mainnet' : PROVIDER
          }`,
        });
      } else {
        const metamaskWeb3Provider = new ethers.providers.Web3Provider(
          window.web3.currentProvider
        );

        setTimeout(async () => {
          this.setState({
            displayText: `Connected to Metamask!`,
          });
          window.connectedToMetamask = true;

          // User.setWalletInstance(metamaskWeb3Provider.getSigner());
          // this.context.user.setWalletInstance(metamaskWeb3Provider.getSigner());
          // this.context.setUserData({
          //   wallet: metamaskWeb3Provider.getSigner(),
          // });
          // console.log('User.getWallet()', User.getWallet());

          var token;
          if (countOfSession === 0) {
            countOfSession++;
            instance
              .get(
                baseUrl + 'get-token',
                {},
                {
                  headers: {
                    Authorization: true,
                  },
                }
              )
              .then((resp) => {
                console.log(resp);
                if (resp.data) token = resp.data.token;
                if (typeof token !== undefined || token !== '') {
                  signature = metamaskWeb3Provider
                    .getSigner()
                    .signMessage(token);
                  signature
                    .then(async (value) => {
                      const walletAddress = await metamaskWeb3Provider.getSigner().getAddress();
                      instance
                        .post(
                          baseUrl + 'login-auth',
                          {
                            walletAddress,
                            signature: value,
                            key: resp.data.key,
                          },
                          {
                            headers: {
                              Authorization: true,
                            },
                          }
                        )
                        .then((resp) => {
                          console.log(resp);
                          this.context.setUserData({
                            walletAddress,
                            wallet: metamaskWeb3Provider.getSigner(),
                            token: resp.data.token,
                            data: resp.data.user,
                          });
                          this.props.history.push('/');
                          // User.setToken(resp.data.token);
                          // User.setData(resp.data.user);
                          // this.setState({
                          //   token: resp.data.token,
                          // });
                          // this.closeAllModals();
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                } else {
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }, 300);
      }
    } else {
      this.setState({
        displayText:
          'Metamask is not found. If you have Metamask installed, you can try updating it. EIP 1102 proposed a communication protocol between dApps and Ethereum-enabled DOM environments like Metamask.',
      });
    }
  };

  render() {
    return (
      <div className="blankpage">
        <div className="Kyclevel-container">


          <Container>
            <div className="space text-center">
              <h2 className="kyc-heading mt40">Using  <span class="red-color-txt">Metamask</span> to login</h2>
                <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto mt40 mb40">
                <p>*If login fails, try to refresh page and sign again</p>
                  <p>{this.state.displayText}</p>
                  {this.state.displayText.slice(0, 9) === 'Connected' &&
                  window.returnLocationAfterLoadWallet ? (
                    <Button
                      onClick={() => {
                        this.props.history.push(
                          window.returnLocationAfterLoadWallet &&
                            window.returnLocationAfterLoadWallet.location
                        );
                        window.returnLocationAfterLoadWallet = null;
                      }}
                    >
                      Click here to proceed to:{' '}
                      {window.returnLocationAfterLoadWallet &&
                        window.returnLocationAfterLoadWallet.name}
                    </Button>
                  ) : null}
                  </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default withRouter(MetamaskLogin);
