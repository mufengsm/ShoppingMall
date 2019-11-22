<template>
	<view>
		<web-view 
		:webview-styles="webviewStyles" 
		src="https://home.wolive.cc/index/index/home?visiter_id=&visiter_name=&avatar=&business_id=ddm201906&groupid=0&service_name=ddm201906"></web-view>
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