<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box" :style="{backgroundColor: isRed}">
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
			<BigSwiper 
			:carouselList="carouselList" 
			@swiper_navToDetailPage="navToDetailPage"
			></BigSwiper>
		</view>
		<!-- 订单通知 -->
		<view class="order_wrap">
			<image 
			mode="aspectFit" 
			src="https://meizi.manogue.com.cn/static/wap/images/tongzhi-icon.png" />
			 <swiper 
			 class="swiper" 
			 :indicator-dots="false"
			 :autoplay="true"
			 interval="2000" 
			 :vertical="true"
			 :circular="true"
			 duration="500">
				<swiper-item v-for="(item,index) in indexData.order_notice" :key="index">
					<view class="swiper-item uni-bg-red">
						{{item}}
					</view>
				</swiper-item>
            </swiper>
        </view>
		<!-- 分类 -->
		<view class="cate-section">
			<view 
			class="cate-item" 
			v-for="(item,index) in commodityMuseum" 
			:key="index"
			@tap="classification(item)"
			>
				<image :src="item.img"></image>
				<text>{{item.txt}}</text>
			</view>
			
		</view>

		<!-- 秒杀楼层 -->
		<!-- <view class="seckill-section seckill">
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
					<view 
					v-for="(item, index) in indexData.recommend" 
					:key="index" 
					class="floor-item" 
					@tap="navToDetailPage(item)">
						<image lazy-load="true" :src="item.logo_img" mode="aspectFill"></image>
						<text class="title clamp">{{ item.title }}</text>
						<text class="price">￥{{ item.sales_price }}</text>
					</view>
				</view>
			</scroll-view>
		</view> -->

	<CommodityMuseum 
	v-if="isIndexData" 
	title="爆品馆"
	tagsId="48"
	:banner="indexData.bao" 
	:itemCommodity="indexData.bao_product" />
	<CommodityMuseum 
	v-if="isIndexData"
	title="国际馆"
	tagsId="51" 
	:banner="indexData.guo" 
	:itemCommodity="indexData.guo_product" />
	<CommodityMuseum 
	v-if="isIndexData"
	title="护肤馆"
	tagsId="45" 
	:banner="indexData.hu_li" 
	:itemCommodity="indexData.hu_li_product" />
	<CommodityMuseum 
	v-if="isIndexData"
	title="面膜馆"
	tagsId="46" 
	:banner="indexData.mian" 
	:itemCommodity="indexData.mian_product" />
	<CommodityMuseum 
	v-if="isIndexData"
	title="仪器馆"
	tagsId="49" 
	:banner="indexData.yi_qi" 
	:itemCommodity="indexData.yi_qi_product" />
	<CommodityMuseum 
	v-if="isIndexData"
	title="院装馆"
	tagsId="47" 
	:banner="indexData.yuan" 
	:itemCommodity="indexData.yuan_product" />
	<CommodityMuseum 
	v-if="isIndexData"
	title="注册抢购"
	tagsId="50" 
	:banner="indexData.zhuce" 
	:itemCommodity="indexData.zhuce_product" />



		<!-- 为您推荐 -->
		<view class="f-header seckill">
			<view class="scroll_title">为您推荐</view>
			<!-- <text class="Assemble_text_2">更多</text> -->
		</view>

		<view class="guess-section">
			<view 
			v-for="(item, index) in indexData.recommend" 
			:key="index" 
			class="guess-item" 
			@tap="navToDetailPage(item)">
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
		<Authentication v-if="isAuth" />
	</view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import CommodityMuseum from '@/components/CommodityMuseum/CommodityMuseum';
const { mapState, mapActions } = createNamespacedHelpers('storeCommodity');
export default {
	data() {
		return {
			isAuth:false,
			indicatorDots:false,
			isIndexData:false,
			carouselList: [],
			indexData:{},
			commodityMuseum:[
				{img:`${this.$imgUrl}/images/jgeicon10.png`,txt:"注册抢购",id:50},
				{img:`${this.$imgUrl}/images/jgeicon4.png`,txt:"爆品馆",id:48},
				{img:`${this.$imgUrl}/images/jgeicon9.png`,txt:"国际馆",id:51},
				{img:`${this.$imgUrl}/images/jgeicon1.png`,txt:"护肤馆",id:45},
				{img:`${this.$imgUrl}/images/jgeicon11.png`,txt:"面膜馆",id:46},
				{img:`${this.$imgUrl}/images/jgeicon2.png`,txt:"院装馆",id:47},
				{img:`${this.$imgUrl}/images/jgeicon6.png`,txt:"仪器馆",id:49},
				{img:`${this.$imgUrl}/images/jgeicon8.png`,txt:"优惠卷",id:"coupon"}
			],
			...mapState(['num']),
			isRed:false,
			imgUrl:this.$imgUrl
		};
	},
	components:{
		CommodityMuseum
	},
	created() {
		// 请求为您推荐数据
		this.$request.GET({
			url:this.$api.apiUrl.GET_INDEX
		}).then(res => {
			if(res.code === 200){
				// 获取首页各种数据
				this.indexData = res.data;
				// 首页轮播图
				this.carouselList = res.data.banner.map(item => ({
					src:item.img,
					id:item.link.split("?")[1].split("=")[1]
				}));
				this.isIndexData = true;
			}else{
				this.$api.msg("数据请求失败")
			}
		})
		
	},
	onShow(){
		// 每次进入时更改购物车显示数量
		this.$request.GET({
			url:this.$api.apiUrl.GET_GOODS_CART,
		}).then(res=>{
			if(res.data.length){
				uni.setTabBarBadge({
					index: 1,
					text: String(res.data.length)
				})
			}else{
				uni.setTabBarBadge({
					index: 1,
					text: "0"
				})
			}
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
	onPageScroll(e){e.scrollTop > 100 ?  this.isRed = "rgb(233, 12, 29)" : this.isRed = false;},
	methods: {
		...mapActions(['ADD', 'GOODS_RECOMMEND']),
		/**
		 * 请求静态数据只是为了代码不那么乱
		 * 分次请求未作整合
		 */
		scroll(e) {
			this.old.scrollTop = e.detail.scrollTop;
		},
		// 详情页
		navToDetailPage(item) {
			const id = item.id;
			uni.navigateTo({
				url: `/pages/goodss/product/product?id=${id}`
			});
		},
		searching(){
			uni.navigateTo({
				url: '/pages/goodss/search/search'
			});
		},
		btn(e){
			// console.log(e)
		},
		classification(e){
			const tags_id = e.id
			if(typeof tags_id != "number"){
				this.$api.msg("正在开发中")
			}else{
				uni.navigateTo({
					url: `/pages/goodss/search/search?tags_id=${tags_id}`
				});
			}
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
