<template>
	<view>
		<view class="card_list">
			<view
			v-for="(item,inex) in dataList"
			:key="index"
			class="card_item">
				<view class="left">
					<view class="top">
						<view>{{item.brand_name}}</view>
						<view>申请人电话:</view>
					</view>
					<view class="bottom">
						<view>{{item.shop_name}}</view>
						<view>{{item.mobile}}</view>
					</view>
				</view>
				<view class="right">
					<view
					v-if="item.status == '0'" 
					class="btn"
					>
						<button class="yes btn_public"
						:data-id="item.id"
						data-btn='1'
						@tap="submit">同意</button>
						<button class="no btn_public"
						:data-id="item.id"
						data-btn='2'
						@tap="submit">驳回</button>
					</view>
					<view
					v-else
					class="txt"
					>
						<text>{{item.status == '1' ? "已审核" : "不通过"}}</text>
					</view>
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
			this.noData = 'loding';
			this.$request.GET({
				url:this.$api.apiUrl.GET_V6_BRAND_LISTING,
				data:{
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
		},
		submit(e){
			// 按的是什么按钮
			var listId = e.target.dataset.btn;
			// 审核列表的id
		    var parentId = e.target.dataset.id;
			this.$request.POST({
				url:this.$api.apiUrl.POST_V6_BRAND_CHECK,
				data:{
					"id": parentId,
					"status": listId
				}
			}).then(res=>{
				if(res.code == 'SUCCESS'){
					let index = this.dataList.findIndex(item=>{
						return item.id == parentId
					})
					// 更改显示页面的
					this.$set(this.dataList[index],'status',listId)
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
		flex: 7;
		font-size: 16px;
		overflow: hidden;
		.top{
			float: left;
		}
		.bottom{
			float: left;
			padding-left: 10px;
		}
	}
	.right{
		flex:3;
		.btn{
			display: flex;
			.btn_public{
				padding: 0;
				width: 47%;
				height: 26px;
				color: white;
				font-size: 14px;
				line-height: 26px;
				border-radius: 0;
			}
			.yes{
				margin-right: 6%;
				background-color: #ffa60f;
			}
			.no{
				background-color: #df0e1d;
			}
		}
		.txt{
			float: right;
			font-size: 14px;
			color: #8f8f94;
		}
	}
}
</style>