import { ethers } from 'ethers';
import { PROVIDER } from '../config/config';

export default class User {
  _token;
  _data;
  _provider;
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

  static getProvider() {
    return (
      this._provider ?? (this._provider = ethers.getDefaultProvider(PROVIDER))
    );
  }

  static setWallet(value) {
    this._wallet = new ethers.Wallet(value).connect(this.getProvider());
    this._esInstance = new ethers.Contract(
      '0xef1344bdf80bef3ff4428d8becec3eea4a2cf574',
      require('../ethereum/ERC20.json').abi,
      this._wallet
    );
  }
}
