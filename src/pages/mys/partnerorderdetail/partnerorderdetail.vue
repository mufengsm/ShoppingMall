<template>
	<viwe class="list_wrap">
		<view class="list_wrap">
			<view class="list_item">
				<view class="top">
					<view class="title">自营</view>
					<view class="order_number">订单号：1234567890123123</view>
				</view>
				<view class="center">
					<view v-if="0" class="center_one">
						<view class="left_img">
							<image src="http://meizi.manogue.com.cn/static/theme/default/img/image.png"></image>
						</view>
						<view class="right_info">
							<view class="title">雅漾舒胡活泉喷雾300ml 12支雅漾舒胡活泉喷雾300ml 12支雅漾舒胡活泉喷雾300ml 12支雅漾舒胡活泉喷雾300ml 12支</view>
							<view class="specs">支:12支</view>
						</view>
					</view>
					<view v-else class="center_multiple">
						<view class="left_img_wrap">
							<image class="left_img" src="http://meizi.manogue.com.cn/static/theme/default/img/image.png"></image>
							<image class="left_img" src="http://meizi.manogue.com.cn/static/theme/default/img/image.png"></image>
							<image class="left_img" src="http://meizi.manogue.com.cn/static/theme/default/img/image.png"></image>
							<image class="left_img" src="http://meizi.manogue.com.cn/static/theme/default/img/image.png"></image>
							<image class="left_img" src="http://meizi.manogue.com.cn/static/theme/default/img/image.png"></image>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="bottom_top">
						<text>共1件商品</text>
						<view class="money">总金额：<text>¥199.00</text></view>
						<view class="money">佣金：<text>¥199.00</text></view>
					</view>
					<view class="bottom_center">
						<view class="money">姓名：<text>霍清驰</text></view>
						<view class="money">电话：<text>15999922034</text></view>
					</view>
					<view class="bottom_bottom">
						<view class="money">收货地址：<text>广东省广州市天河区天盈西塔3605</text></view>
					</view>
				</view>
			</view>
		</view>
		<UniLoadMore :status="noData"></UniLoadMore>
	</viwe>
</template>
<script>
export default {
	data(){
		return {
			userId:"",
			page:1,
			dataList:[],
			noData:"more"
		}
	},
	onShow(){
		this.$request.GET({
			url:this.$api.apiUrl.GET_USER_INFO,
		}).then(res=>{
			this.userId = res.data.id;
			this.init();
			this.reqSellDeail();
		})
	},
	onReachBottom(){
		if(this.noData === 'more'){
			this.reqSellDeail();
		}else{
			return false;
		}
	},
	methods:{
		init(){
			this.page = 1;
			this.dataList = [];
		},
		reqSellDeail(){
			this.noData = 'loading';
			this.$request.POST({
				url:this.$api.apiUrl.POST_V4_USER_SELL_DETAIL,
				data:{
					user_id:this.userId,
					page:this.page
				}
			}).then(res=>{
				console.log(res);
				if(res.code === 200){
					this.noData = 'more';

				}else{
					this.$api.msg("数据异常");
					this.noData = 'noMore'
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
}
.list_wrap{
	width: 100vw;
	height: 100%;
	.list_item{
		width: 100%;
		padding-top: 10px;
		border-bottom: 1px solid #efeff4;
		.top{
			display: flex;
			align-items: center;
			.title{
				margin: 0 10px;
				padding: 2px 5px;
				color: #FFFFFF;
				font-size: 16px;
				background: #e90c1d;
				border-radius: 8px;
			}
			.order_number{
				font-size: 16px;
			}
		}
		.center{
			margin: 10px 0;
			padding: 5px;
			background-color: #fafafa;
			.center_one{
				display: flex;
				align-items: center;
				.left_img{
					flex: 3;
					height: 25vw;
					margin-right: 5px;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.right_info{
					flex: 7;
					.title{
						font-size: 15px;
						color: #2B2B2B;
					}
					.specs{
						font-size: 15px;
						color: #999;
					}
				}
			}
			.center_multiple{
				.left_img_wrap{
					display: flex;
					flex-wrap:wrap;
					width: 100vw;
					.left_img{
						width: 30vw;
						height: 25vw;
						margin-right: 5px;
						margin-bottom: 3px;
					}
				}
			}
		}
		.bottom{
			.bottom_top{
				display: flex;
				margin-right: 10px;
				justify-content:flex-end;
				font-size: 16px;
				.money{
					margin-left: 5px;
					font-weight: 900;
					text{
						color: #e80b1c;
					}
				}
			}
			.bottom_center,.bottom_bottom{
				display: flex;
				margin-top: 6px;
				margin-right: 10px;
				justify-content:flex-end;
				font-size: 16px;
				.money{
					text{
						color:#8e8e8e;
					}
				}
			}
			.bottom_bottom{
				margin-bottom: 10px;
			}
		}
	}
}
</style>