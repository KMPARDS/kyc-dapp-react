import React, { Component } from 'react';
import './Kyclevel.css';
import { Col, Button, Container, Row } from 'react-bootstrap';
import MultiStep from 'react-multistep';
import axios from 'axios';
import LevelOne from './LevelOne/'
import LevelTwo from './LevelTwo';
import LevelFour from './LevelFour';
import LevelThree from './LevelThree';


class KycLevel extends Component {
	steps = [
		{ name: 'FirstLevel', component: <LevelOne /> },
		{ name: 'SecondLevel', component: <LevelTwo /> },
		{ name: 'ThirdLevel', component: <LevelThree /> },
		{ name: 'FourthLevel', component: <LevelFour /> },
	];

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div className="kyclevel-page">
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
			</div>
		);

	}
}


export default KycLevel;