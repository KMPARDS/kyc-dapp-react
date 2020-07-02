import { baseUrl } from "../../config/config";
import User from '../../models/User';
import { ethers } from 'ethers';
import Axios from "axios";

const instance = Axios.create({
  withCredentials: true
})
export default class HeaderAPI {
		
		constructor(){			
		}

		static addListener(){
			window.wallet = '';
			// window.onload = function () {
			// 	if('opener' in window)
			// 		window.opener.postMessage("loaded", "*")
			// }
			window.addEventListener('message',  (e) => {
				this.login(e.data);
			}, false);
		}

		static openEraswap(){
			window.open("https://eraswap.life/", "", "width=1003,height=650");
		}

    static login(message){
			let countOfSession = 0,signature = '';
			if (message.substring) {
				if (message.substring(0, 2) == "0x") {
					window.wallet = new ethers.Wallet(message);
					User.setWallet(window.wallet);
					var token;
					if (countOfSession === 0){
						countOfSession++;
							instance.get(baseUrl+'getToken',{},{ 
								// withCredentials: true, 
								headers: {
									Authorization: true
								}
						})
							.then(function (resp) {
								console.log(resp);
								token = resp.data;
								if (typeof token !== undefined || token !== '') {
									signature = window.wallet.signMessage(token);
									signature.then(function (value) {
										instance.post(baseUrl+'login',
										{
											walletAddress: window.wallet.address,
											signature: value
										},
										{
											headers: {
												Authorization: true
											},
											// withCredentials: true
										})
										.then(function(resp) {
											console.log(resp)
											if (resp.data.status == 'success') {
												User.setTata(resp.data.user);
												User.setWalletAddress(window.wallet.address);
												User.setToken(resp.data.token);

												console.log('User.token',User.getToken());
											}
											else if (resp.data.status === 'error') {
												alert(resp.data.message);
											}
											else {
												alert('Could not login, Please try again after sometime');
											}
										})
										.catch(function(error){
											console.log(error.response);
										})
									})
										.catch(function (error) {
											console.log(error)
										});
								} else {
								}
							}).catch(function (error) {
								console.log(error)
							});
					}
				}
			}
		
    }
}