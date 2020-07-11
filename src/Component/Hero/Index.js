import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css'
import { Col, Button, Container, Row } from 'react-bootstrap';
import Images from '../../Container/Images/Images';



class Hero extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
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
                                     <p className="hero-detail-txt">KYC DApp empowers Era Swap Community
                                      Members with convenient KYC Process to become eligible for Peer
                                      to Peer Exchange of Services, Claim Rewards and Offer Discounts
                                      on multiple utility platforms of Era Swap Ecosystem (ESE) on Era
                                      Swap Blockchain Network (ESN) using Era Swap (Es) utility token
                                     </p>
                                     <p>For Era Swap Community Members to migrate to Era Swap Network (ESN), KYC can be done in 5 Simple Steps:</p>
                                     <ul className="kycsteps">
                                                <li><i class="fa fa-chevron-right" aria-hidden="true"></i> Click on 'Start Your KYC' and Load your Existing Wallet</li>
                                                <li><i class="fa fa-chevron-right" aria-hidden="true"></i>  In KYC Level 1, Fill up your KYC Details, Click on 'Submit' and then click on 'Next'</li>
                                                <li><i class="fa fa-chevron-right" aria-hidden="true"></i> In KYC Level 2, Click on 'Next'</li>
                                                <li><i class="fa fa-chevron-right" aria-hidden="true"></i>  In KYC Level 3, Click on 'Sign this Message'</li>
                                                <li><i class="fa fa-chevron-right" aria-hidden="true"></i> In KYC Level 4, Click on 'Send tokens to Admin'</li>
                                     </ul>
                                     <div class="mt40">
                                         <Link to="/form" className="knw-btn">Start Your KYC</Link>
                                     </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <img className="kyc-hero-img" src={Images.path.group}/>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}


export default Hero;