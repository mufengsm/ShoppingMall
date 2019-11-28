<template>
    <view class="container" v-if="isWrapShow()">
			<view class="set_icon" @tap="jumpLogin">
				<text class="iconfont icon-shezhi"></text>
			</view>
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
					<view class="vip_leavel">VIP1</view>
				</view>
			</view>
		</view>

		<view class="cover-container">
			<!-- 订单 -->
			<view class="order-section">
				<view class="my_order">
						<view class="left">
							<image src="https://meizi.manogue.com.cn/static/wap/images/myct_indent_red.png"></image>
							<view>我的订单</view>
						</view>
						<view 
						class="right"
						@tap="navTo({state:0})"
						>全部订单<text class="iconfont icon-youjiantou linH"></text>
						</view>
				</view>
					<view 
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
			</view>
		</view>
		<view class="tj-sction">
			<image class="recommend_img" src="https://meizi.manogue.com.cn/static/wap/images/my_icon2_red.png" mode="aspectFit"></image>
			<text class="recommend_txt">推广有礼</text>
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
		<view class="other_function">
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
		<Authentication v-if="isAuth" />
    </view>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations } = createNamespacedHelpers('storeCommodity');

let startY = 0; let moveY = 0; const
  pageAtTop = true;
export default {
  components: {

},
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
    };
	},
  onShow() {
		// 页面鉴权
		this.navToLogin();
		this.$request.GET({
			url:this.$api.apiUrl.GET_USER_ORDER
		}).then(res=>{
			this.userInfoObj = res.data.infomation;
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
  // #ifndef MP
  onNavigationBarButtonTap(e) {
    const { index } = e;
    if (index === 0) {
      this.navTo('/pages/set/set');
    } else if (index === 1) {
      // #ifdef APP-PLUS
      const pages = getCurrentPages();
      const page = pages[pages.length - 1];
      const currentWebview = page.$getAppWebview();
      currentWebview.hideTitleNViewButtonRedDot({
        index,
      });
      // #endif
      uni.navigateTo({
        url: '/pages/notice/notice',
      });
    }
  },
  // #endif
  computed: {
    ...mapState(['hasLogin', 'userInfo']),
  },
  methods: {
		...mapMutations(["changeWrapShow"]),
		// 跳转到订单状态页面
    navTo(obj) {
      uni.navigateTo({
        url:`/pages/mys/order/order?state=${obj.state}`
      });
		},
		// 跳转到login页面
		jumpLogin(){			
			uni.navigateTo({
				url:'/pages/mys/info/info?userInfo',
			})
			// uni.navigateTo({
			// 	url:'/pages/mys/login/login',
			// })
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
					this.reqUserInfo();
				}
		},
		reqUserInfo(){
			// 获取用户信息
			this.$request.GET({
				url:this.$api.apiUrl.GET_USER_INFO
			}).then(res=>{
				if(res.data.type === 1 && this.other_functions.length===4){
					this.other_functions.push({img_url:`${this.$imgUrl}/images/myct_others_i_red_21.png`,txt:"合伙人后台"})
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
