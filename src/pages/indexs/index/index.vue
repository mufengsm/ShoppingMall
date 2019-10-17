<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<view class="location">定位<text class="iconfont icon-downarrow"></text></view>
			<input @tap="searching" class="ser-input" type="text" value="输入关键字搜索" disabled />
			<view class="info_img">
				<text class="info_icon iconfont icon-xiaoxi"></text>
				<view class="black_info_txt">消息</view>
			</view>
		</view>
		<!-- #endif -->

		<!-- 头部轮播 -->
		<view class="carousel-section">
			<BigSwiper :carouselList="carouselList" @swiper_navToDetailPage="navToDetailPage"
			></BigSwiper>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item" @tap="btn">
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
					<view v-for="(item, index) in goodsList" :key="index" class="floor-item" @tap="navToDetailPage(item)">
						<image lazy-load="true" :src="item.logo_img" mode="aspectFill"></image>
						<text class="title clamp">{{ item.title }}</text>
						<text class="price">￥{{ item.sales_price }}</text>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 团购楼层 -->
		<view v-for="(item,index) in huadongs1" :key="index">
			<view class="f-header seckill">
				<view class="scroll_title">爆品馆</view>
				<text class="Assemble_text_2">更多</text>
			</view>
			<view class="group-section"><BigSwiper :carouselList="carouselList" height="ai" msg="自定义" @swiper_navToDetailPage="navToDetailPage"></BigSwiper></view>
			<!-- 分类推荐楼层 -->
			<view class="f-header f-header_warp">
				<view class="warp" v-for="(item, index) in huadongs1" :key="index">
					<image :src="item.img" mode=""></image>
					<text>{{ item.mag }}</text>
				</view>
			</view>
		</view>

		<!-- 为您推荐 -->
		<view class="f-header seckill">
			<view class="scroll_title">为您推荐</view>
			<text class="Assemble_text_2">更多</text>
		</view>

		<view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @tap="navToDetailPage(item)">
				<view class="image-wrapper"><image :src="item.logo_img" mode="aspectFill"></image></view>
				<text class="title clamp">{{ item.title }}</text>
				<view class="price">
					￥{{ item.sales_price }}
					<view class="find">
						<view class="iconfont icon-ai64"></view>
						发现
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('storeCommodity');
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
				{ img: '/static/temp/c7.png', mag: '123546854' }
			],
			huadongs1: [{ img: '/static/temp/c3.png', mag: '123546854' }, { img: '/static/temp/c5.png', mag: '123546854' }, { img: '/static/temp/c6.png', mag: '123546854' }],
			...mapState(['num'])
		};
	},
	onLoad() {
		this.loadData();
		// 请求为您推荐数据
		this.$request
			.GET({
				url: this.$api.apiUrl.GET_MERCHANDISE_RECOMMENDATION,
				data: {
					page: 1
				}
			})
			.then(res => {
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
				url: `/pages/goodss/product/product?id=${id}`
			});
		},
		searching(){
			uni.navigateTo({
				url: '/pages/goodss/search/search'
			});
		}
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
				index
			});
			// #endif
			uni.navigateTo({
				url: '/pages/notice/notice'
			});
		}
	}
	// #endif
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
