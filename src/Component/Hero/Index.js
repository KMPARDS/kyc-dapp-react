import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Hero.css'
import { Col, Button, Container, Row } from 'react-bootstrap';
import Images from '../../Container/Images/Images';
import User from '../../models/User';



function Hero() {


  const history = useHistory();

  return (
    <div>
      <div className='kyc-hero-bgd' >
        <div className='wrapper-container-hero pdt30'>
          <div className="row">
            <div className="col-12 col-md-10 col-lg-6 ">
              <div className="hero-head-txt">
                KYC on Blockchain Network<br />
                                    Done More <span className="quick-effect">Quickly & Securly</span>
              </div>
              <p className="hero-detail-txt">KYC DAPP is a DApp introduced in Era Swap Blockchain Network for Era Swap user's safety with the aim to follow global norms with respect to the global standards for Anti-Money Laundering (AML) and Combating Financing of Terrorism (CFT).
              KYC DAPP works like the gatekeeper to restrict the entry of imposters, scammers doing fraudulent or malicious activities for accumulation or exchange of Tokens. The use of KYC DAPP creates a  fair balance between the freedom of anonymous use of Digital Assets &  the ability to interact/exchange with other genuine users on Era Swap Ecosystem.

<br />KYC through KYC DAPP is implemented for the good and long-term success of the Era Swap community altogether. After successful KYC Process via KYC DApp; Era Swap Community Members become eligible to use Era Swap.
                                     </p>
              <div className="mt40">
                <a data-toggle="modal" data-target=".kyclevel2" className="knw-btn mt40">Start Your KYC</a>
              </div>
              {/* <!-- info modall start here--> */}
              <div class="modal fade kyclevel2 instructions" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                        <button class="btn bgd-color mr-2" onClick={(e) => {
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