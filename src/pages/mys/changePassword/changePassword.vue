<template>
	<view class="content">
		<view class="ipt_item">
			<input type="text" maxlength="11" placeholder="请填写手机号" v-model="username">
		</view>
		<view class="ipt_item id_btn">
			<input type="text" placeholder="获取验证码" v-model="code">
			<button 
			class="btn button"
			@tap="getCode"
			:style="{
				backgroundColor:isBtn?'gray':'rgb(236, 61, 70)',
				color:isBtn?'#999':'#fff'
			}"
			:disabled="isBtn"
			>{{btnTxt}}</button>
		</view>
		<view class="ipt_item">
			<input type="text" password placeholder="请输入新密码" v-model="password">
		</view>
		<view class="ipt_item">
			<input type="text" password placeholder="请再次确认密码" v-model="confirmPassword">
		</view>
		<button class="btn"
		@tap="submit"
		>确定修改</button>
	</view>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations } = createNamespacedHelpers('storeCommodity');
export default {
	data(){
		return {
			username:"",
			isBtn:false,
			btnTxt:"获取验证码",
			password:"",
			confirmPassword:"",
			code:"",
			...mapState(['isLogin'])
		}
	},
	onLoad(e){this.username=e.phone},
	methods:{
		...mapMutations(['LOGIN']),
		getCode(){
			var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
			// 判断手机号是否正确
			if(myreg.test(this.username)){
				this.$request.POST({
					url:this.$api.apiUrl.POST_SMS_GETCODE,
					data:{
						phone:this.username
					}
				}).then(res=>{
					if(res.errCode === 200){
						uni.showToast({
							title:res.errMsg
						})
						this.codeDisabled();
					}else{
						this.$api.msg(res.errMsg)
					}
				})
			}else{
				this.$api.msg("输入正确的手机号");return false
			}
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
		// 两次密码必须相同
		passwordIdentical(){
			var myregs = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
			if(!myregs.test(this.password)){this.$api.msg("密码需在6-16位数字和字母的组合"); return false;}
			if(this.password!==this.confirmPassword){
				this.$api.msg("你输入的密码不相同,请核实")
				return false;
			}
			return true
		},
		submit(){
			const isPssword = this.passwordIdentical();
			if(isPssword){
				this.$request.POST({
					url:this.$api.apiUrl.POST_SMS_CHECK,
					data:{
						code:this.code,
						phone:this.username
					}
				}).then(res=>{
					if(res.errCode === 200){
						this.$request.POST({
							url:this.$api.apiUrl.POST_USER_REPASS,
							data:{
								phone:this.username,
								password:this.password,
								repassword:this.confirmPassword
							}
						}).then(res=>{
							if(res.errCode === 1){
								uni.showToast({
									title:res.errMsg,
									success:()=>{
										this.userLogin();
									}
								})
							}else{
								this.$api.msg("更改失败,不能与当前使用密码相同")
							}
						})
					}else{
						this.$api.msg(res.errMsg)
					}
				})
			}
		},
		userLogin(){
			this.$request.POST({
				url:this.$api.apiUrl.POST_USER_LOGIN,
				data:{
					username:this.username,
					password:this.password
				}
			}).then(res => {
				if(res.code === 200){
					uni.setStorage({
						key: 'access_token',
						data: res.data,
						success:()=>{
							Promise.all([this.LOGIN({"isLogin":!this.isLogin()})]).then(() =>{
								uni.showToast({
									title: res.msg
								});
								uni.switchTab({
									url:"/pages/mys/user/user"
								});
							});		
						},
						fail:()=>{
							uni.showToast({
								title: "Token设置失败，请自行登录",
								success:()=>{
									uni.switchTab({
										url:"/pages/mys/login/login"
									});
								}
							});
						}
					});
				}else{
					this.$api.msg(res.msg);
				}
			})
		}
	}
}
</script>
<style lang="scss">
	.content{
		padding: 0 10px;
	}
	.ipt_item{
		border-bottom: 1px solid rgba(236,99,80,0.5);
		padding: 15px 5px;
	}
	.btn{
		margin-top: 40px;
		background-color: rgba(236,99,80,1);
		color: white;
		border-radius: 30px;
	}
	.id_btn{
		display: flex;
		input{
			flex: 7;
		}
		.button{
			flex: 3;
			border-radius: 30px;
			background-color: rgb(236, 61, 70);
			color: white;
		}
	}
</style>