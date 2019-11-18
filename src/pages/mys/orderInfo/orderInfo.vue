<template>
	<view>
		<view class="top_status">
			<view class="left">
				<view>{{orderInfo.order_status}}</view>
				<!-- <view>{{someObject.info}}</view> -->
				<ExpireTime 
				v-if="isShow" 
				:endTime="expireTime" 
				:callback="callback" 
				@done="callback"
				endText="订单已超时"></ExpireTime>
			</view>
			<view class="right">
				<image src="http://localhost:8888/static/wap/images/paylogo1.png"></image>
			</view>
		</view>
		<view class="top_addrss">
			<view class="iconfont icon-dingwei icon"></view>
			<view class="addrss">
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
				<view class="addrss_info">
					{{address.province+address.city+address.area+"  "+address.address}}
				</view>
			</view>
		</view>
		<view class="commodity_card">
			<view class="top">
				<image src="https://meizi.manogue.com.cn/static/wap/images/cart_store_03.png"></image>
       			<view class="txt">美资自营</view>
			</view>
			<view class="card_wrap">
				<view class="item_card" v-for="(item,index) in goods" :key="index">
					<view class="left">
						<image :src="item.goods_cover"></image>
					</view>
					<view class="right">
						<view class="title_specs">
							<view class="title">{{item.goods_name}}</view>
							<view class="specs">产品规格: {{item.spec_name}}</view>
						</view>
						<view class="num_price">
							<view class="price">¥{{item.goods_price}}</view>
							<view class="num">x{{item.goods_num}}</view>
						</view>
					</view>
				</view>
				<view class="price_details">
					<view class="txt_wrap">
						<text class="left">商品总价</text>
						<text class="right">¥{{totalPrice}}</text>
					</view>
					<view class="txt_wrap">
						<text class="left">运费</text>
						<text class="right">¥{{freight}}</text>
					</view>
					<view class="txt_wrap">
						<text class="left">订单总价</text>
						<text class="right">¥{{totalPrice+freight}}</text>
					</view>
				</view>
			</view>
			<view class="bottom">
				<view class="txt">总需付款</view>
				<view class="price">¥{{totalPrice+freight}}</view>
			</view>
		</view>
		<view class="bottom_message"
		v-if="orderInfo.message"
		>
			<text class="title">订单备注:</text>
			<text class="info">{{orderInfo.message}}</text>
		</view>
		<view class="bottom_message last">
			<view class="info">订单编号：{{orderInfo.order_sn}}</view>
			<view class="info">订单创建时间：{{orderInfo.add_time}}</view>
		</view>
		<view class="bottom_settlement"
		v-if="orderInfo.order_status==='待付款'"
		>
			<button
			:disabled="isOvertime" 
			:style="{backgroundColor: isOvertime ? 'gray' : 'red'}"
			class="btn" 
			@tap='payment'>支付</button>
		</view>
		<!-- 尽量不与支付共用,下面是待收货 -->
		<view class="bottom_settlement"
		v-if="orderInfo.order_status==='待收货'"
		>
			<button
			class="collected left" 
			@tap='searchLogistics(address.order_id)'>查看物流</button>
			<button
			class="collected right" 
			@tap='payment'>确认收货</button>
		</view>
	</view>
</template>
<script>
import ExpireTime from "@/components/ExpireTime/ExpireTime.vue";
export default {
	data(){
		return {
			expireTime:0,
			isShow:false,
			address:{},
			goods:[],
			totalPrice:0,
			freight:0,
			orderInfo:{
				add_time:"",
				message:"",
				order_sn:"",
				order_status:""
			},
			isOvertime:false,
			someObject:{
				info:""
			},


		}
	},
	components:{
		ExpireTime
	},
	onLoad(e){
		this.$request.GET({
			url:this.$api.apiUrl.GET_ORDER_FIND+"/"+e.id,
		}).then(res=>{
			if(res.code !== 200){this.$api.msg(res.msg); return false}
			let result = res.data
			console.log(result);
			
			// 过期时间,非待付款状态过滤
			this.expireTime = result.expire_time ? result.expire_time : null;
			// 地址
			this.address = result.address;
			// 详情
			this.orderInfo = result.order;
			// 商品信息
			this.goods = result.goods;
			// 订单总价
			for (const key of this.goods) {
				this.totalPrice += Number(key.goods_price) * key.goods_num
				this.freight = this.totalPrice>300 ? 0 : 6;
			}
			// 数据请求到后在显示组件
			this.isShow = true;
		})
	},
	methods: {
		callback(e){
			this.$set(this.someObject,"info",e)
		},
		payment(){
			this.isOvertime = true;
			this.$request.POST({
				url:this.$api.apiUrl.POST_PAY_INDEX,
				data:{
					order_sn:this.orderInfo.order_sn
				}
			}).then(res=>{
				console.log(res);
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: String(res.data.timestamp),
					nonceStr: res.data.noncestr,
					package: res.data.package,
					signType: 'MD5',
					paySign: res.data.sign,
					success: (res)=> {
						console.log('success:' + JSON.stringify(res));
						uni.showToast({
							title:"支付成功",
							success:()=>{
								uni.navigateTo({
									url:"/pages/mys/order/order"
								})
							}
						})
					},
					fail: (err)=>{
						this.$api.msg('支付失败' + JSON.stringify(err))
						this.isOvertime = false;
						console.log('支付失败' + JSON.stringify(err));
					}
				});
			})
		},
		// 确认收货
		searchLogistics(id){
			this.$request.POST({
				url:this.$api.apiUrl.POST_ORDER_LOGISTICS,
				data:{
					order_id:id
				}
			}).then(res=>{
				const result = res.errMsg;
				uni.showModal({
					content: result.shipping_code+" : "+result.shipping_name,
					showCancel: false,
					confirmText: "确定"
				})
			})
		},
	}
}
</script>
<style lang="scss">
@import "./orderInfo.scss"
</style>