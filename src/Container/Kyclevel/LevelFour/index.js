import React from 'react';
import { ethers } from 'ethers';
import { Col, Row } from 'react-bootstrap';
import User from '../../../models/User';
import { PROVIDER } from '../../../config/config';
import Transfer from './transfer'; // component

export default class LevelFour extends React.Component {
  state = {
    balanceDisplay: '',
    showTransferComponent: false,
    pastTransfers: null, // { amount: ethers.BigNumber, txHash: string }[] | null
  };

  ADMIN_WALLET = '0x397Fa088Ff98ecdB5Ed0B9A2E3c0a8877B6279A6';
  routines = [];

  componentDidMount = () => {
    User.setWallet(
      '0x24c4fe6063e62710ead956611b71825b778b041b18ed53118ce5da5f02e494ba'
    );

    this.startRoutine(this.updateBalance);
    this.startRoutine(this.loadPastTransfers);
  };

  startRoutine = async (fn) => {
    const run = async () => {
      try {
        await fn();
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };
    run();
    const intervalId = setInterval(run, 20000);
    this.routines.push(intervalId);
  };

  stopRoutines = () => {
    this.routines.forEach(clearInterval);
  };

  componentWillMount = () => {
    this.stopRoutines();
  };

  updateBalance = async () => {
    if (!User.isLoggedIn()) {
      throw new Error(
        'Looks like you are not logged in. Please load your wallet again'
      );
    }

    const balance = await User.getEsInstance().balanceOf(
      User.getWallet().address
    );

    this.setState({ balanceDisplay: ethers.utils.formatEther(balance) });
  };

  loadPastTransfers = async () => {
    if (!User.isLoggedIn()) {
      throw new Error(
        'Looks like you are not logged in. Please load your wallet again'
      );
    }

    const filter = User.getEsInstance().filters.Transfer(
      User.getWallet().address,
      this.ADMIN_WALLET
    );

    const logs = await User.getProvider().getLogs({
      ...filter,
      fromBlock: 0,
      toBlock: 'latest',
    });

    const pastTransfers = logs.map((log) => {
      return {
        amount: ethers.BigNumber.from(log.data),
        txHash: log.transactionHash,
      };
    });

    this.setState({ pastTransfers });
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
                  TimeAlly (1/2 Year) Stakings, PET and TSGAP will be migrated
                  automatically and you do not need to perform any additional
                  activity. Only ES Liquid tokens are required to be transfered
                  back to admin wallet for migration. Please load your wallet
                  and send ES Liquid to admin wallet mentioned below before 25th
                  July 2020:
                </h6>
                <div className="yourwallet ">
                  <h5 className="feature-head text-left">
                    Your Wallet Address
                  </h5>

                  <div className="wallet-address">
                    {User.getWallet()?.address ??
                      'Error: please load your wallet'}
                  </div>

                  <div>
                    <h3>Past Transfers</h3>
                    {this.state.pastTransfers === null ? (
                      <>Please wait loading...</>
                    ) : (
                      <>
                        {this.state.pastTransfers.length ? (
                          <>
                            {this.state.pastTransfers.map((pastTransfer) => {
                              const etherscanUrl = `https://${
                                PROVIDER !== 'homestead' ? `${PROVIDER}.` : ''
                              }etherscan.io/tx/${pastTransfer.txHash}`;

                              return (
                                <div>
                                  Amount Transferred:{' '}
                                  {ethers.utils.formatEther(
                                    pastTransfer.amount
                                  )}{' '}
                                  ES (
                                  <a href={etherscanUrl} target="_blank">
                                    View on EtherScan
                                  </a>
                                  )
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <>There are past transfers for KYC</>
                        )}
                      </>
                    )}
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

                <h6>
                  You have to send this old token to this admin wallet, you can
                  send via any application like ES Life or 1DAPP or
                  MyEtherWallet.
                </h6>
                <div className="yourwallet ">
                  <h5 className="feature-head text-left">Admin Wallet</h5>
                  <div className="wallet-address">{this.ADMIN_WALLET}</div>
                </div>

                <div className="submit-btn-flex">
                  {!this.state.showTransferComponent ? (
                    <button
                      className="submit-btn"
                      disabled={this.state.showTransferComponent}
                      onClick={async (event) => {
                        event.preventDefault();
                        this.setState({ showTransferComponent: true });
                      }}
                    >
                      Send Tokens to Admin
                    </button>
                  ) : (
                    <Transfer
                      ADMIN_WALLET={this.ADMIN_WALLET}
                      balance={this.state.balanceDisplay}
                    />
                  )}
                </div>
              </form>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  }
}
