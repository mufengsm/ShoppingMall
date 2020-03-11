<template>
	<view>
		<view class="formtable">
			<view class="logintitle">
				<view class="bigtitle_words">手机号登录</view>
				<view class="font-ml"
					>若您是首次登录本香世界，请使用验证码登录</view
				>
			</view>
			<!-- 手机号输入 -->
			<view class="phoneinput">
				<text class="font-l">手机号码</text>
				<input
					class="font-l phone_cubeinput"
					:maxlength="11"
					v-model="userphone"
					type="number"
					placeholder="请填写您的手机号码"
				/>
			</view>
			<!-- 验证码 -->
			<view class="paswormsm">
				<view
					class="flex msmcode full-height full-width flex-alin-center"
				>
					<view class="phoneinput">
						<text class="font-l">{{
							msglogin ? "验证码" : "密码"
						}}</text>
						<input
							v-if="!msglogin"
							class="font-l phone_cubeinput"
							:maxlength="16"
							:password="!msglogin"
							placeholder="请填写您的的密码"
							v-model="password"
						/>
						<input
							v-else
							class="font-l phone_cubeinput"
							:maxlength="6"
							placeholder="请输入你的验证码"
							v-model="usermsmcode"
						/>
					</view>
					<view
						v-if="msglogin"
						class="btn getmsmcodebtn"
						@tap="getyzm"
						v-show="!yzmcounting"
						>获取验证码</view
					>
					<view class="getmsmcodebtncount" v-show="yzmcounting">{{
						`重新获取（${yzmcountnum}）`
					}}</view>
				</view>
			</view>
			<!-- 切换验证模式 -->
			<view class="flex changemode">
				<view class="flex-item">
					<text @tap="changeloginkind">{{
						msglogin ? "使用密码登录" : "使用验证码登录"
					}}</text>
				</view>
				<view v-if="!msglogin" class="flex-item">
					<text>忘记密码</text>
				</view>
			</view>
			<!-- 勾选条项18岁 -->
			<view class="checkbox_low">
				<view class="research_radio_in" @tap="grownUpFn">
					<view
						:style="{ background: grownUp ? '#c9af81' : '#fff' }"
						class="checkbox"
					></view
					>我已年满18周岁
				</view>
				<view class="research_radio_in" @tap="agreeFn">
					<view
						:style="{ background: agree ? '#c9af81' : '#fff' }"
						class="checkbox"
					></view
					>我已阅读并同意《用户服务协议》
				</view>
			</view>
		</view>
		<view class="subform btn align-center font-ml" @tap="login">登录</view>
	</view>
</template>
<script>
import loginRegexp from "@/common/validator-rules/regexp.js";
import MD5 from "@/common/MD5.js";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("storeCommodity");
export default {
	name: "login",
	data() {
		return {
			// 是否短信登录
			msglogin: false,
			//   验证码倒数状态
			yzmcounting: false,
			//   验证码获取间隔秒数
			yzmcountnum: 60,
			// 手机号
			userphone: 15999922034,
			//   短信验证码
			usermsmcode: null,
			//   密码
			password: "hongyun16855",
			//  协议勾选
			isagree: [],
			// 环境
			isEnvironment: null,
			signkey: null,
			result: "",
			// 温馨提示
			warntipsword: "",
			warntipslitword: "",
			//用户微信号已经绑定的手机号
			userweixinblindphone: null,
			// 是否成年
			grownUp: false,
			// 已阅读条例
			agree: false
		};
	},
	methods: {
		...mapActions(["BYPSW_TOkEN"]),
		grownUpFn() {
			this.grownUp = !this.grownUp;
		},
		agreeFn() {
			this.agree = !this.agree;
		},
		// 切换短信/密码登录
		changeloginkind() {
			this.msglogin = !this.msglogin;
		},
		// 获取验证码按钮
		async getyzm() {
			// 校验手机号
			// if (!loginRegexp.checkphoneformat(this.userphone)) return;
			// 倒数开始
			this.yzmcounting = true;
			this.countDown();
			// 请求短信接口
			// const { meta } = await loginApi.sendSms({ mobile: this.userphone });
			// if (meta.code === "00000000") {
			// 	console.log("验证码发送成功*");
			// } else {
			// 	this.$toast.alert(meta.message);
			// }
		},
		// 倒计时
		countDown() {
			this.yzmcountnum = this.yzmcountnum - 1;
			if (this.yzmcountnum == 0) {
				this.yzmcounting = false;
				this.yzmcountnum = 60;
				return;
			}
			setTimeout(() => {
				this.countDown();
			}, 1000);
		},
		// 登录按钮提交数据前校验
		login() {
			// 短信登录
			if (this.msglogin) {
				// 手机校验
				if (!loginRegexp.checkphoneformat(this.userphone)) {
					return;
				}
				// 验证码校验
				if (!loginRegexp.checkyzmformat(this.usermsmcode)) {
					return;
				}
				// 调用短信登录接口
				console.log("通过");
				// this.smsCodelogin();
			} else {
				//使用密码登录
				// 手机校验
				if (!loginRegexp.checkphoneformat(this.userphone)) {
					return;
				}
				//密码校验
				if (!loginRegexp.checkpasswordformat(this.password)) {
					return;
				}
				this.pawLogin();
			}
		},
		//短信登录业务
		smsCodelogin() {},
		pawLogin() {
			uni.showLoading();
			let md5pwd = this.password.MD5(32);

			this.$request
				.POST({
					url: `https://bx-world.bxsj.site/front/api/v1/uc-user-base/login-by-account-and-password`,
					data: {
						account: this.userphone,
						password: md5pwd
					}
				})
				.then(res => {
					console.log(res);
				});
		}
	}
};
</script>
<style lang="scss">
@import "./login.scss";
</style>
