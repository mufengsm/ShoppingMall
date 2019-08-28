<template>
	<view>
		<!--
			轮播图组件，根据数据渲染，目前可见在首页，和独立商品页;
			class样式有:{
				carousel:默认样式组件内部已设置为true,
				group-section_carousel:高度矮一些的版本，需要传递自定义属性height为ai可生效
			}
			@swiper_navToDetailPage事件:可以触发navToDetailPage事件达到页面跳转
			msg自定义属性:可以当你触发点击事件到达目标页面后提示语句
		 -->
		<swiper :class="{ 'carousel': true, 'group-section_carousel':height == 'ai'}" circular @change="swiperChange" indicator-dots="indicatorDots">
			<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="swiper_navToDetailPage">
				<image :src="item.src" />
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
  name: 'BigSwiper',
  props: ['carouselList', 'height', 'msg'],
  methods: {
    // 轮播图切换修改背景色
    swiperChange(e) {
      const index = e.detail.current;
      this.swiperCurrent = index;
      this.titleNViewBackground = this.carouselList[index].background;
    },
    swiper_navToDetailPage() {
      this.$emit('swiper_navToDetailPage', { title: this.msg ? this.msg : '大轮播图' });
    },
  },
};
</script>

<style scoped>
.carousel {
	width: 100%;
	height: 750upx;
}
.carousel .carousel-item {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.carousel image {
	width: 100%;
	height: 100%;
	border-radius: 10upx;
}
.group-section_carousel {
	height: 200upx;
}
</style>
