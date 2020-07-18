import React, { Component } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import Images from '../../Container/Images/Images';
import User from '../../models/User';
import { baseUrl } from "../../config/config";
import { ethers } from 'ethers';
import Axios from "axios";

const instance = Axios.create({
  withCredentials: true
})

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
  }

  componentDidMount() {
    this.setState({
      token : User.getToken()
    });

    window.addEventListener('message', (e) => {
      this.login(e.data);
    }, false);
  }

  openEraswap() {
    window.open("https://eraswap.life/", "", "width=1003,height=650");
  }

  closeAllModals() {

    // get modals
    const modals = document.getElementsByClassName('modal');

    // on every modal change state like in hidden modal
    for(let i=0; i<modals.length; i++) {
      modals[i].classList.remove('show');
      modals[i].setAttribute('aria-hidden', 'true');
      modals[i].setAttribute('style', 'display: none');
    }

     // get modal backdrops
     const modalsBackdrops = document.getElementsByClassName('modal-backdrop');

     // remove every modal backdrop
     for(let i=0; i<modalsBackdrops.length; i++) {
       document.body.removeChild(modalsBackdrops[i]);
     }
  }

  login(message) {
    let countOfSession = 0, signature = '';
    if (message.substring) {
      if (message.substring(0, 2) === "0x") {
        User.setWallet(message);

        var token;
        if (countOfSession === 0) {
          countOfSession++;
          instance.get(baseUrl + 'getToken', {}, {
            headers: {
              Authorization: true
            }
          })
            .then((resp) => {
              // console.log(resp);
              token = resp.data;
              if (typeof token !== undefined || token !== '') {
                signature = User.getWallet().signMessage(token);
                signature.then((value) => {
                  instance.post(baseUrl + 'login',
                    {
                      walletAddress: User.getWallet().address,
                      signature: value
                    },
                    {
                      headers: {
                        Authorization: true
                      },
                    })
                    .then((resp) => {
                      console.log(resp)
                      User.setToken(resp.data.token);
                      User.setData(resp.data.user);
                      this.setState({
                        token: resp.data.token
                      });
                      this.closeAllModals();
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                })
                  .catch(function (error) {
                    console.log(error)
                  });
              } else {
              }
            }).catch(function (error) {
              console.log(error)
            });
        }
      }
    }

  }

  render() {
    return (
      <div className="header-bgd-color" id="home">
        <nav class="mb-1 navbar navbar-expand-lg navbar-dark info-color">
          <Link class="navbar-brand" to="/"> <img className='kycdapp-Img' src={Images.path.kycdapp} alt=""/></Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
            aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
            <ul class="navbar-nav ml-auto">
              {this.state.token ?
                <li class="nav-item dropdown">
                  <button class="nav-link dropdown-toggle bgd-color-nav profile-btn" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <img className='' src={Images.path.kycdapp} alt='' /> {User.getWallet()?.address}
          <span class="sr-only">(current)</span></button>
                  <div class="dropdown-menu dropdown-menu-right dropdown-info com-drop-btn" aria-labelledby="navbarDropdownMenuLink-4">
                    {/* <Link class="dropdown-item" to="/Myaccount"><img className="drop-img-kyc" src={Images.path.op1}/> My Account</Link>
              <Link class="dropdown-item" to="/MyDocument"><img className="drop-img-kyc" src={Images.path.op2}/> My Documents</Link> */}
                    <Link class="dropdown-item" to="/form"><img className="drop-img-kyc" src={Images.path.op8} alt='' />Apply KYC </Link>
                    {/* <Link class="dropdown-item" to="/"><img className="drop-img-kyc" src={Images.path.op5} alt=''/> KYC Status</Link>
              <Link class="dropdown-item" to="/MyKyckey"><img className="drop-img-kyc" src={Images.path.op6} alt=''/> My KYC key</Link> */}
                    <Link class="dropdown-item" to="/privacy"><img className="drop-img-kyc" src={Images.path.op4} alt='' /> KYC Public and Private Info </Link>
                    {/* <Link class="dropdown-item" to="/"><img className="drop-img-kyc" src={Images.path.op3} alt=''/> Express KYC </Link> */}
                    <Link class="dropdown-item" to="/conservator"><img className="drop-img-kyc" src={Images.path.op7} alt='' /> Become a Conservator</Link>
                  </div>
                </li>
                :
                <li class="nav-item active">
                  <button class="nav-link bgd-color-nav connect-btn" data-toggle="modal" data-target=".kyclevel2">
                    Start Your KYC
            <span class="sr-only">(current)</span>
                  </button>
                </li>
              }
            </ul>
          </div>
        </nav>
         {/* <!-- info modall start here--> */}
      <div class="modal fade kyclevel2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">KYC Steps</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <h6>Once you have clicked on ‘Start your KYC’ or ‘Connect to Wallet’, just read and follow the following simple steps and click on ‘Proceed’ button to complete your KYC and migrate to Era Swap Network (ESN). 
                                   </h6>
                <ul className="comlistui">
                    <li>  Once you click on ‘Proceed’ button at the bottom of this Pop-Up Message, a Tab of https://eraswap.life/ opens on your screen to Load your Wallet</li>
                    <li> Load your Wallet through https://eraswap.life/ </li>
                    <li>  Click on Your Wallet Address on the Top Right of your screen and then click on ‘Apply KYC’</li>
                    <li>  Now you are on KYC Level 1.  Fill up your required KYC Details and upload documents. Then click on 'Submit'. After that click on 'Next' to go to Level 2</li>
                    <li>  In KYC Level 2, select specific Era Swap Ecosystem Platform by clicking on the platform logo, you need to do Level 2 KYC.  Fill up platform specific details required and click on ‘Submit’. Then click on ‘Next’ to go to Level 3</li>
                    <li>  You can also skip Level 2 for now by clicking on ‘Next’ Button but please remember that you have to complete Level 2 KYC to be eligible to use Era Swap Platforms as Verified User.</li>
                    <li>  In KYC Level 3, Click on ‘Sign this Message' to finish your KYC process</li>
                    <li>  You will get a Pop-up message for your confirmation ‘Are you sure to sign message?’</li>
                    <li>  Click on ‘Yes, Sign it!’</li>
                    <li> A successful submission Pop-Up message will appear ‘You have successfully signed the message’</li>
                    <li> Congratulations, your KYC Request has been submitted.</li>
                </ul>
                <div className="col-md-12 text-center">
                <button class="btn bgd-color mr-2" onClick={(e) =>{
                 window.open("https://eraswap.life/", "", "width=1003,height=650")
               }} >
                   Proceed
                    <span class="sr-only">(current)</span>
                  </button>
                  </div>
            </div>

          </div>
        </div>
      </div>

      {/* <!-- info modall end here--> */}

      </div>

    );

  }
}


export default Header;