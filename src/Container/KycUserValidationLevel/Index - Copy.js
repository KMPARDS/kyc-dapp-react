import React, { Component } from 'react';
import './LevelOne.css'
import Images from '../../Container/Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import  MultiStep  from 'react-multistep';

const FirstLevel = (props) => {
    return (<div> 

                <h4 className="m4-txt-level mb40 text-center">Identity Verification Document</h4>

                <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Personal Info</legend>
                    <div class="control-group">
                        <label class="control-label input-label" for="startTime">Start :</label>
                        <div class="controls bootstrap-timepicker">
                            <input type="text" class="datetime" type="text" id="startTime" name="startTime" placeholder="Start Time" />
                            <i class="icon-time"></i>
                        </div>
                    </div>
                </fieldset>
                <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Address Details</legend>
                    <div class="control-group">
                        <label class="control-label input-label" for="startTime">Start :</label>
                        <div class="controls bootstrap-timepicker">
                            <input type="text" class="datetime" type="text" id="startTime" name="startTime" placeholder="Start Time" />
                            <i class="icon-time"></i>
                        </div>
                    </div>
                </fieldset>
                <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Upload Document</legend>
                    <div class="control-group">
                        <label class="control-label input-label" for="startTime">Start :</label>
                        <div class="controls bootstrap-timepicker">
                            <input type="text" class="datetime" type="text" id="startTime" name="startTime" placeholder="Start Time" />
                            <i class="icon-time"></i>
                        </div>
                    </div>
                </fieldset>

                    <Row>
                        <Col sm={4}>
                            <label for="formGroupExampleInput">First Name</label>
                            <div class="input-group">

                                <div class="input-group-prepend">
                                    <select class="selectpicker">
                                        <option>Mr</option>
                                        <option>Mrs</option>
                                        <option>Ms</option>
                                    </select>
                                </div>
                                <input type="text" class="form-control" aria-label="Text input with dropdown button" />
                            </div>
                        </Col>
                        <Col sm={4}>
                            <form>
                                <div class="form-group">
                                    <label for="formGroupExampleInput">Middle Name</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Middle Name" />
                                </div>
                            </form>
                        </Col>
                        <Col sm={4}>
                            <form>
                                <div class="form-group">
                                    <label for="formGroupExampleInput">Last Name</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Last Name" />
                                </div>
                            </form>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <form>
                                <div class="form-group">
                                    <label for="formGroupExampleInput">Date of Birth</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="DD-MM-YY" />
                                </div>
                            </form>
                        </Col>
                        <Col sm={6}>
                            <form>
                                <div class="form-group">
                                    <label for="formGroupExampleInput">Nationality</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Nationality" />
                                </div>
                            </form>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6} >
                            <form>
                                <div class="form-group">
                                    <label for="formGroupExampleInput">Phone Number</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Phone Number" />
                                </div>
                            </form>
                        </Col>
                        <Col sm={6} >
                            <form>
                                <div class="form-group">
                                    <label for="formGroupExampleInput">Place of Birth</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Place of Birth" />
                                </div>
                            </form>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6} >
                            <form>
                                <div class="form-group">
                                    <label for="formGroupExampleInput">Martial Status</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Martial Status" />
                                </div>
                            </form>
                        </Col>
                        <Col>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6} >
                            <form>
                                <div class="form-group">
                                    <label for="formGroupExampleInput">Address</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter your residential Address" />
                                </div>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} >
                            <form>
                                <div class="form-group">
                                    <label for="formGroupExampleInput">ID Type</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                                </div>
                            </form>
                        </Col>
                        <Col sm={6} >
                            <form>
                                <div class="form-group">
                                    <label for="formGroupExampleInput">ID Number</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter your ID Number" />
                                </div>
                            </form>
                        </Col>
                        <Col sm={6} >
                            <form>
                                <div class="form-group">
                                    <label for="formGroupExampleInput">User Name</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter your User Name" />
                                </div>
                            </form>
                        </Col>
                    </Row>


                            <label for="formGroupExampleInput">ID Image Upload here</label>
                            <p className="note-para">JPG OR PNG file only , Max Size allowed is 2 MB </p>

                            <div className="flex-choose">
                                <form className="select-style" action="/action_page.php">
                                    <input type="file" id="myfile" name="myfile" /><br /><br />
                                </form>
                            </div>
                            <div>
                            <Row>
                            <Col sm={4}>
                            </Col>
                            <Col sm={4}>
                            <div className="border-style-img">
                            <img className='kycdapp-plus-Img' src={Images.path.plusimg} />
                            </div>

                        </Col>
                        </Row>
                        <div className="submit-btn-flex">
                                <button className="submit-btn">Submit</button>
                            </div>
                        </div>

            </div>)
}

const SecondLevel = (props) => {
    return <div>
        <h1>Level 2</h1>
    </div>
}

const ThirdLevel = (props) => {
    return <div>
        <h1>Level 3</h1>
    </div>
}

class LevelOne extends Component {
    steps = [
              {name: 'FirstLevel', component: <FirstLevel/>},
              {name: 'SecondLevel', component: <SecondLevel/>},
              {name: 'ThirdLevel', component: <ThirdLevel/>},
            ];

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

                    <Container>
                        <Col sm={12}>
                            <div className="kyc-white-box innerpage-box">
                                <h4 className="feature-head text-left">KYC LEVEL</h4>
                                <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80"/>
                                <MultiStep showNavigation={true} steps={this.steps}/>
                            </div>
                        </Col>
                    </Container>
                </div>
            </div>
        );

    }
}


export default LevelOne;