<template>
	<view>
		<view class="top_card"
		@tap="modifyingData"
		>
			<view class="user-info-box">
				<image 
				class="portrait" 
				:src="avatar"
				></image>
			</view>
			<view class="txt">
				<view class="nickname">{{newUserInfoItem.realname}}</view>
				<view class="username">用户名：{{newUserInfoItem.username}}</view>
			</view>
			<view class="icon">
				<text class="iconfont icon-youjiantou"></text>
			</view>
		</view>
		<view class="info_list">
			<view class="item">
				<view class="key"> 姓名</view>
				<view class="value">{{newUserInfoItem.realname}}</view>
			</view>
			<view class="item">
				<view class="key"> 电话</view>
				<view class="value">{{newUserInfoItem.mobile}}</view>
			</view>
			<view class="item">
				<view class="key"> 昵称</view>
				<view class="value">{{nickname}}</view>
			</view>
			<view class="item item_id"
			@tap="changePassword"
			>
				<view class="key"> 修改密码</view>
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
		<view
            class="popup spec"
            :class="specClass"
            @touchmove.stop.prevent="stopPrevent"
        >
            <!-- 遮罩层 -->
            <view class="mask"></view>
			<!-- 信息盒子 -->
			<view class="content">
				<text 
				@tap="giveUp"
				class="iconfont icon-cuowu"></text>
				<view class="title">修改资料</view>
				<view class="info_list">
					<view class="item">
						<view class="key"> 头像</view>
						<view class="value id_img">
							<view class="portrait" >
								<image 
								@tap="uploadImg"
								:src="avatar
								?avatar
								:'https://meizi.manogue.com.cn/static/wap/images/myct_hd.png'"
								></image>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="key"> 用户名</view>
						<view class="value">
							<input disabled v-model="newUserInfoItem.username"></input>
						</view>
					</view>
					<view class="item">
						<view class="key"> 昵称</view>
						<view class="value">
							<input placeholder="请输入昵称" v-model="nickname"></input>
						</view>
					</view>
				</view>
				<button class="btn" @tap="submit">确认修改</button>
			</view>
		</view>
	</view>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapMutations } = createNamespacedHelpers('storeCommodity');
import uploadImage from '@/common/ossutil/uploadFile.js';
export default {
	data(){
		return {
			specClass:"none",
			nickname:"",
			avatar:"",
			newUserInfoItem:{

			}
		}
	},
	onShow(){
		this.$request.GET({
			url:this.$api.apiUrl.GET_V6_USER_INFO
		}).then(res=>{
			let result = res.data;
			if(res.code === 'SECCUSS'){
				this.newUserInfoItem = result;
				if(!result.nickname){
					this.nickname = result.mobile;
				}else{
					this.nickname = result.nickname;
				}
				if(!result.avatar){
					this.avatar = 'https://meizi.manogue.com.cn/static/wap/images/myct_hd.png';
				}else{
					this.avatar = result.avatar;
				}
			}
		})
	},
	methods:{
		...mapMutations(['changeWrapShow']),
		changePassword(){
			uni.navigateTo({
				url:"/pages/mys/changePassword/changePassword"
			})
		},
		loginOut(){
			uni.showLoading({
				title:"正在退出"
			})
			const TOKEN = uni.getStorageSync('access_token');
			this.$request.POST({
				url:this.$api.apiUrl.POST_V6_USER_CHECKTOKEN,
				data:{
					token:TOKEN
				}
			}).then(res=>{
				if(res.code === 'SECCUSS'){
					this.$request.GET({
						url:this.$api.apiUrl.GET_V6_USER_OUT,
						data:{
							token:TOKEN
						}
					}).then(res2=>{
						if(res2.code == 'SECCUSS'){
							uni.setStorage({
								key: 'access_token',
								data: "",
								success:()=>{
									uni.hideLoading();
									uni.setStorageSync('storage_salesman','');
									uni.showToast({
										title:"退出成功",
										success:()=>{
											uni.switchTab({
												url:"/pages/indexs/index/index"
											});
											this.changeWrapShow({"isWrapShow":false})
										}
									})
								}
							});
						}
					})
				}else{
					uni.hideLoading();
					this.$api.msg(res.msg);
				}
			})
		},
		modifyingData(){
			this.toggleSpec();
		},
		giveUp(){
			this.toggleSpec();
			this.avatar = this.newUserInfoItem.avatar;
			this.nickname = this.newUserInfoItem.mobile;
		},
		stopPrevent(){},
		 // 规格弹窗开关
        toggleSpec(popup) {
            this.isPopup = popup;
            if (this.specClass === "show") {
                this.specClass = "hide";
                setTimeout(() => {
                    this.specClass = "none";
                }, 250);
            } else if (this.specClass === "none") {
                this.specClass = "show";
            }
		},
		submit(){
			this.$request.POST({
				url:this.$api.apiUrl.POST_V6_USER_UPINFO,
				data:{
					nickname:this.nickname,
					avatar:this.avatar
				}
			}).then(res=>{
				if(res.code === 'SECCUSS'){
					uni.showToast({
						title:res.msg,
						success:()=>{
							this.toggleSpec();
						}
					})
				}
			})
		},
		uploadImg(){
			uni.chooseImage({
				count: 1, // 默认最多一次选择9张图
				success: res => {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					var tempFilePaths = res.tempFilePaths;
					//支持多图上传
					for (var i = 0; i < res.tempFilePaths.length; i++) {
						//显示消息提示框
						uni.showLoading({
							mask: true
						})
						uploadImage(res.tempFilePaths[i], 'small_program/', result => {
							this.avatar = result;
							uni.hideLoading();
						}, error => {
							this.$api.msg(error)
						})
					}
				}
			})
		}
	}
}
</script>
<style lang="scss">
@import '../info/info.scss';
@import './salesmaninfo.scss'
</style>