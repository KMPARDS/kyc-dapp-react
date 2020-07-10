import React, { Component } from 'react';
import './Footer.css'
import Images from '../../Container/Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import TC from '../../assets/docs/tc.pdf'


class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <div className="Footer-wrapper-container">

                    <div className="Footer-container">

                        <Container>
                            <Row>
                                <Col lg={6} md={9} col={12}>
                                    <img className="logo-img-style" src={Images.path.kycdapwhite} />
                                    <p className="logo-sub-txt mt30">The main objectives of the project are to meet the needs of Digital assests projects and users, and to provide access to Required. </p>
                                </Col>
                                <Col xl={3} lg={4} md={4} col={12}>
                                    <h4 className="footer-head">Useful Link</h4>
                                    <ul>
                                        <li><a className="footer-sub">How it works</a></li>
                                        <li><a className="footer-sub">Features</a></li>
                                        <li><a className="footer-sub">Verification</a></li>
                                        <li><a className="footer-sub">Roadmap</a></li>
                                    </ul>
                                </Col>
                                <Col offset-xl={1} xl={2} lg={4} md={4} col={12}>
                                    <h4 className="footer-head">Documents</h4>
                                    <ul>
                                        <li><a href="https://eraswaptoken.io/pdf/eraswap_whitepaper.pdf" className="footer-sub">Whitepaper</a></li>
                                        <li><a className="footer-sub">Privacy Policy</a></li>
                                        <li><a href={TC} target='_blank' className="footer-sub">Terms of Use</a></li>
                                        <li><a href="https://eraswaptoken.io/pdf/eraswap-terms-conditions.pdf" target="_blank">Era Swap Terms & Conditions</a></li>

                                    </ul>
                                </Col>
                            </Row>
                        </Container>

                    </div>
                    <div className="bottom-footer">
                        <div className="">
                            <Container>
                            <Row>

                                <Col sm={6}>
                                    <p class="logo-sub-para">© <a class="footer-sub">Eraswap</a> 2020  | All rights reserved</p>
                                </Col>

                                <Col sm={6}>
                                    <div className="footer-social-flex">
                                    <a href="https://www.facebook.com/eraswap" className="social-icon">
                                        <img className="social-img-footer" src={Images.path.grpfb} />
                                        </a>
                                        <a href="https://mobile.twitter.com/EraSwapTech" className="social-icon">
                                        <img className="social-img-footer" src={Images.path.whitetwt} />
                                        </a>
                                        <a href="https://www.linkedin.com/company/eraswap/"  className="social-icon">
                                        <img className="social-img-footer" src={Images.path.whIn} />
                                        </a>
                                        <a href="https://www.instagram.com/eraswap/?hl=en" className="social-icon">
                                        <img className="social-img-footer" src={Images.path.whtinsta} />
                                        </a>
                                        <a href="https://www.youtube.com/channel/UCGCP4f5DF1W6sbCjS6y3T1g?view_as=subscriber" className="social-icon">
                                        <img className="social-img-footer" src={Images.path.utubwht} />
                                        </a>
                                    </div>
                                </Col>

                            </Row>
                            </Container>
                        </div>
                    </div>

                </div>
            </div>

        );

    }
}


export default Footer;