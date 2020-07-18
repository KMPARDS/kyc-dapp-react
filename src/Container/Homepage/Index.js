import React, { Component } from 'react';
import './Homepage.css';
import { Col, Button, Container, Row } from 'react-bootstrap';

import Hero from '../../Component/Hero/Index';
import Section from '../../Component/Section/Index';
import Images from '../../Container/Images/Images';


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    

    render() {
        return (
            <div >
                <div className='wrapper-container-home'>
                    <Hero/>
                </div>
                <div className="future-container" id="solution">
                    <h2 className="future-head">The future of Identity<br /> <span className="red-color-txt">Verification</span> is here</h2>
                    <p className="para-txt-future">
                        Efficient,Quick & Cost-saving alternative to any industry that relies on Identity Verification. </p>
                    <div className="kyc-feature-circle">
                        <Container>
                            <Row>

                                <Col lg={4} md={6} sm={8} className="mx-auto">
                                    <div className="feature-centr">
                                         <img className='feature-Img' src={Images.path.grp1} />
                                    </div>
                                    <div>
                                        <h4 className="feature-head">Transparency</h4>
                                        <hr className="bg-color--primary border--none mx-auto  jsElement dash-red" data-height="3" data-width="80"/>
                                        <p className="text-center">KYC DApp is built upon advanced Web 3.0 and offer total transparency on the complete
                                                process with the decentralized approach.</p>
                                    </div>
                                </Col>

                                <Col lg={4} md={6} sm={8} className="mx-auto">
                                    <div className="feature-centr">
                                        <img className='feature-Img' src={Images.path.grp2} />
                                    </div>
                                    <div>
                                        <h4 className="feature-head">Era Swap Network</h4>
                                        <hr className="bg-color--primary border--none mx-auto  jsElement dash-red" data-height="3" data-width="80"/>
                                        <p className="text-center">There are multiple decentralized platforms powered on Era Swap Network that uses secured KYC DApp for identification process </p>
                                    </div>
                                </Col>

                                <Col lg={4} md={6} sm={8} className="mx-auto">
                                    <div className="feature-centr">
                                        <img className='feature-Img' src={Images.path.grp3} />
                                    </div>
                                    <div>
                                        <h4 className="feature-head">No Centralized Authority</h4>
                                        <hr className="bg-color--primary border--none mx-auto  jsElement dash-red" data-height="3" data-width="80"/>
                                        <p className="text-center">KYC DApp uses Smart Contracts to ensure decentralized approvals of KYC instead of centralized admin approvals </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                <div className="kyc-section-wrapper">
                    <Section/>
                </div>
                <div>
            
                  
                    </div>
                </div>

            </div>

        );

    }
}


export default Homepage;