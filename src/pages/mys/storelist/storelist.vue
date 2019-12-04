<template>
	<view>
		<view class="card_list">
			<view 
			v-for="(item,index) in dataList"
			:key="index"
			class="card_item">
				<view class="left">
					<view>{{item.shop_name}}</view>
					<view class="bottom">总成交额：<text>¥{{item.total_price}}</text></view>
				</view>
				<view class="right iconfont icon-youjiantou"></view>
			</view>
		</view>
		<UniLoadMore :status="noData"></UniLoadMore>
	</view>
</template>
<script>
import UniLoadMore from '@/components/UniLoadMore/UniLoadMore'
export default {
	components:{
		UniLoadMore,
	},
	data(){
		return {
			noData:'more',
			page:1,
			listRows:10,
			dataList:[],
		}
	},
	onShow(){
		this.page = 1;
		this.listRows = 10;
		this.dataList = [];
		this.reqStoreList();
	},
	onReachBottom(){
		if(this.noData === 'more'){
			this.reqStoreList()
		}else{
			return false
		}
	},
	methods:{
		reqStoreList(){
			this.noData = 'loding';
			const TOKEN = uni.getStorageSync('access_token');
			this.$request.GET({
				url:this.$api.apiUrl.GET_SHOP_LISTING,
				data:{
					token:TOKEN,
					page:this.page,
					listRows:this.listRows
				}
			}).then(res=>{
				if(res.code === 'SUCCESS'){
					if(res.data.length < 10){
						this.noData = 'noMore';
					}else{
						// 如果还有数据就让page+1
						this.page++;
						this.noData = 'more';
					}
					this.dataList = this.dataList.concat(res.data);
				}else{
					this.$api.msg(res.msg)
				}
			})
		}
	}
}
</script>
<style lang="scss">
page{
	width: 100%;
	height: 100%;
	background-color: #efeff4;
}
.card_item{
	width: 100vw;
	padding: 10px;
	display: flex;
	align-items: center;
	border-bottom:1px solid #eee;
	background-color: white;
	.left{
		flex: 9;
		.bottom{
			color: #999;
			text{color:#e23c3c;}
		}
	}
	.right{
		flex:1;
	}
}
</style>