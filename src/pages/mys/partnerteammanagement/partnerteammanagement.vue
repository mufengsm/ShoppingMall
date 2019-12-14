<template>
	<view>
		<view class="top">
			<view class="dateSelection top_common">
				<view class="uni-list-cell-db">
					<picker style="padding-right:1vw" mode="date" :value="startDate" @change="bindStartDateChange">
						<view class="uni-input">{{startDate}} </view>
					</picker>
				</view>
				 - 
				<view class="uni-list-cell-db">
					<picker style="padding-left:1vw" mode="date" :value="endDate" @change="bindEndDateChange">
						<view class="uni-input"> {{endDate}}<text class="iconfont icon-downarrow"></text></view>
					</picker>
				</view>
			</view>
			<view class="brandChoice top_common">
				<view class="uni-list-cell-db">
                    <picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
                        <view class="uni-input">{{array[index].name ? array[index].name : "全部品牌"}}<text class="iconfont icon-downarrow"></text></view>
                    </picker>
                </view>
			</view>
			<view class="btn top_common" @tap="subimt">查询</view>
		</view>
		<view class="list_wrap">
			<view class="card_item"
			v-for="(item,index) in dataList"
			:key="index"
			>
				<view class="item_top">
					<view class="top_img">
						<image :src="item.avatar"></image>
					</view>
					<view class="top_info">
						<view class="info_name">{{item.realname}}</view>
						<view class="info_username">
							<text class="before"></text>
							<text>{{item.username}}</text>
						</view>
						<view class="info_price">
							<image src="https://meizi.manogue.com.cn/static/wap/images/icon-salesman-list-1.png"></image>
							<text class="price_num">{{item.total_price}}</text>
						</view>
					</view>
					<view class="top_ranking" v-if="index === 0 || index === 1 ||  index === 2">
						<image :src="'https://meizi.manogue.com.cn/static/wap/images/icon-ranking-'+ (index+1) +'.png'"></image>
					</view>
				</view>
				<view class="item_bottom">
					<view class="bottom_left">
						<image src="https://meizi.manogue.com.cn/static/wap/images/icon-salesman-list-2.png"></image>
						<view>电话： <text>{{item.mobile}}</text></view>
					</view>
					<view class="bottom_right">
						<image src="https://meizi.manogue.com.cn/static/wap/images/icon-salesman-list-3.png"></image>
						<text>编辑</text>
					</view>
				</view>
			</view>
		</view>
		<UniLoadMore :status="noData"></UniLoadMore>
	</view>
</template>
<script>
export default {
	data() {
        return {
			page:1,
			index:null,
			brandId:null,
			startDate: "开始时间",
			endDate:"结束时间",
			array: [{id:"",name:""}],
			noData:'more',
			dataList:[]
        }
	},
	onLoad(){
		this.reqDataList();
		// 获取品牌
		this.$request.POST({
			url:this.$api.apiUrl.POST_QUERY_BRAND,
			data:{
				tags_id:"",
				num:200,
			}
		}).then(res=>{
			if(res.code === 200){
				this.array = res.data;
			}else{
				this.$api.msg(res.msg)
			}
		})
	},
	onReachBottom(){
		if(this.noData === 'noMore'){
			return false;
		}else{
			this.reqDataList();
		}
	},
	methods:{
		// 设置开始时间
		bindStartDateChange: function(e) {
			this.startDate = e.target.value;
			// 如果时间规格不对
			if(!this.computedTime){this.startDate = "开始时间";}
		},
		// 设置结束时间
		bindEndDateChange: function(e) {
			this.endDate = e.target.value;
			// 如果时间规格不对
			if(!this.computedTime){this.endDate = "结束时间";}
		},
		bindPickerChange: function(e) {
			// 设置选中的index
			this.index = e.target.value;
			// 设置品牌id
			this.brandId = this.array[e.target.value].id;
		},
		subimt(){this.reqDataList('btn');},
		reqDataList(e){
			let startTimeTxt,endTimeTxt;
			// 如果时默认值就设置默认请求时间
			if(this.startDate === '开始时间' && this.endDate === '结束时间'){
				startTimeTxt = '';
				endTimeTxt = '';
			}else{
				// 设置携带数据格式
				startTimeTxt = this.startDate.split("-")[0]+ '-' + this.startDate.split("-")[1];
				endTimeTxt = this.endDate.split("-")[0]+ '-' + this.startDate.split("-")[1];
			}
			this.noData = 'loading';
			// 请求页面数据
			this.$request.POST({
				url:this.$api.apiUrl.POST_V4_USER_SALESMANS,
				data:{
					page:this.page,
					row: 10,
					brand_id: this.brandId,
					start:startTimeTxt,
					end: endTimeTxt,
				}
			}).then(res=>{
				if(res.code === 1){
					// 判断还有没有更多的数据
					if(res.data.length < 10){
						this.noData = 'noMore';
					}else{
						this.noData = 'more';
					}
					// 判断是怎么加载
					if(e === 'btn'){
						this.dataList = res.data;
					}else{
						this.dataList = this.dataList.concat(res.data);
					}
				}else{
					this.$api.msg(res.msg);
					this.noData = 'noMore';
				}
			})
		}
	},
	computed:{
		computedTime(){
			// 对比时间;
			let strTimeDate = parseInt(new Date(this.startDate).getTime() / 1000);
			let endTimeDate = parseInt(new Date(this.endDate).getTime() / 1000);
			if(strTimeDate >= endTimeDate){
				this.$api.msg('开始时间不能大于或等于结束时间！');
				return false;
			}else{
				return true;
			}
		}
	}
}
</script>
<style lang="scss">
.top{
	display: flex;
	font-size: 14px;
	.top_common{
		display: flex;
		padding: 5px;
		box-sizing: border-box;
		align-items: center;
		justify-content:center;
		border-radius: 5px;
	}
	.dateSelection{
		flex: 6;
		margin: 5px 10px;
		border: 1px solid #CCCCCC;
	}
	.brandChoice{
		flex: 2.5;
		margin: 5px 10px 5px 0;
		border: 1px solid #CCCCCC;
	}
	.btn{
		flex: 1.5;
		font-size: 14px;
		color: white;
		margin: 5px 10px 5px 0;
		background-color: #df0e1d;
	}
	.icon-downarrow{font-weight: 900;}
}
.card_item{
	padding:23px;
	border-radius: 12px;
    box-shadow: 0px 0px 10px #E3E3E3;
    background: #FFFFFF;
	.item_top{
		display: flex;
		.top_img{
			flex: 3.5;
			display: flex;
			justify-content: center;
			image{
				width: 20vw;
				height: 20vw;
				border-radius: 100%;
			}
		}
		.top_info{
			flex: 4;
			.info_name{
				color: #333333;
			}
			.info_username{
				margin-top:3px;
				font-size: 16px;
				color: #333333;
				.before{
					display: inline-block;
					content: '';
					width: 12px;
					height: 12px;
					margin-right: 4px;
					background: #df0e1d;
					border-radius: 12px;
				}
			}
			.info_price{
				margin-top: 10px;
				display: flex;
				align-items: center;
				image{
					width: 10vw;
					height: 10vw;
				}
				.price_num{
					font-weight: 900;
					color: #df0e1d;
				}
			}
		}
		.top_ranking{
			flex: 2.5;
			display: flex;
			justify-content: flex-end;
			image{
				width: 18vw;
				height: 18vw;
			}
		}
	}
	.item_bottom{
		display: flex;
		margin-top: 15px;
		font-size: 16px;
		justify-content: space-between;
		.bottom_left{
			display: flex;
			align-items: center;
			image{
				width: 5vw;
				height: 5vw;
			}			
		}
		.bottom_right{
			display: flex;
			align-items: center;
			image{
				width: 5vw;
				height: 5vw;
			}
		}
	}
}
</style>