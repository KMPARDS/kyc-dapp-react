import React, { Component } from 'react';
import './Homepage.css';
import { Col, Button, Container, Row } from 'react-bootstrap';
import Header from '../../Component/Header/Index';
import Hero from '../../Component/Hero/Index';
import Section from '../../Component/Section/Index';
import Images from '../../Container/Images/Images';
import Footer from '../../Component/Footer/Index';


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                  <Header />
                <div className='wrapper-container-home'>
                    <Hero />
                </div>
                <div className="future-container">
                    <h2 className="future-head">The future of Identity<br /> <span className="red-color-txt">Verification</span> is here</h2>
                    <p className="para-txt-future">
                        Efficient,Quick & Cost-saving alternative to any industry that relies on Identity Verification. </p>
                    <div className="kyc-feature-circle">
                        <Container>
                            <Row>
                                <Col sm={4} md={4}>
                                    <div className="feature-centr">

                                        <img className='feature-Img' src={Images.path.grp1} />
                                    </div>
                                    <div>
                                        <h4 className="feature-head">Transparency</h4>
                                        <p>KYC DApp is built upon advanced Web 3.0 and offer total transparency on the complete
                                                process with the decentralized approach.</p>
                                    </div>
                                </Col>
                                <Col sm={4} md={4}>
                                    <div className="feature-centr">
                                        <img className='feature-Img' src={Images.path.grp2} />
                                    </div>
                                    <div>
                                        <h4 className="feature-head">Era Swap Network</h4>
                                        <p>There are multiple decentralized platforms powered on Era Swap Network that uses secured KYC DApp for identification process </p>
                                    </div>
                                </Col>
                                <Col sm={4} md={4}>
                                    <div className="feature-centr">
                                        <img className='feature-Img' src={Images.path.grp3} />
                                    </div>
                                    <div>
                                        <h4 className="feature-head">No Centralized Authority</h4>
                                        <p>KYC DApp uses Smart Contracts to ensure decentralized approvals of KYC instead of centralized admin approvals </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
              
                <div className="kyc-section-wrapper">
                    <Section/>
                </div>
                <div>
                    <img className="v-shape-img-style" src={Images.path.vshap}/>
                    </div>
                   
                </div>
                <Footer/>
            </div>

        );

    }
}


export default Homepage;