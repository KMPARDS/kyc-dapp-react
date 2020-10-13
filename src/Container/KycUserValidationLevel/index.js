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
import LevelFive from './LevelFive';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../../utils/user.context';

class KycLevel extends Component {
  static contextType = UserContext;

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
     { name: 'FiveLevel', component: <LevelFive /> },
    ];
  }

  componentDidMount(){
    if(!this.context?.user?.token)
      this.props.history.push('/');
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
								<h4 className="feature-head text-left">KYC Levels form Level 1 to 5 </h4>
								<hr className="bg-color--primary border--none  jsElement dash-red" data-height="3" data-width="80" />
                <p><strong>In KYC DApp. there are 5 different levels of KYC for a participant of Era Swap Ecosystem. These 5 Levels have different charges and benefits which has been showed on 'KYC Charges and Benefits' button on homepage.  </strong></p>
        <ul className="kycLevel">
             <li><i class="fa fa-chevron-right" aria-hidden="true"></i>  KYC Level 1 is for Identity. In KYC Level 1, Fill up your KYC Details, Click
             on 'Submit' and then click on 'Next'</li>
            <li><i class="fa fa-chevron-right" aria-hidden="true"></i>  KYC Level 2 is for Skill / Business. In KYC Level 2, select specific Era Swap Ecosystem
            Platform, you need to do Level 2 KYC and Fill up platform specific details required and Submit</li>
            <li><i class="fa fa-chevron-right" aria-hidden="true"></i>   KYC Level 3 is for Recommendation. In KYC Level 3, the applicant has to provide details about his/her Skills / Business as EXPERT seller </li>
            <li><i class="fa fa-chevron-right" aria-hidden="true"></i>  KYC Level 4 is for FOS Tagya Validation. In KYC Level 4, the applicant provide details about his/her Skill as TAGYA</li>
            <li><i class="fa fa-chevron-right" aria-hidden="true"></i>   KYC Level 5 is for Online Curator Validation. In KYC Level 5, the applicant provide details about his/her Skill as CURATOR </li>

        </ul>
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