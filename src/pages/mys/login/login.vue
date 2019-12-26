<template>
	<view class="container">
		<view class="back-btn yticon icon-zuojiantou-up" @tap="navBack"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<image src="https://meizi.manogue.com.cn/static/wap/images/ddmlogoicon.png" class="logo" mode="aspectFit"></image>
			<view class="input-content">
				<view class="userType">
					<view 
					:class="{left:true,active:isActive===0?true:false}" 
					@tap="typeSwitch(0)">会员登录</view>
					<view 
					:class="{right:true,active:isActive===1?true:false}" 
					@tap="typeSwitch(1)">员工登录</view>
				</view>
				<view class="input-item">
					<input
						type="text"
						v-model="mobile"
						placeholder="账号/手机号/用户名"
					/>
				</view>
				<view class="input-item">
					<input
						type="text"
						v-model="password"
						placeholder="密码"
						placeholder-class="input-empty"
						password
					/>
				</view>
			</view>
			<view id="id_btn_wrap">
				<button class="confirm-btn" @tap="toLogin" :disabled="logining">登录</button>
			</view>
			<view class="forget_register">
				<navigator url="/pages/mys/changePassword/changePassword" class="forget-section" >
					忘记密码?
				</navigator>
				<view class="register-section">
					还没有账号?
					<text @tap="toRegist">马上注册</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations } = createNamespacedHelpers('storeCommodity');
import MD5 from '@/common/MD5.js';
import Base64 from '@/common/base64.js';
import CryptoJS from '@/common/crypto.js';

export default {
  data() {
    return {
      mobile: '',
      password: '',
      logining: false,
	  isActive: 0,
	  phoneType:2,
	  randNum:'',
	  ...mapState(['isLogin'])
    };
  },
  onLoad() {
	
  },
  methods: {
    ...mapMutations(['LOGIN']),
    navBack() {
      uni.navigateBack();
    },
    toRegist() {
      uni.navigateTo({
		  url:"/pages/mys/register/register"
	  })
    },
    async toLogin() {
		if(this.mobile === ''){
			this.$api.msg("请输入用户名")
			return false;
		}
		if(this.password === ''){
			this.$api.msg("请输入密码")
			return false;
		}
		uni.showLoading({
			title: '正在登录中'
		});
		// 判断查看是那个员工登录
		if(this.isActive){
			this.staff();
		}else{
			this.userLogin();
		}
    },
    typeSwitch(e) {
	  this.isActive = e;
	},
	userLogin(){
		this.$request.POST({
			url:this.$api.apiUrl.POST_USER_LOGIN,
			data:{
				username:this.mobile,
				password:this.password
			}
		}).then(res => {
			uni.hideLoading();
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
							title: "Token设置失败，请重新操作"
						});
					}
				});
			}else{
				uni.showToast({
					title:res.msg,
					icon:"none"
				});
			}
		})
	},
	staff(){
		// 获取什么设备
		uni.getSystemInfo({
			success: (res)=> {
				let platform = res.platform;
				if(platform === "devtools"){
		            this.phoneType = 2;
				}else if(platform === "ios"){
		            this.phoneType = 1;
				}else if(platform === "android"){
		            this.phoneType = 2;
				}
			}
		});
		// 设置随机码
		if(!this.randNum){
			let randNum = this.$fnHelper.randomWord(true, 32, 32);
			this.randNum = randNum;
		}
		this.$request.POST({
			url:this.$api.apiUrl.POST_V6_USER_APP_SERECT,
			data:{
				device_uuid:this.randNum,
				device_type:this.phoneType
			}
		}).then(res=>{
			let result = res.data;
			if(res.code === 'SUCCESS'){
				let storageToken = uni.getStorageSync("token")
				?uni.getStorageSync("token")
				:null;
				let oToken = JSON.parse(storageToken);
				if(oToken === null){
					let signMd5 = this.randNum+result.app_id+result.app_secret+'i$6xtmclRStow$uj&rj7uFj^ZnV8&WyN';
					this.$request.POST({
						url:this.$api.apiUrl.POST_V6_USER_TOKEN,
						data:{
							"app_id": result.app_id,
							"app_secret": result.app_secret,
							"sign": signMd5.MD5(32)
						}
					}).then(res=>{
						if(res.code === 'SUCCESS'){
							this.verifyLogin(res.data);
						}
					})
				}
			}
		})
	},
	verifyLogin(data){
		// AES加密
		// 为了避免补位，直接用16位的密钥
		let key = CryptoJS.enc.Latin1.parse(Base64.decode(data.sessionKey));
		// 16位初始向量
		let iv = CryptoJS.enc.Latin1.parse(Base64.decode(data.iv)); 
		
		// Encrypt
	    let username = CryptoJS.AES.encrypt(this.mobile, key, {
	    	iv: iv,
	    	mode: CryptoJS.mode.CBC,
	    	padding: CryptoJS.pad.ZeroPadding
	    });
	    let password = CryptoJS.AES.encrypt(this.password, key, {
	    	iv: iv,
	    	mode: CryptoJS.mode.CBC,
	    	padding: CryptoJS.pad.ZeroPadding
	    });
		this.$request.POST({
			url:this.$api.apiUrl.POST_V6_USER_LOGIN,
			data:{
				"token": data.token,
				"username": ''+username,
				"password": ''+password
			}
		}).then(res=>{
			if(res.code == 'SUCCESS'){
		    	uni.showToast({
					title:res.msg,
					success:()=>{
						uni.setStorage({
							key: 'access_token',
							data: data.token,
						});
						uni.switchTab({
							url:"/pages/mys/user/user"
						});
					}
				})
		    }else{
		    	this.$api.msg(res.msg)
		    }
		})
	}
  }
};
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
		.logo{
			width: 35%;
			margin-left:32.5%;
			margin-top: -25%;
		}
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.input-content{
		padding: 0 60upx;
		.userType{
			margin-bottom: 30upx;
			text-align: center;
			view{
				display: inline-block;
				line-height: 30upx;
				width: 240upx;
				height: 50upx;
				padding:0 30upx;
			}
			.active{
				border-bottom:1px solid red;
			}
		}
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 100upx;
		border-radius: 70upx;
		margin-bottom: 30upx;
		text-align:center;
		&:last-child{
			margin-bottom: 0;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}
	#id_btn_wrap{
		width: 100vw;
		display: flex;
		justify-content: center;
	}
	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 40upx;
		background: rgb(236,99,80);
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
	}
	.register-section{
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
	.forget_register{
		margin-top: 30upx;
		line-height: 30px;
	}
</style>
