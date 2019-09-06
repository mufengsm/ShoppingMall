<template>
    <view class="container">
		<view class="user-section">
			<view class="header_bg"></view>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="'@/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<view class="username">{{'游客'}}</view>
				</view>
			</view>
		</view>

		<view class="cover-container">
			<!-- 订单 -->
			<view class="order-section">
				<view class="my_order">
					<text class="left">我的订单</text>
					<text class="right">全部订单<span class="iconfont icon-youjiantou"></span></text>
				</view>
					<view class="order-item" v-for="(item,index) in order_status" :key="index">
						<image :src="item.img_url" mode="aspectFit"></image>
						<text>{{item.text}}</text>
					</view>
			</view>
		</view>
		<view class="tj-sction">
			<image class="recommend_img" src="../../static/images/my_icon2_red.png" mode="aspectFit"></image>
			<text class="recommend_txt">推广有礼</text>
		</view>
		<view class="my_wallet">
			<view class="order-section">
				<view class="my_order">
					<text class="left">我的钱包 <text class="is_opening">未开通,去开通</text></text>
					<text class="right">资金管理<span class="iconfont icon-youjiantou"></span></text>
				</view>
			</view>
			<view class="my_wallet_items">
				<view class="wallet_item" v-for="(item,index) in my_wallet_item" :key="index">
					<view class="num">{{item.num}}</view>
					<view class="text">{{item.text}}</view>
				</view>
			</view>
		</view>
		<view class="other_function">
			<image 
			:src="item.img_url" 
			mode="aspectFit"  
			class="other_function_item" 
			v-for="(item,index) in other_functions" 
			:key="index" 
			>
			</image>
		</view>
    </view>
</template>
<script>
import {
  mapState,
} from 'vuex';
import listCell from '@/components/mix-list-cell';

let startY = 0; let moveY = 0; const
  pageAtTop = true;
export default {
  components: {
    listCell,
  },
  data() {
    return {
      coverTransform: 'translateY(0px)',
      coverTransition: '0s',
      moving: false,
	  order_status:[
		  {img_url:"../../static/images/myct_indentl_grey__01.png",text:"待付款"},
		  {img_url:"../../static/images/myct_indentl_grey__03.png",text:"待发货"},
		  {img_url:"../../static/images/myct_indentl_grey__05.png",text:"待收货"},
		  {img_url:"../../static/images/myct_indentl_grey__07.png",text:"带评价"},
		  {img_url:"../../static/images/myct_indentl_grey__09.png",text:"退换货"}
	  ],
	  my_wallet_item:[
		  {num:"--",text:"余额"},
		  {num:0,text:"积分"},
		  {num:0,text:"优惠卷"},
		  {num:0,text:"银行卡管理"},
	  ],
	  other_functions:[
		  {img_url:"../../static/images/myct_others_i_red_01.png"},
		  {img_url:"../../static/images/myct_others_i_red_13.png"},
		  {img_url:"../../static/images/myct_others_i_red_19.png"},
		  {img_url:"../../static/images/myct_others_i_red_06.png"},
		  {img_url:"../../static/images/myct_others_i_red_21.png?v=1"}
	  ]
    };
  },
  onLoad() {
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

    /**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
    navTo(url) {
      if (!this.hasLogin) {
        url = '/pages/public/login';
      }
      uni.navigateTo({
        url,
      });
    },
  },
};
</script>
<style lang='scss'>
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}

	.user-section{
		height: 400upx;
		padding: 100upx 30upx 0;
		position:relative;
		.header_bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgb(223,14,29);
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
			margin-bottom: 100upx;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
			margin-bottom: 150upx;
		}
	}

	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
	}
	.tj-sction{
		width: 100%;
		padding: 24upx 50upx;
		border-bottom:25upx solid #f5f5f5;
		overflow: hidden;
		.recommend_img{
			width: 12vw;
			height: 12vw;
			float: left;
		}
		.recommend_txt{
			margin-left:20upx;
			float: left;
			font-weight: 400;
			font-size: 17px;
			color: #4c4c4c;
			display: block;
			line-height:96upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		height: 240upx;
		flex-wrap:wrap;
		.my_order{
			width: 100%;
			padding: 20upx 0;
			.right{
				float: right;
				color: #999;
				font-size:16px;
				.icon-youjiantou{
					font-weight: 700;
					font-size: 20px;
				}
			}
			.left{
				padding-left: 30upx;
				font-size: 17px;
			}
		}
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
			image{
				width: 55%;	
			}
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.my_wallet{
		.order-section{
			height: auto;
			padding: 0;
			.my_order{
				.left{
					padding-left: 30px;
					.is_opening{
						font-size: 14px;
						color: #df0e1d;
						padding-left: 6px;
						position: relative;
						top: 1px;
					}
				} 
			}
		}
		.my_wallet_items{
			width: 100%;
			margin-top:22upx;
			border-bottom:25upx solid #f5f5f5;
			overflow: hidden;
			flex-wrap:wrap;
			.wallet_item{
				float: left;
				margin-bottom: 22upx;
				width: 33.333%;
				text-align: center;
				.num{
					color: #e23c3c;
				}
				.text{
					font-size: 15px;
				}
			}
		}
	}
	.other_function{
		height: 400upx;
		.other_function_item{
			width: 25%;
			height: 200upx;
			float: left;
		}
	}
</style>
