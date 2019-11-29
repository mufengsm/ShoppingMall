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
		changePassword(){

		},
		loginOut(){
			uni.showLoading({
				title:"正在退出"
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
/*  弹出层 */
.popup {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 99;

	&.show {
		display: block;
		.mask {
			animation: showPopup 0.2s linear both;
		}
		.layer {
			animation: showLayer 0.2s linear both;
		}
	}
	&.hide {
		.mask {
			animation: hidePopup 0.2s linear both;
		}
		.layer {
			animation: hideLayer 0.2s linear both;
		}
	}
	&.none {
		display: none;
	}
	.mask {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.4);
	}
	.layer {
		position: fixed;
		z-index: 99;
		bottom: 0;
		width: 100%;
		min-height: 40vh;
		border-radius: 10upx 10upx 0 0;
		background-color: #fff;
		.btn {
			height: 66upx;
			line-height: 66upx;
			border-radius: 100upx;
			background: $uni-color-primary;
			font-size: $font-base + 2upx;
			color: #fff;
			margin: 30upx auto 20upx;
		}
	}
	@keyframes showPopup {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes hidePopup {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes showLayer {
		0% {
			transform: translateY(120%);
		}
		100% {
			transform: translateY(0%);
		}
	}
	@keyframes hideLayer {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(120%);
		}
	}
}
.content{
	width: 100vw;
	height: 57vh;
	position: absolute;
	left: 0;
	bottom: 0;
	z-index: 999999;
	background-color: white;
	.icon-cuowu{
		position: absolute;
		right: 10px;
		top: 5px;
		font-size: 23px;
	}
	.title{
		width: 100%;
		padding: 10px 0;
		text-align: center;
		border-bottom: 1px solid #999;
	}
	.info_list{
		.item{
			.key{
				flex:2;
			}
			.value{
				flex:8;
				text-align: left;
				padding-top:10px;
				.portrait{
					width: 20%;
					height: 100%;
					float: right;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			.id_img{
				padding-top:0px;
			}
		}
	}
	.btn{
		margin: 50px 20px 0px 20px;
		background-color: #df0e1d;
		color: white;
	}
}
</style>