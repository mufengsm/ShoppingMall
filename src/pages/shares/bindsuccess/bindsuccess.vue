<template>
	<view>
		<view class="wrap">
			<button @tap="navToPage">开启省钱模式</button>
			<view class="sq_ta">
				<view class="sq_title">
					美妆好货 一手掌握 <text>多多美</text>
				</view>
				<view class="sq_desc">
					<view>1.点击上方<text>开启省钱模式</text>按钮跳转到注册页面</view>
					<view>2.24小时内使用手机号 {{phone}} 成功注册即可</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data(){
		return{
			phone:null
		}
	},
	onLoad(options){
		var uid = options.id;
		if(typeof (uid) === undefined || uid === undefined){
			this.phone = '';
		}else{
			this.phone = uid;
		}
	},
	methods:{
		navToPage(){
			uni.navigateTo({
				url:"/pages/mys/register/register"
			})
		}
	}
}
</script>
<style lang="scss">
page{
	width: 100vw;
	height: 100vh;
	background-image: url('https://meizi.manogue.com.cn/static/wap/images/huiyuan_bd.png');
	background-repeat: no-repeat;
   	background-size: 100% 100%;
}
.wrap{
	position: absolute;
	top: 40vh;
	left: 10vw;
	button{
		width: 60%;
		border-radius: 10vw;
		color:#fb3a23;
		background-color: #ffd96b;
	}
}
.sq_ta {
	border: 5px solid #f9d4cb;
	width: 92%;
	margin: 0 auto;
	border-radius: 1vw;
	padding: 5vw 3vw;
	background-color: #fff;
	margin-top: 5vw;
}
.sq_title {
	margin-bottom: 3vw;
	font-size: 4.5vw;
	text {
		color: #ec6350;
		font-size: 4vw;
	}
}
.sq_desc {
	font-size: 3.2vw;
	color: #999999;
	text {
		color: #ec6350;
	}
}
</style>