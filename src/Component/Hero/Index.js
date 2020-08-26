import React, { Component, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Hero.css';
import { Col, Button, Container, Row } from 'react-bootstrap';
import Images from '../../Container/Images/Images';
import User from '../../models/User';
import { UserContext } from '../../utils/user.context';

const $ = '$' in window && window.$;

function Hero() {
  const history = useHistory();
  const context = useContext(UserContext);

  return (
    <div>
      <div className="kyc-hero-bgd">
        <div className="wrapper-container-hero pdt30">
          <div className="row">
            <div className="col-12 col-md-10 col-lg-6 ">
              <div className="hero-head-txt">
              KYC on Era Swap Blockchain
                <br />
                Network adds to build {' '}<br></br>
                <span className="quick-effect">Verified Community</span>
              </div>
              <p className="hero-detail-txt">
                KYC DAPP is a DApp introduced in Era Swap Blockchain Network for
                Era Swap user's safety with the aim to follow global norms with
                respect to the global standards for Anti-Money Laundering (AML)
                and Combating Financing of Terrorism (CFT). KYC DAPP works like
                the gatekeeper to restrict the entry of imposters, scammers
                doing fraudulent or malicious activities for accumulation or
                exchange of Tokens. The use of KYC DAPP creates a fair balance
                between the freedom of anonymous use of Digital Assets & the
                ability to interact/exchange with other genuine users on Era
                Swap Ecosystem.
                <br /> <br />
                KYC through KYC DAPP is implemented for the good and long-term
                success of the Era Swap community altogether. After successful
                KYC Process via KYC DApp; Era Swap Community Members become
                eligible to use Era Swap.
              </p>
              <div className="mt40">
                <a
                  className="knw-btn mt40"
                  onClick={e => {
                    if (context?.user?.walletAddress) {
                      history.push('/form');
                    } else {
                      $('.kyclevel2').modal('show');
                    }
                    return null;
                  }}
                >
                  Start Your KYC
                </a>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <img className="kyc-hero-img" src={Images.path.group} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
