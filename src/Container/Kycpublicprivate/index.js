import React, { Component } from 'react';
import './Kycpublicprivate.css'
import Images from '../../Container/Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import  MultiStep  from 'react-multistep';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';




class Kycpublicprivate extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <div>
                <div className="Kyclevel-container">

                    <Container>
                        <Col sm={12}>
                            <div className="kyc-white-box innerpage-box">
                                <h4 className="feature-head text-left"> KYC Public and Private Info </h4>
                                <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80"/>

                                <Col sm={12} className="text-center">
                                  <img className=' mt20' src={Images.path.workinprogress} alt="" width="400"/>
                                </Col>

                {/* <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Public Info</legend>

                                    <Row className="mt20">
                                        <Col sm={6}>
                                            <ul class="list-group list-group-flush">
                                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Personal Info
                                                <label class="switch switch-left-right">
                                                    <input class="switch-input" type="checkbox" />
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                              </li>
                                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                               Address Info
                                                <label class="switch switch-left-right">
                                                    <input class="switch-input" type="checkbox" />
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                              </li>
                                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                               First name
                                                <label class="switch switch-left-right">
                                                    <input class="switch-input" type="checkbox" />
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                              </li>
                                            </ul>
                                        </Col>
                                        <Col sm={6}>
                                            <ul class="list-group list-group-flush">
                                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Personal Info
                                                <label class="switch switch-left-right">
                                                    <input class="switch-input" type="checkbox" />
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                              </li>
                                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                               Address Info
                                                <label class="switch switch-left-right">
                                                    <input class="switch-input" type="checkbox" />
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                              </li>
                                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                               First name
                                                <label class="switch switch-left-right">
                                                    <input class="switch-input" type="checkbox" />
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                              </li>
                                            </ul>
                                        </Col>


                                    </Row>


                </fieldset>
                <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Private Info</legend>

                                    <Row className="mt20">
                                        <Col sm={6}>
                                            <ul class="list-group list-group-flush">
                                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Personal Info
                                                <label class="switch switch-left-right">
                                                    <input class="switch-input" type="checkbox" />
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                              </li>
                                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                               Address Info
                                                <label class="switch switch-left-right">
                                                    <input class="switch-input" type="checkbox" />
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                              </li>
                                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                               First name
                                                <label class="switch switch-left-right">
                                                    <input class="switch-input" type="checkbox" />
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                              </li>
                                            </ul>
                                        </Col>
                                        <Col sm={6}>
                                            <ul class="list-group list-group-flush">
                                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Personal Info
                                                <label class="switch switch-left-right">
                                                    <input class="switch-input" type="checkbox" />
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                              </li>
                                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                               Address Info
                                                <label class="switch switch-left-right">
                                                    <input class="switch-input" type="checkbox" />
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                              </li>
                                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                               First name
                                                <label class="switch switch-left-right">
                                                    <input class="switch-input" type="checkbox" />
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                              </li>
                                            </ul>
                                        </Col>


                                    </Row>


                </fieldset> */}
                            </div>
                        </Col>
                    </Container>
                </div>
            </div>
        );

    }
}


export default Kycpublicprivate;