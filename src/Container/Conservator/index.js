import React, { Component } from 'react';
import './Conservator.css'
import Images from '../../Container/Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import  MultiStep  from 'react-multistep';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';




class Conservator extends Component {
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
                                <h4 className="feature-head text-left">Become a Conservator</h4>
                                <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80"/>

                                <Col sm={12} className="text-center">
                                  <img className=' mt20' src={Images.path.workinprogress} alt="" width="400"/>
                                </Col>


                            </div>
                        </Col>
                    </Container>
                </div>
            </div>
        );

    }
}


export default Conservator;