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
            <div id="">
                <div className='kyc-section1-bgd'>
                <div className="svg-shape--top w-100 z-index1">
                    <img className="svg w-100 fill--white" src={Images.path.braces}/>
                </div>

                    <Container>
                        <Row>
                            <Col lg={6}>
                                <img className='left-sec-Img img-fluid' src={Images.path.illustr} />
                            </Col>
                            <Col lg={6}>
                            <div className="current-container-style">
                                <h2 class="mb-2-h3-font">Current Problems of <br />traditional KYC</h2>
                                <p className="opacity-txt-para mt30">Era Swap powered KYC DApp offers solution to existing problems of traditional KYC. With the handy immutability aspect of Blockchain and Combination of Smart Contracts, KYC DApp has predetermined criteria to spot fraudulent activity. </p>
                                <Container>
                                    <Row className="mt60">
                                        <Col sm={6}>
                                               <div className="inner-sec-txt ">
                                                <div><img className="home-img-style" src={Images.path.VerySlow}/></div>
                                                <div>
                                                    <h3 class="h5-font">VERY SLOW</h3>
                                                    <p className="opacity-txt-para ">3-5 days to settle</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={6}>
                                            <div className="inner-sec-txt">
                                            <div><img className="home-img-style" src={Images.path.Unreliable}/></div>
                                                <div>
                                                    <h3 class="h5-font">UNRELIABLE</h3>
                                                    <p className="opacity-txt-para ">High rates of failure</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mt30">
                                        <Col sm={6}>
                                            <div className="inner-sec-txt">
                                            <div><img className="home-img-style" src={Images.path.expensive}/></div>
                                                <div>
                                                    <h3 class="h5-font">EXPENSIVE</h3>
                                                    <p className="opacity-txt-para ">$1.6 trillion in yearly costs*</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={6}>
                                            <div className="inner-sec-txt">
                                            <div><img className="home-img-style" src={Images.path.Unacceptable}/></div>
                                                <div>
                                                    <h3 class="h5-font">UNACCEPTABLE</h3>
                                                    <p className="opacity-txt-para ">User demand smooth experience</p>
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
                <div className='kyc-section2-bgd pdt80' id="verification">
                    <Container>
                        <Row>

                            <Col lg={6}>
                                <h2 class="mb-2-h3-font">KYC DApp decentralized  <br />solution for Identity Verification.</h2>
                                <p class="opacity-txt-para mt30">Financial and other sectors has been seeking solutions for their “Identity” problem for a long time, Era Swap have now come up with a viable solution powered on blockchain – KYC DApp. KYC Verification using blockchain has the potential to be faster, easier safer and more efficient than the centralized traditional verification process. <br /> <br /> Financial and other sectors has been seeking solutions for their “Identity” problem for a long time, Era Swap have now come up with a viable solution powered on blockchain – KYC DApp. KYC Verification using blockchain has the potential to be faster, easier safer and more efficient than the centralized traditional verification process.
                            </p>
                            </Col>

                            <Col lg={6} className="pos-abs-lg-vertical-center ">
                                <img className='img-fluid dec-img' src={Images.path.section} />
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="four-wrapper" id="features">
                    <Container>
                        <Row>
                            <Col sm={6} lg={3}>
                                <div className="fr-section text-center">
                                    <div className="red-circle"><i class="fa fa-database" aria-hidden="true"></i></div>
                                    <h3 class="h5-font-mb">Data Immutability </h3>
                                    <p class="txt-fr-para">Once entered by KYC Applicant, data on the blockchain ledger cannot be altered or manipulated.</p>
                                </div>
                            </Col>
                             <Col sm={6} lg={3}>
                                <div className="fr-section text-center">
                                    <div className="red-circle"><i class="fa fa-tachometer" aria-hidden="true"></i></div>
                                    <h3 class="h5-font-mb">Speed</h3>
                                    <p class="txt-fr-para">
                                        Identity Verification using KYC DApp has the potential to be faster, easier and safer
                                     </p>
                                </div>
                            </Col>
                             <Col sm={6} lg={3}>
                                <div className="fr-section text-center">
                                    <div className="red-circle"><i class="fa fa-shield" aria-hidden="true"></i></div>
                                    <h3 class="h5-font-mb">Security</h3>
                                    <p class="txt-fr-para">
                                        KYC DApp uses IPFS and Elliptical Curve Cryptography to securely store users information in a decentralized way.
                            </p>
                                </div>
                            </Col>
                             <Col sm={6} lg={3}>
                                <div className="fr-section text-center">
                                    <div className="red-circle">
                                    <img className='' src={Images.path.decentralized} alt="" width="42"/>
                             </div>
                                    <h3 class="h5-font-mb">Decentralized</h3>
                                    <p class="txt-fr-para">
                                        With decentralized approach; there is a wider scope of application among multiple domains and industries with single KYC
                            </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

            </div>
        );

    }
}


export default Section;