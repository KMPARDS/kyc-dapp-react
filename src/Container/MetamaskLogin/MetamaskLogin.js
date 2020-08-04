import React, { Component } from 'react';
import Images from '../../Container/Images/Images';
import { Col, Button, Container, Row, Card } from 'react-bootstrap';
import { PROVIDER } from '../../config/config';
import { ethers } from 'ethers';
import Axios from 'axios';
import User from '../../models/User';
import { baseUrl } from '../../config/config';
import { UserContext } from '../../utils/user.context';

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
        console.log(
          'metamaskWeb3Provider.getSigner()',
          metamaskWeb3Provider.getSigner()
        );

        setTimeout(async () => {
          this.setState({
            displayText: `Connected to Metamask!`,
          });
          window.connectedToMetamask = true;

          // User.setWalletInstance(metamaskWeb3Provider.getSigner());
          // this.context.user.setWalletInstance(metamaskWeb3Provider.getSigner());
          this.context.setUserData({
            wallet: metamaskWeb3Provider.getSigner(),
          });
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
                    .then((value) => {
                      instance
                        .post(
                          baseUrl + 'login-auth',
                          {
                            walletAddress: metamaskWeb3Provider.getSigner().getAddress(),
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
                            token: resp.data.token,
                            user: resp.data.user,
                          });
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
      <div>
        <div className="kyc-header-color">
          <img className="kycdapp-Img" src={Images.path.kycdapp} alt="" />
        </div>
        <div className="Kyclevel-container">
          <h4 className="kyc-heading">KYC Level</h4>

          <Container>
            <Card>
              <h3>Using Metamask to login</h3>
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
            </Card>
          </Container>
        </div>
      </div>
    );
  }
}

export default MetamaskLogin;
