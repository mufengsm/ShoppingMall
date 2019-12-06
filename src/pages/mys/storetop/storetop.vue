<template>
	<view>
		<view class="card_list">
			<view class="list_item"
			v-for="(item,index) in dataList"
			:key="index"
			>
				<view class="left">{{item.shop_name}}</view>
				<view class="center">
					<text>销售额：</text>
					<text class="col_red">¥{{item.total_price}}</text>
				</view>
				<view class="right">
					<text>成交量：</text>
					<text class="col_red">({{item.month_num}})</text>
				</view>
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
			this.noData = 'loading';
			const TOKEN = uni.getStorageSync('access_token');
			this.$request.GET({
				url:this.$api.apiUrl.GET_V6_SHOP_LISTING,
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
					this.dataList = this.computedQuickSort;
				}else{
					this.$api.msg(res.msg)
				}
			})
		},
	},
	computed:{
		// 排序
		computedQuickSort(){
			function quickSort(arr){
				if(arr.length <= 1){return arr;}
				let temp = arr[0];
				const left = [];
				const right = [];
				for(var i = 1; i < arr.length; i++){
					if(arr[i].total_price > temp.total_price){
						left.push(arr[i]);
					}else{
						right.push(arr[i]);
					}
				}
				return quickSort(left).concat([temp], quickSort(right));
			}
			return quickSort(this.dataList);
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
.list_item{
	width: 100vw;
	padding: 20px 10px;
	font-size: 16px;
	background-color: white;
	display: flex;
	border-bottom: 1px solid #ccc;
	.left{
		flex:2;
		text-align: left;
	}
	.center{
		flex:4;
		color:#999;
		text-align: left;
	}
	.right{
		flex:4;
		color:#999;
		text-align: left;
	}
	.col_red{
		color: #e23c3c;
	}
}
</style>