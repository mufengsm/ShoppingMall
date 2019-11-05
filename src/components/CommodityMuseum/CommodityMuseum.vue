<template>
	<view>
		<view class="big_wrap">
		<!-- 团购楼层 -->
			<view class="f-header seckill">
				<view class="scroll_title">{{title}}</view>
				<text class="Assemble_text_2">更多</text>
			</view>
			<view class="group-section">
				<BigSwiper 
				:carouselList="carouselList" 
				height="ai" 
				msg="自定义" 
				@swiper_navToDetailPage="navToDetailPage">
				</BigSwiper>
			</view>
			<!-- 分类推荐楼层 -->
			<view class="f-header_warp">
				<view class="warp" v-for="(item, index) in huadongs1" :key="index">
					<image :src="item.img" mode="scaleToFill"></image>
					<view>{{ item.msg }}</view>
				</view>
			</view>
		</view>	
	</view>
</template>
<script>
export default{
		name: 'CommodityMuseum',
		props:["banner","itemCommodity","title"],
		data(){
			return {
				huadongs1: [],
				carouselList:[]
			}
		},
		async beforeMount(){
			// 设置轮播图
			this.carouselList = this.banner.map(item => ({src:item.img}));
			// 三个商品图片
			this.huadongs1 = this.itemCommodity.map(item => ({
				img:item.goods_pic,
				msg:item.goods_name
			}))
		},
		methods:{
			// 详情页
			navToDetailPage(item) {
				// 测试数据没有写id，用title代替
				const id = item.title;
				uni.navigateTo({
					url: `/pages/goodss/product/product?id=${id}`
				});
			},
		}
	}
</script>
<style lang="scss">
.big_wrap{
	width: 100%;
	height: 100%;
}
.f-header {
	display: flex;
	align-items: center;
	height: 110upx;
	padding: 0upx 30upx 8upx;
	background: #fff;

	.tit {
		font-size: $font-lg + 2upx;
		color: $font-color-dark;
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
.seckill {
	margin-top: 16upx;
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
	/* 所有更多都使用这个样式 */
.Assemble_text_2 {
	font-size: 16px;
	text-align: right;
	margin-right: 10upx;
	width: 33%;
	color: rgb(236, 99, 80);
}
.f-header_warp {
	display: flex;
	.warp {
		flex:1;
		margin-top: 6px;
		image{
			width: 230upx;
			height: 230upx;
		}
		view{
			font-size: 12px;
		}
	}
}
</style>