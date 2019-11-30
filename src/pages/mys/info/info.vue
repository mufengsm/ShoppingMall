<template>
	<view>
		<view class="top_card">
			<view class="user-info-box"
			@tap="setAvatar"
			>
				<image 
				class="portrait" 
				:src="avatar"
				></image>
			</view>
			<view class="txt"
			@tap="modifyingData"
			>
				<view class="nickname">{{newUserInfoItem.nickname}}</view>
				<view class="username">用户名：{{newUserInfoItem.username}}</view>
			</view>
			<view class="icon"
			@tap="modifyingData"
			>
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
			userInfoObj:{},
			avatar:'',
		}
	},
	onShow(){
		this.$request.GET({
			url:this.$api.apiUrl.GET_USER_INFO,
		}).then(res=>{
			this.newUserInfoItem = res.data;
			if(res.data.avatar){
				this.avatar = res.data.avatar+'?'+Date.now();
			}else{
				this.avatar = 'https://meizi.manogue.com.cn/static/wap/images/myct_hd.png';
			}
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
				url:`/pages/mys/changePassword/changePassword?phone=${this.newUserInfoItem.phone}`
			})
		},
		setAvatar(){
			uni.chooseImage({
				count: 1, // 默认最多一次选择9张图
				success: res => {
					uni.showLoading({
						mask: true
					})
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					var tempFilePaths = res.tempFilePaths[0];
					// 把base64上传到服务器
					uni.getFileSystemManager().readFile({
						filePath: tempFilePaths, //选择图片返回的相对路径
						encoding: 'base64', //编码格式
						success: (res) => { //成功的回调
							this.$request.POST({
								url:this.$api.apiUrl.POST_USER_EDIT_AVATAR,
								data:{
									avatar:res.data
								}
							}).then(res2=>{
								uni.hideLoading();
								if(res2.errcode===1){
									uni.showToast({
										title:res2.errmsg
									})
								}
							})
						}
					})
				}
			})
		}
	}
}
</script>
<style lang="scss">
@import './info.scss';
</style>