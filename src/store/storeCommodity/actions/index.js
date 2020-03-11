import Vue from "vue";
import {
	SEARCH_INFO,
	BRAND_INFO,
	SORT_LIST,
	PRICE_CONTROL_INFO,
	BYPSW_TOkEN
} from "../types.js";

const $api = Vue.prototype;
export default {
	async [SEARCH_INFO]({ commit }, payload) {
		const result = await $api.$request.POST(payload);
		commit(SEARCH_INFO, result);
		return result;
	},
	async [BRAND_INFO]({ commit }, payload) {
		const result = await $api.$request.POST(payload);
		commit(BRAND_INFO, result);
		return result;
	},
	async [SORT_LIST]({ commit }, payload) {
		const result = await $api.$request.POST(payload);
		commit(SORT_LIST, result);
		return result;
	},
	async [PRICE_CONTROL_INFO]({ commit }, payload) {
		const result = await $api.$request.POST(payload);
		return result;
	},
	async [BYPSW_TOkEN]({ commit }, info) {
		return (async () => {
			// const {
			// 	meta,
			// 	data,
			// 	meta: { code }
			// } = await $api.$request.POST({
			// 	url: `https://bx-world.bxsj.site/uc-user-base/login-by-account-and-password`,
			// 	data: {
			// 		account,
			// 		password
			// 	}
			// });
			// if (code === "00000000") {
			// 	console.log("触发commit");
			// 	// if (data.isNeedSetPwd) {
			// 	// 	commit(TYPES.oauth.setpwdtoken, data.setPwdToken);
			// 	// } else {
			// 	// 	if (data.isNeedGetOpenId) {
			// 	// 		commit(TYPES.oauth.setopenidtoken, data.setOpenIdToken);
			// 	// 	} else {
			// 	// 		if (isEnvironment === "h5") {
			// 	// 			commit(TYPES.oauth.seth5Token, data.token);
			// 	// 		} else if (isEnvironment === "weixin") {
			// 	// 			commit(TYPES.oauth.setweixinToken, data.token);
			// 	// 		}
			// 	// 		commit(TYPES.oauth.setuseridentity, data.role);
			// 	// 	}
			// 	// }
			// }
			// return {
			// 	meta,
			// 	data
			// };
		})();
	}
};
