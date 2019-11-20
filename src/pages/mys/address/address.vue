<template>
    <view class="content">
			<view class="card_wrap">
				<view class="address_card" v-for="(item,index) in addressData" :key="index">
						<view class="name_tel">
							<text class="name">{{item.truename}}</text>
							<text class="tel">{{item.phone}}</text>
						</view>
						<view class="address">
							{{item.province+item.city+item.area+"  "+item.address}}
						</view>
					<view class="choice">
						<label @tap="setDefault(item)">
								<radio 
								:checked="item.is_default" 
								color="orange" 
								style="transform:scale(0.99)"/>
								<view
								:style="{color:item.is_default ? 'orange' : 'black'}"
								>{{
									item.is_default ? "当前为默认地址" : "设置为默认地址"
									}}</view>
						</label>
						<view class="operation">
							<view class="upt"
								@tap="update(item)"
							>
								<text class="iconfont icon-bianji"></text>编辑</view>
							<view class="del"
								@tap="deleteAddress(item)"
							>
								<text class="iconfont icon-lajitong"></text>删除</view>
						</view>
					</view>
				</view>
			</view>
			<view class="footer" @tap="addAddress">
						<button class="cw">添加收获地址</button>
			</view>
    </view>
</template>
<script>
export default {
	data(){
		return {
			addressData:[]
		}
	},
	onShow(){
		this.$request.GET({
			url:this.$api.apiUrl.GET_SHOW_ADDRESS
		}).then(res=>{
			// console.log(res);
			
			if(res.code===200){
				this.addressData = res.data
			}else{
				this.$api.msg(res.msg)
			}
		})
	},
	methods:{
		addAddress(){
			uni.navigateTo({url:"/pages/mys/addressForm/addressForm"})
		},
		update(e){
			uni.navigateTo({
				url:`/pages/mys/addressForm/addressForm?id=${e.id}`
			})
		},
		// 是否删除
		deleteAddress(e){
			uni.showModal({
				title: '消息提示',
				content: '确定删除该地址',
				success:(isBtn) => {
					if (isBtn.confirm) {
						this.$request.POST({
							url:this.$api.apiUrl.POST_ADDRESS_DELETE,
							data:{
								id:e.id
							}
						}).then(res=>{
							if(res.errcode===1){
								// 删除当前页面中的数据
								const result = this.addressData.findIndex(item=>{
									return item.id === e.id
								})
								this.addressData.splice(result,1)
							}
							this.$api.msg(res.errmsg)
						})
					}if (isBtn.cancel) {
						return false;
					}
				}
			})
		},
		setDefault(e){
			this.$request.POST({
				url:this.$api.apiUrl.POST_SET_DEFAULT,
				data:{
					id:e.id
				}
			}).then(res=>{
				if(res.errcode === 1){
					for (let i = 0; i < this.addressData.length; i++) {
						const element = this.addressData[i];
						if(element.id===e.id){
							element.is_default = 1;
						}else{
							element.is_default = 0;
						}
					}
				}
				this.$api.msg(res.errmsg)
			})
		}
	},
	computed:{
	}
}
</script>
<style lang="scss">
.content{
	width: 100vw;
	height: 100vh;
	background-color: #efeff4;
}
.footer{
	height: 40px;
	background-color: orange;
	width: 100vw;
	position: fixed;
	bottom: 0;
	text-align: center;
	line-height: 40px;
	.cw{
		color:white;
		width: 100%;
		display: block;
		line-height: 40px;
		background-color: orange;
	}
}
.card_wrap{
	margin-bottom: 40px;
}
.address_card{
	width: 100vw;
	border-top:1px solid rgb(170, 169, 169);
	padding-bottom: 10px;
	background-color: white;
	.name_tel{
		margin: 5px 0 0 15px;
		display: flex;
		font-size: 15px;
		.name{flex:5}
		.tel{flex:5}
	}
	.address{
		font-size: 16px;
		padding: 5px 0 5px 15px;
		border-bottom: 1px solid rgb(238,238,238);
	}
	.choice{
		display: flex;
		margin-top:7px;
		font-size: 15px;
		label{
			flex:6;
			margin-left: 10px;
			display: flex;
			view{
				line-height: 25px;
			}
		}
		.operation{
			flex:4;
			display: flex;
			.upt{
				flex:5;
				text{
					margin-right: 4px;
				}
			}
			.del{
				flex:5;
				line-height: 20px;
				text{
					font-size: 20px;
				}
			}
		}
	}
}
	
</style>