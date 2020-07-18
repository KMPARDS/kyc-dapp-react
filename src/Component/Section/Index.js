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
                                <p className="opacity-txt-para mt30">Era Swap powered KYC DApp offers solution to existing problems of traditional KYC.  </p>
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
                                <p class="opacity-txt-para mt30">
                                With the handy immutability aspect of Blockchain and Combination of Smart Contracts, KYC DApp has predetermined criteria to spot fraudulent activity. Also, by doing KYC, it reduces cost in the long run and benefits both Buyer and Seller to gain trust to transact in peer to peer mode more efficiently on multiple ESE platforms.  KYC DApp in future can allow bank and financial organizations to rely on more secure, organized and unified model of data handling


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
                                    <p class="txt-fr-para">Immutability of Blockchain database and their ability to help improve transparency in customer identification will massively help and improve to use Era Swap Ecosystem multiple platforms and reduce fraud</p>
                                </div>
                            </Col>
                             <Col sm={6} lg={3}>
                                <div className="fr-section text-center">
                                    <div className="red-circle"><i class="fa fa-tachometer" aria-hidden="true"></i></div>
                                    <h3 class="h5-font-mb">Active Monitoring</h3>
                                    <p class="txt-fr-para">
                                         Blockchain based KYC DApp platform will allow active monitoring of everything from account opening to day to day transactions. When combined with Smart Contracts that will predetermine criteria to spot fraudulent activities
                                     </p>
                                </div>
                            </Col>
                             <Col sm={6} lg={3}>
                                <div className="fr-section text-center">
                                    <div className="red-circle"><i class="fa fa-shield" aria-hidden="true"></i></div>
                                    <h3 class="h5-font-mb">Data Security</h3>
                                    <p class="txt-fr-para">
                                    KYC DApp offers better data security by ensuring that data access is only made after a confirmation or permission is received from the relevant user. This will eliminate the chance of unauthorized access and subsequently gives individual a greater control over their data
                                  </p>
                                </div>
                            </Col>
                             <Col sm={6} lg={3}>
                                <div className="fr-section text-center">
                                   
                                     <div className="red-circle"><i class="fa fa-check" aria-hidden="true"></i></div>
                                  
                            
                                    <h3 class="h5-font-mb">Validation</h3>
                                    <p class="txt-fr-para">
                                      KYC DApp accumulates data for multiple platforms in to a single immutable cryptographically secured and validated database. Thus, KYC DApp supports global efforts to combat financial terrorism and money laundering, effectively
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