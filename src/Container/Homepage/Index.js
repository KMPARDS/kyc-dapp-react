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
                        1.  To stay complaint with regulators and to stop sophisticated financial crimes, KYC DApp is being created </p>
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
                                        <p className="text-center">   KYC DApp, complaint documents are stored on blockchain which makes it transparent and secure</p>
                                    </div>
                                </Col>

                                <Col lg={4} md={6} sm={8} className="mx-auto">
                                    <div className="feature-centr">
                                        <img className='feature-Img' src={Images.path.grp2} />
                                    </div>
                                    <div>
                                        <h4 className="feature-head">Era Swap Ecosystem</h4>
                                        <hr className="bg-color--primary border--none mx-auto  jsElement dash-red" data-height="3" data-width="80"/>
                                        <p className="text-center">Via KYC DApp, a customer could update their personal information across all the platforms of Era Swap Ecosystem</p>
                                    </div>
                                </Col>

                                <Col lg={4} md={6} sm={8} className="mx-auto">
                                    <div className="feature-centr">
                                        <img className='feature-Img' src={Images.path.grp3} />
                                    </div>
                                    <div>
                                        <h4 className="feature-head">One Stop</h4>
                                        <hr className="bg-color--primary border--none mx-auto  jsElement dash-red" data-height="3" data-width="80"/>
                                        <p className="text-center">This One Stop KYC for multiple platforms of ESE will save repetitive and reiterative work. </p>
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