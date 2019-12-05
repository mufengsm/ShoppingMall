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
		}
	},
	onLoad(){
		this.$request.GET({
			url:this.$api.apiUrl.GET_USER_INFO
		}).then(res=>{
			this.userId = res.data.id;
		})
	},
	onShareAppMessage(res) {
		return {
			title:"选进囗品就上多多美",
			path:`/pages/indexs/index/index?id=${this.userId}`,
			success:(res)=>{
				console.log(res);
			},
			fail:(err)=>{
				console.log(err);
			}
		}
	}
	// onLoad(options){
	// 	var uid = options.id;
	// 	if(typeof (uid) === undefined || uid === undefined){
	// 		uid = '';
	// 	}else{
	// 		this.shareUid = uid;
	// 	}
	// 	// console.log(uid,"uid");
	// 	this.$api.msg(uid)
	// },
}
</script>
<style lang="scss">
page{
	width: 100vw;
	height: 100vh;
	background-image: url('https://meizi.manogue.com.cn/static/wap/images/tuiguan_bd3.png?v=20190704');
	background-repeat: no-repeat;
    background-size: 100%;
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