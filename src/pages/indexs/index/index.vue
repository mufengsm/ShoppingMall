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
			<BigSwiper :carouselList="carouselList" @swiper_navToDetailPage="navToDetailPage"
			></BigSwiper>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item" v-for="(item,index) in commodityMuseum" :key="index">
				<image :src="item.img"></image>
				<text>{{item.txt}}</text>
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
		</view>

	<CommodityMuseum 
	v-if="isIndexData" 
	title="爆品馆"
	:banner="indexData.bao" 
	:itemCommodity="indexData.bao_product" />
	<CommodityMuseum 
	v-if="isIndexData"
	title="国际馆" 
	:banner="indexData.guo" 
	:itemCommodity="indexData.guo_product" />
	<CommodityMuseum 
	v-if="isIndexData"
	title="护理馆" 
	:banner="indexData.hu_li" 
	:itemCommodity="indexData.hu_li_product" />
	<CommodityMuseum 
	v-if="isIndexData"
	title="面膜馆" 
	:banner="indexData.mian" 
	:itemCommodity="indexData.mian_product" />
	<CommodityMuseum 
	v-if="isIndexData"
	title="仪器馆" 
	:banner="indexData.yi_qi" 
	:itemCommodity="indexData.yi_qi_product" />
	<CommodityMuseum 
	v-if="isIndexData"
	title="院装馆" 
	:banner="indexData.yuan" 
	:itemCommodity="indexData.yuan_product" />
	<CommodityMuseum 
	v-if="isIndexData"
	title="注册抢购" 
	:banner="indexData.zhuce" 
	:itemCommodity="indexData.zhuce_product" />



		<!-- 为您推荐 -->
		<view class="f-header seckill">
			<view class="scroll_title">为您推荐</view>
			<text class="Assemble_text_2">更多</text>
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
	</view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import CommodityMuseum from '@/components/CommodityMuseum/CommodityMuseum';
const { mapState, mapActions } = createNamespacedHelpers('storeCommodity');
export default {
	data() {
		return {
			isIndexData:false,
			titleNViewBackground: '',
			swiperCurrent: 0,
			swiperLength: 0,
			carouselList: [],
			indexData:{},
			huadongs: [
				{ img: `${this.$imgUrl}/images/jgeicon1.png`, mag: '123546854' },
				{ img: `${this.$imgUrl}/images/jgeicon2.png`, mag: '123546854' },
				{ img: `${this.$imgUrl}/images/jgeicon3.png`, mag: '123546854' },
				{ img: `${this.$imgUrl}/images/jgeicon4.png`, mag: '123546854' },
				{ img: `${this.$imgUrl}/images/jgeicon5.png`, mag: '123546854' },
				{ img: `${this.$imgUrl}/images/jgeicon6.png`, mag: '123546854' },
				{ img: `${this.$imgUrl}/images/jgeicon7.png`, mag: '123546854' },
				{ img: `${this.$imgUrl}/images/jgeicon8.png`, mag: '123546854' }
			],
			huadongs1: [
				{ img: "http://meizi.oss.manogue.com.cn/a94409fb5622a90d/c63fadb70df5c6a3.jpg?x-oss-process=image/resize,m_mfit,h_400,w_400", mag: 'JAYJUN 维他雪花面膜(5片）10盒' }, 
				{ img: "http://meizi.oss.manogue.com.cn/a94409fb5622a90d/c63fadb70df5c6a3.jpg?x-oss-process=image/resize,m_mfit,h_400,w_400", mag: 'JAYJUN 维他雪花面膜(5片）10盒' }, 
				{ img: "http://meizi.oss.manogue.com.cn/a94409fb5622a90d/c63fadb70df5c6a3.jpg?x-oss-process=image/resize,m_mfit,h_400,w_400", mag: 'JAYJUN 维他雪花面膜(5片）10盒' }
			],
			commodityMuseum:[
				{img:`${this.$imgUrl}/images/jgeicon10.png`,txt:"注册抢购"},
				{img:`${this.$imgUrl}/images/jgeicon4.png`,txt:"爆品馆"},
				{img:`${this.$imgUrl}/images/jgeicon9.png`,txt:"国际馆"},
				{img:`${this.$imgUrl}/images/jgeicon1.png`,txt:"护肤馆"},
				{img:`${this.$imgUrl}/images/jgeicon11.png`,txt:"面膜馆"},
				{img:`${this.$imgUrl}/images/jgeicon2.png`,txt:"院装馆"},
				{img:`${this.$imgUrl}/images/jgeicon6.png`,txt:"仪器馆"},
				{img:`${this.$imgUrl}/images/jgeicon8.png`,txt:"优惠卷"}
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
		this.loadData();
		// 请求为您推荐数据
		this.$request.GET({
			url:this.$api.apiUrl.GET_INDEX
		}).then(res => {
			if(res.code === 200){
				console.log(res.data);
				
				// 获取首页各种数据
				this.indexData = res.data;
				this.isIndexData = true;
			}else{
				this.$api.msg("数据请求失败")
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
		},
		btn(e){
			console.log(e)
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
