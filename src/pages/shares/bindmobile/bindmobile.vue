<template>
	<view>
		<view :class="{'crad_wrap':true,'isSalesman':isSalesman}">
			<view class="title">成为多多美会员</view>
			<view class="phone">
				<text>手机号：</text>
				<input v-model="phone" type="text" placeholder="请输入手机号" maxlength="11">
			</view>
			<view class="phone"
			v-if="isSalesman"
			>
				<text>店铺名称：</text>
				<input v-model="storeName" type="text" placeholder="请输入店铺名称">
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
			isSalesman:false,
			storeName:"",
			invitationCode:null
		}
	},
	onLoad(options){
		var uid = options.id;
		if(typeof (uid) === undefined || uid === undefined){
			this.shareUid = '';
		}else{
			this.shareUid = uid;
		}
		var invitationCode = options.invitationCode;
		// 如果存在就是员工分享的
		if(invitationCode){
			this.invitationCode = invitationCode;
			this.isSalesman = true;
		}
	},
	methods:{
		submit(){
			// 根据不同场景执行不同函数;
			if(this.isSalesman){
				this.employeeSharing();
			}else{
				this.ordinaryMember();
			}
		},
		ordinaryMember(){
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
					uni.showModal({
						content: res.msg,
						showCancel: false,
						confirmText: "确定",
						success:(res)=>{
							if (res.confirm) {
								uni.navigateTo({
									url:`/pages/shares/bindsuccess/bindsuccess?id=${this.phone}`
								})
							}
						}
					})
				}else{
					this.$api.msg(res.msg);
					return false;
				}
			})
		},
		employeeSharing(){
			var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
	        if(!myreg.test(this.phone)){
				this.$api.msg('请输入正确的手机号码');
				return false;
			}
	        if(this.storeName == ''){
				this.$api.msg('请输入店铺名称');
				return false;
			}
			this.$request.POST({
				url:this.$api.apiUrl.POST_V6_SHARE_BINDSHOP,
				data:{
					code:this.invitationCode,
					mobile:this.phone,
					shop_name:this.storeName,
				}
			}).then(res=>{
				if(res.code == "SECCUSS"){
					uni.showModal({
						content: res.msg,
						showCancel: false,
						confirmText: "确定",
						success:(res)=>{
							if (res.confirm) {
								uni.navigateTo({
									url:`/pages/shares/bindsuccess/bindsuccess?id=${this.phone}`
								})
							}
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
		margin-bottom: 15px;
		input{
			width: 45vw;
			border:1px solid #ccc;
			padding-left: 10px;
			border-radius: 10vw;
		}
	}
}
.isSalesman{
	height: 35vh;
}
</style>