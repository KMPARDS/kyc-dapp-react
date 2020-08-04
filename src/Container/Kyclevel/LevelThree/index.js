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
import { UserContext } from '../../../utils/user.context';
export default class LevelThree extends React.Component {
                 static contextType = UserContext;

                 constructor(props) {
                   super(props);
                   this.state = {
                     message: ACCEPT_PRESET,
                     signature: '',
                     authorizeESN: ACCEPT_ESN,
                   };

                   this.signMessage = this.signMessage.bind(this);
                   this.declineAuthorizeESN = this.declineAuthorizeESN.bind(
                     this
                   );
                   this.acceptAuthorizeESN = this.acceptAuthorizeESN.bind(this);
                   this.handleChange = this.handleChange.bind(this);
                 }

                 handleChange(e) {
                   switch (e.target.name) {
                     case 'message':
                       if (e.target.value?.length)
                         this.setState({
                           message: e.target.value,
                           errors: {
                             ...this.state.errors,
                             message: null,
                           },
                         });
                       else {
                         this.setState({
                           message: e.target.value,
                           errors: {
                             message:
                               'Please enter message or click TimeAlly Era Swap Network Preset',
                           },
                         });
                       }
                       break;
                     default:
                       break;
                   }
                 }

                 async signMessage() {
                   try {
                     if (!this.context?.user?.walletAddress)
                       return Swal.fire(
                         'Connect To Wallet',
                         'Please Connect to wallet and try again',
                         'warning'
                       );
                     if (!this.state.message?.length)
                       return this.setState({
                         errors: {
                           message:
                             'Please enter message or click on TimeAlly Era Swap Network button for preset message',
                         },
                       });

                     const result = await Swal.fire({
                       title: 'Are you sure to sign message?',
                       text:
                         'Your signature will be used for TimeAlly Account Verification!',
                       icon: 'warning',
                       showCancelButton: true,
                       confirmButtonColor: '#3085d6',
                       cancelButtonColor: '#d33',
                       confirmButtonText: 'Yes, sign it!',
                     });
                     if (result.value) {
                       const signature = await this.context?.user?.wallet?.signMessage(
                         this.state.message
                       );
                       const formData = new FormData();
                       formData.append('signature', signature);
                       formData.append('message', this.state.message);
                       formData.append('authorizeESN', this.state.authorizeESN);
                       const signApiResponse = await Axios.post(
                         config.baseUrl + 'apis/kyc-level-three/save',
                         formData,
                         {
                           headers: {
                             Authorization: this.context?.user?.token,
                           },
                         }
                       );
                       console.log('signApiResponse', signApiResponse);

                       this.setState({ signature });
                       Swal.fire(
                         'Signed!',
                         'You have successfully signed the message.',
                         'success'
                       );
                     }
                   } catch (e) {
                     console.log(e.response);
                     handleError(e);
                     // Swal.fire('Sign In!','Please try to connect to wallet and try again','warning');
                   }
                 }

                 acceptAuthorizeESN() {
                   this.setState({
                     authorizeESN: ACCEPT_ESN,
                     message: ACCEPT_PRESET,
                   });
                 }

                 declineAuthorizeESN() {
                   this.setState({
                     authorizeESN: REJECT_ESN,
                     message: REJECT_PRESET,
                   });
                 }

                 render() {
                   return (
                     <div>
                       <h4 className="m4-txt-level mb40 text-center">
                         KYC STEP 3
                       </h4>
                       <span
                         className="level-info"
                         style={{ color: 'darkblue' }}
                       >
                         1. In KYC Step 3, Click on ‘Sign this Message' to
                         finish your KYC process<br></br>
                         2. You will get a Pop-up message for your confirmation
                         ‘Are you sure to sign message?’<br></br>
                         3. Click on ‘Yes, Sign it!’<br></br>
                         4. A successful submission Pop-Up message will appear
                         ‘You have successfully signed the message’<br></br>
                       </span>
                       <br></br>
                       <br></br>
                       <div>
                         {' '}
                         <i
                           className="fa fa-info-circle themecolor"
                           data-toggle="modal"
                           data-target=".kyclevel3"
                         ></i>
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
                               <h5
                                 className="modal-title"
                                 id="exampleModalLabel"
                               >
                                 KYC Step 3 information
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
                               <h6>
                                 KYC on Blockchain Network Done More Quickly &
                                 Securly
                               </h6>
                               <p>
                                 KYC DApp is powered on a decentralised network
                                 of Era Swap. There is no centralized authority
                                 to obstructions means inbuilt immutably that
                                 makes contained data more trustworthy.
                               </p>
                             </div>
                           </div>
                         </div>
                       </div>

                       {/* <!-- info modall end here--> */}
                       <fieldset class="scheduler-border es-trasnferbox kyclevel4">
                         <legend class="scheduler-border">
                           Signing a message using your wallet
                         </legend>
                         <Row className="mt20">
                           <Col sm={12} className="mx-auto ">
                             <h6>
                               On the blockchain, identity is the wallet address
                               and not a human name or face. When you sign a
                               message, a unique signature gets generated for
                               the message using your wallet's private key. You
                               can use this function to prove that you have the
                               ownership of the private key.
                             </h6>
                             <h6>
                               Presets:
                               <br />
                               <button
                                 className="btn btn-sm mb10 mt10"
                                 type="button"
                                 onClick={this.acceptAuthorizeESN.bind(
                                   this,
                                   true
                                 )}
                               >
                                 Authorize TimeAlly Era Swap Network
                               </button>
                               {/* <button
                    className="btn btn-default btn-sm mb10"
                    type="button"
                    onClick={this.declineAuthorizeESN.bind(this,true)}
                  >
                    Decline TimeAlly Era Swap Network
                  </button> */}
                             </h6>
                             <h6>
                               Update your message below and then click on sign
                             </h6>

                             <div className="yourwallet">
                               <textarea
                                 id="w3review"
                                 rows="4"
                                 cols="100"
                                 placeholder=""
                                 name="message"
                                 value={this.state.message}
                                 onChange={this.handleChange}
                               />
                               {this.state.errors?.message && (
                                 <div className="error">
                                   {this.state.errors.message}
                                 </div>
                               )}
                               <button
                                 type="button"
                                 className="btn"
                                 onClick={this.signMessage}
                               >
                                 Sign this message
                               </button>
                               {this.state.signature ? (
                                 <>
                                   <h6 className="mt10">Your signature:</h6>

                                   <div className="yourwallet ">
                                     <div className="wallet-address">
                                       {this.state.signature}
                                     </div>
                                   </div>
                                 </>
                               ) : null}
                             </div>
                           </Col>
                         </Row>
                       </fieldset>
                     </div>
                   );
                 }
               }
