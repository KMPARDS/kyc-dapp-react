import React from 'react';
import { ethers } from 'ethers';
import { Col, Row } from 'react-bootstrap';
import User from '../../../models/User';
import { PROVIDER } from '../../../config/config';
import axios from 'axios';
import { UserContext } from '../../../utils/user.context';

export default class LevelFour extends React.Component {
                 static contextType = UserContext;
                 state = {
                   estimatedGasUnits: null,
                   gasPriceInput: '',
                   etherscanUrl: null,
                   recommendations: {
                     fastest: '55',
                     fast: '54',
                     average: '50',
                     safeLow: '45',
                   },
                   estimating: false,
                   transferring: false,
                   error: null
                 };

                 componentDidMount = async () => {
                   try {
                     await this.updateGasPriceRecommendations();
                   } catch {}
                 };

                 updateGasPriceRecommendations = async () => {
                   const resp = await axios.get(
                     'https://ethgasstation.info/api/ethgasAPI.json'
                   );

                   const newRecommendations = {
                     ...this.state.recommendations,
                   };

                   if (resp?.data?.fastest)
                     newRecommendations.fastest = String(
                       +resp.data.fastest / 10
                     );
                   if (resp?.data?.fast)
                     newRecommendations.fast = String(+resp.data.fast / 10);
                   if (resp?.data?.average)
                     newRecommendations.average = String(
                       +resp.data.average / 10
                     );
                   if (resp?.data?.safeLow)
                     newRecommendations.safeLow = String(
                       +resp.data.safeLow / 10
                     );

                   this.setState({ recommendations: newRecommendations });
                 };

                 estimateGas = async (event) => {
                   event.preventDefault();
                   this.setState({ estimating: true });
                   try {
                     const estimatedGasUnits = await this.context?.user?.esInstance.estimateGas.transfer(
                       this.props.ADMIN_WALLET,
                       ethers.utils.parseEther(this.props.balance)
                     );
                     this.setState({ estimatedGasUnits, estimating: false });
                   } catch (e) {
                     this.setState({
                       error: 'Gas estimation failed',
                     });
                   }
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

                 transfer = async (event) => {
                   event.preventDefault();
                   this.setState({ transferring: true });
                   console.log('this.props.balance', this.props.balance);
                   let etherscanUrl = null;
                   try {
                     const tx = await this.context?.user?.esInstance.transfer(
                       this.props.ADMIN_WALLET,
                       ethers.utils.parseEther(this.props.balance),
                       {
                         gasLimit: Math.round(
                           this.state.estimatedGasUnits * (4 / 3)
                         ),
                         gasPrice: ethers.utils.parseUnits(
                           this.state.gasPriceInput,
                           'gwei'
                         ),
                       }
                     );

                     etherscanUrl = `https://${
                       PROVIDER !== 'homestead' ? `${PROVIDER}.` : ''
                     }etherscan.io/tx/${tx.hash}`;
                   } catch (e) {
                     console.log(e.error);
                     this.setState({ error: e?.error?.message });
                   }
                   this.setState({ etherscanUrl, transferring: false });
                 };

                 render() {
                   const ethCost = this.getEthCost();
                   return (
                     <>
                       {this.state.estimatedGasUnits === null ? (
                         <>
                           <p>
                             Press below button to estimate transaction fees
                           </p>
                           <button
                             className="submit-btn"
                             onClick={this.estimateGas}
                             disabled={this.state.estimating}
                           >
                             {this.state.estimating ? (
                               <>Estimating...</>
                             ) : (
                               <>Estimate Gas</>
                             )}
                           </button>
                         </>
                       ) : (
                         <>
                           {this.state.etherscanUrl === null ? (
                             <>
                               {Object.entries(this.state.recommendations).map(
                                 (entry, i) => (
                                   <div
                                     key={'gasprice' + i}
                                     onClick={() =>
                                       this.setState({
                                         gasPriceInput: entry[1],
                                       })
                                     }
                                     style={{
                                       cursor: 'pointer',
                                       display: 'block',
                                     }}
                                   >
                                     {entry[0]}: {entry[1]}
                                   </div>
                                 )
                               )}
                               <input
                                 type="text"
                                 placeholder="Enter custom gas price in gwei"
                                 value={this.state.gasPriceInput}
                                 onChange={(event) =>
                                   this.setState({
                                     gasPriceInput: event.target.value,
                                   })
                                 }
                               />
                             </>
                           ) : null}
                           <br />
                           {ethCost !== null ? (
                             <>
                               <p>Esimated transaction cost is {ethCost} ETH</p>
                               {this.state.etherscanUrl === null ? (
                                 <button
                                   className="submit-btn"
                                   onClick={this.transfer}
                                   disabled={this.state.transferring}
                                 >
                                   {this.state.transferring ? (
                                     <>Signing tx...</>
                                   ) : (
                                     <>Sign and send transaction</>
                                   )}
                                 </button>
                               ) : (
                                 <>
                                   Transaction sent!{' '}
                                   <a
                                     href={this.state.etherscanUrl}
                                     target="_blank"
                                   >
                                     View on EtherScan
                                   </a>
                                 </>
                               )}
                             </>
                           ) : (
                             <>Invalid Gas Price</>
                           )}
                           {this.state.error && <p style={{color:'red'}}>{this.state.error}</p>}
                         </>
                       )}
                     </>
                   );
                 }
               }
