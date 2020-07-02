import React from 'react';
import Images from '../../../Container/Images/Images';
import { Col, Row } from 'react-bootstrap';

export default class LevelFour extends React.Component {
    render() {
        return <div>
            <h4 className="m4-txt-level mb40 text-center">KYC Level 4</h4>
            <div>   <i className="fa fa-info-circle themecolor" data-toggle="modal" data-target=".kyclevel3"></i></div>
            {/* <!-- info modall start here--> */}
            <div class="modal fade kyclevel3" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">KYC Level 3 information</h5>
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

        </div>;
    }
}