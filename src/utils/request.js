import { apiUrl } from './index.js';
export default {
	storage: {
		access_token: uni.getStorageSync('access_token') ? uni.getStorageSync('access_token') : " "
	},
	fnHelper: {
		async checkoutUser() {
			// 先查看是什么用户
			const value = uni.getStorageSync('storage_salesman');
			if (value) {
				const TOKEN = uni.getStorageSync('access_token');
				const [error, res] = await uni.request({
					method: 'POST',
					url: apiUrl.POST_V6_USER_CHECKTOKEN,
					header: {
						'Token': TOKEN,
					},
					data: {
						token: TOKEN
					},
				});
				if (res.data.msg === '登陆状态失效!') {
					uni.setStorageSync('storage_salesman', '');
					uni.setStorageSync('access_token', '');
				}
				return res.data;
			} else {
				return false;
			}
		},
	},
	async GET(dataObj) {
		const result = await this.fnHelper.checkoutUser();

		// 这个函数是为了过滤get请求的data
		const parseQuery = (obj) => {
			let str = ''
			for (let key in obj) {
				const value = typeof obj[key] === 'string'
					? obj[key]
					: JSON.stringify(obj[key])
				str += '&' + key + '=' + value
			}
			return str.substr(1)
		}
		const [error, res] = await uni.request({
			header: {
				'Token': uni.getStorageSync('access_token') ? uni.getStorageSync('access_token') : " ",
			},
			url: dataObj.url += '?' + parseQuery(dataObj.data),
			method: 'GET',
		});
		return res.data;
	},
	async POST(dataObj) {
		const result = await this.fnHelper.checkoutUser();

		const [error, res] = await uni.request({
			header: {
				'Token': uni.getStorageSync('access_token') ? uni.getStorageSync('access_token') : " ",
			},
			url: dataObj.url,
			method: 'POST',
			data: dataObj.data,
		});
		return res.data;
	},
};

