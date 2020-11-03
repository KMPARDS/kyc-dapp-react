import React, { useState } from 'react';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import Axios from 'axios';
import config from '../../config/config';
import User from '../../models/User';
import { handleError } from '../../utils/Apis';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import { SUPPORTED_FORMATS, FILE_SIZE } from '../../utils/constants';
import CustomFileInput from '../CustomFileInput/CustomFileInput';
import Swal from 'sweetalert2';
import { UserContext } from '../../utils/user.context';
import { Link } from 'react-router-dom';
import { kycInst, providerESN } from '../../ethereum';
import { ethers } from 'ethers';
import { utils } from 'eraswap-sdk';
import { renderInstruction } from './InstructionComponents';

const OTHER = 'Other';

export default class LevelTwo extends React.Component {
  static contextType = UserContext;
  activePlatformId = '';
  level = 2;
  platformIdentifier = '';
  specializationRequest = '';

  constructor(props) {
    super(props);
    this.state = {
      platforms: [],
      inputs: [],
      initialValues: {},
      validationSchema: {},
      kycData: {},
      show: false,
      specializations: [],
      specialization: '',
      isKycApplied: false,
      specializationRequestMessage: '',
      isRequestSubmitting: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    if(isFinite(this.props.match.params.level))
      this.level = Number(this.props.match.params.level);
  }

  componentDidMount() {
    this.fetchPlatforms();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.level !== prevProps.match.params.level) {
      this.level = Number(this.props.match.params.level);
      this.fetchPlatforms();
    }
  }

  async fetchPlatformIdentifier() {
    // let _platformIdentifier;
    this.state.platforms.forEach(platform => {
      if (this.activePlatformId === platform._id && platform.identifier) {
        this.platformIdentifier = platform.identifier;
        return false;
      }
    });
    // if (_platformIdentifier.substr(0, 2) === '0x')
    //   this.platformIdentifier = await kycInst.resolveUsername(_platformIdentifier);
    // else this.platformIdentifier = ethers.utils.formatBytes32String(_platformIdentifier);
    // this.platformIdentifier = ethers.utils.parseBytes32String(_platformIdentifier);
  }

  async fetchSpecializations() {
    console.log('this.level, this.platformIdentifier',this.level, this.platformIdentifier);
    const specializations = (await kycInst.queryFilter(kycInst.filters.KycFeeUpdated(this.level, this.platformIdentifier, null, null)))
      .map(log => kycInst.interface.parseLog(log))
      .map((parsedLog, i) => parsedLog.args['specialization']);
    this.setState({ specializations });
  }

  async fetchPrevKyc(){
    try{
      const _username = await kycInst.resolveUsername(this.context.user.wallet.address);
      const kycs = (await kycInst.queryFilter(kycInst.filters.KycApplied(_username,this.level,null,null)))
        .map(log => kycInst.interface.parseLog(log))
        .filter(log => log.args['platformIdentifier'] === this.platformIdentifier && log.args['specialization'] === this.state.specialization);

      if(kycs.length){
        this.setState({ isKycApplied: true });
      }
    }catch(e){
      console.log(e);
    }
  }

  async fetchInputs(platformId) {
    try {
      this.activePlatformId = platformId;
      await this.fetchPlatformIdentifier();
      this.fetchSpecializations();
      this.handleShow();

      const resp = await Axios.get(config.baseUrl + `api/kyc-inputs/?platformId=${platformId}&level=${this.level}`)
      console.log('inputs', resp);

      const validationSchema = {}, initialValues = {};
      resp.data.data.forEach((input, i) => {
        validationSchema[input._id] =
          input.type === 'file'
            ? this.fileValidator(input._id, input.name)
            : this.textValidator(input.name);

        initialValues[input._id] = '';
      });

      this.setState({
        inputs: resp.data.data,
        validationSchema,
        initialValues,
      });

      this.fetchSubmittedData();
    }
    catch (e) {
      console.log(e);
      handleError(e);
    }
  }

  textValidator = (name) =>
    Yup.string().required(`${name} is required`);

  fileValidator = (name, title) =>
    Yup.mixed()
      .test(`${name}Required`, `${title} is required`, (value) => value)
      .test(
        `${name}Size`,
        'File is too large',
        (value) => value && value.size <= FILE_SIZE
      )
      .test(
        `${name}Format`,
        'Unsupported Format',
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      )
      .required(`${title}  is required`);

  fetchSubmittedData() {
    Axios.get(config.baseUrl + `apis/kyc-level-two/${this.level}/${this.activePlatformId}`, {
      headers: {
        Authorization: this.context?.user?.token,
      },
    })
      .then((resp) => {
        console.log('fetch platform data', resp);
        const kycData = {},
          validationSchema = this.state.validationSchema;
        resp.data.data.documents.forEach((document, i) => {
          kycData[document.documentId._id] = document.content;
          if (document.documentId.type === 'file')
            delete validationSchema[document.documentId._id];
        });
        console.log('kycData', kycData);
        this.setState({
          kycData,
          initialValues: kycData,
          kycStatus: resp.data.data.status,
          adminMessage: resp.data.data.adminMessage,
        });
      })
      .catch(handleError);
  }

  handleClose() {
    this.setState({
      show: false,
      kycData: {},
      initialValues: {},
      kycStatus: '',
      adminMessage: ''
    });
  }

  handleShow() {
    this.setState({ show: true });
  }

  fetchPlatforms() {
    console.log('this.level',this.level);
    Axios.get(config.baseUrl + `api/kyc-platforms/?level=${this.level}`)
      .then((resp) => {
        console.log(resp);

        this.setState({
          platforms: resp.data.data,
        });
      })
      .catch(handleError);
  }

  async applyForKycOnDapp(specialization) {
    try {
      if(!specialization){
        await Swal.fire('Specialization Required', 'If required specialization not exists, select other and send required specialization name', 'error');
        return false;
      }
      console.log('asdfasdf',this.level, this.platformIdentifier, specialization);
      const _kycFee = await kycInst.getKycFee(this.level, this.platformIdentifier, specialization);
      console.log({_kycFee});
      if (window.confirm(`KYC Fee ${ethers.utils.formatEther(_kycFee)} will be charged`)) {
        console.log('yes');
        const walletConn = this.context.user.wallet.connect(providerESN);
        console.log({walletConn});
        const tx = await kycInst.connect(walletConn).applyForKyc(this.level, this.platformIdentifier, specialization, { value: _kycFee });
        console.log({tx});
        await tx.wait();

        this.setState({ isKycApplied: true });
        return true;
      }
    } catch (e) {
      console.log(e);
      const error = utils.parseEthersJsError(e);
      await Swal.fire('Oops', error, 'error');
    }

    return false;
  }

  async submitLevelTwo(values, { setSubmitting }) {
    if(!this.state.isKycApplied){
      const isSubmittedTokycDapp = await this.applyForKycOnDapp(values.specialization);
      if (!isSubmittedTokycDapp) return null;
    }

    const formData = new FormData();
    formData.append('platformId', this.activePlatformId);
    formData.append('platformIdentifier', this.platformIdentifier);
    formData.append('level', this.level);

    const username = await kycInst.resolveUsername(this.context.user.wallet.address);
    formData.append('username', username);

    for (var key in values) {
      formData.append(key, values[key]);
      console.log(formData.get(key));
    }

    Axios.post(config.baseUrl + 'apis/kyc-level-two/save', formData, {
      headers: {
        Authorization: this.context?.user?.token,
      },
    })
      .then((resp) => {
        console.log(resp);
        Swal.fire('Success', resp.data.message, 'success');
        setSubmitting(false);
      })
      .catch(handleError);
  }

   sendSpecializationRequest = async () =>{
    try{
      const formData = new FormData();
      formData.append('specialization',this.specializationRequest);
      formData.append('level',this.level);
      formData.append('platformId',this.activePlatformId);
      const res = await Axios.post(config.baseUrl + 'apis/kyc-specialization/request',formData,{
        headers: {
          Authorization: this.context?.user?.token,
        }
      });
      console.log({res});
      if(res.data.status){
        this.setState({
          specializationRequestMessage: res.data.message,
          isRequestSubmitting: false
        });
      }
    }catch(e){
      console.log(e.response);
      console.log(e);
      this.setState({
        specializationRequestMessage: e.response,
        isRequestSubmitting: false
      })
    }
  }

  render() {
    console.log('this.props.match', this.props.match);
    return (
      <div>
        <h4 className="m4-txt-level mb40 text-center">KYC LEVEL   {this.level} </h4>


        <span className="level-info" style={{ color: 'darkblue' }}>
        {renderInstruction(this.level)}
        </span>
        <br></br>
        <br></br>
        {/* <!-- info modall start here--> */}
        <div
          class="modal fade kyclevel2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  KYC Level  2 information
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
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
        <fieldset class="scheduler-border">
          <legend class="scheduler-border">
            Others Platforms Document Submission
          </legend>

          <Row className="mt20">
            {this.state.platforms.length ? (
              this.state.platforms.map((platform, i) => (
                <Col lg={3} md={6} sm={12} key={i}>
                  <div
                    className="jm-logo"
                    onClick={this.fetchInputs.bind(this, platform._id)}
                  >
                    <span>
                      <img
                        className="Img"
                        src={platform.logo}
                        alt={platform.name}
                      />
                    </span>
                  </div>
                </Col>
              ))
            ) : (
                <div className="text-center">No Platforms Listed Yet</div>
              )}
          </Row>
        </fieldset>

        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <h5 class="modal-title" id="exampleModalLabel">
              ERASWAP Network
            </h5>
          </Modal.Header>
          <Modal.Body>
            <fieldset class="scheduler-border">
              <legend class="scheduler-border">Document Submission</legend>
              {/* <hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80" /> */}
              {this.state.kycStatus === 'approved' ? (
                <div className="kycapprove mb40 col-md-8 mx-auto ">
                  <h3>
                    <i class="fa fa-check-square-o fa-6" aria-hidden="true"></i>
                    Your Kyc has verified by curators
                  </h3>
                  <p>
                    KYC DApp is powered on a decentralised network of Era Swap.
                    There is no centralized authority to obstructions means
                    inbuilt immutably that makes contained data more
                    trustworthy.
                  </p>
                </div>
              ) : this.state.kycStatus === 'rejected' ? (
                <div className="kycrejected mb40 col-md-8 mx-auto ">
                  <h3>
                    <i class="fa fa-times fa-6" aria-hidden="true"></i>
                    Your KYC Has been Rejected by curators
                  </h3>
                  {this.state.adminMessage && (
                    <span>
                      <hr />
                      {this.state.adminMessage}
                      <hr />
                    </span>
                  )}
                  <p>
                    KYC DApp is powered on a decentralised network of Era Swap.
                    There is no centralized authority to obstructions means
                    inbuilt immutably that makes contained data more
                    trustworthy.
                  </p>
                </div>
              ) : this.state.kycStatus === 'pending' ? (
                <div className="kycrejected mb40 col-md-8 mx-auto ">
                  <h3>Pending</h3>
                  <p>
                    KYC DApp is powered on a decentralised network of Era Swap.
                    There is no centralized authority to obstructions means
                    inbuilt immutably that makes contained data more
                    trustworthy.
                  </p>
                </div>
              ) : null}

              <Formik
                enableReinitialize={true}
                initialValues={this.state.initialValues}
                validationSchema={Yup.object().shape(
                  this.state.validationSchema
                )}
                onSubmit={(values, { setSubmitting }) =>
                  this.submitLevelTwo(values, { setSubmitting })
                }
              >
                {({ errors, touched, values, setFieldValue, isSubmitting }) => (
                  <Form>
                    <Row className="mt20">

                      <Col sm={12} key={0}>
                        <label>Specialization</label>
                        <Field
                          // disabled={this.state.isKycApplied}
                          onChange={e => {
                            setFieldValue('specialization',e.target.value);
                            this.setState({
                              specialization: e.target.value
                            },this.fetchPrevKyc);
                          }}
                          value={values?.specialization}
                          name="specialization"
                          as="select"
                          className={
                            'form-control' +
                            (errors.specialization && touched.specialization
                              ? ' is-invalid'
                              : '')
                          }
                        >
                          <option value="" selected={true} disable={true}>Select One</option>
                          {this.state.specializations.map(item => <option value={item}>{ethers.utils.parseBytes32String(item)}</option>)}
                          <option value={OTHER}>{OTHER}</option>
                        </Field>
                      </Col>

                      {this.state.specialization !== OTHER && this.state.inputs.map((input, i) => (
                        <Col sm={input.type === 'text' ? 12 : 6} key={i}>
                          <Field
                            // disabled={this.state.isKycApplied}
                            type={input.type}
                            id={input._id}
                            name={input._id}
                            title={input.name}
                            description={input?.description}
                            component={CustomFileInput}
                            setFieldValue={setFieldValue}
                            placeholder={String('Enter the ').concat(
                              input.name
                            )}
                            touched={touched}
                            errors={errors}
                            value={
                              values && values[input._id]
                                ? values[input._id]
                                : ''
                            }
                          />
                        </Col>
                      ))}

                      {this.state.specialization === OTHER ?
                      <Col>
                      <form role="role">
                        <div className="form-group">
                          <label>Enter required specialization name:</label>
                          <input type="text" className="form-control" onChange={e => this.specializationRequest = e.target.value}/>
                        </div>
                        {this.state.specializationRequestMessage?.length ? <div className="alert alert-info">{this.state.specializationRequestMessage}</div> : null}
                        <button type="button" onClick={()=> {
                          this.setState({
                            isRequestSubmitting: true
                          },this.sendSpecializationRequest);
                        }}
                        className="btn btn-sm btn-success btn-right"
                        disabled={this.state.isRequestSubmitting}
                        >{this.state.isRequestSubmitting ? 'Processing' : 'Send Request'}</button>
                      </form>
                      </Col>
                      :
                      null}
                    </Row>
                    {
                      this.state.specialization !== OTHER
                      &&
                      <Row className="mt20">
                      <div className="submit-btn-flex">
                        <button
                          className="submit-btn"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting' : 'Submit'}
                        </button>
                      </div>
                    </Row>
                    }

                  </Form>
                )}
              </Formik>
            </fieldset>
          </Modal.Body>
        </Modal>
        {
        this.level !== 0
        ?
        <Link className="btn btn-primary" to={`/${this.props.match.url.split('/')[1]}/${this.level-1}`}>Prev</Link>
        :
        null
        }
        {this.level !== 5
        ?
        <Link className="btn btn-primary" to={`/${this.props.match.url.split('/')[1]}/${this.level+1}`}>Next</Link>
        :
        null}
      </div>
    );
  }
}
