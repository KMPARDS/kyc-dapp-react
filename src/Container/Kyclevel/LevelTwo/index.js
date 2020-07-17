import React, { useState } from 'react';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import Images from '../../../Container/Images/Images';
import Axios from 'axios';
import config from '../../../config/config';
import User from '../../../models/User';
import { handleError } from '../../../utils/Apis';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import { SUPPORTED_FORMATS, FILE_SIZE } from '../../../utils/constants';
import CustomFileInput from "../../../Component/CustomFileInput/CustomFileInput";
import Swal from 'sweetalert2';

export default class LevelTwo extends React.Component {
  activePlatformId = '';

  constructor(props) {
    super(props);
    this.state = {
      platforms: [],
      inputs: [],
      initialValues: {},
      validationSchema: {},
      kycData: {},
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.fetchPlatforms();
  }

  fetchInputs(platformId) {
    console.log('platformId',platformId)
    this.activePlatformId = platformId;
    console.log('this.activePlatformId',this.activePlatformId)
    this.handleShow();
    Axios.get(config.baseUrl + `api/kyc-inputs/?platformId=${platformId}`)
      .then(resp => {
        this.setState({
          inputs: resp.data.data
        });

        const textValidator = (name) => Yup
          .string()
          .required(`${name} is required`);

        const fileValidator = (name,title) => Yup.mixed()
          .test(
            `${name}Required`,
            `${title} is required`,
            value => value
          )
          .test(
            `${name}Size`,
            "File is too large",
            value => value && (value.size <= FILE_SIZE)
          )
          .test(
            `${name}Format`,
            "Unsupported Format",
            value => value && SUPPORTED_FORMATS.includes(value.type)
          )
          .required(`${title}  is required`);

        const validationSchema = {},initialValues = {};
        resp.data.data.forEach((input, i) => {
          validationSchema[input._id] = input.type === 'file'
            ? fileValidator(input._id,input.name)
            : textValidator(input.name);

          initialValues[input._id] = '';
        });

        this.setState({
          validationSchema,
          initialValues
        });

        this.fetchSubmittedData();
      })
      .catch(handleError);
  }

  fetchSubmittedData(){
    Axios.get(config.baseUrl + `apis/kyc-level-two/${this.activePlatformId}`,{
      headers: {
        Authorization: User.getToken()
      }
    })
    .then(resp => {
      console.log('fetch platform data',resp);
      const kycData = {}, validationSchema = this.state.validationSchema;
      resp.data.data.documents.forEach((document,i) => {
        kycData[document.documentId._id] = document.content;
        if(document.documentId.type === 'file') delete validationSchema[document.documentId._id];
      });
      console.log('kycData',kycData)
      this.setState({
        kycData,
        initialValues: kycData,
        kycStatus: resp.data.data.status,
        adminMessage: resp.data.data.adminMessage
      });
    })
    .catch(handleError);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  fetchPlatforms() {
    Axios.get(config.baseUrl + 'api/kyc-platforms/')
      .then(resp => {
        console.log(resp)

        this.setState({
          platforms: resp.data.data
        });
      })
      .catch(handleError);
  }

  submitLevelTwo(values, { setSubmitting }) {
    console.log('called');
    const formData = new FormData();
    formData.append('platformId',this.activePlatformId);
    for(var key in values){
      formData.append(key,values[key]);
      console.log(formData.get(key));
    }
console.log('called2');
    Axios.post(config.baseUrl + 'apis/kyc-level-two/save', formData,{
      headers: {
        Authorization: User.getToken()
      }
    })
    .then(resp => {
      console.log(resp);
      Swal.fire('Success',resp.data.message,'success');
      setSubmitting(false);
    })
    .catch(handleError)
  }

  render() {
    return <div>
      <h4 className="m4-txt-level mb40 text-center">KYC Level 2 </h4>
      <div> <i className="fa fa-info-circle themecolor" data-toggle="modal" data-target=".kyclevel2"></i></div>

      <span className="level-info" style={{color: 'darkblue',}}>
        1. In KYC Level 2, select specific Era Swap Ecosystem Platform by clicking on the platform logo, you need to do Level 2 KYC.  Fill up platform specific details required and click on ‘Submit’. Then click on ‘Next’ to go to Level 3.
        <br></br>
        2. You can also skip Level 2 for now by clicking on ‘Next’ Button but please remember that you have to complete Level 2 KYC to be eligible to use Era Swap Platforms as Verified User.
        </span>
        <br></br>
        <br></br>
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
            this.state.platforms.map((platform, i) =>
              <Col lg={3} md={6} sm={12} key={i}>
                <div className="jm-logo" onClick={this.fetchInputs.bind(this, platform._id)}>
                  <span>
                    <img className='Img' src={platform.logo} alt={platform.name} />
                  </span>
                </div>
              </Col>
            )
            :
            <div className="text-center">No Platforms Listed Yet</div>
          }
        </Row>
      </fieldset>

      <Modal
        size="lg"
        show={this.state.show}
        onHide={this.handleClose}
      >
        <Modal.Header closeButton>
          <h5 class="modal-title" id="exampleModalLabel">ERASWAP Network</h5>
        </Modal.Header>
        <Modal.Body>
          <fieldset class="scheduler-border">
            <legend class="scheduler-border">Document Submission</legend>
            {/* <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80" /> */}
        {
          this.state.kycStatus === 'approved'
          ?
          <div className="kycapprove mb40 col-md-8 mx-auto ">
            <h3>
              <i class="fa fa-check-square-o fa-6" aria-hidden="true"></i>
              Kycs are verified by curators
            </h3>
            <p>
              KYC DApp is powered on a decentralised network of Era Swap.
              There is no centralized authority to obstructions means
              inbuilt immutably that makes contained data more trustworthy.
            </p>
          </div>
          :
          this.state.kycStatus === 'rejected'
          ?
          <div className="kycrejected mb40 col-md-8 mx-auto ">
            <h3>
              <i class="fa fa-times fa-6" aria-hidden="true"></i>
              Your KYC Has been Rejected by curators
            </h3>
            {
                this.state.adminMessage
                &&
                <span>
                  <hr />
                  {this.state.adminMessage}
                  <hr />
                </span>
              }
            <p>
              KYC DApp is powered on a decentralised network of Era Swap.
              There is no centralized authority to obstructions means
              inbuilt immutably that makes contained data more trustworthy.
            </p>
          </div>
          :
          this.state.kycStatus === 'pending'
          ?
          <div className="kycrejected mb40 col-md-8 mx-auto ">
            <h3>
              Pending
            </h3>
            <p>
              KYC DApp is powered on a decentralised network of Era Swap.
              There is no centralized authority to obstructions means
              inbuilt immutably that makes contained data more trustworthy.
            </p>
          </div>
          : null
        }

            <Formik
              enableReinitialize={true}
              initialValues={this.state.initialValues}
              validationSchema={Yup.object().shape(this.state.validationSchema)}
              onSubmit={(values, { setSubmitting }) => this.submitLevelTwo(values, { setSubmitting }) }
            >
              {({
                errors,
                touched,
                values,
                setFieldValue,
                isSubmitting
              }) => (
                  <Form>
                    <Row className="mt20">
                      {
                        this.state.inputs.map((input, i) =>
                          <Col sm={input.type === 'text' ? 12 : 6} key={i}>
                            <Field
                              type={input.type}
                              id={input._id}
                              name={input._id}
                              title={input.name}
                              description={input?.description}
                              component={CustomFileInput}
                              setFieldValue={setFieldValue}
                              placeholder={String("Enter the ").concat(input.name)}
                              touched={touched}
                              errors={errors}
                              value={values && values[input._id] ? values[input._id] : ''}
                            />
                          </Col>
                        )
                      }
                    </Row>
                    <Row className="mt20">
                      <div className="submit-btn-flex">
                        <button className="submit-btn" type="submit">{isSubmitting ? 'Submitting' : 'Submit'}</button>
                      </div>
                    </Row>
                  </Form>
                )}
            </Formik>
          </fieldset>

        </Modal.Body>
      </Modal>
    </div>;
  }
}