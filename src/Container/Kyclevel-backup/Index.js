import React, { Component } from 'react';
import './Kyclevel.css'
import Images from '../../Container/Images/Images';
import LevelOne from '../../Container/LevelOne/Index';
import { Col, Button, Container, Row } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom'


class Kyclevel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <div className="kyc-header-color">
                    <img className='kycdapp-Img' src={Images.path.kycdapp} />
                </div>
                <div className="Kyclevel-container">
                    <h4 className="kyc-heading">KYC Level</h4>
                   
                   <Container>
                       <Row>
                           <Col sm={3}>
                           </Col>
                           <Col sm={6}>
                        <div className="kyc-white-box">
                            <h3 className="kyc-level-head">There are three levels of KYC</h3>
                            <div className="kyc-option">
                                <div>
                                    <Link to="/level1"><div><button className="level-btn-btn">Level 1</button></div></Link>
                                    <Link to="/level2"><div><button className="level-btn-btn">Level 2</button></div></Link>
                                    <Link to="/level3"><div><button className="level-btn-btn">Level 3</button></div></Link>
                                </div>
                            </div>
                        </div>
                        </Col>
                        </Row>
                        </Container>
                  
                </div>
            </div>

        );

    }
}


export default Kyclevel;