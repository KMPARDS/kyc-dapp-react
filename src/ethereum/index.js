import {CustomProvider, typechain,addresses } from 'eraswap-sdk';

//export const providerESN = new CustomProvider(process.env.REACT_APP_NODE_ENV === 'development' ? 'testnet' : 'mainnet');
export const providerESN = new CustomProvider(process.env.REACT_APP_NODE_ENV === 'development' ? 'testnet' : 'mainnet');

//export const kycInst = typechain.ESN.KycDappFactory.connect(addresses[process.env.REACT_APP_NODE_ENV].ESN.kycdapp,providerESN);
export const kycInst = typechain.ESN.KycDappFactory.connect(addresses[process.env.REACT_APP_NODE_ENV || 'production'].ESN.kycdapp,providerESN);

export const dayswappersInst = typechain.ESN.DayswappersWithMigrationFactory.connect(
 // addresses[process.env.NODE_ENV].ESN.dayswappers,
addresses[process.env.REACT_APP_NODE_ENV || 'production'].ESN.dayswappers,
  providerESN
);

window.providerESN = providerESN;
window.kycInst = kycInst;
window.dayswappersInst = dayswappersInst;
window._ethers = require('ethers');
