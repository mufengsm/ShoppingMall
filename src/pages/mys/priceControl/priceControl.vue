<template>
	<view>
		<view class="top_wraper">
			<image class="head_img" src="https://meizi.manogue.com.cn/static/wap/images/controlled_prices_banner.jpg?v=2" mode="widthFix"></image>
			<swiper class="swiper" autoplay="ture" vertical="true" style="fontSize:15px;color: rgb(236, 99, 80);">
				<swiper-item><view class="swiper-item uni-bg-red rotary_text">【秋季护肤】肌肤为什么干燥、过敏、脆弱？看了吓一跳</view></swiper-item>
				<swiper-item><view class="swiper-item uni-bg-red rotary_text">【冬季护肤】肌肤为什么干燥、过敏、脆弱？看了吓一跳</view></swiper-item>
			</swiper>
		</view>
		<view class="bottom_wraper">
	<view
	:style="{background:'-webkit-gradient(linear, 0% 0%, 0% 60%,from(' + item.color + '), to(#fff))'}"
	class="wraper_item"
	v-for="(item,index) in private_price_control_info"
	:key="index">
				<view class="head_info">
					<image class="head_info_img" :src="item.logo" mode="aspectFit"></image>
					<view class="head_info_text">
						<text class="title">{{item.title}}</text>
						<view class="series">{{item.keyword}}</view>
						<view class="text">{{item.subhead}}</view>
					</view>
				</view>
				<view class="foot_info">
					<view class="foot_info_topImg">
						<view class="img_item" v-for="(item2,index) in item.goods" :key="index">
							<image @tap="navToJoin" :data-brandId="item.brand_id" class="foot_info_img" :src="item2.image" mode="aspectFit"></image>
							<view class="foot_info_txt">
								{{item2.label}}
							</view>
						</view>
					</view>
					<view class="foot_info_bottomText">
						<view class="bottomText_text" v-html="item.desc"></view>
					</view>
				</view>
			</view>
		</view>
		<UniLoadMore :status="no_data ? 'loading' : 'noMore'"></UniLoadMore>
	</view>
</template>

<script>

import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('storeCommodity');
export default {
  data() {
    return {
      private_price_control_info: {},
      styleArr: {
        color: 'red',
      },
    };
  },
  onLoad() {
    this.PRICE_CONTROL_INFO({
      url: this.$api.apiUrl.POST_BRAND_LIST,
      data: {
        page: 1,
        num: 10,
      },
    }).then((res) => {
		if(res.code === 1){
      		this.private_price_control_info = res.msg;
		}else{
			this.$api.msg(res.msg)
		}
	});
	// 只有在微信小程序可分享当前页面
	//#ifdef MP-WEIXIN
	uni.showShareMenu({
		withShareTicket:true,
	});
	//#endif
  },
  methods: {
	...mapActions(['PRICE_CONTROL_INFO']),
	navToJoin(e){
		const brandId = e.target.dataset.brandid;
		uni.navigateTo({
			url:`/pages/mys/controlledpricesdetails/controlledpricesdetails?brandId=${brandId}`
		})
	}
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
  @import './priveControl.scss';
</style>
