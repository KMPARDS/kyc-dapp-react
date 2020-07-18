import React, { Component } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { RecordRTCPromisesHandler } from 'recordrtc';
import config from '../../../config/config';
import Swal from 'sweetalert2'
import { Col, Row } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import { SUPPORTED_FORMATS, FILE_SIZE } from '../../../utils/constants';
import User from '../../../models/User';
import CustomFileInput from "../../../Component/CustomFileInput/CustomFileInput";
import { handleError } from '../../../utils/Apis';
import  Images  from '../../Images/Images';
export default class FirstLevel extends Component {

  validationSchema = {};

  constructor(props) {
    super(props);
    this.state = {
      kyc: {
        // idAttachment: Images.path.idProof,
        // addressProofAttachment: '',
        // selfieAttachment: ''
      },
      canApply: true
    };

    this.validationSchema = {
      salutation: Yup.string()
        .required('salutation is required'),
      firstname: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('First Name is required'),

      middlename: Yup.string()
        .min(3, 'Middle Name must be at least 3 characters')
        .required('Middle Name is required'),
      lastname: Yup.string()
        .min(3, 'Last Name must be at least 3 characters')
        .required('Last Name is required'),
      username: Yup.string()
        .min(3, 'User Name must be at least 3 characters')
        .required('User Name is required'),
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      dob: Yup.string()
        .required('Date of Birth is required'),
      nationality: Yup.string()
        .required('nationality is required'),
      contactNumber: Yup.string()
        .min(6, 'Minimum 6 digit phone Number')
        .max(10, 'Maximum 10 digit phone Number')
        .required('Phone Number is required'),
      placeOfBirth: Yup.string()
        .required('Place of Birth  is required'),
      maritalStatus: Yup.string()
        .required('Maritial status  is required'),
      address: Yup.string()
        .required('Current Address  is required'),
      pincode: Yup.string()
        .min(4, 'Minimum 6 digit phone Number')
        .max(6, 'Maximum 10 digit phone Number')
        .required('Pincode is required'),
      idType: Yup.string()
        .required('Id Type is required'),
      idNumber: Yup.string()
        .required('Id Number  is required'),
      idAttachment: Yup
        .mixed()
        .test(
          "idAttachementRequired",
          'Id Attachment Required',
          value => value
        )
        .test(
          "idAttachmentFormat",
          "Unsupported Format",
          value => { console.log('value', value); return value && SUPPORTED_FORMATS.includes(value.type); }
        )
        .test(
          "idAttachmentSize",
          "File is too large",
          value => {
            return value && (value.size <= FILE_SIZE)
          }
        )
        .required("Id Attachment is required"),
      addressProofAttachment: Yup
        .mixed()
        .test(
          "idAttachementRequired",
          'Address Attachment Required',
          value => value
        )
        .test(
          "addressProofAttachmentFormat",
          "Unsupported Format",
          value => value && SUPPORTED_FORMATS.includes(value.type)
        )
        .test(
          "addressProofAttachmentSize",
          "File is too large",
          value => value && (value.size <= FILE_SIZE)
        )
        .required('Address Proof Attachment  is required'),
      selfieAttachment: Yup.mixed()
        .test(
          "idAttachementRequired",
          'Selfie Attachment Required',
          value => value
        )
        .test(
          "selfieAttachmentFormat",
          "Unsupported Format",
          value => value && SUPPORTED_FORMATS.includes(value.type)
        )
        .test(
          "selfieAttachmentSize",
          "File is too large",
          value => value && (value.size <= FILE_SIZE)
        )
        .required('Selfie Attachment  is required'),
    };
  }

  componentDidMount() {
    console.log('path.IdProof',Images.path.idProof)
    // this.setState({
    //   kyc: {
    //     idAttachment: Images.path.idProof
    //   }
    // })
    this.fetchKycLevelOne();
  }


  submitLevelOne = (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('salutation', values.salutation);
    formData.append('firstname', values.firstname);
    formData.append('middlename', values.middlename);
    formData.append('lastname', values.lastname);
    formData.append('username', values.username);
    formData.append('contactNumber', values.contactNumber);
    formData.append('email', values.email);
    formData.append('dob', values.dob);
    formData.append('nationality', values.nationality);
    formData.append('placeOfBirth', values.placeOfBirth);
    formData.append('maritalStatus', values.maritalStatus);
    formData.append('address', values.address);
    formData.append('pincode', values.pincode);
    formData.append('idType', values.idType);
    formData.append('idNumber', values.idNumber);
    formData.append('idAttachment', values.idAttachment);
    formData.append('addressProofAttachment', values.addressProofAttachment);
    formData.append('selfieAttachment', values.selfieAttachment);
    axios
      .post(config.baseUrl + 'apis/kyc-level-one/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': User.getToken()
        }
      })
      .then(resp => {
        console.log("check kyc form", resp);
        setSubmitting(false);
        Swal.fire('Success', 'Kyc form submitted', 'success');
      })
      .catch(handleError);

  };

  fetchKycLevelOne = () => {

    axios
      .get(config.baseUrl + 'apis/kyc-level-one/', {
        headers: {
          'Authorization': User.getToken()
        }
      })
      .then(resp => {
        console.log(resp)
        // this.props.toggleNext(true);     //show next button if applied
        delete this.validationSchema.addressProofAttachment;
        delete this.validationSchema.idAttachment;
        delete this.validationSchema.selfieAttachment;
        this.setState({
          canApply: resp?.data?.canApply,
          kyc: {
            salutation: resp?.data?.data?.salutation || '',
            firstname: resp?.data?.data?.firstname || '',
            middlename: resp?.data?.data?.middlename || '',
            lastname: resp?.data?.data?.lastname || '',
            username: resp?.data?.data?.username || '',
            dob: resp?.data?.data?.dob || '',
            nationality: resp?.data?.data?.nationality || '',
            contactNumber: resp?.data?.data?.contactNumber || '',
            email: resp?.data?.data?.email || '',
            placeOfBirth: resp?.data?.data?.placeOfBirth || '',
            maritalStatus: resp?.data?.data?.maritalStatus || '',
            address: resp?.data?.data?.address || '',
            pincode: resp?.data?.data?.pincode || '',
            idType: resp?.data?.data?.idType || '',
            idNumber: resp?.data?.data?.idNumber || '',
            idAttachment: resp?.data?.data?.idAttachment || null,
            addressProofAttachment: resp?.data?.data?.addressProofAttachment || null,
            selfieAttachment: resp?.data?.data?.selfieAttachment || null,
            status: resp?.data?.data?.status,
            adminMessage: resp.data?.data?.adminMessage
          }
        }, () => console.log(this.state.kyc));
      })
      .catch(error => {

        if (error?.response?.status === 403)
          return Swal.fire('Sign In', 'Please Load Wallet First!', 'warning');
        if (error?.response?.status === 400)
          return Swal.fire('Oops...', error?.response?.data?.message || 'Unable To Process Request, Try Again Later', 'error');

        // if(User.getData()?.kycdappVerified)
        //   this.props.toggleNext(true);
        // else this.props.toggleNext(false);

        if (error?.response?.canApply) {
          this.setState({ canApply: error?.response?.canApply });
        }
      });
  };

  async recordVideo(){
    const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    const recorder = new RecordRTCPromisesHandler(stream, {
        type: 'video',
        previewStream: function(stream) {},
        canvas: {
          width: 640,
          height: 480
        },
        // used by MultiStreamRecorder - to access HTMLCanvasElement
        elementClass: 'multi-streams-mixer'
    });
    recorder.startRecording();

    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);

    await recorder.stopRecording();
    const blob = await recorder.getBlob();
    console.log('video blob',blob);
  }

  render() {
    return (
      <div>
        <p><strong>For Era Swap Community Members and new users, to migrate to Era Swap Network (ESN), KYC can be done in 3 Simple Steps:</strong></p>
        <ul className="kycsteps">
             <li><i class="fa fa-chevron-right" aria-hidden="true"></i>  In KYC Level 1, Fill up your KYC Details, Click
             on 'Submit' and then click on 'Next'</li>
            <li><i class="fa fa-chevron-right" aria-hidden="true"></i> In KYC Level 2, select specific Era Swap Ecosystem
            Platform, you need to do Level 2 KYC and Fill up platform specific details required and Submit</li>
            <li><i class="fa fa-chevron-right" aria-hidden="true"></i>  In KYC Level 3, Click on 'Sign this Message' to finish your KYC process</li>
        </ul>
        <h4 className="m4-txt-level mb40 text-center">KYC Level 1 </h4>

        {/* <div><i className="fa fa-info-circle themecolor" data-toggle="modal" data-target=".kyclevel1"></i></div> */}
        <span className="level-info" style={{color: 'darkblue',}}>
          In KYC Level 1, fill up your required KYC Details and upload documents. Then click on 'Submit' and then click on 'Next' to go to Level 2
        </span>
        <br></br>
        <br></br>
        {
          this.state.kyc?.status === 'approved' || User.getData()?.kycdappVerified ?
            <div className="kycapprove col-md-8 mx-auto mb40 ">
              <h3>
                <i class="fa fa-check-square-o" aria-hidden="true"></i>
            Your Kyc has verified by curators
          </h3>
              <p>
                KYC DApp is powered on a decentralised network of Era Swap.
                There is no centralized authority to obstructions means
                inbuilt immutably that makes contained data more trustworthy.
          </p>
            </div>
            :
            this.state.kyc?.status === 'rejected' ?
              <div className="kycrejected mb40 col-md-8 mx-auto ">
                <h3>
                  <i class="fa fa-times fa-6" aria-hidden="true"></i>
              Your KYC Has been Rejected by curators
            </h3>
                <strong>
                  {
                    this.state.kyc?.adminMessage
                    &&
                    <span>
                      <hr />
                      {this.state.kyc?.adminMessage}
                      <hr />
                    </span>
                  }
                </strong>
                <p>
                  KYC DApp is powered on a decentralised network of Era Swap.
                  There is no centralized authority to obstructions means
                  inbuilt immutably that makes contained data more trustworthy.
            </p>
              </div>
              :
              this.state.kyc?.status === 'pending' ?
                <div className="col-md-8 mx-auto mb40 ">
                  <h3>
                    Pending
          </h3>
                  <p>
                    KYC DApp is powered on a decentralised network of Era Swap.
                    There is no centralized authority to obstructions means
                    inbuilt immutably that makes contained data more trustworthy.
          </p>
                </div>
                :
                null
        }

        {/* <!-- info modall start here--> */}
        {/* <div class="modal fade kyclevel1" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-salutation" id="exampleModalLabel">KYC Level 1 information</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <ul class="kyctext mt-20">
                  <li>
                    <i class="fa fa-arrow-right fa-ora"></i> All users should submit minimum 2 photographs for KYC as described below :
                                                  <ul class="kyctextlist" type="none">
                      <li>
                        <i class="fa fa-arrow-right fa-ora"></i> PICTURE WITH ID Please submit a picture in which you are holding your government-issued ID and a paper note. On the note you should handwrite your user full name, the current date, DOB, signature, and the words "For Time Swappers ." Make sure the picture you are submitting meets the following requirements:
                                                        <ul class="kyctextlist1">
                          <li> It is taken in good light;</li>
                          <li> The photo is clear, high-resolution, and in color;</li>
                          <li> Your face must be clearly visible;</li>
                          <li> The text in the note must be handwritten by you and not typed;</li>
                          <li> The document you are holding must be the same you are submitting for your identity verification; and </li>
                          <li> Neither the photos nor the documents have been edited or manipulated.</li>
                        </ul>
                      </li>
                      <li >
                        <i class="fa fa-arrow-right fa-ora"></i> PHOTO ID :- Please provide a picture of any of the following:
                                                        <ul class="kyctextlist1">
                          <li> Passport (open to the double-page spread showing your photo, your name, your date of birth, and the passport expiration date);</li>
                          <li> Driver's license (front and back); </li>
                          <li> Government Provided National identity document (front and back). </li>
                        </ul>
                                                        Make sure the ID the scan of which you are submitting meets the following requirements:
                                                        <ul class="kyctextlist1">
                          <li> The document remains valid for at least 3 months from the submission date or it will not be accepted; </li>
                          <li> It is an original document; photos of copies will not be accepted; </li>
                          <li> Your photos or scans are clear, high-resolution and in color; </li>
                          <li> Neither the documents nor their photos or scans have been edited or manipulated; and </li>
                          <li> Photos of front and back sides, if applicable, must be uploaded separately.</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li><i class="fa fa-arrow-right fa-ora"></i> Add email ID</li>
                  <li><i class="fa fa-arrow-right fa-ora"></i> Add Phone number</li>
                </ul>

              </div>

            </div>
          </div>
        </div> */}

        {/* <!-- info modall end here--> */}
        <Formik
          enableReinitialize={true}
          initialValues={{
            salutation: this.state.kyc?.salutation || '',
            firstname: this.state.kyc?.firstname || '',
            middlename: this.state.kyc?.middlename || '',
            lastname: this.state.kyc?.lastname || '',
            username: this.state.kyc?.username || '',
            dob: this.state.kyc?.dob || '',
            nationality: this.state.kyc?.nationality || '',
            contactNumber: this.state.kyc?.contactNumber || '',
            email: this.state.kyc?.email || '',
            placeOfBirth: this.state.kyc?.placeOfBirth || '',
            maritalStatus: this.state.kyc?.maritalStatus || '',
            address: this.state.kyc?.address || '',
            pincode: this.state.kyc?.pincode || '',
            idType: this.state.kyc?.idType || '',
            idNumber: this.state.kyc?.idNumber || '',
            idAttachment: this.state.kyc?.idAttachment || '',
            addressProofAttachment: this.state.kyc?.addressProofAttachment || '',
            selfieAttachment: this.state.kyc?.selfieAttachment || '',
          }}
          validationSchema={Yup.object().shape(this.validationSchema)}

          onSubmit={(values, { setSubmitting }) => this.submitLevelOne(values, { setSubmitting })}
        >
          {({
            errors,
            touched,
            values,
            setFieldValue,
            handleChange,
            isSubmitting
          }) => (
              <Form>
                <fieldset class="scheduler-border">
                  <legend class="scheduler-border">Personal Info</legend>
                  <div className="form-row">
                    <div class="form-group col-lg-3">
                      <label>Salutation</label>
                      <Field disabled={!this.state.canApply && this.state.kyc?.salutation} value={values?.salutation} name="salutation" as="select" className={'form-control' + (errors.salutation && touched.salutation ? ' is-invalid' : '')}>
                        <option value=""></option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms</option>
                      </Field>
                      <ErrorMessage name="salutation" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group col-lg-3">
                      <label htmlFor="firstname">First Name</label>
                      <Field disabled={!this.state.canApply && this.state.kyc?.firstname} value={values?.firstname} name="firstname" type="text" placeholder="First Name" className={'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '')} />
                      <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group col-lg-3">
                      <label htmlFor="middlename">Middle Name</label>
                      <Field disabled={!this.state.canApply && this.state.kyc?.middlename} value={values?.middlename} name="middlename" type="text" placeholder="Middle Name" className={'form-control' + (errors.middlename && touched.middlename ? ' is-invalid' : '')} />
                      <ErrorMessage name="middlename" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group col-lg-3">
                      <label htmlFor="lastname">Last Name</label>
                      <Field disabled={!this.state.canApply && this.state.kyc?.lastname} value={values?.lastname} name="lastname" type="text" placeholder="Last Name" className={'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '')} />
                      <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <Field disabled={!this.state.canApply && this.state.kyc?.username} value={values?.username} name="username" type="text" placeholder="Enter your User Name" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-lg-6">
                      <label htmlFor="dob">Date of Birth</label>
                      <Field disabled={!this.state.canApply && this.state.kyc?.dob} value={values?.dob} name="dob" type="date" placeholder="YYYY/MM/DD" className={'form-control' + (errors.dob && touched.dob ? ' is-invalid' : '')} />
                      <ErrorMessage name="dob" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group col-lg-6">
                      <label htmlFor="nationality">Nationality</label>
                      <Field disabled={!this.state.canApply && this.state.kyc?.nationality} value={values?.nationality} name="nationality" type="text" className={'form-control' + (errors.nationality && touched.nationality ? ' is-invalid' : '')} />
                      <ErrorMessage name="nationality" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-lg-6">
                      <label htmlFor="contactNumber">Phone Number</label>
                      <Field disabled={!this.state.canApply && this.state.kyc?.contactNumber} value={values?.contactNumber} name="contactNumber" type="text" className={'form-control' + (errors.contactNumber && touched.contactNumber ? ' is-invalid' : '')} />
                      <ErrorMessage name="contactNumber" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group col-lg-6">
                      <label>Email</label>
                      <Field disabled={!this.state.canApply && this.state.kyc?.email} value={values?.email} name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-lg-6">
                      <label htmlFor="placeOfBirth">Place of Birth</label>
                      <Field disabled={!this.state.canApply && this.state.kyc?.placeOfBirth} value={values?.placeOfBirth} name="placeOfBirth" type="text" className={'form-control' + (errors.placeOfBirth && touched.placeOfBirth ? ' is-invalid' : '')} />
                      <ErrorMessage name="placeOfBirth" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group col-lg-6">
                      <label htmlFor="maritalStatus">Martial Status</label>
                      <Field disabled={!this.state.canApply && this.state.kyc?.maritalStatus} value={values?.maritalStatus} name="maritalStatus" as="select" className={'form-control' + (errors.maritalStatus && touched.maritalStatus ? ' is-invalid' : '')}>
                        <option value=""></option>
                        <option value="single">Single</option>
                        <option value="Married">Married</option>
                      </Field>
                      <ErrorMessage name="maritalStatus" component="div" className="invalid-feedback" />
                    </div>
                  </div>

                </fieldset>
                <fieldset class="scheduler-border">
                  <legend class="scheduler-border">Address Details</legend>
                  <Row className="mt20">
                    <Col>
                      <form>
                        <div class="form-group">
                          <label htmlFor="address"> Address</label>
                          <Field disabled={!this.state.canApply && this.state.kyc?.address} value={values?.address} id="address" name="address" rows="4" cols="100" placeholder="Enter your Current Address" className={'form-control textHt' + (errors.address && touched.address ? ' is-invalid' : '')} />
                          <ErrorMessage name="address" component="div" className="invalid-feedback" />
                        </div>
                      </form>
                    </Col>
                  </Row>
                  <div className="form-row">
                    <div className="form-group  col-lg-6">
                      <label htmlFor="pincode">Pincode</label>
                      <Field disabled={!this.state.canApply && this.state.kyc?.pincode} value={values?.pincode} name="pincode" type="text" placeholder="Pincode" className={'form-control' + (errors.placeOfBirth && touched.placeOfBirth ? ' is-invalid' : '')} />
                      <ErrorMessage name="pincode" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group col">
                    </div>
                  </div>
                </fieldset>
                <fieldset class="scheduler-border">
                  <legend class="scheduler-border">Document Submission</legend>
                  <h5 className="mt30">Personal ID Proof</h5>
                  <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80" />
                  <Row className="mt20">
                    <Col sm={6} >
                      <Field
                        disabled={!this.state.canApply && this.state.kyc?.idType}
                        type="text"
                        id="idType"
                        name="idType"
                        title="ID Type"
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                        placeholder="Enter the ID Type"
                        touched={touched}
                        errors={errors}
                        value={values?.idType}
                        values={values}
                      />
                    </Col>
                    <Col sm={6} >
                      <Field
                        disabled={!this.state.canApply && this.state.kyc?.idNumber}
                        type="text"
                        id="idNumber"
                        name="idNumber"
                        title="ID Number"
                        errors={errors}
                        touched={touched}
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                        placeholder="Enter the ID Number"
                        value={values?.idNumber}
                      />
                    </Col>
                    </Row>
                    <hr />
                    <Row>
                  <Col lg={9}>
                  <ul class="kyctext mt-20">
                      <li>
                        <i class="fa fa-arrow-right fa-ora"></i><b>PROOF OF IDENTITY/ PHOTO ID:-</b>
                        <p>Please provide a picture of any of the following:</p>
                          <ul class="kyctextlist" type="none">
                                <li>
                                  <i class="fa fa-arrow-right fa-ora"></i> Passport
                                  <ul class="kyctextlist1">
                                    <li> Required the first double-page spread showing your photo, signature below, passport number, your name, your date of birth, and the passport expiration date;</li>
                                    <li> Required the Last double-page spread showing your name of father, name of mother, name of spouse, address, old passport no with date and place of issue, and file number;</li>
                                  </ul>
                                </li>
                                <li> <i class="fa fa-arrow-right fa-ora"></i> Driver's license (front and back);</li>
                                <li> <i class="fa fa-arrow-right fa-ora"></i> PAN Card</li>
                                        <li> <i class="fa fa-arrow-right fa-ora"></i> Voters ID (front and back);</li>
                                        <li> <i class="fa fa-arrow-right fa-ora"></i> Aadhaar Card (front and back);</li>
                                <li>  <i class="fa fa-arrow-right fa-ora"></i> Government Provided National identity document (front and back)</li>
                                <li>  <i class="fa fa-arrow-right fa-ora"></i> Make sure the ID the scan of which you are submitting meets the following requirements
                                      <ul class="kyctextlist1">
                                          <li>The document remains valid for at least 3 months from the submission date or it will not be accepted;</li>
                                          <li> It is an original document; photos of copies or xerox will not be accepted;</li>
                                          <li>Your photos or scans are clear, high-resolution and in color of the original document;</li>
                                          <li>Neither the documents nor their photos or scans have been edited or manipulated of the original document; and</li>
                                          <li>Photos of front and back sides, if applicable, must be uploaded separately.</li>
                                        </ul>



                                </li>
                          </ul>
                      </li>
                     </ul>
                     </Col>
                     <Col lg={3}>
                      <Field
                        disabled={!this.state.canApply && this.state.kyc?.idAttachment}
                        type="file"
                        id="myfile"
                        name="idAttachment"
                        title="ID Proof"
                        errors={errors}
                        touched={touched}
                        description="JPG OR PNG file only , Max Size allowed is 10 MB"
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                        value={values?.idAttachment}
                        altFile={Images.path.idProof}
                      />

                    </Col>

                  </Row>
                  <hr />
                    {/* <hr />
                    <Row className="mt20">
                    <Col sm={9} >
                    <ul class="kyctext mt-20">
                      <li>
                        <i class="fa fa-arrow-right fa-ora"></i> VIDEO FOR FACE VERIFICATION :-

                          <ul class="kyctextlist" type="none">
                                <li>
                                  <i class="fa fa-arrow-right fa-ora"></i> Please submit a 5-10 secs video saying "My name is XYZ (Full name to be mentioned in the video as per the photo ID submitted) applying KYC for Era Swap Ecosystem.
                                  <ul class="kyctextlist1">
                                    <li>Please allow permission for the 1DAAP App in mobile or for eraswap.life site on desktop use your camera </li>
                                    <li>Avoid wearing hats</li>
                                    <li>Avoid wearing glasses</li>
                                    <li>Avoid using filters</li>
                                    <li>Use enough lighting (Face should be clearly visible in video)</li>

                                  </ul>
                                </li>

                          </ul>
                      </li>
                     </ul>
                     </Col>
                    <Col sm={3} >
                      <Field
                        disabled={!this.state.canApply && this.state.kyc?.selfieAttachment}
                        type="file"
                        id="selfieAttachment"
                        name="selfieAttachment"
                        title="VIDEO FOR FACE VERIFICATION"
                        defaultImage=""
                        errors={errors}
                        touched={touched}
                        description="JPG OR PNG file only , Max Size allowed is 10 MB"
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                        value={values?.selfieAttachment}

                      />
                    </Col>
                  </Row> */}
                  <hr />
                  <Row className="mt20">
                  <Col sm={9} >
                  <ul class="kyctext mt-20">
                      <li>
                        <i class="fa fa-arrow-right fa-ora"></i> <b>ADDRESS PROOF:-</b>

                          <ul class="kyctextlist" type="none">
                                <li>
                                  <i class="fa fa-arrow-right fa-ora"></i> Please provide a picture of any of the following:
                                  <ul class="kyctextlist1">
                                    <li> Any Address Proof Provided by Government & valid for at least 3 months from the submission date or it will not be accepted;</li>
                                    <li> It is an original document; photos of copies or xerox will not be accepted;</li>
                                    <li> Full Name on Address proof should match with Photo ID Provided.</li>
                                  </ul>
                                </li>
                                <li>
                                  <i class="fa fa-arrow-right fa-ora"></i> Passport
                                  <ul class="kyctextlist1">
                                    <li> Required the first double-page spread showing your photo, signature below, passport number, your name, your date of birth, and the passport expiration date;</li>
                                    <li> Required the Last double-page spread showing your name of father, name of mother, name of spouse, address, old passport no with date and place of issue, and file number;</li>
                                 </ul>
                                </li>
                                <li><i class="fa fa-arrow-right fa-ora"></i> Driver's license (front and back);</li>
                                <li><i class="fa fa-arrow-right fa-ora"></i> Electricity Bill (any from latest 3 Months)</li>
                                <li><i class="fa fa-arrow-right fa-ora"></i> Postpaid Telephone Bill (any from latest 3 Months)</li>
                                <li><i class="fa fa-arrow-right fa-ora"></i> Bank Statement / Bank Passbook (any from latest 3 Months)</li>
                                <li><i class="fa fa-arrow-right fa-ora"></i> Water Supply Bill (Upload latest bill)</li>

                          </ul>
                      </li>
                     </ul>
                    </Col>
                    <Col sm={3} >

                      <Field
                        disabled={!this.state.canApply && this.state.kyc?.addressProofAttachment}
                        type="file"
                        id="addressProofAttachment"
                        name="addressProofAttachment"
                        title="Address Proof"
                        errors={errors}
                        touched={touched}
                        description="JPG OR PNG file only , Max Size allowed is 10 MB"
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                        value={values?.addressProofAttachment}
                        altFile={Images.path.addressProof}
                      />
                    </Col>
                    </Row>
                    <Row className="mt20">
                    <Col sm={9} >
                    <ul class="kyctext mt-20">
                      <li>
                        <i class="fa fa-arrow-right fa-ora"></i> <b>SELFIE WITH PHOTO ID:-</b>

                          <ul class="kyctextlist" type="none">
                                <li>
                                  <i class="fa fa-arrow-right fa-ora"></i> Please submit a picture in which you are holding your government-issued ID and a paper note. On the note you should hand write your registered email ID, the current date, signature, and the words "For Era Swap Ecosystem." Make sure the picture you are submitting meets the following requirements:
                                  <ul class="kyctextlist1">
                                  <li> It is taken in good light;</li>
                                  <li> The photo is clear, high-resolution, and in color;</li>
                                  <li> Your face must be clearly visible;</li>
                                  <li> The text in the note must be handwritten by you and not typed;</li>
                                  <li> The document you are holding must be the same you are submitting for your identity verification; and</li>
                                  <li> Neither the photos nor the documents have been edited or manipulated.</li>

                                  </ul>
                                </li>

                          </ul>
                      </li>
                     </ul>
                     </Col>
                     <Col sm={3} >
                      <Field
                        disabled={!this.state.canApply && this.state.kyc?.selfieAttachment}
                        type="file"
                        id="selfieAttachment"
                        name="selfieAttachment"
                        title="Selfie with ID Card & holding ERASWAP written on paper 'For Eraswap Ecosystem'"
                        defaultImage=""
                        errors={errors}
                        touched={touched}
                        description="JPG OR PNG file only , Max Size allowed is 10 MB"
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                        value={values?.selfieAttachment}
                        altFile={Images.path.selfieProof}
                      />
                    </Col>
                    </Row>
                </fieldset>
                  <div className="form-group submit-btn1">
                    <button type="submit" className="btn btn-primary mr-2" disabled={!this.state.canApply && Object.values(errors).length}>
                      {isSubmitting ? 'Submitting' : 'Submit'}</button>
                  </div>
              </Form>
            )}
        </Formik>
      </div>
    );
  }
}