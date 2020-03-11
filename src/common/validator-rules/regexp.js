import { msg} from "@/utils";
export default {
	// 校验手机号方法
	checkphoneformat(phonenum) {
		if (/^1[3-9]{1}[0-9]{9}$/.test(phonenum)) {
			return true;
		} else {
			msg("请输入正确的手机号码");
			return false;
		}
	},
	// 校验密码方法
	checkpasswordformat(password) {
		// 密码中必须包含字母（不区分大小写）、数字，至少8个字符，最多16个字符；
		let pwdRegex = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}");
		if (pwdRegex.test(password)) {
			return true;
		} else {
			msg("密码须为8~16位字母+数字组合");
		}
	},
	// 校验验证码
	checkyzmformat(yzm) {
		if (!yzm || yzm.length != 4) {
			msg("请输入正确的4位数字验证码");

			return false;
		} else {
			return true;
		}
	}
};
