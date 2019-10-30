<template>
	<view class="container">
		<!-- 空白页 -->
		<view class="empty">
			<image src="https://meizi.manogue.com.cn/static/wap/images/emptycart.png" mode="scaleToFill"></image>
			<view class="empty_tips">购物车空荡荡的,随便看看...</view>
		</view>
			<!-- 底部菜单栏 -->
			<view class="bottomSettlement">
        <view class="choice">
          <label>
            <checkbox />
          <view class="txt">全选</view>
          </label>
        </view>
        <view class="price">
          <view class="commodity">商品合计：
            <text>¥0.00</text></view>
          <view class="freight">运费：<text>6元</text></view>
        </view>
        <view class="settlement">结算(0)</view>
			</view>
		</view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('storeCommodity');
import UniNumberBox from "@/components/UniNumberBox/UniNumberBox"
export default {
  components: {
    UniNumberBox,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['hasLogin',"isLogin"]),
  },
  methods: {
    navToLogin() {
      uni.navigateTo({
        url: '/pages/mys/login/login',
      });
    },
  },
};
</script>

<style lang='scss'>
  @import "./cart.scss";
</style>
