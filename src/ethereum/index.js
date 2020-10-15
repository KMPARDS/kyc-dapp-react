import {CustomProvider, typechain,addresses } from 'eraswap-sdk';

export const providerESN = new CustomProvider(process.env.REACT_APP_NODE_ENV === 'development' ? 'testnet' : 'mainnet');

export const kycInst = typechain.ESN.KycDappFactory.connect(addresses[process.env.REACT_APP_NODE_ENV].ESN.kycdapp,providerESN);

window.providerESN = providerESN;
window.kycInst = kycInst;
window.ethers = require('ethers');
