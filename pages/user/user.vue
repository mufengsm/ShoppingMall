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
					
					<text class="right">全部订单<i class="iconfont icon-youjiantou"></i></text>
				</view>
					<view class="order-item" v-for="(item,index) in order_status" :key="index">
						<image :src="item.img_url" mode="aspectFit"></image>
						<text>{{item.text}}</text>
					</view>
			</view>
		</view>
		<view class="tj-sction">
			<view class="tj-item">
				<text class="num">128.8</text>
				<text>余额</text>
			</view>
			<view class="tj-item">
				<text class="num">0</text>
				<text>优惠券</text>
			</view>
			<view class="tj-item">
				<text class="num">20</text>
				<text>积分</text>
			</view>
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
		  {img_url:"../../static/images/myct_indentl_grey__01.png",text:"全部订单"},
		  {img_url:"../../static/images/myct_indentl_grey__03.png",text:"待付款"},
		  {img_url:"../../static/images/myct_indentl_grey__05.png",text:"待收货"},
		  {img_url:"../../static/images/myct_indentl_grey__07.png",text:"退款/售后"}
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
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
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
			border: 1px solid red;
			.right{
				float: right;
			}
		}
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
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
	
</style>
