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
						{{"未加盟"}}
					</text>
				</view>
			</view>
			<view class="collapsible">
				<text>品牌简介：</text>
				<view class="isCollapsible" :style="{'height':dynamicHeight}">
					<rich-text :nodes="goodsData.desc"></rich-text>
				</view>
			</view>
			<rich-text :nodes="setDesc"></rich-text>
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
			dynamicHeight:"auto"
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
		// 请求爆品推荐数据,可下拉继续加在
		reqGoodsList(){
			this.noData = 'loading'
			this.$request.POST({
				url:this.$api.apiUrl.POST_V4_GOODS_GOODS_LIST,
				data:{
					brand_id: this.brandId,
					page: this.page,
					num: 6,
				}
			}).then(res=>{
				if(res.code == 200){
					const result = res.data;
					if(result != null){
						// 如果数据没有返回设置的6条，就是没有更多了
						if(result.length > 6){
							this.goodsListData = this.goodsListData.concat(result);
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
	}
}
</style>