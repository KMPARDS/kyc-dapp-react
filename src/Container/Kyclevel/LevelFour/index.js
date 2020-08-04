import React from 'react';
import { ethers } from 'ethers';
import { Col, Row } from 'react-bootstrap';
import User from '../../../models/User';
import  { PROVIDER, baseUrl } from '../../../config/config';
import Transfer from './transfer'; // component
import Axios from 'axios';
import { handleError } from '../../../utils/Apis';
import { UserContext } from '../../../utils/user.context';

export default class LevelFour extends React.Component {
  static contextType = UserContext;

  state = {
    balanceDisplay: '',
    showTransferComponent: null,
    pastTransfers: null, // { amount: ethers.BigNumber, txHash: string }[] | null
  };

  ADMIN_WALLET = '0x397Fa088Ff98ecdB5Ed0B9A2E3c0a8877B6279A6';
  routines = [];

  componentDidMount = () => {
    // User.setWallet(
    //   '0x24c4fe6063e62710ead956611b71825b778b041b18ed53118ce5da5f02e494ba'
    // );
try{
    this.startRoutine(this.updateBalance);
    this.startRoutine(this.loadPastTransfers);
    this.fetchKycLevelOne = this.fetchKycLevelOne.bind(this);
  this.fetchKycLevelOne();
} catch (e) {
  console.log(e);
}
  };

  fetchKycLevelOne = async () => {
    let resp = {};
    try{
      resp = await Axios.get(baseUrl + 'apis/kyc-level-one/', {
        headers: {
          Authorization: this.context?.user?.token,
        },
      });
    }catch(e){
      console.log(e);
      if(e.response) handleError(e);
    } finally {
      if (resp.data || this.context?.user?.data?.kycdappVerified)
        this.setState({ showTransferComponent: true });
    }
  }

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
    if (!this.context?.user?.token) {
      throw new Error(
        'Looks like you are not logged in. Please load your wallet again'
      );
    }

    console.log(
      'this.context?.user?.esInstance?.provider',
      this.context?.user?.esInstance?.provider
    );
    console.log(
      'this.context?.user?.walletAddress?',
      this.context?.user?.walletAddress
    );
    const balance = await this.context?.user?.esInstance?.balanceOf(
      this.context?.user?.walletAddress
    );

    this.setState({ balanceDisplay: ethers.utils.formatEther(balance) });
  };

  loadPastTransfers = async () => {
    if (!this.context?.user?.token) {
      throw new Error(
        'Looks like you are not logged in. Please load your wallet again'
      );
    }

    const filter = this.context?.user?.esInstance?.filters.Transfer(
      this.context?.user?.walletAddress,
      this.ADMIN_WALLET
    );

    const logs = await this.context?.user?.provider?.getLogs({
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
        <h4 className="m4-txt-level mb40 text-center">KYC STEP 4</h4>
        <span className="level-info" style={{color: 'darkblue',}}>

          1. In KYC Step 4, Transfer your Old Liquid ES ERC20 tokens to Admin Wallet (0x397Fa088Ff98ecdB5Ed0B9A2E3c0a8877B6279A6) by Clicking on 'Send' Button.<br></br>

            2.  Congratulations, your KYC Request has been submitted.<br></br>
        </span>
        <br></br>
        <br></br>
        {/* <div>
          {' '}
          <i
            className="fa fa-info-circle themecolor"
            data-toggle="modal"
            data-target=".kyclevel3"
          ></i>
        </div> */}
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
                  KYC Step 3 information
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
                  Your TimeAlly Stakings will be migrated automatically and you
                  do not need to perform any additional activity. Only ES Liquid
                  tokens are required to be transfered back to admin wallet for
                  migration. Please, send your Old ES Liquid to Admin Wallet
                  mentioned below before 21st Aug 2020:
                </h6>
                <div className="yourwallet ">
                  <h5 className="feature-head text-left">
                    Your Wallet Address
                  </h5>

                  <div className="wallet-address">
                    {this.context?.user?.walletAddress ??
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

                <div className="">
                  {this.state.showTransferComponent ? (
                    <button
                      className="btn"
                      disabled={!this.state.showTransferComponent}
                      onClick={async (event) => {
                        event.preventDefault();
                        this.setState({ showTransferComponent: false });
                      }}
                    >
                      Send Tokens to Admin
                    </button>
                  ) : this.state.showTransferComponent === false ? (
                    <Transfer
                      ADMIN_WALLET={this.ADMIN_WALLET}
                      balance={this.state.balanceDisplay}
                    />
                  ) : null}
                </div>
              </form>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  }
}
