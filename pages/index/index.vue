<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box"><input class="ser-input" type="text" value="输入关键字搜索" disabled /></view>
		<!-- #endif -->

		<!-- 头部轮播 -->
		<view class="carousel-section">
			<BigSwiper :carouselList="carouselList" @swiper_navToDetailPage="navToDetailPage"></BigSwiper>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item" @click="btn">
				<image src="/static/temp/c3.png"></image>
				<text>环球美食</text>
			</view>
			<view class="cate-item">
				<image src="/static/temp/c5.png"></image>
				<text>个护美妆</text>
			</view>
			<view class="cate-item">
				<image src="/static/temp/c6.png"></image>
				<text>营养保健</text>
			</view>
			<view class="cate-item">
				<image src="/static/temp/c7.png"></image>
				<text>家居厨卫</text>
			</view>
		</view>
		<!-- 秒杀楼层 -->
		<view class="seckill-section seckill">
			<view class="s-header">
				<text class="Assemble_text">本周拼团</text>
				<text class="Assemble_time">
					<text>00</text>
					:
					<text>00</text>
					:
					<text>00</text>
					:
					<text>00</text>
				</text>
				<text class="Assemble_text_2">更多</text>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view v-for="(item, index) in goodsList" :key="index" class="floor-item" @click="navToDetailPage(item)">
						<image :src="item.logo_img" mode="aspectFill"></image>
						<text class="title clamp">{{ item.title }}</text>
						<text class="price">￥{{ item.sales_price }}</text>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 团购楼层 -->
		<view>
			<view class="f-header seckill">
				<view class="scroll_title">爆品馆</view>
				<text class="Assemble_text_2">更多</text>
			</view>
			<view class="group-section"><BigSwiper :carouselList="carouselList" height="ai" msg="自定义" @swiper_navToDetailPage="navToDetailPage"></BigSwiper></view>
		</view>

		<!-- 分类推荐楼层 -->
		<view class="f-header f-header_warp">
			<view class="warp" v-for="(item, index) in huadongs1" :key="index">
				<image :src="item.img" mode=""></image>
				<text>{{ item.mag }}</text>
			</view>
		</view>


		<!-- 猜你喜欢 -->
		<view class="f-header seckill">
			<view class="scroll_title">为您推荐</view>
			<text class="Assemble_text_2">更多</text>
		</view>

		<view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item)">
				<view class="image-wrapper"><image :src="item.logo_img" mode="aspectFill"></image></view>
				<text class="title clamp">{{ item.title }}</text>
				<view class="price">
					￥{{ item.sales_price }}
					<view class="find">发现</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('storeOne');
export default {
  data() {
    return {
      titleNViewBackground: '',
      swiperCurrent: 0,
      swiperLength: 0,
      carouselList: [],
      goodsList: [],
      huadongs: [
        { img: '/static/temp/c3.png', mag: '123546854' },
        { img: '/static/temp/c5.png', mag: '123546854' },
        { img: '/static/temp/c6.png', mag: '123546854' },
        { img: '/static/temp/c7.png', mag: '123546854' },
        { img: '/static/temp/c3.png', mag: '123546854' },
        { img: '/static/temp/c5.png', mag: '123546854' },
        { img: '/static/temp/c6.png', mag: '123546854' },
        { img: '/static/temp/c7.png', mag: '123546854' },

      ],
      huadongs1: [
        { img: '/static/temp/c3.png', mag: '123546854' },
        { img: '/static/temp/c5.png', mag: '123546854' },
        { img: '/static/temp/c6.png', mag: '123546854' },
      ],
      ...mapState(['num']),
    };
  },
  onLoad() {
    this.loadData();
    // 请求为您推荐数据
    this.$request.GET({
      url: '/v1/goods/recommend',
      data: {
        page: 1,
      },
    }).then((res) => {
      this.goodsList = res;
    });
  },
  methods: {
    ...mapActions(['ADD', 'GOODS_RECOMMEND']),
    /**
		 * 请求静态数据只是为了代码不那么乱
		 * 分次请求未作整合
		 */
    scroll(e) {
      this.old.scrollTop = e.detail.scrollTop;
    },
    async loadData() {
      const carouselList = await this.$api.json('carouselList');
      this.titleNViewBackground = carouselList[0].background;
      this.swiperLength = carouselList.length;
      this.carouselList = carouselList;
    },
    // 详情页
    navToDetailPage(item) {
      // 测试数据没有写id，用title代替
      const id = item.title;
      uni.navigateTo({
        url: `/pages/product/product?id=${id}`,
      });
    },
  },
  // #ifndef MP
  // 标题栏input搜索框点击
  async onNavigationBarSearchInputClicked(e) {
    // //完整的异步流程
    // this.ADD()
    // console.log(this.num())
    uni.navigateTo({ url: '/pages/search/search' });
  },
  // 点击导航栏 buttons 时触发
  onNavigationBarButtonTap(e) {
    const { index } = e;
    if (index === 0) {
      this.$api.msg('点击了扫描');
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
};
</script>

<style lang="scss" scoped>
/* #ifdef MP */
.mp-search-box {
	position: absolute;
	left: 0;
	top: 30upx;
	z-index: 9999;
	width: 100%;
	padding: 0 80upx;
	.ser-input {
		flex: 1;
		height: 56upx;
		line-height: 56upx;
		text-align: center;
		font-size: 28upx;
		color: $font-color-base;
		border-radius: 20px;
		background: rgba(255, 255, 255, 0.6);
	}
}
page {
	.cate-section {
		position: relative;
		z-index: 5;
		border-radius: 16upx 16upx 0 0;
		margin-top: -20upx;
	}
	.carousel-section {
		padding: 0;
		.titleNview-placing {
			padding-top: 0;
			height: 0;
		}
		.carousel {
			.carousel-item {
				padding: 0;
			}
		}
		.swiper-dots {
			left: 45upx;
			bottom: 40upx;
		}
	}
}
/* #endif */

page {
	background: #f5f5f5;
}
.seckill {
	margin-top: 16upx;
}
/* 头部 轮播图 */
.carousel-section {
	position: relative;
	// padding-top: 10px;
}
/* 分类 */
.cate-section {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	padding: 30upx 22upx;
	background: #fff;
	.cate-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
	}
	/* 原图标颜色太深,不想改图了,所以加了透明度 */
	image {
		width: 88upx;
		height: 88upx;
		margin-bottom: 14upx;
		border-radius: 50%;
		// opacity: 0.7;
		box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
	}
}
/* 秒杀专区 */
.seckill-section {
	padding: 4upx 30upx 24upx;
	background: #fff;
	.s-header {
		$font-color: rgb(236, 99, 80);
		display: flex;
		align-items: center;
		height: 92upx;
		line-height: 1;
		.Assemble_text {
			font-weight: 700;
			text-align: left;
			margin-left: 10upx;
			color: $font-color;
			width: 33%;
		}
		.Assemble_time text {
			background-color: $font-color;
			color: #fff;
			border-radius: 10upx;
			margin-left: 10upx;
		}
	}
	.floor-list {
		white-space: nowrap;
	}
	.scoll-wrapper {
		display: flex;
		align-items: flex-start;
	}
	.floor-item {
		width: 150upx;
		margin-right: 20upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		line-height: 1.8;
		image {
			width: 150upx;
			height: 150upx;
			border-radius: 6upx;
		}
		.price {
			color: $uni-color-primary;
		}
	}
}
/* 所有更多都使用这个样式 */
.Assemble_text_2 {
	font-size: 16px;
	text-align: right;
	margin-right: 10upx;
	width: 33%;
	color: rgb(236, 99, 80);
}
.f-header {
	display: flex;
	align-items: center;
	height: 110upx;
	padding: 0upx 30upx 8upx;
	background: #fff;
	image {
		flex-shrink: 0;
		width: 80upx;
		height: 80upx;
		margin-right: 20upx;
	}
	.tit {
		font-size: $font-lg + 2upx;
		color: #font-color-dark;
		line-height: 1.3;
	}
	.scroll_title {
		margin-left: 180upx;
		width: 350upx;
		text-align: center;
		height: 80upx;
		border-bottom: 3px solid rgb(236, 99, 80);
		color: rgb(236, 99, 80);
		font-weight: 700;
	}
}

.f-header_warp {
	height: 200upx;
	.wrap {
		width: 33%;
	}
}
/* 分类推荐楼层 */
.hot-floor {
	.floor-list {
		white-space: nowrap;
		padding: 20upx;
		padding-right: 50upx;
		border-radius: 6upx;
		margin-top: -140upx;
		margin-left: 30upx;
		background: #fff;
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
		position: relative;
		z-index: 1;
	}
	.scoll-wrapper {
		display: flex;
		align-items: flex-start;
	}
	.floor-item {
		width: 180upx;
		margin-right: 20upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		line-height: 1.8;
		image {
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
		}
		.price {
			color: $uni-color-primary;
		}
	}
}
/* 猜你喜欢 */
.guess-section {
	display: flex;
	flex-wrap: wrap;
	padding: 0 30upx;
	background: #fff;
	.guess-item {
		display: flex;
		flex-direction: column;
		width: 48%;
		padding-bottom: 40upx;
		&:nth-child(2n + 1) {
			margin-right: 4%;
		}
	}
	.image-wrapper {
		width: 100%;
		height: 330upx;
		border-radius: 3px;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
			opacity: 1;
		}
	}
	.title {
		font-size: $font-lg;
		color: $font-color-dark;
		line-height: 80upx;
	}
	.price {
		font-size: $font-lg;
		color: $uni-color-primary;
		line-height: 1;
	}
	.find {
		font-size: 14px;
		float: right;
		background-color: rgb(236, 99, 80);
		color: #fff;
		width: 70upx;
		height: 35upx;
		text-align: center;
		line-height: 35upx;
		border-radius: 20px;
	}
}
</style>
	