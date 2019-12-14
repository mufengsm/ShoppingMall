<template>
    <view class="content_wrap">
		<!-- tab选择组件 -->
        <UniSegmentedControl
		:current="current" 
		:values="items" 
		@clickItem="onClickItem" 
		style-type="button" 
		active-color="#f16155"></UniSegmentedControl>
		<!-- 内容 -->
        <view class="content">
			<!-- 时间选择器组件 -->
			<view v-if="current == 2">
				<view class="uniList">
					<view class="uni-list-cell-db">
						<!-- 开始时间 -->
						<picker 
						:value="startDate"
						mode="date" 
						@change="bindStartDateChange">
							<view class="uni-input">{{startDate}}</view>
						</picker>
					</view>
					<view class="txt"> 至 </view>
					<view class="uni-list-cell-db">
						<!-- 结束时间 -->
						<picker 
						:value="endDate"
						mode="date" 
						@change="bindEndDateChange">
							<view class="uni-input">{{endDate}}</view>
						</picker>
					</view>
				</view>
			</view>
			<!-- 内容列表 -->
           	<view class="card_list">
				<view class="list_item"
				v-for="(item,index) in dataList"
				:key="index"
				>
					<view class="left">{{item.realname}}</view>
					<view class="center">
						<text>销售额：</text>
						<text class="col_red">¥{{item.order_amount}}</text>
					</view>
					<view class="right">
						<text>成交量：</text>
						<text class="col_red">({{item.order_total}})</text>
					</view>
				</view>
			</view>
        </view>
		<UniLoadMore :status="dataList.length === 0 ? 'noMore' : noData"></UniLoadMore>
    </view>
</template>
<script>
import UniSegmentedControl from "@/components/UniSegmentedControl/UniSegmentedControl.vue";
export default {
    components: {UniSegmentedControl},
    data() {
        return {
			noData:'more',
            items: ['7天','30天','自定义'],
			current: 0,
			dataList:[],
			page:1,
			userId:null,
			date:"null",
			startDate: "请选择开始时间",
			endDate:"请选择结束时间",
			endYaerDate:parseInt(new Date().getTime() / 1000),
			optionalTime:{
				"startDate":"",
				"endDate":""
			}
        }
	},
	onShow(){
		this.page = 1;
		this.dataList = [];
		// 获取用户id
		this.$request.GET({
			url:this.$api.apiUrl.GET_USER_INFO
		}).then(res=>{
			this.userId = res.data.id;
			// 不是自定义时间就直接请求数据
			if(this.current != 2){
				this.reqStoreList();
			}
		})
	},
	onReachBottom(){
		// 没有数据就不加载了
		if(this.noData === 'more'){
			this.reqStoreList()
		}else{
			return false
		}
	},
    methods: {
		init(){
			// 初始化页面数据
			this.page = 1;
			this.dataList = [];
		},
        onClickItem(index) {
			// 每次点击切换判断是不是同一个，不同再请求
            if (this.current !== index.currentIndex) {
				this.current = index.currentIndex;
				this.init();
				// 不是自定义时间就直接请求数据
				if(index.currentIndex != 2){
					this.reqStoreList();
				}
            }
		},
		reqStoreList(){
			this.noData = 'loading';
			let timestamp = parseInt(new Date().getTime() / 1000);
			let newDate = null;
			if(this.current == 0){
				// 7天的时间
				newDate = parseInt(timestamp - 7 * 24 * 3600);
			}
			if(this.current == 1){
				// 30天的时间
		  		newDate = parseInt(timestamp - 30 * 24 * 3600);
			}
			if(this.current == 2){
				// 自定义时间
				timestamp = this.optionalTime.endDate;
				newDate = this.optionalTime.startDate;				
			}
			this.$request.POST({
				url:this.$api.apiUrl.POST_V4_USER_KE_LIST,
				data:{
					user_id: this.userId,
					start_time: newDate,
					end_time: timestamp,
					page: this.page,
				}
			}).then(res2=>{
				if(res2.code === 200){
					if(res2.data){
						if(res2.data.length < 10){
							this.noData = 'noMore';
						}else{
							// 如果还有数据就让page+1
							this.page++;
							this.noData = 'more';
						}
						this.dataList = this.dataList.concat(res2.data);
					}else{
						this.noData = 'noMore';
					}
				}else{
					this.$api.msg(res2.msg)
				}
			})
		},
		bindStartDateChange: function(e) {
			this.startDate = e.target.value;
			// 判断选择的时间是否符合规定
			if(this.computedTime.endDate < this.computedTime.startDate){
				this.$api.msg('开始时间不能大于结束时间!');
				return false;
			}
			this.init();
			if(this.endDate !== '请选择结束时间'){
				this.optionalTime = this.computedTime;
				this.reqStoreList();
			}else{
				this.$api.msg("请选择结束时间")
			}
		},
		bindEndDateChange:function(e){
			this.endDate = e.target.value;
			// 判断选择的时间是否符合规定
			if(this.computedTime.endDate < this.computedTime.startDate){
				this.$api.msg('开始时间不能大于结束时间!');
				return false;
			}
			this.init();
			if(this.startDate !== '请选择开始时间'){
				this.optionalTime = this.computedTime;
				this.reqStoreList();
			}else{
				this.$api.msg("请选择开始时间")
			}
		},
	},
	computed:{
		computedTime(){
			// 自己加时间结束精确到时分秒
			let strtime = this.startDate + ' 00:00:00';
			let strTimeDate = parseInt(new Date(strtime).getTime() / 1000) //传入一个时间格式
			let endtime = this.endDate + ' 23:59:59';
			let endTimeDate = parseInt(new Date(endtime).getTime() / 1000) //传入一个时间格式
			return {
				"startDate":strTimeDate,
				"endDate":endTimeDate
			}
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
.content_wrap{
	padding-top:10px;
}
.content{
	margin-top:12px;
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
.uniList{
	display: flex;
	margin-bottom: 10px;
	padding: 5px 10px;
	border-radius: 25px;
	background-color: #e3e3e3;
	.txt{
		flex: 1;
		text-align: center;
	}
	.uni-list-cell-db{
		flex: 4.5;
	}
	.uni-input{
		text-align: center;
		padding: 2px;
		font-size: 16px;
		border-radius: 6px;
		background-color: white;
	}
}
</style>