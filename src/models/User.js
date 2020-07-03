export default class User {
  _token;
  _data;
  _walletAddress;
  _wallet;

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

  static getWalletAddress() {
    return this._walletAddress;
  }
  static setWalletAddress(value) {
    this._walletAddress = value;
  }

  static getWallet() {
    return this._wallet;
  }
  static setWallet(value) {
    this._wallet = value;
  }
}