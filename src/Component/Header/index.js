import React, { Component } from 'react';
import './Header.css';
import { Link, withRouter } from 'react-router-dom';
import Images from '../../Container/Images/Images';
import { baseUrl } from '../../config/config';
import { ethers } from 'ethers';
import Axios from 'axios';
import { UserContext } from '../../utils/user.context';

const instance = Axios.create({
  withCredentials: true,
});

const $ = '$' in window && window.$;

class Header extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  componentDidMount() {
    try {
      window.onload = function () {
        window.opener && window.opener.postMessage('loaded', '*');
      };
    } catch (e) {
      console.log(e);
    }

    window.addEventListener(
      'message',
      (e) => {
        this.login(e.data);
      },
      false
    );
  }

  openEraswap() {
    window.open('https://eraswap.life/', '', 'width=1003,height=650');
  }

  closeAllModals() {
    try {
      const modals = document.getElementsByClassName('modal');
      console.log('modals', modals);
      for (let i = 0; i < modals.length; i++) {
        const modal = modals[i];
        $(modal).modal('hide');
      }
    } catch (e) {
      console.log(e);
    }
  }

  login(message) {
    let countOfSession = 0,
      signature = '';
    if (message.substring) {
      if (message.substring(0, 2) === '0x') {
        const wallet = new ethers.Wallet(message).connect(
          this.context?.user?.provider
        );

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
            .then(async (resp) => {
              // console.log(resp);
              if (resp.data) token = resp.data.token;
              if (typeof token !== undefined || token !== '') {
                signature = wallet.signMessage(token);
                const walletAddress = await wallet.getAddress();
                signature
                  .then((value) => {
                    instance
                      .post(
                        baseUrl + 'login-auth',
                        {
                          walletAddress: wallet.address,
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
                          wallet,
                          token: resp.data.token,
                          data: resp.data.user,
                        });
                        this.closeAllModals();
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
      }
    }
  }

  render() {
    console.log('this.context?.user?.wallet?.address', this.context);
    return (
      <div className="header-bgd-color" id="home">
        <nav class="mb-1 navbar navbar-expand-lg navbar-dark info-color">
          <Link class="navbar-brand" to="/">
            {' '}
            <img className="kycdapp-Img" src={Images.path.kycdapp} alt="" />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-4"
            aria-controls="navbarSupportedContent-4"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <button
                  class="nav-link bgd-color-nav connect-btn"
                  data-toggle="modal"
                  data-target=".kyc-benifits"
                >
                  KYC Charges & Benefits
                  <span class="sr-only">(current)</span>
                </button>
              </li>
              {this.context?.user?.walletAddress ? (
                <li class="nav-item dropdown">
                  <button
                    class="nav-link dropdown-toggle bgd-color-nav profile-btn hash-text"
                    id="navbarDropdownMenuLink-4"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img className="" src={Images.path.kycdapp} alt="" />{' '}
                    {this.context?.user?.walletAddress}
                    <span class="sr-only">(current)</span>
                  </button>
                  <div
                    class="dropdown-menu dropdown-menu-right dropdown-info com-drop-btn"
                    aria-labelledby="navbarDropdownMenuLink-4"
                  >
                    {/* <Link class="dropdown-item" to="/Myaccount"><img className="drop-img-kyc" src={Images.path.op1}/> My Account</Link>
              <Link class="dropdown-item" to="/MyDocument"><img className="drop-img-kyc" src={Images.path.op2}/> My Documents</Link> */}
                    <Link class="dropdown-item" to="/form">
                      {/* <img
                        className="drop-img-kyc"
                        src={Images.path.op8}
                        alt=""
                      /> */}
                      KYC For Migration to ESN PoS{' '}
                    </Link>
                    {/* <Link class="dropdown-item" to="/"><img className="drop-img-kyc" src={Images.path.op5} alt=''/> KYC Status</Link>
              <Link class="dropdown-item" to="/MyKyckey"><img className="drop-img-kyc" src={Images.path.op6} alt=''/> My KYC key</Link> */}
                    <Link class="dropdown-item" to="/user-validation">
                      {/* <img
                        className="drop-img-kyc"
                        src={Images.path.op4}
                        alt=""
                      />{' '} */}
                      KYC Levels (Level 1 to Level 5){' '}
                    </Link>
                    {/* <Link class="dropdown-item" to="/"><img className="drop-img-kyc" src={Images.path.op3} alt=''/> Express KYC </Link> */}
                    {/* <Link class="dropdown-item" to="/conservator">
                      <img
                        className="drop-img-kyc"
                        src={Images.path.op7}
                        alt=""
                      />{' '}
                      Become a Conservator
                    </Link> */}
                    <a href="/" class="dropdown-item">
                      {/* <i className="fa fa-power-off drop-img-kyc"></i> */}
                      Logout
                    </a>
                  </div>
                </li>
              ) : (
                <li class="nav-item active">
                  <button
                    class="nav-link bgd-color-nav connect-btn"
                    data-toggle="modal"
                    data-target=".kyclevel2"
                  >
                    Start Your KYC
                    <span class="sr-only">(current)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <div
          class="modal fade kyc-benifits instructions"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  KYC Charges & Benefits
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
                <div class="table-responsive">
                  <table class="table  table-bordered table-striped comtable">
                    <thead>
                      <tr>
                        <th scope="col">KYC Benefits </th>
                        <th scope="col">KYC Charge (ES) </th>

                        <th scope="col">Applicant Benefit (Staked ES)</th>
                        <th scope="col">
                          Introducer Incentive (50% Stake & 50% ES)
                        </th>
                        <th scope="col">
                          Incentive to User’s Day Swappers Tree (50% Stake & 50%
                          ES)
                        </th>
                        <th scope="col">Curators (50% Stake & 50% ES)</th>
                        <th scope="col">Tagya (50% Stake & 50% ES)</th>
                        <th scope="col">Burning (ES)</th>
                        <th scope="col">Charity (ES)</th>
                        <th scope="col">Total Benefits (ES)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">% BreakUp</th>
                        <td>100%</td>

                        <td> 100.00%</td>
                        <td> 20.00% </td>
                        <td> 20.00% </td>
                        <td> 20.00% </td>
                        <td> 20.00% </td>
                        <td> 10.00% </td>
                        <td> 10.00% </td>
                        <td> 200.00%</td>
                      </tr>
                      <tr>
                        <th scope="row">Level 1 KYC - Identity</th>
                        <td>31.50</td>

                        <td>31.50</td>
                        <td>6.30</td>
                        <td>6.30</td>
                        <td>6.30</td>
                        <td>6.30</td>
                        <td>3.15</td>
                        <td>3.15</td>
                        <td>63.30</td>
                      </tr>
                      <tr>
                        <th scope="row">Level 2 KYC - Skill / Business </th>
                        <td>63</td>

                        <td>63</td>
                        <td>12.60</td>
                        <td>12.60</td>
                        <td>12.60</td>
                        <td>12.60</td>
                        <td>6.3</td>
                        <td>6.3</td>
                        <td>126.00</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          Level 3 KYC - Experience / Recommendation
                        </th>
                        <td>94.5</td>

                        <td>94.5</td>
                        <td>18.90</td>
                        <td>18.90</td>
                        <td>18.90</td>
                        <td>18.90</td>
                        <td>9.45</td>
                        <td>9.45</td>
                        <td>189.00</td>
                      </tr>
                      <tr>
                        <th scope="row">Level 4 KYC - FOS Tagya Validation</th>
                        <td>315</td>

                        <td>315</td>
                        <td>63.00</td>
                        <td>63.00</td>
                        <td>63.00</td>
                        <td>63.00</td>
                        <td>31.5</td>
                        <td>31.5</td>
                        <td>630.00</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          Level 5 KYC - Online Curator Validation
                        </th>
                        <td>5000</td>

                        <td>5000</td>
                        <td>1000.00</td>
                        <td>1000.00</td>
                        <td>1000.00</td>
                        <td>1000.00</td>
                        <td>500 </td>
                        <td>500 </td>
                        <td>10000.00 </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="mt20">
                  <ul className="comlistui">
                    <li> All KYC charges shall be in Liquid ES Only </li>
                    <li> KYC charges shall reduce by 10% every NRT Year </li>
                    <li>
                      {' '}
                      Applicant Stked Top-up shall be provided from New Talents
                      and Partnerships (3% NRT){' '}
                    </li>
                    <li>
                      {' '}
                      Incentive to Introducers shall be provided from TimeAlly
                      Club Bucket (10% NRT){' '}
                    </li>
                    <li>
                      {' '}
                      Incentive to Users Day Swappers tree shall be provided
                      from Day Swappers Tree Bucket (10% NRT){' '}
                    </li>
                    <li>
                      {' '}
                      Incentive to Curators and Tagya shall be provided from
                      Maintenance and Support (5% NRT){' '}
                    </li>
                    <li>
                      {' '}
                      Ecosystem Reward shall be provided only if KYC approved on
                      KYC DApp{' '}
                    </li>
                    <li>
                      {' '}
                      Staked Rewards shall only be applicable for top-up in 1 LT
                      and shall not be further incentivised{' '}
                    </li>
                    <li>
                      {' '}
                      Curator rewards shall be distributed equally to All
                      curators who have participated in KYC decision{' '}
                    </li>
                    <li>
                      {' '}
                      Certified and Verified KYC is applicable for the seller of
                      following 12 platforms: TimeSwappers, Buzcafe, VoF,
                      PoolinDApp, RentingDApp, BookingDApp, CureDApp, CertiDApp,
                      Era Swap Academy, Faith Minus, Requestor, Date Swappers.{' '}
                    </li>
                    <li>
                      {' '}
                      Tagya Verified KYC is applicable for : Buzcafe, VoF,
                      PoolinDApp, BookingDApp, RentingDApp, CureDApp, CertiDApp{' '}
                    </li>
                    <li>
                      {' '}
                      The user will be disapproved/ banned permanently if any
                      individual or Business gets involved in any form of
                      illicit, malicious or unlawful activities
                    </li>
                  </ul>
                </div>
                {this.context?.user?.walletAddress ? null : (
                  <div className="col-md-12 text-center">
                    <button
                      class="btn bgd-color mr-2 mb10"
                      onClick={(e) => {
                        window.open(
                          'https://eraswap.life/',
                          '',
                          'width=1003,height=650'
                        );
                      }}
                    >
                      Proceed (using Eraswap life)
                      <span class="sr-only">(current)</span>
                    </button>
                    <button
                      class="btn bgd-color mr-2 mb10"
                      onClick={(e) => {
                        this.props.history.push('/metamask');
                        this.closeAllModals();
                      }}
                    >
                      Connect with Metamask
                      <span class="sr-only">(current)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- info modall start here--> */}
        <div
          class="modal fade kyclevel2 instructions"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Instructions for KYC
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
                <h6>
                  Once you have clicked on ‘Start your KYC’, just read and
                  follow the following simple steps and click on ‘Proceed’
                  button to complete your KYC to migrate to Era Swap Network
                  (ESN) or for Level 1 to Level 5 KYC for Multiple Platforms of
                  ESE.
                </h6>
                <ul className="comlistui">
                  <li>
                    {' '}
                    Once you click on ‘Proceed’ button at the bottom of this
                    Pop-Up Message, a Tab of{' '}
                    <a
                      href=""
                      onClick={(e) => {
                        window.open(
                          'https://eraswap.life/',
                          '',
                          'width=1003,height=650'
                        );
                      }}
                      target="_blank"
                    >
                      {' '}
                      https://eraswap.life/{' '}
                    </a>
                    opens on your screen to Load your Wallet
                  </li>
                  <li>
                    {' '}
                    Load your Wallet through{' '}
                    <a
                      href=""
                      onClick={(e) => {
                        window.open(
                          'https://eraswap.life/',
                          '',
                          'width=1003,height=650'
                        );
                      }}
                      target="_blank"
                    >
                      https://eraswap.life/
                    </a>
                  </li>
                  <li>
                    {' '}
                    Click on Your Wallet Address on the Top Right of your screen
                    and then click on ‘KYC For Migration to ESN PoS’.
                  </li>
                  <li>
                    {' '}
                    Here we are explaning the steps below to migrate to ESN PoS.
                    You can also do KYC from Level 1 to Level 5 bye clicking on
                    'KYC Levels (Level 1 to Level 5)'.{' '}
                  </li>
                  <li>
                    {' '}
                    Since you have clicked on ‘KYC For Migration to ESN PoS’,
                    Now you are on KYC Step 1. Fill up your required KYC Details
                    and upload documents. Then click on 'Submit'. After that
                    click on 'Next' to go to Step 2 In KYC Step 2, select
                    specific Era Swap Ecosystem Platform by clicking on the
                    platform logo, you need to do KYC for. Fill up platform
                    specific details required and click on ‘Submit’. Then click
                    on ‘Next’ to go to Step 3
                  </li>
                  <li>
                    {' '}
                    You can also skip Step 2 for now by clicking on ‘Next’
                    Button but please remember that you have to complete Step 2
                    KYC to be eligible to use Era Swap Platforms as Verified
                    User in future.
                  </li>
                  <li>
                    {' '}
                    In KYC Step 3, Click on ‘Sign this Message' to finish your
                    KYC process You will get a Pop-up message for your
                    confirmation ‘Are you sure to sign message?’
                  </li>
                  <li> Click on ‘Yes, Sign it!’</li>
                  <li>
                    {' '}
                    A successful submission Pop-Up message will appear ‘You have
                    successfully signed the message’
                  </li>
                  <li>
                    {' '}
                    In KYC Step 4, Transfer Old Liquid ES ERC20 tokens to Admin
                    Wallet by Clicking on 'Send' Button.
                  </li>
                  <li>
                    You will get a Pop-up message 'Your old Liquid ES sent on
                    Admin Wallet'
                  </li>
                  <li>
                    {' '}
                    Congratulations, your KYC Request has been submitted.
                  </li>
                </ul>
                {this.context?.user?.walletAddress ? null : (
                  <div className="col-md-12 text-center">
                    <button
                      class="btn bgd-color mr-2 mb10"
                      onClick={(e) => {
                        window.open(
                          'https://eraswap.life/',
                          '',
                          'width=1003,height=650'
                        );
                      }}
                    >
                      Proceed (using Eraswap Life)
                      <span class="sr-only">(current)</span>
                    </button>
                    <button
                      class="btn bgd-color mr-2 mb10"
                      onClick={(e) => {
                        this.props.history.push('/metamask');
                        this.closeAllModals();
                      }}
                    >
                      Connect with Metamask
                      <span class="sr-only">(current)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- info modall end here--> */}
      </div>
    );
  }
}

export default withRouter(Header);
