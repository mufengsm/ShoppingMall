<template>
	<viwe class="list_wrap">
		<view class="list_wrap">
			<view class="list_item"
			v-for="(product,name) in dataList"
			:key="name"
			>
				<view class="top">
					<view class="title">自营</view>
					<view class="order_number">订单号：{{name}}</view>
				</view>
				<view class="center">
					<view v-if="product.length===1" class="center_one">
						<view class="left_img">
							<image :src="product[0].logo_img"></image>
						</view>
						<view class="right_info">
							<view class="title">{{product[0].title}}</view>
							<view class="specs">{{product[0].name}}</view>
						</view>
					</view>
					<!-- 多个商品只显示图片 -->
					<view v-else class="center_multiple">
						<view class="left_img_wrap">
							<image class="left_img" 
							v-for="(item,index) in dataList[name]"
							:key="index"
							:src="item.logo_img"></image>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="bottom_top">
						<text>共{{product.length}}件商品</text>
						<view class="money">总金额：<text>¥{{product[0].order_amount}}</text></view>
						<view class="money">佣金：<text>¥{{product[0].area_price}}</text></view>
					</view>
					<view class="bottom_center">
						<view class="money">姓名：<text>{{product[0].realname}}</text></view>
						<view class="money">电话：<text>{{product[0].phone}}</text></view>
					</view>
					<view class="bottom_bottom">
						<view class="money">收货地址：<text>{{product[0].province + product[0].city + product[0].area + product[0].address}}</text></view>
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
			dataList:{},
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
			this.dataList = {};
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
					if(res.data){
						this.noData = 'more';
						// 获取返回对象的长度
						const arr = Object.keys(res.data);
						if(arr.length < 8){
							this.noData = 'noMore';
						}else{
							// 如果还有数据就让page+1
							this.page++;
							this.noData = 'more';
						}
						// 合并对象
						this.dataList = Object.assign(this.dataList,res.data);
					}else{
						this.noData = 'noMore'
					}
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
					margin-right: 5px;
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