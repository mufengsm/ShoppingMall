<template>
    <view>
        <view class="img">
			<image
			mode="widthFix"
			src="https://meizigroup.oss-cn-shenzhen.aliyuncs.com/images/20190926143227.png"
			>
			</image>
		</view>
		<view class="wrap_list_bg">
			<view class="wrap_list">
					<view class="register-phone">
					<text class="xing">手机号码</text>
					<input type="number" 
					maxlength="11"
					placeholder="请填写手机号(该手机号将作为您的登录手机号)" 
					placeholder-class="phone_plac"
					v-model="phone"
					@blur="checkPhone"
					class="phone" />
				</view>
					<view class="register-phone">
					<text class="xing">密码</text>
					<input
					password
					placeholder="请输入密码" 
					placeholder-class="phone_plac"
					v-model="password"
					class="phone" />
				</view>
					<view class="register-phone">
					<text class="xing">确认密码</text>
					<input 
					password
					placeholder="请输入密码" 
					placeholder-class="phone_plac"
					v-model="isPassword"
					@blur="passwordIdentical"
					class="phone" />
				</view>
				<view class="register-phone">
					<text class="xing">手机验证码</text>
					<view class="id_btn">
						<input type="number" 
						placeholder="请输入手机验证码" 
						placeholder-class="phone_plac"
						v-model="verificationCode"
						class="phone" />

						<button class="btn"
						@tap="getCode"
						:style="{
							backgroundColor:isBtn?'gray':'rgb(236, 61, 70)',
							color:isBtn?'#999':'#fff'
						}"
						:disabled="isBtn"
						>{{btnTxt}}</button>
					</view>
				</view>
					<view class="register-phone">
						<view class="agreement"
						@tap="isChecked"
						>
							<label>
								<checkbox :checked="cd" />我已阅读并同意
							</label>
							<text class="toAgreement"
							@tap="toAgreement"
							>《多多美平台协议》</text>
						</view>
					</view>
				</view>
			</view>
			<button
			@tap='submit'
			id="submit"
			>注册新人大礼包</button>
		</view>
    </view>
</template>
<script>
var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
var myregs = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
export default {
    data() {
        return {
			cd:false,
			phone:"",
			password:"",
			isPassword:"",
			isBtn:false,
			btnTxt:"获取验证码",
			verificationCode:""
		};
	},
	methods:{
		// 检测手机是否被注册
		checkPhone(){
			if(myreg.test(this.phone)){
				this.$request.POST({
					url:this.$api.apiUrl.POST_USER_CHECK,
					data:{
						username:this.phone
					}
				}).then(res=>{
					if(res.errcode === -1){
						this.$api.msg(res.errmsg)
						this.phone = '';
					}
				})
			}else{
				this.$api.msg("请输入正确的手机号码")
			}
		},
		// 两次密码必须相同
		passwordIdentical(){
			if(!myregs.test(this.password)){this.$api.msg("密码需在6-16位数字和字母的组合"); return false;}
			if(this.password!==this.isPassword){
				this.$api.msg("你输入的密码不相同,请核实")
				return false;
			}
			return true
		},
		getCode(){
			// 判断手机号是否正确
			if(!this.phone){this.$api.msg("输入正确的手机号");return false};
			// 判断两次密码是否相同
			let isRight = this.passwordIdentical();
			if(isRight){
				this.$request.POST({
					url:this.$api.apiUrl.POST_SMS_GETCODE,
					data:{
						phone:this.phone
					}
				}).then(res=>{
					this.codeDisabled();
				})
			};
		},
		//设置请求验证码倒计时
		codeDisabled(){
			// 按钮禁用
			this.isBtn = true;
			// 倒计时事件
			let time = 60;
			// 设置请求验证码倒计时
			let timeInterval = setInterval(()=>{
				if(time>0){
					this.btnTxt = (time--) + "秒后"
				}else{
					this.isBtn=false;
					this.btnTxt = "重新发送"
					time = 60;
					clearInterval(timeInterval);
				}
			},1000)
		},
		// 跳转到协议页面
		toAgreement(){
			uni.navigateTo({
				url:"/pages/indexs/useragreement/useragreement"
			})
		},
		isChecked(){this.cd = !this.cd;},
		submit(){
			if(!this.cd){this.$api.msg("请勾选已阅读,多多美平台协议");return false;}
			this.$request.POST({
				url:this.$api.apiUrl.POST_SMS_CHECK,
				data:{
					code:this.verificationCode
				}
			}).then(res=>{
				if(res.errCode===200){
					this.$request.POST({
						url:this.$api.apiUrl.POST_USER_REGISTER,
						data:{
							username:this.phone,
							password:this.password,
							confirm_password:this.isPassword,
						}
					}).then(res=>{
						if(res.errcode === 200){
							uni.switchTab({
								url:"/pages/mys/user/user"
							});
						}else{
							this.$api.msg(res.errmsg)
						}
					})
				}else{
					this.$api.msg(res.errMsg)
				}
			})
		}		
	}
};
</script>
<style lang="scss">
page{
	width: 100vw;
	height: 100%;
}
.img {
	text-align:center;
	image{
		width: 100%;
	}
}
.wrap_list_bg{
	background-color: rgb(234,55,58);
	margin-top: -10px;
	padding:10px;
	.wrap_list{
		background-color: white;
	}
}
.register-phone{
	border-bottom: 1px solid #999;
	line-height: 35px;
	.xing{
		padding-left: 10px;
		font-size: 16px;
		&::after{
			content: "*";
			color: red;
		}
	}
	.phone{
		padding-left: 18px;
		.phone_plac{
			font-size: 14px;
		}
	}
	.id_btn{
		display: flex;
		input{
			flex: 7;
		}
		button{
			flex: 3;
			margin: 10px;
			background-color: rgb(236, 61, 70);
			color: white;
		}
	}
	.agreement{
		font-size: 16px;
		color: #999;
		padding-left: 5px;
		.toAgreement{
			color:rgb(176,211,245);
		}
	}
}
#submit{
	width: 50vw;
	margin-top:10px;
	margin-bottom:10px;
	background-color: rgb(236, 61, 70);
	color: white;
	text-align: center;
}
</style>