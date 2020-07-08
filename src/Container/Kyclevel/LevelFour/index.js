import React from 'react';
import { ethers } from 'ethers';
import { Col, Row } from 'react-bootstrap';
import User from '../../../models/User';

export default class LevelFour extends React.Component {
  state = {
    balanceDisplay: '',
    transfering: false,
  };

  ADMIN_WALLET = '0x397Fa088Ff98ecdB5Ed0B9A2E3c0a8877B6279A6';
  intervalId = null;

  componentDidMount = () => {
    this.intervalId = setInterval(async () => {
      try {
        await this.updateBalance();
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    }, 20000);
  };

  componentWillMount = () => {
    clearInterval(this.intervalId);
  };

  updateBalance = async () => {
    const balanceOf = User.getEsInstance()?.balanceOf;
    const walletAddress = User.getWallet()?.address;

    if (!walletAddress) {
      throw new Error(
        'There was problem accessing your wallet address. Please load wallet again'
      );
    }

    if (!balanceOf) {
      throw new Error('esInstance is not initiated');
    }

    const balance = await balanceOf(walletAddress);

    this.setState({ balanceDisplay: ethers.utils.formatEther(balance) });
  };

  render() {
    return (
      <div>
        <h4 className="m4-txt-level mb40 text-center">KYC Level 4</h4>
        <div>
          {' '}
          <i
            className="fa fa-info-circle themecolor"
            data-toggle="modal"
            data-target=".kyclevel3"
          ></i>
        </div>
        {/* <!-- info modall start here--> */}
        <div
          class="modal fade kyclevel3"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  KYC Level 3 information
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h6>KYC on Blockchain Network Done More Quickly & Securly</h6>
                <p>
                  KYC DApp is powered on a decentralised network of Era Swap.
                  There is no centralized authority to obstructions means
                  inbuilt immutably that makes contained data more trustworthy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- info modall end here--> */}
        <fieldset class="scheduler-border es-trasnferbox">
          <legend class="scheduler-border">Transfer Old Tokens</legend>
          <Row className="mt20">
            <Col sm={12} className="mx-auto ">
              <form>
                <h6>
                TimeAlly (1/2 Year) Stakings, PET and TSGAP will be migrated automatically and you do not need to
                 perform any additional activity. Only ES Liquid tokens are required to be transferd back to
                  admin wallet for migration. Please load your wallet and send ES Liquid to admin wallet mentioned below before 25th July 2020:
                </h6>
                <div className="yourwallet ">
                  <h5 className="feature-head text-left">
                    Your Wallet Address
                  </h5>

                  <div className="wallet-address">
                    {User.getWallet()?.address ??
                      'Error: please load your wallet'}
                  </div>
                  <div className="form-group mt20">
                    <label for="formGroupExampleInput">
                      Your Total old Token Liquid Balance{' '}
                      <small>(This is only Liquid Token Balance) </small>
                    </label>
                    <div className="tot-ammount">
                      {this.state.balanceDisplay
                        ? `${this.state.balanceDisplay} ES`
                        : 'Loading...'}
                    </div>
                  </div>
                </div>

                <h6>You have to send this old token to this admin wallet </h6>
                <div className="yourwallet ">
                  <h5 className="feature-head text-left">Admin Wallet</h5>
                  <div className="wallet-address">{this.ADMIN_WALLET}</div>
                </div>
                <div className="submit-btn-flex">
                  <button
                    className="submit-btn"
                    disabled={this.state.transfering}
                    onClick={async (event) => {
                      event.preventDefault();
                      this.setState({ transfering: true });
                      try {
                        const tx = await User.getEsInstance().transfer(
                          this.ADMIN_WALLET,
                          ethers.utils.parseEther(
                            // TODO: remove this when done
                            '1' || this.state.balanceDisplay
                          )
                        );
                        alert(`Your transaction is sent! Tx hash: ${tx.hash}`);
                      } catch (error) {
                        alert(error.message);
                      }
                      this.setState({ transfering: false });
                    }}
                  >
                    {this.state.transfering ? (
                      <>Transfering...</>
                    ) : (
                      <>Transfer Now</>
                    )}
                  </button>
                </div>
              </form>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  }
}
