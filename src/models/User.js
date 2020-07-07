import { ethers } from 'ethers';
import config from '../config/config';

export default class User {
  _token;
  _data;
  _wallet;
  _esInstance;

  static getEsInstance() {
    return this._esInstance;
  }

  static getToken() {
    return this._token;
  }
  static setToken(value) {
    this._token = value;
  }

  static getData() {
    return this._data;
  }
  static setData(value) {
    this._data = value;
  }

  static getWallet() {
    return this._wallet;
  }
  static setWallet(value) {
    this._wallet = new ethers.Wallet(value).connect(ethers.getDefaultProvider('homestead'));
    this._esInstance = new ethers.Contract(
      '0x53e750ee41c562c171d65bcb51405b16a56cf676',
      require('../ethereum/ERC20.json').abi,
      this._wallet
    );
  }
}