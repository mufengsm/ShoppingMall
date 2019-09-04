<template>
	<view class="container">
		<view class="back-btn yticon icon-zuojiantou-up" @tap="navBack"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<image src="../../static/logo/ddmlogoicon.png" class="logo" mode="aspectFit"></image>
			<view class="input-content">
				<view class="userType">
					<view :class="{left:true,active:isActive}" @tap="typeSwitch">会员登录</view>
					<view :class="{right:true,active:!isActive}" @tap="typeSwitch">员工登录</view>
				</view>
				<view class="input-item">
					<input
						type="number"
						:value="mobile"
						placeholder="账号/手机号/用户名"
						maxlength="11"
						data-key="mobile"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<input
						type="mobile"
						:value="password"
						placeholder="密码"
						placeholder-class="input-empty"
						maxlength="20"
						password
						data-key="password"
						@input="inputChange"
						@confirm="toLogin"
					/>
				</view>
			</view>
			<button class="confirm-btn" @tap="toLogin" :disabled="logining">登录</button>
			<view class="forget-section">
				忘记密码?
			</view>
		</view>
		<view class="register-section">
			还没有账号?
			<text @tap="toRegist">马上注册</text>
		</view>
	</view>
</template>

<script>
import {
  mapMutations,
} from 'vuex';

export default {
  data() {
    return {
      mobile: '',
      password: '',
      logining: false,
      isActive: true,
    };
  },
  onLoad() {

  },
  methods: {
    ...mapMutations(['login']),
    inputChange(e) {
      const { key } = e.currentTarget.dataset;
      this[key] = e.detail.value;
    },
    navBack() {
      uni.navigateBack();
    },
    toRegist() {
      this.$api.msg('去注册');
    },
    async toLogin() {
		uni.showLoading({
			title: '正在登录中'
		});
		this.$request.POST({
			url:"/v1/user/login",
			data:{
				username:this.mobile,
				password:this.password
			}
		}).then(res => {
			uni.hideLoading();
			console.log(res.errcode)
			if(res.errcode === 1){
				uni.showToast({
					title: res.errmsg
				});
				uni.navigateTo({
					url: '/pages/user/user'
				});
			}else{
				uni.showToast({
					title:res.errmsg,
					icon:none
				});
			}
		})
    
    //   if (result.status === 1) {
    //     this.login(result.data);
    //     uni.navigateBack();
    //   } else {
    //     this.$api.msg(result.msg);
    //     this.logining = false;
    //   }
    },
    typeSwitch() {
      this.isActive = !this.isActive;
    },
  },

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
		margin-bottom: 50upx;
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

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
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
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 100upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
