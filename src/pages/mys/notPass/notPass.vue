<template>
	<view>
		<textarea v-model="info"></textarea>
		<view class="btns">
			<button class="no" @tap="fail">不通过</button>
		</view>
	</view>
</template>
<script>
export default {
	data(){
		return {
			info:"",
			userId:""
		}
	},
	onLoad(e){
		this.userId = e.id;
	},
	methods:{
		fail(){
			if(this.info){
				this.$request.POST({
					url:this.$api.apiUrl.POST_V4_USER_CHECK_PASS,
					data:{
						id:this.userId,
						remark:this.info
					}
				}).then(res=>{
					if(res.code == 200){
						uni.showToast({
							title:"已经将您驳回的信息发送给当前审核的用户！",
							success:()=>{
								uni.navigateTo({
									url:"/pages/mys/kecheck/kecheck"
								})
							}
						})
					}
				})
			}else{
				this.$api.msg('驳回信息不能为空！');
			}
		}
	}
}
</script>
<style lang="scss">
textarea{
	width: 75vw;
	padding: 8px;
	margin-left: 13vw;
	background-color: #eee;
	border-radius: 10px;
}
.btns{
	display: flex;
	justify-content:center;
	padding: 0 10vw;
	margin-top: 20px;
	button{
		width: 40vw;
		margin: 0 10px;
		color: white;
	}
	.no{
		background-color: #939393;
	}
}
</style>