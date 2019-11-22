<template>
	<view>
		<web-view 
		:webview-styles="webviewStyles" 
		src="http://localhost:8888/wap/goods/wolive"></web-view>
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
			}
		}
	}
}
</script>