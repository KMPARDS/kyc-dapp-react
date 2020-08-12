import React, { Component } from 'react';
import './Footer.css';
import Images from '../../Container/Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import TC from '../../assets/docs/tc.pdf';
import Userguide from '../../assets/docs/KYC_DAPP_UserGuide.pdf';
import Prp from '../../assets/docs/kyc-dapp-privacy-policy.pdf';


class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="Footer-wrapper-container">
          <div className="Footer-container">
            <Container>
              <Row>
                <Col lg={5} md={9} col={12}>
                  <img
                    className="logo-img-style"
                    src={Images.path.kycdapwhite}
                  />
                  <p className="logo-sub-txt mt30"></p>
                </Col>
                <Col xl={4} lg={4} md={4} col={12}>
                  <h4 className="footer-head">Useful Links</h4>
                  <ul>
                    <li>
                      <a
                        href="http://eraswaptoken.io/pdf/es-disclaimer.pdf"
                        target="_blank"
                        className="footer-sub"
                      >
                        Disclaimer
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://eraswaptoken.io/pdf/es-statuary-warning.pdf"
                        target="_blank"
                        className="footer-sub"
                      >
                        Statuary Warning
                      </a>
                    </li>
                    <li>
                      <a href={Prp} target="_blank" className="footer-sub">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://eraswaptoken.io/pdf/es-aml-policy.pdf"
                        target="_blank"
                        className="footer-sub"
                      >
                        AML Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className="footer-sub"
                        href="https://eraswaptoken.io/pdf/eraswap-terms-conditions.pdf"
                        target="_blank"
                      >
                        Era Swap Terms & Conditions
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col offset-xl={1} xl={3} lg={4} md={4} col={12}>
                  <h4 className="footer-head">&nbsp;</h4>
                  <ul>
                    <li>
                      <a className="footer-sub" href="#home">
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        className="footer-sub"
                        href="http://eraswaptoken.io/pdf/eraswap_whitepaper.pdf"
                        target="_blank"
                      >
                        ES White Paper{' '}
                      </a>
                    </li>
                    <li>
                      <a
                        className="footer-sub"
                        href="http://eraswaptoken.io/pdf/era-swap-howey-test-letter-august7-2018.pdf"
                        target="_blank"
                      >
                        Howey Test
                      </a>
                    </li>
                    <li>
                      <a
                        href={Userguide}
                        target="_blank"
                        className="footer-sub"
                      >
                         User Guide For Migration to ESN PoS
                      </a>
                    </li>
                    <li>
                      <a href={TC} target="_blank" className="footer-sub">
                        Terms of Use
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="bottom-footer">
            <div className="">
              <Container>
                <Row>
                  <Col sm={4}>
                    <p className="logo-sub-para">
                      © <a className="footer-sub">Eraswap</a> 2020 | All rights
                      reserved
                    </p>
                  </Col>

                  <Col sm={8}>
                    <div className="footer-social-flex">
                      <ul className="social-menu">
                        <li>
                          <a
                            href="https://www.facebook.com/eraswap"
                            target="_blank"
                          >
                            <i className="fa fa-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.linkedin.com/company/eraswap/"
                            target="_blank"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.instagram.com/eraswap/?hl=en"
                            target="_blank"
                          >
                            <i className="fa fa-instagram"></i>
                          </a>{' '}
                        </li>
                        <li>
                          <a
                            href="https://twitter.com/EraSwapTech"
                            target="_blank"
                          >
                            <i className="fa fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://medium.com/@eraswap" target="_blank">
                            <i className="fa fa-medium"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://eraswap.tumblr.com/" target="_blank">
                            <i className="fa fa-tumblr"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://t.me/eraswap" target="_blank">
                            <i className="fa fa-telegram"></i>
                          </a>
                        </li>
                        <li>
                          {' '}
                          <a href="https://github.com/KMPARDS" target="_blank">
                            <i className="fa fa-github"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.reddit.com/user/EraSwap"
                            target="_blank"
                          >
                            <i className="fa fa-reddit"></i>
                          </a>{' '}
                        </li>
                        <li>
                          <a
                            href="https://www.youtube.com/channel/UCGCP4f5DF1W6sbCjS6y3T1g?view_as=subscriber"
                            target="_blank"
                          >
                            <i className="fa fa-youtube"></i>
                          </a>
                        </li>
                      </ul>
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
