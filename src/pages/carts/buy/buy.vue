<template>
	<view class="content">
		 <!-- 顶部地址 -->
		<view class="top_bar" @tap="addAddress">
			<view class="top_bar_info">
				<view v-if="address">
					<view class="name_tel">
					<view class="name">
						{{address.truename}}
					</view>
					<view class="tel">
						{{address.phone}}
					</view>
					<view class="btn" v-if="address.is_default">
						{{"默认"}}
					</view>
					</view>
					<view class="addrss">
						{{address.province+address.city+address.area+"  "+address.address}}
					</view>
				</view>
				<text v-else style="font-size:16px">请添加默认地址</text>
			</view>
			<view class="top_bar_arrow">
				<text class="iconfont icon-youjiantou"></text>
			</view>
		</view>
		<view class="img">
			<image 
src="https://meizi.manogue.com.cn/static/wap/images/setindent_border_02.jpg" class="division"></image>
		</view>

		<view class="commodity_card">
			<view class="top">
				<image src="https://meizi.manogue.com.cn/static/wap/images/cart_store_03.png"></image>
       			<view class="txt">自营</view>
			</view>
			<view class="card_wrap">
				<view class="item_card" v-for="(item,index) in goods" :key="index">
					<view class="left">
						<image :src="item.goods_cover"></image>
					</view>
					<view class="right">
						<view class="title">
							{{item.goods_name}}
						</view>
						<view class="specs">{{item.spec_name}}</view>
							<view>
							<text class="retreat">退</text>
							<text class="guarantee">7天退换</text>
							</view>
						<view class="num_price">
							<text class="price">¥{{item.goods_price}}</text>
							<text class="num">x{{item.goods_num}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom">
				<input type="text" 
				placeholder="选填：对本次购物交易的说明(50字)">
			</view>
		</view>
		<view class="settlement">
			<view class="settlement_item">
				<text class="txt">订单金额:</text>
				<text class="price">¥ 199</text>
			</view>
			<view class="settlement_item">
				<text class="txt">运费:</text>
				<text class="price">¥ 6</text>
			</view>
		</view>
		<view class="bottom_settlement">
			<view class="txt">
				<text class="info">支付金额:</text>
				<text class="price">¥199</text>
			</view>
			<button class="btn">提交订单</button>
		</view>
	</view>
</template>
<script>
export default {
	data(){
		return{
			address:null,
			goods:[]
		}
	},
	onShow(){
		this.loadingData();
	},
	methods:{
		addAddress(){
			uni.navigateTo({
				url:"/pages/mys/address/address"
			})
		},
		loadingData(){
			this.$request.GET({
				url:this.$api.apiUrl.GET_SHOW_ORDER_COMMIT
			}).then(res=>{
				if(res.data.address !== null){
					this.address = res.data.address;
				}
				this.goods = res.data.goods;
				console.log(this.goods);
			})
		}
	}
}

</script>
<style lang="scss">
@import "./buy.scss";
</style>