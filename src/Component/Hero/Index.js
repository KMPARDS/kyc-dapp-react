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
                <div className='kyc-hero-bgd'>
                    <div className='wrapper-container-hero pdt30'>
                          <div className="row">
                           <div className="col-12 col-md-10 col-lg-6 ">
                                <div className="hero-head-txt">
                                    KYC on Blockchain Network<br />
                                    Done More <span className="quick-effect">Quickly & Securly</span>
                                </div>
                                     <p className="hero-detail-txt">KYC DApp is powered on a decentralised network of Era Swap.
                                     <br />There is no centralized authority to obstructions means
                                     <br />inbuilt immutably that makes contained data more trustworthy.
                                     </p>
                                     <div class="mt40">
                                         <Link to="/form" className="knw-btn">Know Your Customer</Link>
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