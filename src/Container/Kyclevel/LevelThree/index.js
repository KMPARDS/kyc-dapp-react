import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Images from '../../../Container/Images/Images';

export default class LevelThree extends React.Component {
    render() {
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
		<fieldset class="scheduler-border es-trasnferbox kyclevel4">
			<legend class="scheduler-border">Signing a message using your wallet</legend>
			<Row className="mt20">
				<Col sm={8} className="mx-auto ">

					<form>
						<h6>On the blockchain, identity is the wallet address and not a human name or face. When you sign a message, a unique signature gets generated for the message using your wallet's private key. You can use this function to prove that you have the ownership of the private key.</h6>
						<h6>Presets:<button className="btn">TimeAlly Era Swap Network</button></h6>
						<h6>Update your message below and then click on sign</h6>

						<div className="yourwallet">

							<textarea id="w3review" name="w3review" rows="4" cols="100" placeholder="" />

							<div class="form-group mt20">
								<label for="formGroupExampleInput">I hereby declare and authorize info@eraswapfoundation.com to upgrade all my
								TimeAlly staking from 1 year to 2 years to participate in Era Swap Network Proof of Stake Consensus
                                                            Protocol (ESNPoSCP). I have read and understood the TimeAlly terms and conditions.</label>
							</div>
							<Row>
								<Col sm={6} >
									<form>
										<div class="form-group">
											<label for="formGroupExampleInput">Full Name</label>
											<input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter your full name" />
										</div>
									</form>
								</Col>
								<Col sm={6} >
									<form>
										<div class="form-group">
											<label for="formGroupExampleInput">Contact number  </label>
											<input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter your contact number" />
										</div>
									</form>
								</Col>
							</Row>
						</div>
						<button className="btn">Sign this message</button>

						<h6 className="mt10">Your signature: (click below to copy)</h6>
						<div className="yourwallet ">

							<div className="wallet-address">
								0x2c6d72398f21b22ded3d89b06f3ba72ce6524d58e1ee60b206d32cd51457c7ea325cb765cbe242517f6e7fd23ba679bcb9542f81ce8f92ab43887836a18350461b
                                                    </div>

						</div>
						<div className="submit-btn-flex">
							<button className="btn">Send by Email App</button>
							<button className="btn">Copy Email Body</button>
							<button className="btn">Send by Whatsapp</button>
						</div>

					</form>

				</Col>

			</Row>
		</fieldset>

	</div>

    }
}