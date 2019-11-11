<template>
    <view>
		<view class="footer" @tap="addAddress">
       		<button class="cw">添加收获地址</button>
		</view>
    </view>
</template>
<script>
export default {
	data(){
		return {
			
		}
	},
	methods:{
		addAddress(){
			uni.navigateTo({url:"/pages/mys/addressForm/addressForm"})
		}
	}
}
</script>
<style lang="scss">
.footer{
	height: 40px;
	background-color: orange;
	width: 100vw;
	position: fixed;
	bottom: 0;
	text-align: center;
	line-height: 40px;
	.cw{
		color:white;
		width: 100%;
		display: block;
		line-height: 40px;
		background-color: orange;
	}
}
	
</style>