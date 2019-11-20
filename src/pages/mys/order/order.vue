<template>
	<view class="content">
		<!-- 头部分类 -->
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view 
					class="list-scroll-content" 
					scroll-y
					@scrolltolower="loadData"
				>
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
					
					<!-- 订单列表 -->
					<view 
						v-for="(item,index) in tabItem.orderList" :key="index"
						class="order-item"
					>
						<!-- 每个订单的头部店铺 -->
						<view class="i-top b-b">
							<image 
							class="img"
							src="https://meizi.manogue.com.cn/static/wap/images/cart_store_03.png"></image>
							<text class="time">美资自营</text>
							<text class="state" :style="{color: item.stateTipColor}">
								{{item.stateTip}}
								</text>
							<text 
								v-if="item.state===9" 
								class="del-btn yticon icon-iconfontshanchu1"
								@click="deleteOrder(index)"
							></text>
						</view>
						<!-- 如果是多个商品,显示横向滚动模块 -->
						<!-- <scroll-view 
						v-if="item.goodsList.length > 1" class="goods-box" scroll-x>
							<view
								v-for="(goodsItem, goodsIndex) in item.goodsList" :key="goodsIndex"
								class="goods-item"
							>
								<image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>
							</view>
						</scroll-view> -->
						<!-- 商品列表 -->
						<view 
							class="goods-box-single"
							v-for="(goodsItem, goodsIndex) in item.goodsList" :key="goodsIndex"
						>
							<image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.goods_name}}</text>
								<text class="attr-box">产品规格：{{goodsItem.name}} x {{goodsItem.goods_num}}</text>
								<text class="price">{{goodsItem.goods_price}}</text>
							</view>
						</view>
						<!-- 总订单描述 -->
						<view class="price-box">
							共<text class="num">{{item.goodsList.length}}</text>
							件商品 
							<view id="freight">运费<text class="price">{{item.freight}}</text></view>
							合计<text class="price">{{item.order_amount}}</text>
						</view>
						<!-- 订单操作按钮 -->
						<view class="action-box b-t">
							<button 
							class="action-btn recom"
							v-for="(item2,index) in item.btnArr"
							:key="index"
							:data-id="item.order_id"
							:data-txt="item2"
							@tap="operationOrder"
							>
								{{item2}}
							</button>
						</view>
					</view>
					 <!-- 正在加载组件 -->
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
					
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/UniLoadMore/UniLoadMore.vue';
	import empty from "@/components/empty/empty";
	import Json from '@/Json';
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						page:0,
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						page:0,
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						page:0,
						text: '待发货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						page:0,
						text: '待收货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 4,
						page:0,
						text: '待评价',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 5,
						page:0,
						text: '已完成',
						loadingType: 'more',
						orderList: []
					}
				],
			};
		},
		
		onLoad(options){
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			// +号是让可以隐式转换的字符串变为数字
			this.tabCurrentIndex = +options.state;
			// #ifndef MP
			this.loadData()
			// #endif
			// #ifdef MP
			if(options.state == 0){
				this.loadData()
			}
			// #endif
			
		},
		 
		methods: {
			//获取订单列表
			loadData(source){
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				
				if(source === 'tabChange' && navItem.loaded === true){
					//tab切换只有第一次需要加载数据
					return;
				}
				if(navItem.loadingType === 'loading'){
					//防止重复加载
					return;
				}

				navItem.loadingType = 'loading';
				this.$request.GET({
					url:this.$api.apiUrl.GET_ORDER_GET_LIST,
					data:{
						page:this.navList[this.tabCurrentIndex].page++,
						status:this.tabCurrentIndex
					}
				}).then(res=>{
					let list = this.navList[this.tabCurrentIndex];
					//添加不同状态下订单的表现形式
					let orderList = res.map(item=>{
						return item = Object.assign(item, this.orderStateExp(item.status,item.statusText));
					});
					this.$set(list,"orderList",list.orderList.concat(orderList))
					
					//判断是否还有数据， 有改为 more， 没有改为noMore 
					if(res.length>0){
						navItem.loadingType = 'more';
					}else{
						navItem.loadingType = 'noMore';
					}
					//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页组件
					this.$set(navItem, 'loaded', true);
				})
			}, 

			//swiper 切换
			changeTab(e){
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
			},
			//删除订单
			deleteOrder(index){
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(()=>{
					this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
					uni.hideLoading();
				}, 600)
			},
			//取消订单
			cancelOrder(item){
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(()=>{
					let {stateTip, stateTipColor} = this.orderStateExp(9);
					item = Object.assign(item, {
						state: 9,
						stateTip, 
						stateTipColor
					})
					
					//取消订单后删除待付款中该项
					let list = this.navList[1].orderList;
					let index = list.findIndex(val=>val.id === item.id);
					index !== -1 && list.splice(index, 1);
					
					uni.hideLoading();
				}, 600)
			},

			//订单状态文字和颜色
			orderStateExp(state,statusText){
				let stateTip = '',
					stateTipColor = '#fa436a',
					btnArr = [];
				switch(+state){
					case 0:
						btnArr = ["订单详情"]
						stateTip = statusText; 
						stateTipColor = 'red';break;
					case 1:
						btnArr = ["订单详情","去支付"]
						stateTip = statusText;
						stateTipColor = 'red';break;
					case 2:
						btnArr = ["订单详情"]
						stateTip = statusText;
						stateTipColor = 'red';break;
					case 3:
						btnArr = ["查看物流","确认收货","订单详情"]
						stateTip = statusText; 
						stateTipColor = 'red';break;
					case 4:
						btnArr = ["去评价","订单详情"]
						stateTip = statusText; 
						stateTipColor = 'red';break;
					case 5:
						stateTip = statusText; 
						stateTipColor = 'red';break;	
						break;
				}
				return {stateTip, stateTipColor,btnArr};
			},
			// 查找物流
			searchLogistics(orderId){
				this.$request.POST({
					url:this.$api.apiUrl.POST_ORDER_LOGISTICS,
					data:{
						order_id:orderId
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
			// 确认收货
			confirmReceipt(orderId){
				uni.showModal({
					title: '消息提示',
					content: '确定已收到货了吗?',
					success:(res)=> {
						if (res.confirm) {
							this.$request.POST({
								url:this.$api.apiUrl.POST_ORDER_RECEIPT,
								data:{
									id:orderId
								}
							}).then(res=>{
								// console.log(res);
							})
						} else if (res.cancel) {return false}
					}
				});
			},
			operationOrder(e){
				let txt = e.target.dataset.txt,
					id 	= e.target.dataset.id;
				switch (txt) {
					case "订单详情":
						uni.navigateTo({
							url:`/pages/mys/orderInfo/orderInfo?id=${id}`
						})
						break;
					case "查看物流":
						this.searchLogistics(id);
					case "确认收货":
						this.confirmReceipt(id);
					default:
						break;
				} 
				
			}
		},
	}
</script>

<style lang="scss">
	@import "./order.scss";
</style>
