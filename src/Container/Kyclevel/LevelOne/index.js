import React, { Component } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import config from '../../../config/config';
import Swal from 'sweetalert2'
import { Col, Row } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import User from '../../../models/User';
import { SUPPORTED_FORMATS, FILE_SIZE } from '../../../utils/constants';
import CustomFileInput from "../../../Component/CustomFileInput/CustomFileInput";
import { handleError } from '../../../utils/Apis';
export default class FirstLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kyc: null
    };
  }

  componentDidMount() {
    this.fetchKycLevelOne();
  }


  submitLevelOne = (values) => {
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
        Swal.fire('Success','Kyc form submitted', 'success');
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
        this.setState({
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
            idAttachment: resp?.data?.data?.idAttachment || '',
            addressProofAttachment: resp?.data?.data?.addressProofAttachment || '',
            selfieAttachment: resp?.data?.data?.selfieAttachment || '',
          }
        },() => console.log(this.state.kyc));
      })
      .catch(handleError);
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
                <h5 class="modal-salutation" id="exampleModalLabel">KYC Level 1 information</h5>
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
            salutation: '',
            firstname: '',
            middlename: '',
            lastname: '',
            username: '',
            dob: '',
            nationality: '',
            contactNumber: '',
            email: '',
            placeOfBirth: '',
            maritalStatus: '',
            address: '',
            pincode: '',
            idType: '',
            idNumber: '',
            idAttachment: '',
            addressProofAttachment: '',
            selfieAttachment: '',
          }}
          validationSchema={Yup.object().shape({
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
                "idAttachmentSize",
                "File is too large",
                value => {
                  return value && (value.size <= FILE_SIZE)
                }
              )
              .test(
                "idAttachmentFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(value.type)
              )
              .required("Id Attachment is required"),
            addressProofAttachment: Yup
              .mixed()
              .test(
                "addressProofAttachmentSize",
                "File is too large",
                value => value && (value.size <= FILE_SIZE)
              )
              .test(
                "addressProofAttachmentFormat",
              "Unsupported Format",
              value => value && SUPPORTED_FORMATS.includes(value.type)
              )
              .required('Address Proof Attachment  is required'),
            selfieAttachment: Yup.mixed()
              .test(
                "selfieAttachmentSize",
                "File is too large",
                value => value && (value.size <= FILE_SIZE)
              )
              .test(
                "selfieAttachmentFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(value.type)
              )
              .required('Selfie Attachment  is required'),
          })}

          onSubmit={values => this.submitLevelOne(values)}
        >
          {({
            errors,
            touched,
            values,
            setFieldValue
          }) => (
            <Form>
              <fieldset class="scheduler-border">
                <legend class="scheduler-border">Personal Info</legend>
                <div className="form-row">
                  <div class="form-group col-2">
                    <label>salutation</label>
                    <Field value={this.state.kyc?.salutation} name="salutation" as="select" className={'form-control' + (errors.salutation && touched.salutation ? ' is-invalid' : '')}>
                      <option value=""></option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                      <option value="Ms">Ms</option>
                    </Field>
                    <ErrorMessage name="salutation" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="firstname">First Name</label>
                    <Field value={this.state.kyc?.firstname} name="firstname" type="text" placeholder="First Name" className={'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '')} />
                    <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="middlename">Middle Name</label>
                    <Field value={this.state.kyc?.middlename} name="middlename" type="text" placeholder="Middle Name" className={'form-control' + (errors.middlename && touched.middlename ? ' is-invalid' : '')} />
                    <ErrorMessage name="middlename" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="lastname">Last Name</label>
                    <Field value={this.state.kyc?.lastname} name="lastname" type="text" placeholder="Last Name" className={'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '')} />
                    <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="username">User Name</label>
                  <Field value={this.state.kyc?.username} name="username" type="text" placeholder="Enter your User Name" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                  <ErrorMessage name="username" component="div" className="invalid-feedback" />
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="dob">Date of Birth</label>
                    <Field value={this.state.kyc?.dob} name="dob" type="date" placeholder="YYYY/MM/DD" className={'form-control' + (errors.dob && touched.dob ? ' is-invalid' : '')} />
                    <ErrorMessage name="dob" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="nationality">nationality</label>
                    <Field value={this.state.kyc?.nationality} name="nationality" type="text" className={'form-control' + (errors.nationality && touched.nationality ? ' is-invalid' : '')} />
                    <ErrorMessage name="nationality" component="div" className="invalid-feedback" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="contactNumber">Phone Number</label>
                    <Field value={this.state.kyc?.contactNumber} name="contactNumber" type="text" className={'form-control' + (errors.contactNumber && touched.contactNumber ? ' is-invalid' : '')} />
                    <ErrorMessage name="contactNumber" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col">
                    <label>Email</label>
                    <Field value={this.state.kyc?.email} name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="placeOfBirth">Place of Birth</label>
                    <Field value={this.state.kyc?.placeOfBirth} name="placeOfBirth" type="text" className={'form-control' + (errors.placeOfBirth && touched.placeOfBirth ? ' is-invalid' : '')} />
                    <ErrorMessage name="placeOfBirth" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="maritalStatus">Martial Status</label>
                    <Field value={this.state.kyc?.maritalStatus} name="maritalStatus" as="select" className={'form-control' + (errors.maritalStatus && touched.maritalStatus ? ' is-invalid' : '')}>
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
                        <Field value={this.state.kyc?.address} id="address" name="address" rows="4" cols="100" placeholder="Enter your Current Address" className={'form-control textHt' + (errors.address && touched.address ? ' is-invalid' : '')} />
                        <ErrorMessage name="address" component="div" className="invalid-feedback" />
                      </div>
                    </form>
                  </Col>
                </Row>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="pincode">Pincode</label>
                    <Field value={this.state.kyc?.pincode} name="pincode" type="text" placeholder="Pincode" className={'form-control' + (errors.placeOfBirth && touched.placeOfBirth ? ' is-invalid' : '')} />
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
                        salutation="ID Type"
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                        placeholder="Enter the ID Type"
                        touched={touched}
                        errors={errors}
                        value={this.state.kyc?.idType}
                      />
                  </Col>
                  <Col sm={6} >
                    <Field
                        type="text"
                        id="idNumber"
                        name="idNumber"
                        salutation="ID Number"
                        errors={errors}
                        touched={touched}
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                        placeholder="Enter the ID Number"
                        value={this.state.kyc?.idNumber}
                      />
                  </Col>

                  <Col sm={6} >
                      <Field
                        type="file"
                        id="myfile"
                        name="idAttachment"
                        salutation="ID Proof"
                        errors={errors}
                        touched={touched}
                        description="JPG OR PNG file only , Max Size allowed is 10 MB"
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                        value={this.state.kyc?.idAttachment}
                      />
                  </Col>

                </Row>

                <Row className="mt20">
                  <Col sm={6} >
                    <Field
                        type="file"
                        id="addressProofAttachment"
                        name="addressProofAttachment"
                        salutation="Address Proof"
                        errors={errors}
                        touched={touched}
                        description="JPG OR PNG file only , Max Size allowed is 10 MB"
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                        value={this.state.kyc?.addressProofAttachment}
                      />
                  </Col>
                  <Col sm={6} >
                    <Field
                        type="file"
                        id="selfieAttachment"
                        name="selfieAttachment"
                        salutation="Selfie with ID Card & holding ERASWAP written on paper 'For Eraswap Ecosystem'"
                        errors={errors}
                        touched={touched}
                        description="JPG OR PNG file only , Max Size allowed is 10 MB"
                        component={CustomFileInput}
                        setFieldValue={setFieldValue}
                        value={this.state.kyc?.selfieAttachment}
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