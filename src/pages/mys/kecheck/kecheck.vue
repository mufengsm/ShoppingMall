<template>
	<view>
		<view class="list_wrap">
			<view class="list_item"
			v-for="(item,index) in dataList"
			:key="index"
			>
				<view class="left">
					<view class="top">
						<text>{{item.realname}}</text>
						<text>{{item.username}}</text>
					</view>
					<view class="bottom top">
						<text>推荐人</text>
						<text>{{item.parent_name}}</text>
					</view>
				</view>
				<view class="rigth">
					<navigator class="nav" :url="'/pages/mys/kelistbyid/kelistbyid?id='+ item.id +''">去审核</navigator>
				</view>
			</view>
		</view>
		<view v-if="dataList.length === 0" class="no_data">暂无需要审核</view>
	</view>
</template>
<script>
export default {
	data(){
		return {
			dataList:[]
		}
	},
	onShow(){
		this.dataList = [];
		this.$request.GET({
			url:this.$api.apiUrl.GET_WAP_MY_KECHECK
		}).then(res=>{
			if(res.code === 200){
				this.dataList = res.data;
			}else{
				this.$api.msg(res.msg)
			}
		})
	}
}
</script>
<style lang="scss">
page{
	background: #efeff4;
}
.list_item{
	background-color: white;
	display: flex;
	align-items: center;
	padding: 5px 10px;
	.left{
		flex:8;
		font-size: 16px;
		.top{
			text{
				display: inline-block;
				margin:0 5px;
			}
		}
		.bottom{
			text{
				color:#666666;
			}
		}
	}
	.rigth{
		flex:2;
		.nav{
			text-align: center;
			color: #e23c3c;
			border: 1px solid #e23c3c;
			border-radius: 25px;
			font-size: 16px;
		}
	}
}
.no_data{
	text-align: center;
	font-size: 16px;
	padding: 10px;
}
</style>