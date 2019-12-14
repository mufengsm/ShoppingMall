<template>
	<view>
		<view class="ipts">
			<input class="ipt id_type" disabled v-model="authType" type="text">
			<input class="ipt" disabled v-model="realname" type="text">
			<input v-if="storename !== '店铺名称：'" class="ipt" disabled v-model="storename" type="text">			
			<input class="ipt" disabled v-model="phone" type="text">
			<input class="ipt" disabled v-model="address" type="text">
			<input class="ipt" disabled v-model="detailedAddress" type="text">
			<input class="ipt" disabled v-model="sex" type="text">
		</view>
		<view>
			<view>身份证正反面查看</view>
			<view class="imgs">
				<image @tap="imgShowBig" :src="imgList[0]"></image>
				<image @tap="imgShowBig" :src="imgList[1]"></image>
			</view>
		</view>
		<!-- 店铺照片 -->
	 	<view v-if="storename !== '店铺名称：'">
			<view>店铺正面照与营业执照查看</view>
			<view class="imgs">
				<image @tap="imgShowBig" :src="imgList[2]"></image>
				<image @tap="imgShowBig" :src="imgList[3]"></image>
			</view>
		</view>
		<view class="btns">
			<button class="yes" @tap="pass">审核通过</button>
			<button class="no" @tap="fail">不通过</button>
		</view>
	</view>
</template>
<script>
export default {
	data(){
		return {
			authType:"认证类型：",
			type:"",
			realname:"姓名：",
			storename:"店铺名称：",
			phone:"手机号码：",
			address:"地址：",
			detailedAddress:"详细地址：",
			sex:"性别：",
			imgList:[],
			userId:null,
		}
	},
	onLoad(e){
		this.userId = e.id;
		this.$request.POST({
			url:this.$api.apiUrl.POST_V4_USER_SHOW_MEMBER,
			data:{
				id:e.id
			}
		}).then(res=>{
			let result = res.data;
			this.authType += result.store_id === 0 ? "会员认证" : "店铺认证";
			this.realname += result.realname;
			// 如果是店铺认证显示店铺名称
			if(result.store_id !== 0){
				this.storename += result.store_name;
			}
			this.phone 	  += result.phone;
			this.address  += result.province +","+ result.city +","+ result.area;
			this.detailedAddress += result.address;
			this.sex 	  += result.sex === 2 ? '女' : '男';
			this.imgList = result.auth_pic;
		})
	},
	methods:{
		imgShowBig(e){
			// 预览图片
			uni.previewImage({
				urls: this.imgList,
				longPressActions: {
					itemList: ['发送给朋友', '保存图片', '收藏'],
					success: function(data) {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function(err) {
						console.log(err.errMsg);
					}
				}
			});
		},
		pass(){
			uni.showModal({
				title: '消息提示',
				content: '确定通过该会员认证信息？',
				success:  (res)=> {
					if (res.confirm) {
						this.$request.POST({
							url:this.$api.apiUrl.KECHECK,
							data:{
								id:this.userId
							}
						}).then(res=>{
							if(res.code == 1){
								uni.showToast({
									title:res.msg,
									success:()=>{
										uni.navigateTo({
											url:"/pages/mys/kecheck/kecheck"
										})
									}
								})
							}else if(res.code == -1){
								this.$api.msg(res.msg)
							}
						})
					} else if (res.cancel) {
						return false;
					}
				}
			});
		},
		fail(){
			// 填写驳回信息页面
			uni.navigateTo({
				url:`/pages/mys/notPass/notPass?id=${this.userId}`
			})
		}
	}
}
</script>
<style lang="scss">
.ipt{
	padding: 0 10px;
	margin: 28px 0;
	border-bottom: 1px solid #DDDDDD;
}
.id_type{
	padding: 0 0;
}
.imgs{
	width: 100vw;
	display: flex;
	padding: 0 10px;
	margin-bottom: 40px;
	image{
		flex: 5;
		margin: 0 2px;
		height: 30vw;
	}
}
.btns{
	display: flex;
	padding: 0 10vw;
	margin-bottom: 20px;
	button{
		width: 40vw;
		margin: 0 10px;
		color: white;
	}
	.yes{
		background-color: rgba(236,99,80,1);
	}
	.no{
		background-color: #939393;
	}
}
</style>