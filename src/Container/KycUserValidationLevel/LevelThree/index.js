import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Images from '../../../Container/Images/Images';
import User from '../../../models/User';
import Swal from 'sweetalert2';
import { PRESET, ACCEPT_ESN, REJECT_ESN, ACCEPT_PRESET, REJECT_PRESET } from '../../../utils/constants';
import Axios from 'axios';
import config from '../../../config/config';
import { errors } from 'ethers';
import { handleError } from '../../../utils/Apis';
export default class LevelThree extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: ACCEPT_PRESET,
      signature: '',
      authorizeESN: ACCEPT_ESN
    }

    this.signMessage = this.signMessage.bind(this);
    this.declineAuthorizeESN = this.declineAuthorizeESN.bind(this);
    this.acceptAuthorizeESN = this.acceptAuthorizeESN.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    switch(e.target.name){
      case 'message':
          if(e.target.value?.length)
            this.setState({
              message: e.target.value,
              errors: {
                ...this.state.errors,
                message: null
              }
            });
          else {
            this.setState({
              message: e.target.value,
              errors: {
                message: 'Please enter message or click TimeAlly Era Swap Network Preset'
              }
            })
          }
        break;
      default:
        break;
    }
  }


  async signMessage(){
    try {
      if(!User.getWallet())
        return Swal.fire('Connect To Wallet', 'Please Connect to wallet and try again','warning');
      if(!this.state.message?.length)
          return this.setState({
            errors: {
              message: 'Please enter message or click on TimeAlly Era Swap Network button for preset message'
            }
          });

      const result = await Swal.fire({
        title: 'Are you sure to sign message?',
        text: "Your signature will be used for TimeAlly Account Verification!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, sign it!'
      })
      if (result.value) {
        const signature = await User.getWallet().signMessage(
          this.state.message
        );
        const formData = new FormData();
        formData.append('signature',signature);
        formData.append('message',this.state.message);
        formData.append('authorizeESN',this.state.authorizeESN);
        const signApiResponse = await Axios.post(config.baseUrl + 'apis/kyc-level-three/save',
        formData,
        {
          headers: {
            Authorization: User.getToken()
          }
        });
        console.log('signApiResponse',signApiResponse);

        this.setState({ signature });
        Swal.fire(
          'Signed!',
          'You have successfully signed the message.',
          'success'
        )
      }
    } catch(e) {
      console.log(e.response);
      handleError(e);
      // Swal.fire('Sign In!','Please try to connect to wallet and try again','warning');
    }
  }

  acceptAuthorizeESN(){
    this.setState({
      authorizeESN: ACCEPT_ESN,
      message: ACCEPT_PRESET
    })
  }

  declineAuthorizeESN(){
    this.setState({
      authorizeESN: REJECT_ESN,
      message: REJECT_PRESET
    })
  }

  render() {
    return (
      <div className="level3">
        <h4 className="m4-txt-level mb40 text-center ">KYC LEVEL 3</h4>
        <span className="level-info" style={{color: 'darkblue',}}>
          1. In KYC Level 2, select specific Era Swap Ecosystem Platform by clicking on the platform logo, you need to do Level 2 KYC for. Fill up platform specific     details required and click on ‘Submit’.<br></br>
          2. If a Era Swap Ecosystem member wants to move to Level 3, then click on ‘Next’ to go to Level 3.<br></br>
          3. The charges for Level 3 KYC will be applicable from 21st of August 2020 onwards. <br></br>
          4. Upload the relevant Documents / Images / Short Videos and click on 'Submit' Button<br></br>

      
        </span>
        <br></br>
        <br></br>
        <div className="text-center mb30">
          <p>Please Complete Your Level 1 & 2 KYC for Verification of Identity, If already done then Proceed with Level 3 as EXPERT seller of your Business or Skill</p>
          <button type="submit" class="btn btn-primary mr-2">Start from Level 1</button>
        </div>
        {/* <!-- info modall start  here--> */}
        <div
          className="modal fade kyclevel3"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  KYC Level 3 information
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h6>KYC on Blockchain Network Done More Quickly & Securly</h6>
                <p>
                  KYC DApp is powered on a decentralised network of Era Swap.
                  There is no centralized authority to obstructions means
                  inbuilt immutably that makes contained data more trustworthy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- info modall end here--> */}
        <fieldset class="scheduler-border es-trasnferbox kyclevel4 ">
          <legend class="scheduler-border">
          Upload your 60 Second Self Recorded Video about your Skills / Business as EXPERT seller
          </legend>
          <Row className="mt20 text-center">
            <div className="tcol-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto mt10 mb10">
               <div class="border-style-img ">
                  {/* <img className="kyc-hero-img" src={Images.path.videoupload} /> */}
               </div>
            </div>  
          </Row>
        </fieldset>

        <fieldset class="scheduler-border es-trasnferbox kyclevel4 ">
          <legend class="scheduler-border">
          Document of Appreciation
          </legend>
          <Row className="mt20 text-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto mt10 mb10">
               <p>Upload your Document here, Document Max Size allowed is 5 MB</p>
               {/*  <div id="mulitplefileuploader">Upload</div>
              <form method="post" action="#" id="#">
                      <div class="form-group files">
                    <label>Upload Your File </label>
                    <input type="file" class="form-control" multiple=""/>
                  </div>
                </form> */}
                <form class="form">
                  <div class="file-upload-wrapper" data-text="Select your file!">
                    <input name="file-upload-field" type="file" class="file-upload-field" value=""/>
                  </div>
                  <div class="file-upload-wrapper" data-text="Select your file!">
                    <input name="file-upload-field" type="file" class="file-upload-field" value=""/>
                  </div>
                </form>
               {/* <div class="border-style-img mb20">
                   <img className="kyc-hero-img" src={Images.path.videoupload} /> 
               </div> */}
               <a href=""><div className="red-circle"><i class="fa fa-plus-circle" aria-hidden="true"></i></div></a>
               <p>When you have add more Document then click on 'Plus' Button</p>
            </div>  
          </Row>
        </fieldset>

        <fieldset class="scheduler-border es-trasnferbox kyclevel4 ">
          <legend class="scheduler-border">
          Feedback  from Your Customers
          </legend>
          <Row className="mt20">
            <div className="col-lg-12">
               <h3>Videos</h3>
               <p>Upload your Video here, Video Max Size allowed is 25 MB</p>
               <div className="row">
                   <div className="col-lg-3"> 
                        <div class="border-style-img mb20">
                              {/* <img className="kyc-hero-img" src={Images.path.videoupload} /> */}
                          </div>
                     </div>
                     <div className="col-lg-9"> 
                        <div class=" border-style-img-fullwidth mb20">
                          <p>Uploaded Videos</p>
                              {/* <img className="kyc-hero-img" src={Images.path.videoupload} /> */}
                          </div>
                     </div>
                   
                </div>
               <p>Upload your Image here, JPG OR PNG file only, Max Size allowed is 10 MB</p>
               <div className="row">
                   <div className="col-lg-3"> 
                        <div class="border-style-img mb20">
                              {/* <img className="kyc-hero-img" src={Images.path.videoupload} /> */}
                          </div>
                     </div>
                     <div className="col-lg-9"> 
                        <div class=" border-style-img-fullwidth mb20">
                             <p>Uploaded Images</p>
                              {/* <img className="kyc-hero-img" src={Images.path.videoupload} /> */}
                          </div>
                     </div>
                </div>
               <p>Upload your Document here, Document Max Size allowed is 5 MB</p>
               <div className="row">
                   <div className="col-lg-3"> 
                        <div class="border-style-img mb20">
                          
                              {/* <img className="kyc-hero-img" src={Images.path.videoupload} /> */}
                          </div>
                     </div>
                     <div className="col-lg-9"> 
                        <div class=" border-style-img-fullwidth mb20">
                        <p>Uploaded Documents</p>
                              {/* <img className="kyc-hero-img" src={Images.path.videoupload} /> */}
                          </div>
                     </div>
                   
                </div>
            </div>  
          </Row>
        </fieldset>

        <fieldset class="scheduler-border es-trasnferbox kyclevel4 ">
          <legend class="scheduler-border">
          Testimonials
          </legend>
          <Row className="mt20 text-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto mt10 mb10">
            <form class="form">
                  <div class="file-upload-wrapper" data-text="Select your file!">
                    <input name="file-upload-field" type="file" class="file-upload-field" value=""/>
                  </div>
                  <div class="file-upload-wrapper" data-text="Select your file!">
                    <input name="file-upload-field" type="file" class="file-upload-field" value=""/>
                  </div>
                </form>
               {/* <div class="border-style-img mb20">
                   <img className="kyc-hero-img" src={Images.path.videoupload} /> 
               </div> */}
               <a href=""><div className="red-circle"><i class="fa fa-plus-circle" aria-hidden="true"></i></div></a>
               <p>When you have add more Document then click on 'Plus' Button</p>
            </div>  
          </Row>
        </fieldset>

        <fieldset class="scheduler-border es-trasnferbox kyclevel4 ">
          <legend class="scheduler-border">
          Additional Certificates of Excellence
          </legend>
          <Row className="mt20 text-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto mt40 mb40">
            <form class="form">
                  <div class="file-upload-wrapper" data-text="Select your file!">
                    <input name="file-upload-field" type="file" class="file-upload-field" value=""/>
                  </div>
                  <div class="file-upload-wrapper" data-text="Select your file!">
                    <input name="file-upload-field" type="file" class="file-upload-field" value=""/>
                  </div>
                </form>

              
               {/* <div class="border-style-img mb20">
                   <img className="kyc-hero-img" src={Images.path.videoupload} /> 
               </div> */}
                <a href=""><div className="red-circle"><i class="fa fa-plus-circle" aria-hidden="true"></i></div></a>
               <p>When you have add more Document then click on 'Plus' Button</p>
            </div>  
          </Row>
        </fieldset>

        <fieldset class="scheduler-border es-trasnferbox kyclevel4 ">
          <legend class="scheduler-border">
          Recommendation
          </legend>
          <Row className="mt20">
            <div className="col-lg-12">
                <p>Upload your Image here, JPG OR PNG file only, Max Size allowed is 10 MB</p>
               <div className="row">
                   <div className="col-lg-3"> 
                        <div class="border-style-img mb20">
                       
                              {/* <img className="kyc-hero-img" src={Images.path.videoupload} /> */}
                          </div>
                     </div>
                     <div className="col-lg-9"> 
                        <div class=" border-style-img-fullwidth mb20">
                        <p>Uploaded Images</p>
                              {/* <img className="kyc-hero-img" src={Images.path.videoupload} /> */}
                          </div>
                     </div>
                   
                </div>
               <p>Upload your Document here, Document Max Size allowed is 5 MB</p>
               <div className="row">
                   <div className="col-lg-3"> 
                        <div class="border-style-img mb20">
                           
                              {/* <img className="kyc-hero-img" src={Images.path.videoupload} /> */}
                          </div>
                     </div>
                     <div className="col-lg-9"> 
                        <div class=" border-style-img-fullwidth mb20">
                               <p>Uploaded Documents</p>
                              {/* <img className="kyc-hero-img" src={Images.path.videoupload} /> */}
                          </div>
                     </div>
                   
                </div>
            </div>  
          </Row>
        </fieldset>
        
 
      </div>
    );
  }
}
