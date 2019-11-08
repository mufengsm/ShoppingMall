<template>
	<view>
		<view>这里是buy页面</view>
	</view>
</template>
<script>
export default {
	data(){
		return{

		}
	},
	onLoad(){
		this.$request.GET({
			url:this.$api.apiUrl.SHOW_ORDER_COMMIT
		}).then(res=>{
			console.log(res);
			
		})
	}
}

</script>
<style lang="scss">

</style>