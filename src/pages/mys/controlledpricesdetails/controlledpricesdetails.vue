<template>
	<view>
		<view class="wrap">
			<view>
				<image src="https://meizi.manogue.com.cn/static/wap/images/controlled_prices_bg.jpg"></image>	
			</view>
			<view class="title">
				<image :src="goodsData.icon"></image>
				<view class="info">
					<view>{{goodsData.name}}</view>
					<text class="isJoinIn">
						{{cpdStatus}}
					</text>
				</view>
			</view>
			<view class="collapsible">
				<text>品牌简介：</text>
				<view class="isCollapsible" :style="{'height':dynamicHeight}">
					<rich-text :nodes="goodsData.desc"></rich-text>
				</view>
				<view class="btn">
					<view class="is_show" @tap="isShow">查看全部
						<text v-if="dynamicHeight==='35vw'" class="iconfont icon-downarrow"></text>
						<text v-else class="iconfont icon-downarrow-copy"></text>
					</view>
					<button @tap="submit">
						{{cpdApplyStatus}}
					</button>
				</view>
				<view class="remind_text">
					加盟提示：本品牌要求在线下指定代理区域、不低于建议零售价格进行销售。如有违反立即取消合作资格！
				</view>
			</view>
			<rich-text :nodes="setDesc"></rich-text>
			<view class="card_wrap">
				<view class="title"><text>——   爆品推荐   ——</text></view>
				<view class="card_item_wrap">
					<view class="card_item" v-for="(item,index) in goodsListData" :key="index">
						<image :src="item.logo_img"></image>
						<view class="info">{{item.name}}</view>
						<view class="price">¥{{item.first}}</view>
						<button class="btn" @tap="navToGoodInfo(item.id)">立即抢购</button>
					</view>
				</view>
			</view>
		</view>
		<UniLoadMore :status="noData"></UniLoadMore>
	</view>
</template>
<script>
export default {
	data(){
		return {
			brandId:"",
			goodsData:{
				name:"",
				desc:"",
				explain:"",
				icon:"",
			},
			setDesc:"",
			// 0=待审核；1=已审核；2=不通过.
			applyStatus:null,
			isLogin:"",
			page:1,
			noData:'loading',
			goodsListData:[],
			dynamicHeight:'35vw'
		}
	},
	onLoad(e){
		this.brandId = e.brandId;
		// 获取用户是否登录
		this.isLogin = uni.getStorageSync('access_token');
		// 请求控区控价商品信息
		this.$request.POST({
			url:this.$api.apiUrl.POST_V4_BRANDS_DETAIL,
			data:{
				brand_id:this.brandId
			}
		}).then(res=>{
			if(res.code === 1){
				// 设置页面内容
				this.goodsData = res.msg;
				// 自己给图文介绍设置一下样式
				this.setDesc = `<div style="width:100vw">${this.goodsData.explain.replace(
					/<img/g,
					"<img style='width:100vw'"
				)}</div>`;
			}else{
				this.$api.msg(res.msg);
			}
		})
		// 店铺品牌授权状态
		this.$request.GET({
			url:this.$api.apiUrl.GET_V6_BRAND_APPLYSTATUS,
			data:{
				brand_id:this.brandId
			}
		}).then(res=>{
			if(res.code == "SUCCESS"){
				if (res.data == null) {
					this.applyStatus = 2;
				} else {
					// 设置授权状态
					if(res.data.status){this.applyStatus = res.data.status};
				}
			}else{
				this.$api.msg(res.msg);
			}
		})
		this.reqGoodsList();
	},
	onReachBottom() {
		// 触底事件发生后请求新数据
		if (this.noData !== 'noMore') {
			this.page++;
			this.reqGoodsList();
		} else {
			// 函数截流如果noData为假代表请求的数据已经没有或不足够了
			return false;
		}
	},
	methods:{
		navToGoodInfo(id){
			uni.navigateTo({
				url:`/pages/goodss/product/product?id=${id}`
			})
		},
		submit(){
			if(!this.isLogin){
				this.$api.msg('登录后才能购买!');
	            return false;
			}else{
				if(!this.applyStatus){
					this.$api.msg('信息错误，请请返回重试！');
				}else{
					if(this.applyStatus == 2){
						uni.showModal({
							title: '消息提示',
							content: '该品牌需申请代理通过后即可购买！',
							success:(isBtn) => {
								if (isBtn.confirm) {
									uni.navigateTo({
										url:`/pages/goodss/goodsbrandapply/goodsbrandapply?brandId=${this.brandId}`
									})
								}if (isBtn.cancel) {return false;}
							}
						})
					}else if(this.applyStatus == 1){
						this.$api.msg('已加盟无须申请');
					}else{
						this.$api.msg('品牌审核中');
					}
				}
			}
		},
		isShow(){
			this.dynamicHeight = this.dynamicHeight === '35vw' ? 'auto' : '35vw';
		},
		// 请求爆品推荐数据,可下拉继续加在
		reqGoodsList(){
			this.noData = 'loading';
			let pageNum = 6;
			if(this.brandId == '70'){pageNum = 7}else{pageNum = 6}
			this.$request.POST({
				url:this.$api.apiUrl.POST_V4_GOODS_GOODS_LIST,
				data:{
					brand_id: this.brandId,
					page: this.page,
					num: pageNum,
				}
			}).then(res=>{
				if(res.code == 200){
					const result = res.data;
					if(result != null){
						// 如果数据没有返回设置的6条，就是没有更多了
						this.goodsListData = this.goodsListData.concat(result);
						console.log(this.goodsListData);
						if(result.length > 6){

							this.noData='more';
						}else{
							this.noData = 'noMore';
						}
					}else{
						this.noData = 'noMore';
					}
				}else{
					this.noData = 'noMore';
					this.$api.msg('暂无爆品商品推荐！');
				}
			})
		}
	},
	computed:{
		cpdApplyStatus(){
			switch (this.applyStatus) {
				case 2:
					return '申请加盟';
					break;
				case 1:
					return '已加盟无须申请';
					break;
				default:
					return '品牌审核中';
					break;
			}
		},
		cpdStatus(){
			switch (this.applyStatus) {
				case 2:
					return '未加盟';
					break;
				case 1:
					return '已加盟';
					break;
				default:
					return '品牌审核中';
					break;
			}
		}
	}
}
</script>
<style lang="scss">
.wrap{
	image{
		width: 100vw;
		height: 23vw;
	}
	.title{
		display: flex;
		image{
			flex:3;
			height: 30vw;
			margin:0 3vw;
			margin-top: -7vw;
			border-radius: 10px;
		}
		.info{
			flex: 6;
			.isJoinIn{
				text-align: center;
				font-size: 15px;
				color: #df0e1d;
				margin-top: 5px;
				padding: 5px 20px;
				background: #fedadc;
				border-radius: 6px;
				display: inline-block;
			}
		}
	}
	.collapsible{
		margin: 0 10px 10px 10px;
		.isCollapsible{
			overflow: hidden;
		}
		.btn{
			.is_show{
				margin-top: 5px;
				text-align: center;
				font-size: 16px;
				color: #4a91e1;
			}
			button{
				width: 80vw;
				background: #df0e1d;
				border-radius: 40px;
				margin-top: 10px;
				margin-bottom: 10px;
				text-align: center;
				color: #FFFFFF;
			}
		}
		.remind_text{
			text-align: center;
			font-size: 16px;
			color: #df0e1d;
		}
	}
	.card_wrap{
		width: 100vw;
		padding: 10px;
		background-color: #ffeff0;
		.title{
			display: flex;
			justify-content: center;
			margin:10px 0 13px 0;
			color: #df0e1d;
		}
		.card_item_wrap{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			.card_item{
				width: 48%;
				margin: 3px;
				border-radius: 10px;
				background-color: white;
				image{
					width: 100%;
					height: 40vw;
				}
				.btn{
					width: 90%;
					background: #df0e1d;
					text-align: center;
					color: #ffffff;
					font-size: 17px;
					border-radius: 15px;
					margin-top: 5px;
					height: 8vw;
					line-height: 8vw;
					margin-bottom: 7px;
				}
				.info{
					font-size: 15px;
				}
				.price{
					font-size: 16px;
					font-weight: 900;
					color:#df0e1d;
				}
			}
		}
	}
}
</style>