<template>
	<view class="content">
		<!-- numList -->
		<view class="one_list">
			<view class="list_item"
			v-for="(item,index) in oneList"
			:key="index"
			>
				<view class="num">{{item.num}}</view>
				<view class="txt">{{item.txt}}</view>
			</view>
		</view>
		<view class="one_list">
			<view class="list_item"
			v-for="(item,index) in twoList"
			:key="index"
			>
				<view class="num">{{item.num}}</view>
				<view class="txt">{{item.txt}}</view>
			</view>
		</view>
		<!-- navToPage -->
		<view
		class="img_wrap"
		>
			<navigator
			class="img"
			v-for="(item,index) in navToImg"
			:key="index"
			:url="item.pageUrl"
			>
				<image :src="item.img"></image>
				<view>{{item.txt}}</view>
			</navigator>
		</view>
	</view>
</template>
<script>
export default {
	data(){
		return{
			dataNum:{
				membernum: 0,
				order_amount1: 0,
				order_amount7: 0,
				order_amount30: 0,
				price: 0,
				todayBrokerage: 0,
				totalBrokerage: 0,
				volume: 0,
			},
			navToImg:[
				{img:`${this.$imgUrl}/images/icon-partner-red-pic1.png`,txt:"店铺列表",
				pageUrl:"/pages/mys/kelist/kelist"},
				{img:`${this.$imgUrl}/images/icon-partner-red-pic2.png`,txt:"店铺审核"},
				{img:`${this.$imgUrl}/images/icon-partner-red-pic3.png`,txt:"店铺榜单",
				pageUrl:"/pages/mys/partnerGuestListTop/partnerGuestListTop"},
				{img:`${this.$imgUrl}/images/icon-partner-red-pic4.png`,txt:"销售排行"},
				{img:`${this.$imgUrl}/images/icon-partner-red-pic5.png`,txt:"订单明细",
				pageUrl:"/pages/mys/partnerorderdetail/partnerorderdetail"},
				{img:`${this.$imgUrl}/images/icon-partner-red-pic6.png`,txt:"添加业务员"},
				{img:`${this.$imgUrl}/images/icon-partner-red-pic7.png`,txt:"团队管理"},
			]
		}
	},
	onLoad(){
		this.$request.GET({
			url:this.$api.apiUrl.GET_MY_BROKERAGENEW
		}).then(res=>{
			if(res.code === 200){
				const result = res.data;
				for (const key in result) {
					// 如果有值为null的就显示0
					if(!result[key]){
						this.dataNum[key] = 0;
					}else{
						this.dataNum[key] = result[key];
					}
				}
			}
		})
	},
	methods:{

	},
	computed:{
		oneList(){
			return [
				{num:this.dataNum.membernum,txt:'店铺数量'},
				{num:this.dataNum.order_amount1,txt:'今日销售额'},
				{num:this.dataNum.order_amount7,txt:'近7天销售额'},
				{num:this.dataNum.order_amount30,txt:'近30天销售额'},
			]
		},
		twoList(){
			return [
				{num:this.dataNum.price,txt:'今日成交件数'},
				{num:this.dataNum.todayBrokerage,txt:'今日客单价'},
				{num:this.dataNum.totalBrokerage,txt:'今日佣金'},
				{num:this.dataNum.volume,txt:'总佣金'},
			]
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
.content{
	width: 100%;
	height: 100%;
}
.one_list{
	width: 100%;
	margin-bottom: 8px;
	overflow: hidden;
	background-color: white;
	.list_item{
		float: left;
		width: 25%;
		padding: 10px 0;
		text-align: center;
		line-height: 30px;
		.num{
			font-weight: 700;
			color: #df0e1d;
		}
		.txt{
			font-size: 15px;
			color: #999;
		}
	}
}
.img_wrap{
	width: 100vw;
	height: 100%;
	padding-top: 20px;
	background-color: white;
	overflow: hidden;
	.img{
		float: left;
		width: 25%;
		height: 25vw;
		margin-bottom: 20px;
		text-align: center;
		image{
			width: 60%;
			height: 60%;
		}
		view{
			font-size: 17px;
		}
	}
}
</style>