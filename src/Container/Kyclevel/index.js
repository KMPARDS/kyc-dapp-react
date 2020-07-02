import React, { Component } from 'react';
import './Kyclevel.css'
import Images from '../Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import Header from '../../Component/Header';
import MultiStep from 'react-multistep';
import Footer from '../../Component/Footer/Index';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Config from '../../Config';
import Swal from 'sweetalert2'


class FirstLevel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTlhZjE2ZjkxNzQ0OTE1OWIzNWQ0ZTkiLCJ1c2VybmFtZSI6IjB4OWNjMTRhMjg4YmI1Y2I5ZWMwZTg1YjYwNmNiNjU4NWJiN2NhNmE4ZSIsImVtYWlsIjoiIiwiaWF0IjoxNTkzNTAyNTA5LCJleHAiOjE2MjIzMDI1MDl9.Bc8FNIGHIYcWMjKmVUCdyd4rficph5Mz_VVwyWrFMMY'
        };
    }

    componentDidMount() {
        this.fetchKycLevelOne();
    }


    submitLevelOne = (values) => {
        alert("hi I m der !!!!")
        var token = this.state.token;
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
            .post(Config.url + '/apis/kyc-level-one/save', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })
            .then(resp => {
                console.log("check kyc form", resp);
                if (resp.data.status == 'success') {
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
                console.log('check error', error);
                Swal.fire('Oops...', 'Something went wrong!', 'error')
            });

    };

    fetchKycLevelOne = () => {
       axios
       .get(Config.url + '/apis/kyc-level-one/', {
         headers: {
           'x-access-token':this.state.token
         }
       })
            .then(resp => {
                console.log('fetchKycLevelOne', resp);
                if (resp.data.status == 'success') {
                    this.setState({
                       
                    });
                } else {

                }
            })
            .catch(error => {
                console.log('check error',error);
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
                        middleName:this.state.middleName,
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
                        permAdd: '',
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
                        permAdd: Yup.string()
                            .required('Permanent Address  is required'),
                        pincode: Yup.string()
                            .min(4, 'Minimum 6 digit phone Number')
                            .max(6, 'Maximum 10 digit phone Number')
                            .required('Pincode is required'),
                        idType: Yup.string()
                            .required('Id Type is required'),
                        idNo: Yup.string()
                            .required('Id Number  is required'),
                        idAttachment: Yup.string()
                            .required('Id Attachment  is required'),
                        addressProofAttachment: Yup.string()
                            .required('Address Proof Attachment  is required'),
                        selfieAttachment: Yup.string()
                            .required('SelfieAttachment  is required'),
                    })}
                    // onSubmit={fields => {

                    // }}
                    onSubmit={values => this.submitLevelOne(values)}
                >
                    {({ errors, status, touched }) => (
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
                                        <Field name="dob" type="text" placeholder="YYYY/MM/DD" className={'form-control' + (errors.dob && touched.dob ? ' is-invalid' : '')} />
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
                                        <form>
                                            <div class="form-group">
                                                <label htmlFor="idType">ID Type</label>
                                                <Field name="idType" type="text" placeholder="Enter The ID type" className={'form-control' + (errors.idType && touched.idType ? ' is-invalid' : '')} />
                                                <ErrorMessage name="idType" component="div" className="invalid-feedback" />
                                            </div>
                                        </form>
                                    </Col>
                                    <Col sm={6} >
                                        <form>
                                            <div class="form-group">
                                                <label for="idNo">ID Number</label>
                                                <Field name="idNo" type="text" placeholder="Enter the ID Number" className={'form-control' + (errors.idNo && touched.idNo ? ' is-invalid' : '')} />
                                                <ErrorMessage name="idNo" component="div" className="invalid-feedback" />
                                            </div>
                                        </form>
                                    </Col>

                                    <Col sm={6} >
                                        <label for="formGroupExampleInput"> ID Proof</label>
                                        <p className="note-para">JPG OR PNG file only , Max Size allowed is 10 MB </p>

                                        <div className="flex-choose">
                                            <form className="select-style" action="/action_page.php">
                                                <Field type="file" id="myfile" name="idAttachment" className={'form-control' + (errors.idAttachment && touched.idAttachment ? ' is-invalid' : '')} /><br /><br />
                                                <ErrorMessage name="idAttachment" component="div" className="invalid-feedback" />
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
                                                <Field type="file" id="myfile" name="addressProofAttachment" className={'form-control' + (errors.addressProofAttachment && touched.addressProofAttachment ? ' is-invalid' : '')} /><br /><br />
                                                <ErrorMessage name="addressProofAttachment" component="div" className="invalid-feedback" />
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
                                                        <img className='kycdapp-plus-Img' src={Images.path.plusimg} />
                                                    </div>

                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </fieldset>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary mr-2">Register</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}




const SecondLevel = (props) => {
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
                <Col sm={3}>
                    <div class="jm-logo" data-toggle="modal" data-target=".bd-example-modal-lg">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.esn} />
                            </span>
                        </a>
                    </div>
                </Col>

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


                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.swapperwall} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.timeally} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.timeallyclub} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.daap} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.eraswapwallet} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.timeswappers} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.dayswappers} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.buzcafe} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.eraswapacademy} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.betdeex} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.computeexmultiexchange} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.faithminus} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.vof} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.certidapp} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.kycdapp} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.bookingdapp} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.charitydapp} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.rentingdapp} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.curedapp} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.dateswappers} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.coupondapp} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.recyclingdapp} />
                            </span>
                        </a>
                    </div>
                </Col>
                <Col sm={3}>
                    <div class="jm-logo">
                        <a href="#">
                            <span>
                                <img className='Img' src={Images.path.poolingdapp} />
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
        <div>   <i className="fa fa-info-circle themecolor" data-toggle="modal" data-target=".kyclevel3"></i></div>
        {/* <!-- info modall start here--> */}
        <div className="modal fade kyclevel3" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">KYC Level 3 information</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

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
        <fieldset className="scheduler-border es-trasnferbox">
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
                            <div className="form-group mt20">
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

class KycLevel extends Component {
    steps = [
        { name: 'FirstLevel', component: <FirstLevel /> },
        { name: 'SecondLevel', component: <SecondLevel /> },
        { name: 'ThirdLevel', component: <ThirdLevel /> },
    ];

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="kyclevel-page">
                <Header />

                <div className="Kyclevel-container ">
                    <Container>
                        <Col sm={12}>
                            <div className="kyc-white-box innerpage-box kyclevelbox">
                                <h4 className="feature-head text-left">KYC LEVEL</h4>
                                <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80" />
                                <MultiStep showNavigation={true} steps={this.steps} />
                            </div>
                        </Col>
                    </Container>
                </div>
                <Footer />
            </div>
        );

    }
}


export default KycLevel;