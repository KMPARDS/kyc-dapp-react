import React, { Component } from 'react';
import './Kyclevel.css'
import Images from '../../Container/Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import  MultiStep  from 'react-multistep';

const Kyclevel = (props) => {
    return (<div>
               
                <h4 className="m4-txt-level mb40 text-center">KYC Level 1</h4>
                 
                <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Personal Info</legend>
                    
                                    <Row className="mt20">
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
                                         <Col sm={12} >
                                            <form>
                                                <div class="form-group">
                                                    <label for="formGroupExampleInput">User Name</label>
                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter your User Name" />
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
                </fieldset>
                <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Address Details</legend>
                                    <Row className="mt20">
                                        <Col sm={6} >
                                            <form>
                                                <div class="form-group">
                                                    <label for="formGroupExampleInput">Current Address</label>
                                                    <textarea id="w3review" name="w3review" rows="4" cols="100"  placeholder="Enter your Current Address"/>
                                                    
                                                </div>
                                            </form>
                                        </Col>
                                        <Col sm={6} >
                                            <form>
                                                <div class="form-group">
                                                    <label for="formGroupExampleInput">Permanent Address</label>
                                                     <textarea id="w3review" name="w3review" rows="4" cols="100"  placeholder="Enter your Permanent Address"/>
                                                </div>
                                            </form>
                                        </Col>
                                    </Row>
                </fieldset>
                <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Document Submission</legend>
                     <h5 className="mt30">Personal ID Proof</h5>
                     <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80"/>

                            <Row className="mt20">
                      
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
                                        <label for="formGroupExampleInput"> ID Proof</label>
                                        <p className="note-para">JPG OR PNG file only , Max Size allowed is 2 MB </p>
                                        
                                        <div className="flex-choose">
                                            <form className="select-style" action="/action_page.php">
                                                <input type="file" id="myfile" name="myfile" /><br /><br />
                                            </form>
                                        </div>
                                            <div>
                                            <Row>
                                            
                                            <Col sm={5}>    
                                            <div className="border-style-img">
                                            <img className='kycdapp-plus-Img' src={Images.path.plusimg} />
                                            </div>
                                            
                                        </Col>
                                        </Row>
                                        
                                        </div>
                                 </Col>

                            </Row>

                               <Row className="mt20">
                                         <Col sm={6} >
                                                <h5 className="mt40">Addresss Proof</h5>
                                                <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80"/>
                              
                                                <label for="formGroupExampleInput">Please upload your Addresss Proof herer</label>
                                                <p className="note-para">JPG OR PNG file only , Max Size allowed is 2 MB </p>
                                                
                                                <div className="flex-choose">
                                                    <form className="select-style" action="/action_page.php">
                                                        <input type="file" id="myfile" name="myfile" /><br /><br />
                                                    </form>
                                                </div>
                                                    <div>
                                                    <Row>
                                                  
                                                    <Col sm={12}>    
                                                    <div className="border-style-img">
                                                    <img className='kycdapp-plus-Img' src={Images.path.plusimg} />
                                                    </div>
                                                    
                                                </Col>
                                                </Row>
                                                
                                                </div>
                                         </Col>
                                          <Col sm={6} >
                                                 <h5 className="mt40">Selfie with </h5>
                                                 <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80"/>
                                
                                                <label for="formGroupExampleInput"> Selfi with IC Card & holding ERASWAP written on paper "For Eraswap Ecosystem"</label>
                                                <p className="note-para">JPG OR PNG file only , Max Size allowed is 2 MB </p>
                                                
                                                <div className="flex-choose">
                                                    <form className="select-style" action="/action_page.php">
                                                        <input type="file" id="myfile" name="myfile" /><br /><br />
                                                    </form>
                                                </div>
                                                    <div>
                                                    <Row>
                                                  
                                                    <Col sm={12}>    
                                                    <div className="border-style-img">
                                                    <img className='kycdapp-plus-Img' src={Images.path.plusimg} />
                                                    </div>
                                                    
                                                </Col>
                                                </Row>
                                                
                                                </div>
                                         </Col>
                                 </Row>


                                <Row className="mt20">
                                        <div className="submit-btn-flex">
                                                    <button className="submit-btn">Submit</button>
                                                </div>
                                 </Row>
                </fieldset>


                   
                    
                    
                    
                
            </div>)
}

const SecondLevel = (props) => {
    return <div>
    <h4 className="m4-txt-level mb40 text-center">KYC Level 2</h4>
         <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Others Platforms Document Submission</legend>

                         <Row className="mt20">
                            <Col sm={3}>
                               <div class="jm-logo" data-toggle="modal" data-target=".bd-example-modal-lg">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.esn} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            
                            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                              <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">

                                                    <fieldset class="scheduler-border">
                                                            <legend class="scheduler-border">Document Submission</legend>
                                                             <h5 className="mt30">Personal ID Proof</h5>
                                                             <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80"/>

                                                                    <Row className="mt20">
                                                              
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
                                                                                <label for="formGroupExampleInput"> ID Proof</label>
                                                                                <p className="note-para">JPG OR PNG file only , Max Size allowed is 2 MB </p>
                                                                                
                                                                                <div className="flex-choose">
                                                                                    <form className="select-style" action="/action_page.php">
                                                                                        <input type="file" id="myfile" name="myfile" /><br /><br />
                                                                                    </form>
                                                                                </div>
                                                                                    <div>
                                                                                    <Row>
                                                                                    
                                                                                    <Col sm={5}>    
                                                                                    <div className="border-style-img">
                                                                                    <img className='kycdapp-plus-Img' src={Images.path.plusimg} />
                                                                                    </div>
                                                                                    
                                                                                </Col>
                                                                                </Row>
                                                                                
                                                                                </div>
                                                                         </Col>

                                                                    </Row>

                                                                       <Row className="mt20">
                                                                                 <Col sm={6} >
                                                                                        <h5 className="mt40">Addresss Proof</h5>
                                                                                        <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80"/>
                                                                      
                                                                                        <label for="formGroupExampleInput">Please upload your Addresss Proof herer</label>
                                                                                        <p className="note-para">JPG OR PNG file only , Max Size allowed is 2 MB </p>
                                                                                        
                                                                                        <div className="flex-choose">
                                                                                            <form className="select-style" action="/action_page.php">
                                                                                                <input type="file" id="myfile" name="myfile" /><br /><br />
                                                                                            </form>
                                                                                        </div>
                                                                                            <div>
                                                                                            <Row>
                                                                                          
                                                                                            <Col sm={12}>    
                                                                                            <div className="border-style-img">
                                                                                            <img className='kycdapp-plus-Img' src={Images.path.plusimg} />
                                                                                            </div>
                                                                                            
                                                                                        </Col>
                                                                                        </Row>
                                                                                        
                                                                                        </div>
                                                                                 </Col>
                                                                                  <Col sm={6} >
                                                                                         <h5 className="mt40">Selfie with </h5>
                                                                                         <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80"/>
                                                                        
                                                                                        <label for="formGroupExampleInput"> Selfi with IC Card & holding ERASWAP written on paper "For Eraswap Ecosystem"</label>
                                                                                        <p className="note-para">JPG OR PNG file only , Max Size allowed is 2 MB </p>
                                                                                        
                                                                                        <div className="flex-choose">
                                                                                            <form className="select-style" action="/action_page.php">
                                                                                                <input type="file" id="myfile" name="myfile" /><br /><br />
                                                                                            </form>
                                                                                        </div>
                                                                                            <div>
                                                                                            <Row>
                                                                                          
                                                                                            <Col sm={12}>    
                                                                                            <div className="border-style-img">
                                                                                            <img className='kycdapp-plus-Img' src={Images.path.plusimg} />
                                                                                            </div>
                                                                                            
                                                                                        </Col>
                                                                                        </Row>
                                                                                        
                                                                                        </div>
                                                                                 </Col>
                                                                         </Row>


                                                                        <Row className="mt20">
                                                                                <div className="submit-btn-flex">
                                                                                            <button className="submit-btn">Submit</button>
                                                                                        </div>
                                                                         </Row>
                                                        </fieldset>


                                   

                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                  </div>
                                </div>
                              </div>
                            </div>


                            <Col sm={3}>
                                <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.swapperwall} />
                                        </span>
                                    </a> 
                                </div>
                             </Col>
                            <Col sm={3}>
                               <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.timeally} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            <Col sm={3}>
                                  <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.timeallyclub} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.daap} />
                                        </span>
                                    </a> 
                                </div>
                             </Col>
                            <Col sm={3}>
                               <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.eraswapwallet} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            <Col sm={3}>
                                  <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.timeswappers} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.dayswappers} />
                                        </span>
                                    </a> 
                                </div>
                             </Col>
                            <Col sm={3}>
                               <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.buzcafe} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            <Col sm={3}>
                                  <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.eraswapacademy} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.betdeex} />
                                        </span>
                                    </a> 
                                </div>
                             </Col>
                            <Col sm={3}>
                               <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.computeexmultiexchange} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            <Col sm={3}>
                                  <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.faithminus} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.vof} />
                                        </span>
                                    </a> 
                                </div>
                             </Col>
                            <Col sm={3}>
                               <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.certidapp} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            <Col sm={3}>
                                  <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.kycdapp} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.bookingdapp} />
                                        </span>
                                    </a> 
                                </div>
                             </Col>
                            <Col sm={3}>
                               <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.charitydapp} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            <Col sm={3}>
                                  <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.rentingdapp} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.curedapp} />
                                        </span>
                                    </a> 
                                </div>
                             </Col>
                            <Col sm={3}>
                               <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.dateswappers} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            <Col sm={3}>
                                  <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.coupondapp} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.recyclingdapp} />
                                        </span>
                                    </a> 
                                </div>
                             </Col>
                            <Col sm={3}>
                               <div class="jm-logo">
                                    <a href="#">
                                        <span>
                                          <img className='Img'  src={Images.path.poolingdapp} />
                                        </span>
                                    </a> 
                                </div>
                            </Col>
                           
                            
                        </Row>
                </fieldset>


    </div>
}

const ThirdLevel = (props) => {
    return <div>
    <h4 className="m4-txt-level mb40 text-center">KYC Level 3</h4>
        <fieldset class="scheduler-border es-trasnferbox">
                    <legend class="scheduler-border">Transfer Old Tokens</legend>
                                    <Row className="mt20">
                                        <Col sm={8} className="mx-auto ">
                                         
                                            <form>
                                                <h6>TimeAlly stakings, PET and TSGAP will be migrated automatically and you do not need to do anything. Only liquid tokens are required to transfer for migration.</h6>
                                              <div className="yourwallet ">
                                                <h5 className="feature-head text-left">Your Wallet</h5>
                                                
                                                <div className="wallet-address">
                                                    1222122322asdasd5sdas5da5sda1sd5asdaasd5aasd45as4dh
                                                </div>
                                                 <div class="form-group mt20">
                                                    <label for="formGroupExampleInput">Your Total old Token Liquid Balance <small>(This isonly  Liquid Token Balance) </small></label>
                                                    <div className="tot-ammount">1.00001515115150</div>
                                                </div>
                                              </div>

                                               <h6>You have to send this old token to this admin wallet </h6>
                                                <div className="yourwallet ">
                                                    <h5 className="feature-head text-left">Admin Wallet</h5>
                                                    <div className="wallet-address">
                                                        23813995sdasdfsdfsdf586vsdfg822de5f4asdf5asdfassf
                                                    </div>
                                                   
                                                </div>
                                                <div className="submit-btn-flex">
                                                   <button className="submit-btn">Transfer Now</button>
                                                 </div>
                                                    
                                            </form>
                                          
                                        </Col>
                                       
                                    </Row>
                </fieldset>

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


export default Kyclevel;