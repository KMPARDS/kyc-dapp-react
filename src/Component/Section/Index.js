import React, { Component } from 'react';
import './Section.css'
import { Col, Button, Container, Row } from 'react-bootstrap';
import Images from '../../Container/Images/Images';



class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <div className='kyc-section1-bgd'>
                    <Container>
                        <Row>
                            <Col sm={6}>
                                <img className='left-sec-Img' src={Images.path.illustr} />
                            </Col>
                            <Col sm={6}>
                            <div className="current-container-style">
                                <h2 class="mb-2-h3-font">Current Problems of <br />traditional KYC</h2>
                                <p className="opacity-txt-para">Era Swap powered KYC DApp allows active monitoring of everything from account opening to day to day transactions. With the handy immutability aspect of Blockchain and Combination of Smart Contracts, it has predetermined criteria to spot fraudulent activity. </p>
                                <Container>
                                    <Row>
                                        <Col sm={6}>
                                            <div className="inner-sec-txt">
                                                <div><img className="home-img-style" src={Images.path.VerySlow}/></div>
                                                <div>
                                                    <h3 class="h5-font">VERY SLOW</h3>
                                                    <p>3-5 days to settle</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={6}>
                                            <div className="inner-sec-txt">
                                            <div><img className="home-img-style" src={Images.path.Unreliable}/></div>
                                                <div>
                                                    <h3 class="h5-font">UNRELIABLE</h3>
                                                    <p>High rates of failure</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6}>
                                            <div className="inner-sec-txt">
                                            <div><img className="home-img-style" src={Images.path.expensive}/></div>
                                                <div>
                                                    <h3 class="h5-font">EXPENSIVE</h3>
                                                    <p>$1.6 trillion in yearly costs*</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={6}>
                                            <div className="inner-sec-txt">
                                            <div><img className="home-img-style" src={Images.path.Unacceptable}/></div>
                                                <div>
                                                    <h3 class="h5-font">UNACCEPTABLE</h3>
                                                    <p>User demand smooth experience</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className='kyc-section2-bgd'>
                    <Container>
                        <Row>
             
                            <Col sm={6}>
                                <h2 class="mb-2-h3-font-kyc">KYC DApp decentralized  <br />solution for Identity Verification.</h2>
                                <p class="opacity-txt-para">Financial and other sectors has been seeking solutions for their “Identity” problem for a long time, Era Swap have now come up with a viable solution powered on blockchain – KYC DApp. KYC Verification using blockchain has the potential to be faster, easier safer and more efficient than the centralized traditional verification process. <br /> <br /> Financial and other sectors has been seeking solutions for their “Identity” problem for a long time, Era Swap have now come up with a viable solution powered on blockchain – KYC DApp. KYC Verification using blockchain has the potential to be faster, easier safer and more efficient than the centralized traditional verification process.
                            </p>
                            </Col>
                          
                            <Col sm={6}>
                                <img className='right-sec-Img' src={Images.path.section} />
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="four-wrapper">
                    <Container>
                        <Row>
                            <Col sm={3}>
                                <div className="fr-section">
                                    <h3 class="h5-font-mb"> Data Quality</h3>
                                    <p class="txt-fr-para">Once entered, data on the blockchain ledger cannot be altered or manipulated.</p>
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div className="fr-section">
                                    <h3 class="h5-font-mb">Speed</h3>
                                    <p class="txt-fr-para">
                                        Identity Verification using KYC DApp has the potential to be faster, easier and safer
                                     </p>
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div className="fr-section">
                                    <h3 class="h5-font-mb">Security</h3>
                                    <p class="txt-fr-para">
                                        KYC DApp uses IPFS and Elliptical Curve Cryptography to securely store users information in a decentralized way.
                            </p>
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div className="fr-section">
                                    <h3 class="h5-font-mb">Decentralized</h3>
                                    <p class="txt-fr-para">
                                        With decentralized approach KYC DApp is not only limited to banks or financial institutions, there is a wider scope of application among other industries
                            </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="">
                    <Container>
                        <div>
                            <h2 class="mb-3-head"><span class="color--primary">Next generation</span> Decentralized Platforms <br /> of Era Swap .</h2>
                            <p class="mb-4-para">The potential of Blockchain technology to disrupt nearly every industry and solve its current flaws cannot be dismissed. With Era Swap Utility you can access to a secure, reliable and self-sustainable the decentralized network consists of multiple utility platforms and middlemen free marketplaces for the community. The most beneficial fact about Era Swap decentralized platforms is that it is not controlled by any central authority means you doesn’t have to worry about multi-layer charges nor your data can be accessed by any Central Authority for their own benefits  </p>
                        </div>
                    </Container>
                </div>
            </div>
        );

    }
}


export default Section;