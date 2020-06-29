import React, { Component } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import Images from '../../Container/Images/Images';



class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div className="header-bgd-color">
       <nav class="mb-1 navbar navbar-expand-lg navbar-dark info-color">
  <a class="navbar-brand" href="#"> <img className='kycdapp-Img'  src={Images.path.kycdapp} /></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
    aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
    <ul class="navbar-nav ml-auto">
    <li class="nav-item active">
        <a class="nav-link bgd-color-nav" href="/">
        Connect To wallet
          <span class="sr-only">(current)</span>
        </a>
      </li>
      
      <li class="nav-item dropdown">

        <a class="nav-link dropdown-toggle bgd-color-nav profile-btn" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          <img className=''  src={Images.path.kycdapp} /> Sanket parab
         <span class="sr-only">(current)</span></a>
        <div class="dropdown-menu dropdown-menu-right dropdown-info com-drop-btn" aria-labelledby="navbarDropdownMenuLink-4">
            {/* <a class="dropdown-item" href="/Myaccount"><img className="drop-img-kyc" src={Images.path.op1}/> My Account</a>
            <a class="dropdown-item" href="/MyDocument"><img className="drop-img-kyc" src={Images.path.op2}/> My Documents</a> */}
            <a class="dropdown-item" href="/Kycpublicprivate"><img className="drop-img-kyc" src={Images.path.op4}/> KYC Public and Private Info </a>
            {/* <a class="dropdown-item" href="/"><img className="drop-img-kyc" src={Images.path.op5}/> KYC Status</a>
            <a class="dropdown-item" href="/MyKyckey"><img className="drop-img-kyc" src={Images.path.op6}/> My KYC key</a> */}
            <a class="dropdown-item" href="/form"><img className="drop-img-kyc" src={Images.path.op8}/>Apply KYC </a>
            {/* <a class="dropdown-item" href="/"><img className="drop-img-kyc" src={Images.path.op3}/> Express KYC </a> */}
            <a class="dropdown-item" href="/"><img className="drop-img-kyc" src={Images.path.op7}/> Become a Conservator</a>
        </div>
      </li>
    </ul>
  </div>
</nav>

      </div>

    );

  }
}


export default Header;