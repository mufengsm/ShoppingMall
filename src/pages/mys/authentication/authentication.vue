<template>
	<view v-if="isWrapShow">
		<!-- 未认证 -->
		<view v-if="authStatus===20013">
			<view class="info_list">
				<view class="item">
					<view class="key"> 认证类型</view>
					<picker 
					class="value picker" 
					@change="bindPickerChange" 
					:value="typeIndex" 
					:range="typeArray" 
					range-key="name">
						<view class="uni-input">{{typeArray[typeIndex].name}}
							<text class="value iconfont icon-downarrow"></text>	
						</view>
					</picker>
				</view>

				<view class="info">
					<view class="key">姓名</view>
					<view class="value">
						<input 
						v-model="realName"
						type="text" placeholder="请填写真实姓名" placeholder-class="ipt_pla">
					</view>
				</view>
				<view class="info"
				v-if="type === '店铺认证'"
				>
					<view class="key">店铺名称</view>
					<view class="value">
						<input
						v-model="shopName"
						type="text" placeholder="请填写真实店铺名称" placeholder-class="ipt_pla">
					</view>
				</view>
				<view class="info">
					<view class="key">手机号码</view>
					<view class="value">
						<input 
						v-model="phone"
						maxlength="11"
						type="text" placeholder="请填写手机号码" placeholder-class="ipt_pla">
					</view>
				</view>
				<view class="info">
						<view class="key">地址</view>
						<view class="value">
							<picker 
							class="value picker"
							mode="multiSelector" 
							@columnchange="bindMultiPickerColumnChange"
							@change="regionalChoice" 
							:value="multiIndex" 
							:range="multiArray"
							range-key="name"
							>
								<text class="vlaue">{{address}} 
									<text class="iconfont icon-youjiantou"></text>
								</text>
							</picker>
						</view>
				</view>
				<view class="info">
					<view class="key">详细地址</view>
					<view class="value">
						<input 
						v-model="detailedAddress"
						type="text" placeholder="街道、门牌号等详细地址" placeholder-class="ipt_pla">
					</view>
				</view>
				<view class="info">
					<view class="key">性别</view>
					<picker 
					class="value picker" 
					@change="bindSexChange" 
					:value="sexIndex" 
					:range="sexArray" 
					range-key="name">
						<view class="uni-input">{{sexArray[sexIndex].name}}
							<text class="value iconfont icon-youjiantou"></text>	
						</view>
					</picker>
				</view>
				<view class="info">
					<view class="key">昵称</view>
					<view class="value">
						<input 
						v-model="nickname"
						type="text" placeholder="请输入昵称" placeholder-class="ipt_pla">
					</view>
				</view>
				<view class="id_img">
					<view class="upl">身份证正反面上传</view>
					<view class="imgs">
						<view class="img"
						v-for="(item,index) in userIdImg"
						:key="index"
						@tap="choiceImg(item)"
						>
							<image :src="item.img"></image>
						</view>					
					</view>
				</view>
				<view 
				v-if="type === '店铺认证'"
				class="id_img id_img_shop">
					<view class="upl">店铺正面照与营业执照上传</view>
					<view class="imgs">
						<view class="img"
						v-for="(item,index) in shopImg"
						:key="index"
						@tap="choiceImg(item)"
						>
							<image :src="item.img"></image>
						</view>
					</view>
				</view>
			</view>
			<button class="btn"
			@tap="submit"
			>提交审核信息</button>
		</view>
		<!-- 等待审核 -->
		<view v-if="authStatus===20011">
			<view class="in_audit">
				<image 
				src="https://meizi.manogue.com.cn/static/wap/images/icon-authentication4.png"></image>
			</view>
			<button class="btn"
			@tap="setAuthStatus"
			>重新提交认证信息</button>
			<button class="btn"
			@tap="toIndex"
			>好的,我知道了</button>
		</view>
		<!-- 未通过 -->
		<view v-if="authStatus===20012">
			<view class="in_audit">
				<image 
				src="https://meizi.manogue.com.cn/static/wap/images/icon-authentication5.png"></image>
			</view>
			<view class="reject_info">
				<view class="reject_key">驳回信息:</view>
				<view class="reject_value">
					{{authMessage}}
				</view>
			</view>
			<button class="btn"
			@tap="setAuthStatus"
			>重新提交认证信息</button>
		</view>
		<!-- 已通过 -->
		<view v-if="authStatus===200">
			<view class="in_audit">
				<image 
				src="https://meizi.manogue.com.cn/static/wap/images/icon-authentication3.png"></image>
			</view>
			<button class="btn"
			@tap="toIndex"
			>好的，我知道了</button>
		</view>
	</view>
</template>
<script>
import uploadImage from '@/common/ossutil/uploadFile.js';
export default {
	data(){
		return{
			isWrapShow:false,
			nickname:"",
			realName:"",
			shopName:"",
			phone:"",
			detailedAddress:"",
			type:"会员认证",
			sex:"男",
			address:"请选择",
			city:[],
			sexArray: [{name:'男'},{name: '女'}],
			sexIndex: 0,
			typeArray: [{name:'会员认证'},{name: '店铺认证'}],
			typeIndex: 0,
			multiIndex: [0,0,0,0],
			multiArray: [[],[],[]],		
			userIdImg:[
				{id:0,msg:"userIdImg",img:"https://meizi.manogue.com.cn/static/wap/images/camera.png"},
				{id:1,msg:"userIdImg",img:"https://meizi.manogue.com.cn/static/wap/images/camera.png"}
			],
			shopImg:[
				{id:0,msg:"shopImg",img:"https://meizi.manogue.com.cn/static/wap/images/camera.png"},
				{id:1,msg:"shopImg",img:"https://meizi.manogue.com.cn/static/wap/images/camera.png"}
			],
			authStatus:20013,
			authMessage:"信息不全"
		}
	},
	onLoad(){
		// 获取默认省
		this.watchCity("",1).then(res=>{
			this.multiArray.splice(0,1,res);
			this.multiArray[0].unshift({name:"请选择"});
		})
		// 检测认证状态
		this.$request.GET({
			url:this.$api.apiUrl.GET_USER_AUTH_STATUS,
		}).then(res=>{
			this.authStatus = res.code;
			if(res.data.message){this.authMessage=res.data.message;}
		})
	},
	onShow(){
		// 路由鉴权
    	this.navToLogin();	
	},
	methods:{
		// 更改认证类型
		bindPickerChange: function(e) {
			this.typeIndex = e.target.value
			// 认证类型
			this.type = this.typeArray[this.typeIndex].name;
		},
		// 更改性别
		bindSexChange(e){
			this.sexIndex = e.target.value
			// 性别
			this.sex = this.sexArray[this.sexIndex].name;
		},
		// 得到城市信息
		watchCity(id="",level=""){
			// 过去城市数据，只需要传id
			return this.$request.POST({
				url:this.$api.apiUrl.POST_GET_CITY,
				data:{
					id:id,
					level:level
				}
			}).then(res=>{
				if(res.data.length){
					return res.data
				}
			})
		},
		// 城市选择执行函数
		bindMultiPickerColumnChange: function(e) {
                switch (e.detail.column) {
                    case 0:
                        // 获取默认市
                        if(e.detail.value>0){
                            this.watchCity(this.multiArray[0][e.detail.value].id).then(res=>{
                                if(res){
                                    this.multiArray.splice(1,1,res);
                                    this.multiArray[1].unshift({name:"请选择"});
                                }
                            })  
                        }
                        this.multiArray[2]=[];
                        // this.multiArray[3]=[];
                        this.multiIndex=[e.detail.value,0,0,0];
                        break;
                    case 1:
                         // 获取默认区
                        if(e.detail.value>0){
                            this.watchCity(this.multiArray[1][e.detail.value].id).then(res=>{
                                if(res){
                                    this.multiArray.splice(2,1,res);
                                    this.multiArray[2].unshift({name:"请选择"});
                                }
                            })
                        }
                        // this.multiArray[3]=[];
                        this.multiIndex=[this.multiIndex[0],e.detail.value,0,0];                        
                        break;
                    case 2:
                         // 获取默认区
                        if(e.detail.value>0){
                            this.watchCity(this.multiArray[2][e.detail.value].id).then(res=>{
                                if(res){
                                    // this.multiArray.splice(3,1,res);
                                    // this.multiArray[3].unshift({name:"请选择"});
                                    // this.multiIndex=[this.multiIndex[0],this.multiIndex[1],e.detail.value,0];       
                                }
                            })
                        }
                        break;
                    default:
                        break;
                }
				
			},

		// 城市确定选择后执行函数
		regionalChoice(e){
			const val = e.detail.value;
			let cityAddress = ""; 
			this.city=[];
			for (let i = 0; i < val.length; i++) {
				const element = val[i];
				if(element){
					cityAddress+=this.multiArray[i][element].name;
					this.city.push(this.multiArray[i][element].id)
				}
			}
			this.address=cityAddress;
		},
		submit(){
			// 正则验证
			var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
	    	var regName = /^[\u4E00-\u9FA5]{1,6}$/;
			// 获取可填写信息
			if(!regName.test(this.realName)){this.$api.msg("请输入中文姓名"); return false};
			if(!myreg.test(this.phone)){this.$api.msg("请输入正确的手机号码"); return false};
			if(!this.shopName){
				if(this.type === "店铺认证"){
					this.$api.msg("请填写店铺名称"); 
					return false
				}
			};
			if(this.city.length<3){
				this.$api.msg("请选择完整地址"); 
				return false
			};
			if(!this.detailedAddress){this.$api.msg("请填写详细地址"); return false};
			if(!this.nickname){this.$api.msg("请填写昵称"); return false};

			
			// 判断图片数量;
			if(this.type==="店铺认证"){
				let imgArr = this.userIdImg.concat(this.shopImg);
				let result = imgArr.findIndex(item => {
					return item.img === "https://meizi.manogue.com.cn/static/wap/images/camera.png";
				})
				if(result !== -1){this.$api.msg("请将图片上传齐全");return false};
			}else if(this.type==="会员认证"){
				let imgArr = this.userIdImg;
				let result = imgArr.findIndex(item => {
					return item.img === "https://meizi.manogue.com.cn/static/wap/images/camera.png";
				})
				if(result !== -1){this.$api.msg("请将图片上传齐全");return false};
			}
			this.$request.GET({
				url:this.$api.apiUrl.GET_USER_INFO
			}).then(res=>{
				//显示消息提示框
				uni.showLoading({
					title:"正在提交信息",
					mask: true
				})
				let dataObj = {
					id:res.data.id,
					type:this.type==="店铺认证"?2:1,
					username:this.realName,
					phone:this.phone,
					area_ids:this.city.join(","),
					address:this.detailedAddress,
					nickname:this.nickname,
					sex:this.sex==="男"?1:2,
					auth_pic:this.computImg,
				}
				if(this.type === "店铺认证"){dataObj.store_name=this.shopName;}
				this.$request.POST({
					url:this.$api.apiUrl.POST_USER_AUTHENTICATION,
					data:dataObj
				}).then(res=>{
					uni.hideLoading();
					if(res.errCode === 200){
						uni.showToast({
							title:res.errMsg,
							success:()=>{
								// 显示审核页面
								this.authStatus=20011;
							}
						})
					}else{
						this.$api.msg(res.errMsg)
					}
				})
			})
			
		},
		choiceImg(item){
			uni.chooseImage({
				count: 1, // 默认最多一次选择9张图
				success: res => {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					var tempFilePaths = res.tempFilePaths;
					//支持多图上传
					for (var i = 0; i < res.tempFilePaths.length; i++) {
						//显示消息提示框
						uni.showLoading({
							mask: true
						})
						uploadImage(res.tempFilePaths[i], 'small_program/', result => {
							this.$set(this[item.msg][item.id],"img",result)
							uni.hideLoading();
						}, error => {
							this.$api.msg(error)
						})
					}
				}
			})
		},
		// 重新提交更改组件显示
		setAuthStatus(){this.authStatus=20013;},
		toIndex(){
			uni.switchTab({
				url:"/pages/indexs/index/index"
			});
		},
		navToLogin(){
			// 页面鉴权
			const TOKEN = uni.getStorageSync('access_token');
			if(!this.isWrapShow){
				if (!TOKEN){
					uni.navigateTo({
						url:"/pages/mys/login/login",
						success:()=>{
							this.isWrapShow = true;
						}
					})
				}else{
					this.isWrapShow = true;
				}
			}else{
				if (!TOKEN){
					uni.switchTab({
						url:"/pages/indexs/index/index",
						success:()=>{
							this.isWrapShow = false;
						}
					})
				}
			}
		}
	},
	computed:{
		computImg(){
			if(this.type==="店铺认证"){
				let imgArr = this.userIdImg.concat(this.shopImg);
				let result = imgArr.map(item => item.img)
				return result.join("|")
			}else{
				let imgArr = this.userIdImg;
				let result = imgArr.map(item => item.img)
				return result.join("|")
			}
		},
	}
}
</script>
<style lang="scss">
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
			text-align: right;
			.iconfont{
				float: right;
				display: inline-block;
				margin-left: 5px;
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
	.info{
		width: 100%;
		border-bottom: 1px solid rgba(236,99,80,0.5);
		display: flex;
		padding: 15px 0;
		.key{
			flex:3;
			font-size: 17px;
			font-weight: 350;
			&::before{
				content: "*";
				color: red;
				display: inline-block;
				margin-right: 2px;
			}
		}
		.value{
			flex:7;
			.ipt_pla{
				color: #999;
				font-size: 17px;
			}
			.picker{
				color: #999;
				text-align: right;
			}
		}
		.picker{color: #999;text-align: right;}
	}
	.id_img{
		padding: 15px 0;
		border-bottom: 1px solid rgba(236,99,80,0.5);
		.upl{
			font-size: 17px;
			font-weight: 350;
			&::before{
				content: "*";
				color: red;
				display: inline-block;
				margin-right: 2px;
			}
		}
		.imgs{
			display: flex;
			.img{
				flex:5;
				height: 125px;
				border: 1px solid #999;
				image{
					width: 100%;
					height:100%;
				}
			}
			
		}
	}
	.id_img_shop{
		border: 0;
	}
}
.btn{
	width: 80vw;
	margin-top: 20px;
	margin-bottom: 20px;
	border-radius:30px;
	background-color: rgba(236,99,80,1);
	color: white; 
}
.in_audit{
	width: 100%;
    height: 55vh;
    border-top: 20px solid #F1F1F1;
    text-align: center;
	padding-top: 30px;
	image{
		height: 100%;
		border: none;
		vertical-align: middle;
	}
}
.reject_info{
	.reject_key{
		margin-left: 7vh;
		margin-bottom: 1vh;
	}
	.reject_value{
		width: 70vw;
		padding: 8px;
		margin-left: 10vh;
		background-color: #eee;
		border-radius: 10px;
	}
}
</style>