<template>
	<view>
		 <!-- 顶部地址 -->
		<view class="top_bar" @tap="addAddress">
			<view class="top_bar_info">
				<view v-if="address">
					<view class="name_tel">
					<view class="name">
						{{"名字啊"}}
					</view>
					<view class="tel">
						{{18888888888}}
					</view>
					<view class="btn">
						{{"默认"}}
					</view>
					</view>
					<view class="addrss">
						{{"山东临沂市兰山区向阳小区17-3-202山东临沂市兰山区向阳小区17-3-202山东临沂市兰山区向阳小区17-3-202山东临沂市兰山区向阳小区17-3-202山东临沂市兰山区向阳小区17-3-202山东临沂市兰山区向阳小区17-3-202"}}
					</view>
				</view>
				<text v-else style="font-size:16px">请添加默认地址</text>
			</view>
			<view class="top_bar_arrow">
				<text class="iconfont icon-youjiantou"></text>
			</view>
		</view>
		<image 
src="https://meizi.manogue.com.cn/static/wap/images/setindent_border_02.jpg" class="division"></image>
	</view>
</template>
<script>
export default {
	data(){
		return{
			address:null,
		}
	},
	onLoad(){
		this.$request.GET({
			url:this.$api.apiUrl.SHOW_ORDER_COMMIT
		}).then(res=>{
			if(!res.address === null){
				this.address = res.address;
			}
		})
	},
	methods:{
		addAddress(){
			uni.navigateTo({
				url:"/pages/mys/address/address"
			})
		}
	}
}

</script>
<style lang="scss">
@import "./buy.scss";
</style>