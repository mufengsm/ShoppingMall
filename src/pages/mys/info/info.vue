<template>
	<view>
		<view class="top_card"
		@tap="modifyingData"
		>
			<view class="user-info-box">
				<image 
				class="portrait" 
				:src="newUserInfoItem.avatar
				?newUserInfoItem.avatar
				:'https://meizi.manogue.com.cn/static/wap/images/myct_hd.png'"
				></image>
			</view>
			<view class="txt">
				<view class="nickname">{{newUserInfoItem.nickname}}</view>
				<view class="username">用户名：{{newUserInfoItem.username}}</view>
			</view>
			<view class="icon">
				<text class="iconfont icon-youjiantou"></text>
			</view>
		</view>
		<view class="info_list">
			<view class="item">
				<view class="key"> 昵称</view>
				<view class="value">{{newUserInfoItem.nickname}}</view>
			</view>
			<view class="item">
				<view class="key"> 性别</view>
				<view class="value">{{newUserInfoItem.sex}}</view>
			</view>
			<view class="item">
				<view class="key"> 出生日期</view>
				<view class="value">{{newUserInfoItem.birthday}}</view>
			</view>
			<view class="item item_id"
			@tap="changePassword"
			>
				<view class="key"> 修改密码</view>
				<text class="value iconfont icon-youjiantou"></text>
			</view>
		</view>
		<view class="info_list"
		@tap="toAddress"
		>
			<view class="item item_id id_address">
				<view class="key"> 修改地址</view>
				<text class="value iconfont icon-youjiantou"></text>
			</view>
		</view>
		<view class="info_list"
		@tap="loginOut"
		>
			<view class="item item_id id_login_out">
				<view class="key"> 退出登录</view>
			</view>
		</view>
		<!-- <view class="info_list"
		@tap="login"
		>
			<view class="item item_id id_login_out">
				<view class="key"> 现在登录</view>
			</view>
		</view> -->
	</view>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapMutations } = createNamespacedHelpers('storeCommodity');
export default {
	data(){
		return {
			newUserInfoItem:{},
			userInfoObj:{}
		}
	},
	onShow(){
		this.$request.GET({
			url:this.$api.apiUrl.GET_USER_INFO,
		}).then(res=>{
			this.newUserInfoItem = res.data;
		})
	},
	methods:{
		...mapMutations(['changeWrapShow']),
		toAddress(){
			uni.navigateTo({
				url:'/pages/mys/address/address'
			})
		},
		loginOut(){
			uni.showLoading({
				title:"正在退出"
			})
			this.$request.GET({
				url:this.$api.apiUrl.GET_LOGIN_OUT
			}).then(res=>{
				if(res.code === 200){
					// 清除本地存的登录信息
					uni.setStorage({
						key: 'access_token',
						data: '',
						success:  ()=> {
							uni.hideLoading();
							uni.showToast({
								title:"退出成功",
								success:(res)=>{
									uni.switchTab({
										url:"/pages/indexs/index/index"
									});
									this.changeWrapShow({"isWrapShow":false})
								}
							})
						}
					});
				}else{
					this.$api.msg(res.msg)
				}
			})
		},
		login(){
			uni.navigateTo({
				url:"/pages/mys/login/login"
			})
		},
		modifyingData(){
			uni.navigateTo({
				url:"/pages/mys/modifyingData/modifyingData"
			})
		},
		changePassword(){
			uni.navigateTo({
				url:`/pages/mys/changePassword/changePassword?phone=${this.newUserInfoItem.username}`
			})
		}
	}
}
</script>
<style lang="scss">
@import './info.scss';
</style>