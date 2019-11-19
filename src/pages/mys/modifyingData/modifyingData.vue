<template>
	<view>
		<view class="info_list">
			<view class="item item_id">
				<view class="key"> 用户名</view>
				<view class="value">{{newUserInfoItem.username}}</view>
			</view>
			<view class="item">
				<view class="key"> 昵称</view>
				<input type="text" class="value ipt" v-model="iptVal">
			</view>
			<view class="item">
				<view class="key"> 性别</view>
				<picker 
				class="value picker" 
				@change="bindPickerChange" 
				:value="index" 
				:range="array" 
				range-key="name">
					<view class="uni-input">{{array[index].name}}
						<text class="value iconfont icon-youjiantou"></text>	
					</view>
				</picker>
			</view>
			<view class="item">
				<view class="key">
					出生日期
				</view>
				<view class="value">
					<picker 
					mode="date" 
					:value="date" 
					:start="startDate" 
					:end="endDate" 
					@change="bindDateChange">
						<view class="uni-input">{{tiem}}
							<text class="value iconfont icon-youjiantou"></text>
						</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="info_list saveSeting"
		@tap="saveSeting"
		>
			<view class="item item_id id_login_out">
				<view class="key"> 保存修改</view>
			</view>
		</view>
	</view>
</template>
<script>
function getDate(type) {
	const date = new Date();

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;;
	day = day > 9 ? day : '0' + day;

	return `${year}-${month}-${day}`;
}
export default {
	data(){
		return {
			newUserInfoItem:{},
			userInfoObj:{},
			// 姓名
			iptVal:"",
			array: [{name:'男'},{name: '女'}],
			index: 0,
			tiem:"",
			sex:"",
			date: getDate({
				format: true
			}),
			startDate:getDate('start'),
			endDate:getDate('end'),
		}
	},
	onShow(){
		this.$request.GET({
			url:this.$api.apiUrl.GET_USER_INFO,
		}).then(res=>{
			let result = res.data;
			this.newUserInfoItem = res.data;
			this.iptVal = result.nickname
			this.tiem = result.birthday;
			this.index = this.array.findIndex(item=>{
				return result.sex === item.name
			})
		})
	},
	methods:{
		bindPickerChange: function(e) {
			this.index = e.target.value
			// 性别
			this.sex = this.array[this.index].name;
		},
		bindDateChange: function(e) {
			// 出生年月日
			this.tiem = e.target.value
		},
		saveSeting(){
			this.$request.POST({
				url:this.$api.apiUrl.POST_USER_EDIT_INFO,
				data:{
					nickname:this.iptVal,
					sex:this.index,
					birthday:this.tiem
				}
			}).then(res=>{
				console.log(res);
				if(res.errcode === 1){
					uni.showToast({
						title:res.errmsg,
						success:()=>{
							uni.navigateTo({
								url:"/pages/mys/info/info"
							})
						}
					})
				}
			})
		}
	}
}
</script>
<style lang="scss">
page{
	width: 100vw;
	height: 100%;
	background-color: #efeff4;
}
.info_list{
	width: 100vw;
	padding: 5px 10px;
	background-color: white;
	.item{
		display: flex;
		border-bottom: 1px solid #eee;
		line-height: 46px;
		align-items: center;
		.key{
			flex: 3;
			text-align: left;
		}
		.value{
			flex: 7;
			color: #999;
			text-align: left;
			.iconfont{
				float: right;
			}
		}
		.picker{
			float: left;
			
		}
	}
	.item_id{
		border-bottom: 0px;
	}
	.id_address{
		line-height: 35px;
	}
	.id_login_out{
		.key{
			text-align: center;
		}
	}
}
.saveSeting{
	margin-top: 20px;
}
</style>