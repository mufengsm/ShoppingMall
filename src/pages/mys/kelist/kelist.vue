<template>
	<view class="content width_height">
		<view class="card_list width_height">
			<view class="list_item"
			v-for="(item,index) in list"
			:key="index"
			>
				<view class="left">
					<view class="top">
						<text>{{item.realname}}</text>
						<text>{{item.username}}</text>
					</view>
					<view class="bottom top">
						<text>总成交额</text>
						<text class="price">¥{{item.total_amount}}</text>
					</view>
				</view>
				<view class="right">
					<text class="iconfont icon-youjiantou"></text>
				</view>
			</view>
			<UniLoadMore :status="noData"></UniLoadMore>
		</view>
	</view>
</template>
<script>
import UniLoadMore from '@/components/UniLoadMore/UniLoadMore.vue'
export default {
	components:{
		UniLoadMore
	},
	data(){
		return {
			list:[],
			page:1,
			noData:'more'
		}
	},
	onShow(){
		this.page = 1;
		this.reqListArr();
		this.page = 2;
		this.reqListArr();
	},
	onReachBottom(){
		if(this.noData === 'noMore'){
			return false;
		}else{
			this.page++;
			this.reqListArr();
		}
	},
	methods:{
		reqListArr(){
			this.noData = 'loading'
			this.$request.POST({
				url:this.$api.apiUrl.POST_MY_KELIST,
				data:{
					page:this.page
				}
			}).then(res=>{
				let result = res.list;				
				if(result.length > 4){
					this.list = this.list.concat(result);
					this.noData='more';
				}else{
					this.noData = 'noMore';
				}
			})
		}
	}
}
</script>
<style lang="scss">
.width_height{
	width: 100%;
	height: 100%;
}
page{
	width: 100%;
	height: 100%;
	background-color: #efeff4;
}
.list_item{
	display: flex;
	padding: 10px;
	font-size: 17px;
	line-height: 30px;
	background-color: white;
	border-bottom: 1px solid #999;
	.left{flex:9;}
	.right{
		flex:1;
		line-height: 60px;
		text{
			font-size: 20px;
		}
	}
	.top{
		text{
			display: inline-block;
			margin-right: 10px;
		}
		.price{
			color: #e23c3c;
		}
	}
	.bottom{
		color: #999;
	}
}
</style>