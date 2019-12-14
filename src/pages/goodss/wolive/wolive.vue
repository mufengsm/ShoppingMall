<template>
	<view>
		<web-view 
		:webview-styles="webviewStyles" 
		:src="wolivePage"></web-view>
	</view>
</template>
<script>
export default {
	data(){
		return {
 			webviewStyles: {
				progress: {
					color: 'blue'
				}
			},
			wolivePage:""
		}
	},
	onLoad(){this.wolivePage = this.$woliveUrl;}
}
</script>