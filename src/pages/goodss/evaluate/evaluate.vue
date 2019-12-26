<template>
	<view class="content">
		<view 
		v-for="(item,index) in commentListItem"
		:key="index"
		class="eva-box">
			<image 
				class="portrait" 
				:src="item.avatar" 
				mode="aspectFill"
			></image>
			<view class="right">
				<text class="name">{{item.nickname}}</text>
				<text class="con">{{item.content}}</text>
				<view class="bot">
					<text class="attr">
					</text>
					<text class="time">{{item.add_time}}</text>
				</view>
			</view>
		</view>
		<!-- 正在加载组件 -->
		<uni-load-more :status="moreStatus ? 'loading' : 'noMore'"></uni-load-more>
	</view>
</template>
<script>
import uniLoadMore from '@/components/UniLoadMore/UniLoadMore.vue';
export default {
	components: {
		uniLoadMore,
	},
	data(){
		return {
			commentListItem:[],
			page:1,
			options:null,
			moreStatus:true
		}
	},
	onLoad(options){
		this.options = options;
		// 只有在微信小程序可分享当前页面
		//#ifdef MP-WEIXIN
		uni.showShareMenu({
            withShareTicket:true,
        });
		//#endif
	},
	onShow(){
		// 每次页面显示都要重新归零,防止用户提交评价后无法及时查看
		this.commentListItem = [];
		this.page = 1;
		this.moreStatus = true;
		this.requestEval()
	},
	onReachBottom(){
		if(this.moreStatus){
			this.requestEval();
		}
	},
	methods:{
		requestEval(options){
			 // 商品评论
			this.$request.GET({
				url: this.$api.apiUrl.GET_GOODS_COMMENT,
				data: {
					id: this.options.id,
					page: this.page++
				}
			}).then(res => {
				if(res.data.length){
					this.commentListItem = this.commentListItem.concat(res.data);
				}else{
					this.moreStatus = false;
				}
			});
		}
	}
}
</script>
<style lang="scss">
.eva-box {
	display: flex;
	margin: 20upx 20upx;
	border-bottom: 1px solid #999;
	.portrait {
		flex-shrink: 0;
		width: 80upx;
		height: 80upx;
		border-radius: 100px;
	}
	.right {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: $font-base;
		color: $font-color-base;
		padding-left: 26upx;
		.con {
			font-size: $font-base;
			color: $font-color-dark;
			padding: 20upx 0;
		}
		.bot {
			display: flex;
			justify-content: space-between;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
}
</style>