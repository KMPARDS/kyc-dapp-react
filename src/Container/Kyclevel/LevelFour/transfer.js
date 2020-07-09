import React from 'react';
import { ethers } from 'ethers';
import { Col, Row } from 'react-bootstrap';
import User from '../../../models/User';
import axios from 'axios';

export default class LevelFour extends React.Component {
  state = {
    estimatedGasUnits: null,
    gasPriceInput: '',
    transactionHash: null,
    recommendations: {
      fastest: 55,
      fast: 54,
      average: 50,
      safeLow: 45,
    },
  };

  estimateGas = async (event) => {
    event.preventDefault();
    const estimatedGasUnits = await User.getEsInstance().estimateGas.transfer(
      this.props.ADMIN_WALLET,
      ethers.utils.parseEther(
        // TODO: remove "1" this when done
        '1' || this.state.balanceDisplay
      )
    );
    this.setState({ estimatedGasUnits });
  };

  getEthCost = () => {
    try {
      const gasPrice = ethers.utils.parseUnits(
        this.state.gasPriceInput,
        'gwei'
      );
      const ethCost = gasPrice.mul(this.state.estimatedGasUnits);
      return ethers.utils.formatEther(ethCost);
    } catch {
      return null;
    }
  };

  render() {
    const ethCost = this.getEthCost();
    return (
      <>
        {this.state.estimatedGasUnits === null ? (
          <button className="submit-btn" onClick={this.estimateGas}>
            Estimate Gas
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter custom gas price in gwei"
              onChange={(event) =>
                this.setState({ gasPriceInput: event.target.value })
              }
            />
            <br />
            {ethCost !== null ? (
              <>Esimated transaction cost is {ethCost} ETH</>
            ) : (
              <>Invalid Gas Price</>
            )}
          </>
        )}
      </>
    );
  }
}
