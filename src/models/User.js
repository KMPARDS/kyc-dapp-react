export default class User {
	token = '';
	data = {};
	walletAddress = '';
	wallet = {};

	static getToken() {
		return this.token;
	}

	static setToken(token) {
		this.token = token;
	}
	
	static getData() {
		return this.data;
	}

	static setData(data) {
		this.data = data;
	}

	static getWalletAddress() {
		return this.walletAddress;
	}

	static setWalletAddress(walletAddress) {
		this.walletAddress = walletAddress;
	}

	static getWallet() {
		return this.wallet;
	}

	static setWallet(wallet) {
		this.wallet = wallet;
	}

	get token() {
		return this.token;
	}
}