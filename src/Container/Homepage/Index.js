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
                  <Header/>
                <div className='wrapper-container-home'>
                    <Hero/>
                </div>
                <div className="future-container">
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
                <div className="next-gen">
                    <Container>
                        <div className="col-12 col-lg-10 mx-auto text-center reveal">
                            <h2 className="mb-3-head"><span class="color--primary">Next generation</span> Decentralized Platforms <br /> of Era Swap .</h2>
                            <p className="mb-4-para mt30">The potential of Blockchain technology to disrupt nearly every industry and solve its current flaws cannot be dismissed. With Era Swap Utility you can access to a secure, reliable and self-sustainable the decentralized network consists of multiple utility platforms and middlemen free marketplaces for the community. The most beneficial fact about Era Swap decentralized platforms is that it is not controlled by any central authority means you doesn’t have to worry about multi-layer charges nor your data can be accessed by any Central Authority for their own benefits  </p>
                        </div>
                       
                    </Container>
                </div>
                <div className="svg-shape--top w-100 z-index1">
                    <svg viewBox="0 0 1920 522.59" xmlns="" className="svg fill-primary-light--1 w-100 replaced-svg">
                    <path d="M1920,0V453.47c-52.38-56.59-216.06,206.54-400-34.22q-20.55-26.89-41.39-52.16C1303.07,154.18,1114.33,29.34,960,25.08c-154.33,4.26-343.07,129.1-518.61,342Q420.56,392.35,400,419.25C216.06,660,52.38,396.88,0,453.47V0Z"></path></svg>
                </div>
                    <img className="v-shape-img-style" src={Images.path.vshap}/>
                    </div>
                </div>
                <Footer/>
            </div>

        );

    }
}


export default Homepage;