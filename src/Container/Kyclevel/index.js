import React, { Component } from 'react';
import './Kyclevel.css';
import { Col, Button, Container, Row } from 'react-bootstrap';
import MultiStep from 'react-multistep';
// import MultiStep from '../../Component/MultiLevel';
import axios from 'axios';
import LevelOne from './LevelOne/'
import LevelTwo from './LevelTwo';
import LevelFour from './LevelFour';
import LevelThree from './LevelThree';


class KycLevel extends Component {


	constructor(props) {
		super(props);
		this.state = {
      showNext: true,
      showPrev: true
    };

    this.toggleNext = this.toggleNext.bind(this);
    this.togglePrev = this.togglePrev.bind(this);

    this.steps = [
      { name: 'FirstLevel', component: <LevelOne toggleNext={this.toggleNext} togglePrev={this.togglePrev} /> },
      { name: 'SecondLevel', component: <LevelTwo /> },
      { name: 'ThirdLevel', component: <LevelThree /> },
      { name: 'FourthLevel', component: <LevelFour /> },
    ];
  }

  toggleNext(show){
    console.log('called',show)
    if(show !== undefined)
      this.setState({
        showNext: show
      });
    else
      this.setState({
        showNext: this.state.showNext
      });
  }

  togglePrev(show){
    if(show !== undefined)
      this.setState({
        showPrev: show
      });
    else
      this.setState({
        showPrev: this.state.showPrev
      });
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
								<MultiStep showNavigation={true} steps={this.steps} showNext={this.state.showNext} showPrev={this.state.showPrev} />
							</div>
						</Col>
					</Container>
				</div>
			</div>
		);

	}
}


export default KycLevel;