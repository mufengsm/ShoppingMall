<template>
	<view class="container">
		<!-- 空白页 -->
		<view class="empty">
			<image src="https://meizi.manogue.com.cn/static/wap/images/emptycart.png" mode="aspectFit"></image>
			<view class="empty_tips">
				空空如也
				<view @tap="navToLogin">去登陆></view>
			</view>
		</view>
		
			<!-- 底部菜单栏 -->
			<view class="bottomSettlement">

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

</style>
