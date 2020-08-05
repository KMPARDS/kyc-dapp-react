import React from 'react';
import { ethers } from 'ethers';
import { Col, Row } from 'react-bootstrap';
import User from '../../../models/User';
import  { PROVIDER, baseUrl } from '../../../config/config';
import Transfer from './transfer'; // component
import Axios from 'axios';
import { handleError } from '../../../utils/Apis';

export default class LevelFour extends React.Component {
  state = {
    balanceDisplay: '',
    showTransferComponent: null,
    pastTransfers: null, // { amount: ethers.BigNumber, txHash: string }[] | null
  };

  ADMIN_WALLET = '0x397Fa088Ff98ecdB5Ed0B9A2E3c0a8877B6279A6';
  routines = [];

  componentDidMount = () => {
    User.setWallet(
      '0x24c4fe6063e62710ead956611b71825b778b041b18ed53118ce5da5f02e494ba'
    );

    this.startRoutine(this.updateBalance);
    this.startRoutine(this.loadPastTransfers);
    // this.fetchKycLevelOne = this.fetchKycLevelOne.bind(this);
    this.fetchKycLevelOne();
  };

  fetchKycLevelOne = async () => {
    let resp = {};
    try{
      resp = await Axios.get(baseUrl + 'apis/kyc-level-one/', {
          headers: {
            'Authorization': User.getToken()
          }
        });
    }catch(e){
      console.log(e);
      if(e.response) handleError(e);
    } finally {
      if(resp.data || User.getData()?.kycdappVerified)
        this.setState({ showTransferComponent: true });
    }
  }

  startRoutine = async (fn) => {
    const run = async () => {
      try {
        await fn();
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };
    run();
    const intervalId = setInterval(run, 20000);
    this.routines.push(intervalId);
  };

  stopRoutines = () => {
    this.routines.forEach(clearInterval);
  };

  componentWillMount = () => {
    this.stopRoutines();
  };

  updateBalance = async () => {
    if (!User.isLoggedIn()) {
      throw new Error(
        'Looks like you are not logged in. Please load your wallet again'
      );
    }

    const balance = await User.getEsInstance().balanceOf(
      User.getWallet().address
    );

    this.setState({ balanceDisplay: ethers.utils.formatEther(balance) });
  };

  loadPastTransfers = async () => {
    if (!User.isLoggedIn()) {
      throw new Error(
        'Looks like you are not logged in. Please load your wallet again'
      );
    }

    const filter = User.getEsInstance().filters.Transfer(
      User.getWallet().address,
      this.ADMIN_WALLET
    );

    const logs = await User.getProvider().getLogs({
      ...filter,
      fromBlock: 0,
      toBlock: 'latest',
    });

    const pastTransfers = logs.map((log) => {
      return {
        amount: ethers.BigNumber.from(log.data),
        txHash: log.transactionHash,
      };
    });

    this.setState({ pastTransfers });
  };

  render() {
    return (
      <div>
        <h4 className="m4-txt-level mb40 text-center">KYC LEVEL 4</h4>
        <span className="level-info" style={{color: 'darkblue',}}>

            1. IIn KYC Level 4, a member can apply for FOS Tagya Validation by
            giving required charges.<br></br>

            2. A member can become FOS Tagya for physical verification of KYC
            on Era Swap Ecosystem.<br></br>

            3. The Level 4 of KYC DApp will be live soon.<br></br>
        </span>
        <br></br>
        <br></br>
       
        {/* <!-- info modall start here--> */}
        <div
          class="modal fade kyclevel3"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  KYC Level 3 information
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
        <fieldset class="scheduler-border es-trasnferbox kyclevel4">
          
          <Row className="mt20">
            <Col sm={12} className="mx-auto ">
               <h1>Coming Soon</h1>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  }
}
