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
  <Link class="navbar-brand" to="/"> <img className='kycdapp-Img'  src={Images.path.kycdapp} /></Link>
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
    </ul>
  </div>
</nav>

      </div>

    );

  }
}


export default Header;