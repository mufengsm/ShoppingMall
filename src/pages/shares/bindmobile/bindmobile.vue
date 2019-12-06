<template>
	<view>
		<view class="crad_wrap">
			<view class="title">成为多多美会员</view>
			<view class="phone">
				<text>手机号：</text>
				<input v-model="phone" type="text" placeholder="请输入手机号" maxlength="11">
			</view>
			
			<button @tap="submit">确 定</button>
		</view>
	</view>
</template>
<script>
export default {
	data(){
		return{
			shareUid:null,
			phone:null,
		}
	},
	onLoad(options){
		var uid = options.id;
		if(typeof (uid) === undefined || uid === undefined){
			this.shareUid = '';
		}else{
			this.shareUid = uid;
		}
	},
	methods:{
		submit(){
			if(!this.shareUid){
				this.$api.msg('分销链接失效');
				return false;
			}else if(!this.phone){
				this.$api.msg('请输入手机号码!');
				return false;
			}else if(!this.phone.match(/^1[3|4|5|7|8|9]\d{9}$/)) {
				this.$api.msg('请输入正确的手机号码!');
				return false;
			}
			this.$request.POST({
				url:this.$api.apiUrl.POST_SHARE_BINDMOBILE,
				data:{
					member_id:this.shareUid,
					mobile:this.phone
				}
			}).then(res=>{
				if(res.code===200){
					uni.showToast({
						title:res.msg,
						success:()=>{
							uni.navigateTo({
								url:`/pages/shares/bindsuccess/bindsuccess?id=${this.phone}`
							})
						}
					})
				}else{
					this.$api.msg(res.msg);
					return false;
				}
			})
		}
	}
}
</script>
<style lang="scss">
page{
	width: 100vw;
	height: 100vh;
	background-image: url('http://meizi.manogue.com.cn/static/wap/images/shenqian_bd2.jpg');
	background-repeat: no-repeat;
    background-size: 100% 100%;
}
.crad_wrap{
	width: 80vw;
	height: 30vh;
	color: #e40524;
	position: absolute;
	top: 10vw;
	left: 10vw;
	border-radius: 3vw;
	background-color: white;
	button{
		width: 40vw;
		position: absolute;
		bottom: 4vw;
		left: 20vw;
		color:white;
		background-color: #e40524;
		border-radius: 10vw;
	}
	.title{
		text-align: center;
		line-height: 19vw;
	}
	.phone{
		display: flex;
		padding-left: 5vw;
		font-size: 16px;
		input{
			border:1px solid #ccc;
			padding-left: 10px;
			border-radius: 10vw;
		}
	}
}
</style>