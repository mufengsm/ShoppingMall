<template>
	<view class="container" v-if="isWrapShow()">
		<!-- 右上角设置图标 -->
		<view class="set_icon" @tap="jumpLogin">
			<text class="iconfont icon-shezhi"></text>
		</view>
		<!-- 头部信息展示 -->
		<view class="user-section" @tap="jumpLogin">
			<view class="header_bg"></view>
			<view class="user-info-box">
				<view class="portrait-box">
					<image
					class="portrait"
					:src="userInfoObj.avatar
					?userInfoObj.avatar
					:'https://meizi.manogue.com.cn/static/wap/images/myct_hd.png'"
					></image>
				</view>
				<view class="info-box">
					<view class="username">{{userInfoObj.nickname}}</view>
					<view class="vip_leavel">{{grade}}</view>
				</view>
			</view>
		</view>
		<!-- 状态组件 -->
		<view class="cover-container">
			<view class="order-section">
				<!-- 状态信息 -->
				<view class="my_order">
					<view class="left">
						<image 
						src="https://meizi.manogue.com.cn/static/wap/images/myct_indent_red.png"></image>
						<view
						v-if="grade === 'VIP1'"
						>我的订单</view>
						<view v-else >
						数据统计
						</view>
					</view>
					<view
					class="right"
					v-if="grade === 'VIP1'"
					@tap="navTo({state:0})"
					>全部订单<text class="iconfont icon-youjiantou linH"></text>
					</view>
				</view>
				<!-- 订单图标显示 -->
				<view
				v-if="grade === 'VIP1'"
				class="order-item"
				v-for="(item,index) in order_status"
				:key="index"
				@tap="navTo(item)"
				>
					<image :src="item.img_url" mode="aspectFit"></image>
					<view class="pos_icon"
					v-if="item.num"
					>{{item.num}}</view>
					<text>{{item.text}}</text>
				</view>
				<!-- 销售员显示 -->
				<view
				v-if="grade !== 'VIP1'"
				class="order-item salesman"
				v-for="(item,index) in dataStatistics"
				:key="index"
				>
					<view class="num">{{item.num}}</view>
					<view class="text">{{item.text}}</view>
				</view>
			</view>
		</view>
		<!-- 第二个状态组件普通用户显示 -->
		<view class="tj-sction" v-if="grade === 'VIP1'">
			<image class="recommend_img" src="https://meizi.manogue.com.cn/static/wap/images/my_icon2_red.png" mode="aspectFit"></image>
			<text class="recommend_txt">推广有礼</text>
		</view>
		<!-- 第二个状态组件销售员显示 -->
		<view class="tj-sction" v-if="grade !== 'VIP1'">
			<view class="left">
				<image 
				src="https://meizi.manogue.com.cn/static/wap/images/myct_indent_red.png"></image>
				<view>今日成交量</view>
			</view>
			<view class="content order-section">
				<view
				v-if="grade !== 'VIP1'"
				class="order-item salesman"
				v-for="(item,index) in todayDeal"
				:key="index"
				>
					<view class="num">{{item.num}}</view>
					<view class="text">{{item.text}}</view>
				</view>
			</view>
		</view>
		<!-- 我的钱包功能暂未开启 -->
		<!-- <view class="my_wallet">
			<view class="order-section">
				<view class="my_order">
					<text class="left">我的钱包 <text class="is_opening">未开通,去开通</text></text>
					<text class="right">资金管理<text class="iconfont icon-youjiantou"></text></text>
				</view>
			</view>
			<view class="my_wallet_items">
				<view class="wallet_item" v-for="(item,index) in my_wallet_item" :key="index">
					<view class="num">{{item.num}}</view>
					<view class="text">{{item.text}}</view>
				</view>
			</view>
		</view> -->
		<!-- 底部其他功能组件会员版 -->
		<view class="other_function" v-if="grade === 'VIP1'">
			<image
			:src="item.img_url"
			mode="aspectFit"
			class="other_function_item"
			v-for="(item,index) in other_functions"
			:key="index"
			@tap="toAppointPage(item.txt)"
			>
			</image>
		</view>
		<!-- 底部其他功能组件员工版 -->
		<view class="other_function" v-if="grade !== 'VIP1'">
			<navigator
			v-for="(item,index) in employeeFunction"
			:key="index"
			:url="item.url"
			>
				<view>
					<image
					:src="item.img_url"
					mode="aspectFit"
					class="other_function_item"
					>
					</image>
					<view class="text">{{item.text}}</view>
				</view>
			</navigator>
		</view>
		<!-- 认证组件 -->
		<Authentication v-if="isAuth" />
	</view>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations } = createNamespacedHelpers('storeCommodity');

export default {
	data() {
		return {
			...mapState(["isWrapShow"]),
			isAuth:false,
			userInfoObj:{},
			orderList:[],
			order_status:[
				{img_url:`${this.$imgUrl}/images/myct_indentl_grey__01.png`,text:"待付款",state:1,num:0},
				{img_url:`${this.$imgUrl}/images/myct_indentl_grey__03.png`,text:"待发货",state:2,num:0},
				{img_url:`${this.$imgUrl}/images/myct_indentl_grey__05.png`,text:"待收货",state:3,num:0},
				{img_url:`${this.$imgUrl}/images/myct_indentl_grey__07.png`,text:"待评价",state:4,num:0},
				{img_url:`${this.$imgUrl}/images/myct_indentl_grey__09.png`,text:"退换货",state:5,num:0}
			],
			my_wallet_item:[
				{num:"--",text:"余额"},
				{num:0,text:"积分"},
				{num:0,text:"优惠卷"},
				{num:0,text:"银行卡管理"},
			],
			other_functions:[
				{img_url:`${this.$imgUrl}/images/myct_others_i_red_01.png`,txt:"商品收藏"},
				{img_url:`${this.$imgUrl}/images/myct_others_i_red_13.png`,txt:"拼团频道"},
				{img_url:`${this.$imgUrl}/images/myct_others_i_red_19.png`,txt:"客服"},
				{img_url:`${this.$imgUrl}/images/myct_others_i_red_06.png`,txt:"帮助中心"},

			],
			employeeFunction:[
				{img_url:`${this.$imgUrl}/images/icon-partner-red-pic1.png`,text:"店铺列表",url:"#"},
				{img_url:`${this.$imgUrl}/images/icon-salesman-red-pic2.png`,text:"品牌审核",url:"#"},
				{img_url:`${this.$imgUrl}/images/icon-salesman-red-pic3.png`,text:"店铺榜单",url:"#"},
				{img_url:`${this.$imgUrl}/images/icon-salesman-red-pic4.png`,text:"邀请入驻",url:"#"},
			],
			grade:"",
			salesmanData:{
				kprice: 0,
				month_price: 0,
				shop_num: 0,
				today_num: 0,
				today_price: 0,
				total_price: 0,
				week_price: 0,
			}
		};
	},
	onShow() {
		// 页面鉴权
		this.navToLogin();
	},
	computed: {
		...mapState(['userInfo']),
		dataStatistics(){
			return [
				{num:this.salesmanData.shop_num,text:"店铺数量"},
				{num:this.salesmanData.today_price,text:"今日销售额"},
				{num:this.salesmanData.week_price,text:"近7天销售额"},
				{num:this.salesmanData.month_price,text:"近30天销售额"},
			]
		},
		todayDeal(){
			return [
				{num:this.salesmanData.today_num,text:"今日成交件数"},
				{num:this.salesmanData.kprice,text:"今日客单价"},
			]
		}
	},
	methods: {
		...mapMutations(["changeWrapShow"]),
		// 跳转到订单状态页面
		navTo(obj) {
			uni.navigateTo({
				url:`/pages/mys/order/order?state=${obj.state}`
			});
		},
		// 跳转到用户信息页面
		jumpLogin(){
			// 普通用户跳转页面
			if(this.grade === 'VIP1'){
				uni.navigateTo({
					url:'/pages/mys/info/info?userInfo',
				})
			}else{
				// 员工页面
				uni.navigateTo({
					url:'/pages/mys/salesmaninfo/salesmaninfo'
				})
			}
		},
		// 设置图标数量
		iconNum(){
			if(this.orderList){
				for (let i = 0; i < this.orderList.length; i++) {
					const element = this.orderList[i];
					for (let k = 0; k < this.order_status.length; k++) {
						const element2 = this.order_status[k];
						if(element.status === element2.state){
							this.$set(this.order_status[k],"num",element.num)
						}
					}
				}
			}
		},
		navToLogin(){
			const TOKEN = uni.getStorageSync('access_token');
			if (!TOKEN){
				if(this.isWrapShow()){
					uni.switchTab({
						url:"/pages/indexs/index/index",
						success:()=>{
							this.changeWrapShow({"isWrapShow":false})
						}
					})
				}else{
					// 没有登录直接到登录页面
					uni.navigateTo({
						url:"/pages/mys/login/login",
						success:()=>{
							// 到登录页面后显示user页面
							this.changeWrapShow({"isWrapShow":true})
						}
					})
				}
			}else{
				// 如果登录了直接显示user页面
				this.changeWrapShow({"isWrapShow":true})
				// 开始请求用户数据数据
				this.reqUserInfo();
			}
		},
		reqUserInfo(){
			// 获取用户信息
			this.$request.GET({
				url:this.$api.apiUrl.GET_USER_INFO
			}).then(res=>{
				let result = res.data;
				if(result.rule !== 'salesman'){
					// 如果是合伙人登录显示入口
					if(result.type === 1 && this.other_functions.length===4){
						this.other_functions.push({
							img_url:`${this.$imgUrl}/images/myct_others_i_red_21.png`,
							txt:"合伙人后台"
						})
					}
					// 这是普通用户或者合伙人登录请求的数据;
					this.reqUserOrder();
				}else{
					this.$request.GET({
						url:this.$api.apiUrl.GET_V6_USER_INFO,
					}).then(res=>{
						let result = res.data;
						if(res.code === 'SECCUSS'){
							// 有nickname就用没有就用手机号代替
							if(result.nickname){
								this.$set(this.userInfoObj,'nickname',result.nickname);
							}else{
								this.$set(this.userInfoObj,'nickname',result.mobile);
							}
							// 有头像就用,没有就用默认头像
							if(result.avatar){
								this.$set(this.userInfoObj,'avatar',result.avatar);
							}else{
								this.$set(this.userInfoObj,'avatar','https://meizi.manogue.com.cn/static/wap/images/myct_hd.png');
							}
							this.grade = '业务员';
							this.reqSalesmanData()
						}
					})
				}
			})
		},
		// 获取业务员页面信息
		reqSalesmanData(){
			const TOKEN = uni.getStorageSync('access_token');
			this.$request.GET({
				url:this.$api.apiUrl.GET_V6_SHOP_FINANCE,
				data:{
					token:TOKEN,
				},
			}).then(res=>{
				let result = res.data[0];
				for (const key in result) {
					// 如果有值为null的就显示0
					if(!result[key]){
						this.salesmanData[key] = 0;
					}else{
						this.salesmanData[key] = result[key];
					}
				}
			})
		},
		reqUserOrder(){
			// 普通用户还是合伙人
			this.$request.GET({
				url:this.$api.apiUrl.GET_USER_ORDER
			}).then(res=>{
				this.userInfoObj = res.data.infomation;
				this.grade = 'VIP1';
				this.orderList = res.data.order;
				this.iconNum();
			})
			// 认证是否通过
			this.$request.GET({
				url:this.$api.apiUrl.GET_USER_AUTH_STATUS,
			}).then(res=>{
				if(res.code !== 200){
					this.isAuth = true;
				}else{
					this.isAuth = false;
				}
			})
		},
		toAppointPage(item){
			// console.log(item);
			switch (item) {
				case "客服":
					uni.navigateTo({
						url:"/pages/goodss/wolive/wolive"
					})
					break;
				case "合伙人后台":
					uni.navigateTo({
						url:"/pages/mys/brokeragenew/brokeragenew"
					})
					break
				default:
					break;
			}
		}
	},
};
</script>
<style lang='scss'>
	@import "./user.scss";
</style>
