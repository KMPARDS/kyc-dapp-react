import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Images from '../../../Container/Images/Images';
import Axios from 'axios';
import config from '../../../config/config';
import User from '../../../models/User';
import { handleError } from '../../../utils/Apis';

export default class LevelTwo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      platforms: []
    };
  }

  componentDidMount(){
    this.fetchPlatforms();
  }

  fetchPlatforms(){
    Axios.get(config.baseUrl + 'api/kyc-platforms/')
    .then(resp => {
      console.log(resp)

      // if(resp.data?.data){
      //   resp.data.
      //    <Col lg={3} md={6} sm={12} >
      //         <div class="jm-logo" data-toggle="modal" data-target=".bd-example-modal-lg">
      //           <a href="#">
      //             <span>
      //               <img className='Img' src={Images.path.esn} />
      //             </span>
      //           </a>
      //         </div>
      //       </Col>;
      // }
      this.setState({
        platforms: resp.data.data
      });
    })
    .catch(handleError);
  }

  render() {
    return <div>
      <h4 className="m4-txt-level mb40 text-center">KYC Level 2 </h4>
      <div> <i className="fa fa-info-circle themecolor" data-toggle="modal" data-target=".kyclevel2"></i></div>
      <div className="kycrejected mb40 col-md-8 mx-auto ">
        <h3>  <i class="fa fa-times fa-6" aria-hidden="true"></i>
            Your KYC Has been Rejected by the admin </h3>
        <p>KYC DApp is powered on a decentralised network of Era Swap.
        There is no centralized authority to obstructions means
        inbuilt immutably that makes contained data more trustworthy.
        </p>
      </div>

      {/* <!-- info modall start here--> */}
      <div class="modal fade kyclevel2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">KYC Level 2 information</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <h6>KYC on Blockchain Network
                                            Done More Quickly & Securly</h6>
              <p>KYC DApp is powered on a decentralised network of Era Swap.
              There is no centralized authority to obstructions means
                                            inbuilt immutably that makes contained data more trustworthy.</p>

            </div>

          </div>
        </div>
      </div>

      {/* <!-- info modall end here--> */}
      <fieldset class="scheduler-border">
        <legend class="scheduler-border">Others Platforms Document Submission</legend>

        <Row className="mt20">
          {this.state.platforms.length ?
          this.state.platforms.map((platform,i) =>
            <Col lg={3} md={6} sm={12} key={i}>
              <div class="jm-logo" data-toggle="modal" data-target=".bd-example-modal-lg">
                <a href="#">
                  <span>
                    <img className='Img' src={platform.logo} />
                  </span>
                </a>
              </div>
            </Col>
            )
            :
            <div className="text-center">No Platforms Listed Yet</div>
        }


          <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">ERASWAP Network</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">

                  <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Document Submission</legend>
                    <h5 className="mt30">Personal ID Proof</h5>
                    <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80" />

                    <Row className="mt20">

                      <Col sm={6} >
                        <form>
                          <div class="form-group">
                            <label for="formGroupExampleInput">ID Type</label>
                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter your id type" />
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
                        <p className="note-para">JPG OR PNG file only , Max Size allowed is 10 MB </p>

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
                        <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80" />

                        <label for="formGroupExampleInput">Please upload your Addresss Proof herer</label>
                        <p className="note-para">JPG OR PNG file only , Max Size allowed is 10 MB </p>

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
                        <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80" />

                        <label for="formGroupExampleInput"> Selfie with IC Card & holding ERASWAP written on paper "For Eraswap Ecosystem"</label>
                        <p className="note-para">JPG OR PNG file only , Max Size allowed is 10 MB </p>

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

              </div>
            </div>
          </div>

{/*
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.swapperwall} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.timeally} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.timeallyclub} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.daap} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.eraswapwallet} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.timeswappers} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.dayswappers} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.buzcafe} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.eraswapacademy} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.betdeex} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.computeexmultiexchange} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.faithminus} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.vof} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.certidapp} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.kycdapp} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.bookingdapp} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.charitydapp} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.rentingdapp} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.curedapp} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.dateswappers} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.coupondapp} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.recyclingdapp} />
                </span>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} >
            <div class="jm-logo">
              <a href="#">
                <span>
                  <img className='Img' src={Images.path.poolingdapp} />
                </span>
              </a>
            </div>
          </Col> */}


        </Row>
      </fieldset>


    </div>;
  }
}