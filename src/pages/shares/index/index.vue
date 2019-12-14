<template>
	<view>
		<button open-type='share'>立 即 邀 请</button>
	</view>
</template>
<script>
export default {
	data(){
		return{
			userId:null,
			invitationCode:null,
		}
	},
	onLoad(){
		this.$request.GET({
			url:this.$api.apiUrl.GET_USER_INFO
		}).then(res=>{
			this.userId = res.data.id;
		})
		const isSalesman = uni.getStorageSync("storage_salesman");
		// 员工邀请获取邀请码
		if(isSalesman){
			this.$request.GET({
				url:this.$api.apiUrl.GET_V6_SHARE_INDEX,
			}).then(data=>{
				if(data.code == 'SECCUSS'){
					this.invitationCode = data.data;
				}				
			})
		}
	},
	onShareAppMessage(res) {
		return {
			title:"选进囗品就上多多美",
			path:`/pages/shares/bindmobile/bindmobile?id=${this.userId}&invitationCode=${this.invitationCode}`,
			success:(res)=>{
				console.log(res);
			},
			fail:(err)=>{
				console.log(err);
			}
		}
	}

}
</script>
<style lang="scss">
page{
	width: 100vw;
	height: 100vh;
	background-image: url('https://meizi.manogue.com.cn/static/wap/images/tuiguan_bd3.png?v=20190704');
	background-repeat: no-repeat;
   	background-size: 100% 100%;
}
button{
	position: absolute;
	left: 15vw;
	bottom: 2vh;
	width: 70vw;
	color: #f04555;
	border-radius: 10vw;
}
</style>