import React, { Component } from 'react';
import './Myaccount.scss'
import Images from '../../Container/Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';



class Myaccount extends Component {
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
                <div className="KycAcc-container">
                    <Container>
                        <Col sm={12}>
                            <div className="account-white-box">
                                <div className="profile-img-kyc">
                                    <div class="avatar-wrapper">
                                        <img class="profile-pic" src="" />
                                        <div class="upload-button">
                                            <i class="fa fa-arrow-circle-up" aria-hidden="true"></i>
                                        </div>
                                        <input class="file-upload" type="file" accept="image/*" />
                                    </div>
                                </div>
                                <div>
                                    <Row>
                                        <Col sm={6}>
                                            <form>
                                                <div class="form-group">
                                                    <label className="account-label">First Name</label>
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                                                </div>
                                            </form>
                                        </Col>

                                   
                                        <Col sm={6}>
                                            <form>
                                                <div class="form-group">
                                                    <label className="account-label">Last Name</label>
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                                                </div>
                                            </form>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col sm={6}>
                                            <form>
                                                <div class="form-group">
                                                    <label className="account-label">Middle Name</label>
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                                                </div>
                                            </form>
                                        </Col>

                                   
                                        <Col sm={6}>
                                            <form>
                                                <div class="form-group">
                                                    <label className="account-label">Display Name</label>
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                                                </div>
                                            </form>
                                            <p className="note-txt-red">*This is the display name that the user desire to be shown.If this name is not set then the name from KYC Object will be used.</p>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm={12}>
                                            <form>
                                                <div class="form-group">
                                                    <label className="account-label">Bio</label>
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                                                </div>
                                            </form>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6}>
                                            <form>
                                                <div class="form-group">
                                                    <label className="account-label">Residence Address</label>
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="House Name/No" />
                                                </div>
                                            </form>
                                        </Col>
                                        <Col sm={6}>
                                            <form>
                                                <div class="form-group">

                                                    <input type="text" class="form-control mt30" id="formGroupExampleInput" placeholder="Place/Street" />
                                                </div>
                                            </form>

                                        </Col>

                                    </Row>

                                    <Row>
                                       <Col sm={6}>
                                            <form>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Pincode" />
                                                </div>
                                            </form>

                                        </Col>
                                         <Col sm={6}>
                                            <form>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Landmark" />
                                                </div>
                                            </form>
                                         </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col sm={6}>
                                            <form>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Country" />
                                                </div>
                                            </form>

                                        </Col>

                                        <Col sm={6}>
                                            <form>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="State" />
                                                </div>
                                            </form>

                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm={6}>
                                            <form>
                                                <div class="form-group">
                                                    <label className="account-label">Current Address</label>
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="House Name/No" />
                                                </div>
                                            </form>
                                        </Col>
                                        <Col sm={6}>
                                            <form>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Place/Street" />
                                                </div>
                                            </form>

                                        </Col>
                                    </Row>
                                    <Row>
                                       <Col sm={6}>
                                            <form>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Pincode" />
                                                </div>
                                            </form>

                                        </Col>
                                        <Col sm={6}>  
                                            <form>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Landmark" />
                                                </div>
                                            </form>
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col sm={6}>
                                            <form>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Country" />
                                                </div>
                                            </form>

                                        </Col>
                                        <Col sm={6}>
                                            <form>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="State" />
                                                </div>
                                            </form>

                                        </Col>
                                    </Row>
                                    <form>
                                        <div class="form-group">
                                            <label className="account-label">Email ID</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                                        </div>
                                    </form>
                                    <Row>
                                        <Col sm={6}>
                                            <form>
                                                <label className="account-label">Date of Birth</label>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="DD-MM-YY" />
                                                </div>
                                            </form>

                                        </Col>
                                        <Col sm={6}>
                                            <form>
                                                <label className="account-label">Phone Number</label>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Phone Number" />
                                                </div>
                                            </form>

                                        </Col>
                                    </Row>
                                </div>

                            </div>
                        </Col>
                    </Container>
                    <div className="section-account">
                        <Container>
                            <Col sm={12}>
                                <div className="account-white-box">
                                    <label className="account-label">Picture with ID</label>
                                    <Row>
                                        <div className="border-style-img">
                                            <label for="file-input">
                                                <img className='kycdapp-plus-Img' src={Images.path.plusimg} />
                                            </label>
                                            <input id="file-input" type="file" />
                                        </div>
                                        <div className="border-style-img">
                                            <label for="file-input">
                                                <img className='kycdapp-plus-Img' src={Images.path.plusimg} />
                                            </label>
                                            <input id="file-input" type="file" />
                                        </div>
                                    </Row>
                                    <p className="note-txt-red">*Please submit a picture  in which you are holding your government-issued ID and a paper note.</p>
                                    <div>On the note you should handwrite your user full name , the current date , DOB , signature , and the words "For KYC DAPP"</div>
                                    <ul>
                                        <li className="instruction-txt"><span className="hex-txt">&#x2022;</span> Write KYC DAPP, Your Name, Your Signature and Date on a plain paper</li>
                                        <li className="instruction-txt"><span className="hex-txt">&#x2022;</span> Hold your ID in right hand and the signed paper with your name in left hand and get a clear image clicked.</li>
                                        <li className="instruction-txt"><span className="hex-txt">&#x2022;</span> Make sure that the info on ID is clearly readable and not hidden under fingers along with your photo on it.</li></ul>
                                    <label className="account-label">Photo ID:</label>
                                    <ul>
                                        <li className="instruction-txt">- Passport(open to double - page spread  showing your photo,name and DOB)
                                        </li>
                                        <li className="instruction-txt">- Driver's License (Front and Back)</li>
                                        <li className="instruction-txt">- Government Provided National Identity document (Front and Back).</li>
                                    </ul>
                                    <div className="submit-btn-flex">
                                        <button className="submit-btn">Save</button>
                                    </div>
                                </div>
                            </Col>
                        </Container>
                    </div>
                </div>
            </div>
        );

    }
}


export default Myaccount;