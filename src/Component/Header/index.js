import React, { Component } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import Images from '../../Container/Images/Images';
import HeaderAPI from "./HeaderAPI";
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
      token : ''
    };
  }


  openEraswap(){
    window.open("https://eraswap.life/", "", "width=1003,height=650");
  }

  componentDidMount(){
    // HeaderAPI.addListener();
    window.addEventListener('message',  (e) => {
      this.login(e.data);
    }, false);
  }

  login(message){
    let countOfSession = 0,signature = '';
    if (message.substring) {
      if (message.substring(0, 2) == "0x") {
        window.wallet = new ethers.Wallet(message);
        User.setWallet(window.wallet);
        var token;
        if (countOfSession === 0){
          countOfSession++;
            instance.get(baseUrl+'getToken',{},{ 
              // withCredentials: true, 
              headers: {
                Authorization: true
              }
          })
            .then( (resp) => {
              console.log(resp);
              token = resp.data;
              if (typeof token !== undefined || token !== '') {
                signature = window.wallet.signMessage(token);
                signature.then(function (value) {
                  instance.post(baseUrl+'login',
                  {
                    walletAddress: window.wallet.address,
                    signature: value
                  },
                  {
                    headers: {
                      Authorization: true
                    },
                    // withCredentials: true
                  })
                  .then((resp)  =>{
                    console.log(resp)
                    if (resp.data.status == 'success') {
                      User.setTata(resp.data.user);
                      User.setWalletAddress(window.wallet.address);
                      User.setToken(resp.data.token);
                      this.setState({
                        token : resp.data.token
                      });
                      console.log('User.token',User.getToken());
                    }
                    else if (resp.data.status === 'error') {
                      alert(resp.data.message);
                    }
                    else {
                      alert('Could not login, Please try again after sometime');
                    }
                  })
                  .catch(function(error){
                    console.log(error.response);
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
      <div className="header-bgd-color">
       <nav class="mb-1 navbar navbar-expand-lg navbar-dark info-color">
  <Link class="navbar-brand" to="/"> <img className='kycdapp-Img'  src={Images.path.kycdapp} /></Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
    aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
    <ul class="navbar-nav ml-auto">
      {this.state.token ? 
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle bgd-color-nav profile-btn" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <img className=''  src={Images.path.kycdapp} /> Sanket parab
          <span class="sr-only">(current)</span></a>
          <div class="dropdown-menu dropdown-menu-right dropdown-info com-drop-btn" aria-labelledby="navbarDropdownMenuLink-4">
              {/* <Link class="dropdown-item" to="/Myaccount"><img className="drop-img-kyc" src={Images.path.op1}/> My Account</Link>
              <Link class="dropdown-item" to="/MyDocument"><img className="drop-img-kyc" src={Images.path.op2}/> My Documents</Link> */}
              <Link class="dropdown-item" to="/form"><img className="drop-img-kyc" src={Images.path.op8}/>Apply KYC </Link>
              {/* <Link class="dropdown-item" to="/"><img className="drop-img-kyc" src={Images.path.op5}/> KYC Status</Link>
              <Link class="dropdown-item" to="/MyKyckey"><img className="drop-img-kyc" src={Images.path.op6}/> My KYC key</Link> */}
              <Link class="dropdown-item" to="/privacy"><img className="drop-img-kyc" src={Images.path.op4}/> KYC Public and Private Info </Link>
              {/* <Link class="dropdown-item" to="/"><img className="drop-img-kyc" src={Images.path.op3}/> Express KYC </Link> */}
              <Link class="dropdown-item" to="/"><img className="drop-img-kyc" src={Images.path.op7}/> Become a Conservator</Link>
          </div>
        </li>
        :
        <li class="nav-item active">
          <a class="nav-link bgd-color-nav" href="#" onClick={() => HeaderAPI.openEraswap()}>
          Connect To wallet
            <span class="sr-only">(current)</span>
          </a>
        </li>
      }
    </ul>
  </div>
</nav>

      </div>

    );

  }
}


export default Header;