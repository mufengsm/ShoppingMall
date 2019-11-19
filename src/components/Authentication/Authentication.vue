<template>
	<view>
		<view 
		@tap="toAuth"
		class="icon">
			<image 
			class="img"
			src="https://meizi.manogue.com.cn/static/wap/images/icon-authentication6.png"></image>
		</view>
	</view>
</template>
<script>
export default {
	data(){
		return{

		}
	},
	methods:{
		toAuth(){
			uni.navigateTo({
				url:"/pages/mys/authentication/authentication"
			})
		}
	}
}
</script>
<style lang="scss">
.icon{
	width: 50px;
	height: 50px;
	position: fixed;
	bottom: 1vw;
	right: 2vw;
	z-index: 9999;
	.img{
		width: 100%;
		height: 100%;
	}
}
</style>