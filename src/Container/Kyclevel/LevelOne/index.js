import React, { Component } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Images from '../../../Container/Images/Images';
import config from '../../../config/config';
import Swal from 'sweetalert2'
import { Col, Row } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import User from '../../../models/User';
import { SUPPORTED_FORMATS, FILE_SIZE } from '../../../utils/constants';
import CustomFileInput from "../../../Component/CustomFileInput/CustomFileInput";
export default class FirstLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.fetchKycLevelOne();
  }


  submitLevelOne = (values) => {
    if(!User.getToken())
      return Swal.fire('Wait', 'Please Load Wallet and then submit form!', 'error')
    const formData = new FormData();
    formData.append('salutation', values.salutation);
    formData.append('firstname', values.firstname);
    formData.append('lastname', values.lastname);
    formData.append('username', values.username);
    formData.append('contactNumber', values.contactNumber);
    formData.append('sampleFile', values.email);
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
          'Content-Type': 'application/json',
          'x-access-token': User.getToken()
        }
      })
      .then(resp => {
        console.log("check kyc form", resp);
        if (resp.data.status === 'success') {
          Swal.fire('KYC Form submitted!')
          setTimeout(() => {
            this.setState({ uploadStatus: '', statusType: '' });
          }, 3000);
        } else {
          this.setState({
            uploadStatus: 'update failed',
            statusType: 'danger'
          });
        }
      })
      .catch(error => {
        console.log('check error', error.response);
        Swal.fire('Oops...', 'Something went wrong!', 'error')
      });

  };

  fetchKycLevelOne = () => {
    axios
      .get(config.baseUrl + 'apis/kyc-level-one/', {
        headers: {
          'x-access-token': this.state.token
        }
      })
      .then(resp => {
        console.log('fetchKycLevelOne', resp);
        if (resp.data.status === 'success') {
          this.setState({

          });
        } else {

        }
      })
      .catch(error => {
        console.log('check error', error);
      });
  };

  render() {
    return (
      <div>
        <h4 className="m4-txt-level mb40 text-center">KYC Level 1 </h4>
        <div><i className="fa fa-info-circle themecolor" data-toggle="modal" data-target=".kyclevel1"></i></div>
        <div className="kycapprove col-md-8 mx-auto mb40 ">
          <h3>  <i class="fa fa-check-square-o" aria-hidden="true"></i>
                        Your KYC Has been Approved by the admin </h3>
          <p>KYC DApp is powered on a decentralised network of Era Swap.
          There is no centralized authority to obstructions means
          inbuilt immutably that makes contained data more trustworthy.
                    </p>
        </div>

        {/* <!-- info modall start here--> */}
        <div class="modal fade kyclevel1" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">KYC Level 1 information</h5>
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
        <Formik
          initialValues={{
            title: '',
            firstName: '',
            middleName: this.state.middleName,
            lastName: '',
            userName: '',
            password: '',
            dob: '',
            Nationality: '',
            confirmPassword: '',
            phoneNumber: '',
            placeofbirth: '',
            maritialstatus: '',
            currentAdd: '',
            idType: '',
            idNo: '',

          }}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .required('Title is required'),
            firstName: Yup.string()
              .min(3, 'Name must be at least 3 characters')
              .required('First Name is required'),

            middleName: Yup.string()
              .min(3, 'Middle Name must be at least 3 characters')
              .required('Middle Name is required'),
            lastName: Yup.string()
              .min(3, 'Last Name must be at least 3 characters')
              .required('Last Name is required'),
            userName: Yup.string()
              .min(3, 'User Name must be at least 3 characters')
              .required('User Name is required'),
            email: Yup.string()
              .email('Email is invalid')
              .required('Email is required'),
            dob: Yup.string()
              .required('Date of Birth is required'),
            Nationality: Yup.string()
              .required('Nationality is required'),
            phoneNumber: Yup.string()
              .min(6, 'Minimum 6 digit phone Number')
              .max(10, 'Maximum 10 digit phone Number')
              .required('Phone Number is required'),
            placeofbirth: Yup.string()
              .required('Place of Birth  is required'),
            maritialstatus: Yup.string()
              .required('Maritial status  is required'),
            currentAdd: Yup.string()
              .required('Current Address  is required'),
            pincode: Yup.string()
              .min(4, 'Minimum 6 digit phone Number')
              .max(6, 'Maximum 10 digit phone Number')
              .required('Pincode is required'),
            idType: Yup.string()
              .required('Id Type is required'),
            idNo: Yup.string()
              .required('Id Number  is required'),
            idAttachment: Yup
              .mixed()
              .required("Id Attachment is required")
              .test(
                "idAttachmentSize",
                "File is too large",
                value => {
                  console.log(value)
                  return value && (value.size >= FILE_SIZE)
                }
              )
              .test(
                "idAttachmentFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(value.type)
              ),
            addressProofAttachment: Yup.mixed()
              .required('Address Proof Attachment  is required')
              .test(
                "addressProofAttachmentSize",
                "File is too large",
                value => value && (value.size >= FILE_SIZE)
              )
              .test(
                "addressProofAttachmentFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(value.type)
              ),
            selfieAttachment: Yup.mixed()
              .required('Selfie Attachment  is required')
              .test(
                "selfieAttachmentSize",
                "File is too large",
                value => value && (value.size >= FILE_SIZE)
              )
              .test(
                "selfieAttachmentFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(value.type)
              ),
          })}

          onSubmit={values => this.submitLevelOne(values)}
        >
          {({
            errors,
            touched,
            setFieldValue
          }) => (
            <Form>
              <fieldset class="scheduler-border">
                <legend class="scheduler-border">Personal Info</legend>
                <div className="form-row">
                  <div class="form-group col-2">
                    <label>Title</label>
                    <Field name="title" as="select" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}>
                      <option value=""></option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                      <option value="Ms">Ms</option>
                    </Field>
                    <ErrorMessage name="title" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" type="text" placeholder="First Name" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                    <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="middleName">Middle Name</label>
                    <Field name="middleName" type="text" placeholder="Middle Name" className={'form-control' + (errors.middleName && touched.middleName ? ' is-invalid' : '')} />
                    <ErrorMessage name="middleName" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" type="text" placeholder="Last Name" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                    <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="userName">User Name</label>
                  <Field name="userName" type="text" placeholder="Enter your User Name" className={'form-control' + (errors.userName && touched.userName ? ' is-invalid' : '')} />
                  <ErrorMessage name="userName" component="div" className="invalid-feedback" />
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="dob">Date of Birth</label>
                    <Field name="dob" type="date" placeholder="YYYY/MM/DD" className={'form-control' + (errors.dob && touched.dob ? ' is-invalid' : '')} />
                    <ErrorMessage name="dob" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="Nationality">Nationality</label>
                    <Field name="Nationality" type="text" className={'form-control' + (errors.Nationality && touched.Nationality ? ' is-invalid' : '')} />
                    <ErrorMessage name="Nationality" component="div" className="invalid-feedback" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Field name="phoneNumber" type="text" className={'form-control' + (errors.phoneNumber && touched.phoneNumber ? ' is-invalid' : '')} />
                    <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col">
                    <label>Email</label>
                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="placeofbirth">Place of Birth</label>
                    <Field name="placeofbirth" type="text" className={'form-control' + (errors.placeofbirth && touched.placeofbirth ? ' is-invalid' : '')} />
                    <ErrorMessage name="placeofbirth" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="maritialstatus">Martial Status</label>
                    <Field name="maritialstatus" as="select" className={'form-control' + (errors.maritialstatus && touched.maritialstatus ? ' is-invalid' : '')}>
                      <option value=""></option>
                      <option value="single">Single</option>
                      <option value="Married">Married</option>
                    </Field>
                    <ErrorMessage name="maritialstatus" component="div" className="invalid-feedback" />
                  </div>
                </div>


              </fieldset>
              <fieldset class="scheduler-border">
                <legend class="scheduler-border">Address Details</legend>
                <Row className="mt20">
                  <Col>
                    <form>
                      <div class="form-group">
                        <label htmlFor="currentAdd"> Address</label>
                        <Field id="currentAdd" name="currentAdd" rows="4" cols="100" placeholder="Enter your Current Address" className={'form-control textHt' + (errors.currentAdd && touched.currentAdd ? ' is-invalid' : '')} />
                        <ErrorMessage name="currentAdd" component="div" className="invalid-feedback" />
                      </div>
                    </form>
                  </Col>
                </Row>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="pincode">Pincode</label>
                    <Field name="pincode" type="text" placeholder="Pincode" className={'form-control' + (errors.placeofbirth && touched.placeofbirth ? ' is-invalid' : '')} />
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
                        type="text"
                        id="idType"
                        name="idType"
                        title="ID Type"
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                        placeholder="Enter the ID Type"
                        touched={touched}
                        errors={errors}
                      />
                  </Col>
                  <Col sm={6} >
                    <Field
                        type="text"
                        id="idNo"
                        name="idNo"
                        title="ID Number"
                        errors={errors}
                        touched={touched}
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                        placeholder="Enter the ID Number"
                      />
                  </Col>

                  <Col sm={6} >
                      <Field
                        type="file"
                        id="myfile"
                        name="idAttachment"
                        title="ID Proof"
                        errors={errors}
                        touched={touched}
                        description="JPG OR PNG file only , Max Size allowed is 10 MB"
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                      />
                  </Col>

                </Row>

                <Row className="mt20">
                  <Col sm={6} >
                    <Field
                        type="file"
                        id="addressProofAttachment"
                        name="addressProofAttachment"
                        title="Address Proof"
                        errors={errors}
                        touched={touched}
                        description="JPG OR PNG file only , Max Size allowed is 10 MB"
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                      />
                  </Col>
                  <Col sm={6} >
                    {/* <h5 className="mt40">Selfie with </h5>
                    <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80" />

                    <label for="formGroupExampleInput"> Selfi with IC Card & holding ERASWAP written on paper "For Eraswap Ecosystem"</label>
                    <p className="note-para">JPG OR PNG file only , Max Size allowed is 10 MB </p>

                    <div className="flex-choose">
                      <form className="select-style" action="/action_page.php">
                        <Field type="file" id="myfile" name="selfieAttachment" className={'form-control' + (errors.selfieAttachment && touched.selfieAttachment ? ' is-invalid' : '')} /><br /><br />
                        <ErrorMessage name="selfieAttachment" component="div" className="invalid-feedback" />
                      </form>
                    </div>
                    <div>
                      <Row>
                        <Col sm={12}>
                          <div className="border-style-img">
                            <img className='kycdapp-plus-Img' src={Images.path.plusimg} alt=""/>
                          </div>

                        </Col>
                      </Row>
                    </div> */}
                    <Field
                        type="file"
                        id="selfieAttachment"
                        name="selfieAttachment"
                        title="Selfie with ID Card & holding ERASWAP written on paper 'For Eraswap Ecosystem'"
                        errors={errors}
                        touched={touched}
                        description="JPG OR PNG file only , Max Size allowed is 10 MB"
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                      />
                  </Col>
                </Row>
              </fieldset>
              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}