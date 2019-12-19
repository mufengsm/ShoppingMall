<template>
	<view>
		<view class="img">
			<image :src="icon"></image>
			<image :src="logoImg"></image>
		</view>
		<view>
			<button @tap="isShowPopup">立即申请</button>
		</view>
		<view
            class="popup spec"
            :class="specClass"
            @touchmove.stop.prevent="stopPrevent"
        >
            <!-- 遮罩层 -->
            <view class="mask"></view>
			<!-- 信息盒子 -->
			<view class="content">
				<text 
				@tap="isShowPopup"
				class="iconfont icon-cuowu"></text>
				<view class="title">填写申请信息</view>
				<view class="info_list">
					<view id="tips">*请输入店铺名称</view>
					<view class="item" id="item">
						<view class="value" id="ipt">
							<input placeholder="请输入店铺名称" v-model="storeName"></input>							
						</view>
					</view>
					<view id="tips">*请输入业务员手机号码</view>
					<view class="item" id="item">
						<view class="value" id="ipt">
							<input class="salesman_phone" type="number" v-model="setValue" :disabled="setDisabled" :placeholder="setPlaceholder" />
						</view>
					</view>
				</view>
				<button class="btn" @tap="submit">确认</button>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data(){
		return {
			brandId:"",
			setPlaceholder:"请输入业务员手机号码",
			setValue:"",
			setDisabled:false,
			icon:"",
			logoImg:"",
			isPopup:"",
			specClass:"none",
			storeName:""
		}
	},
	onLoad(e){
		this.brandId = e.brandId;
		// 获取商品信息
		this.$request.GET({
			url:this.$api.apiUrl.GET_V6_BRAND_DETAILS,
			data:{
				brand_id:this.brandId
			}
		}).then(res=>{
			if(res.code == 'SUCCESS'){
				this.icon = res.data.icon;
				this.logoImg = res.data.logo_img;
        	}else{
        		this.$api.msg('未获取到品牌，请重试');
        	}
		})
		// 获取上级业务员信息
		this.$request.GET({
			url:this.$api.apiUrl.GET_V6_MEMBER_SELFSALESMAN,
		}).then(res=>{
			if(res.code == "SECCUSS"){
				this.setPlaceholder = res.data.mobile;
				this.setValue = res.data.mobile;
				this.setDisabled = true;
        	}
		})
	},
	methods:{
		submit(){
			if(this.storeName == ''){
				this.$api.msg('店铺名称不能为空！');
				return false;
			}
			var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
			if(!myreg.test(this.setValue)){
				this.$api.msg('请输入正确的手机号码');
				return false;
			}
			this.$request.POST({
				url:this.$api.apiUrl.POST_V6_BRAND_APPLY,
				data:{
					brand_id:this.brandId,
					shop_name:this.storeName,
					salesman_mobile:this.setValue
				}
			}).then(res=>{
				if(res.code == 'SUCCESS'){
					this.$api.msg('您的申请已提交，我们将在1~3个工作日内审核完毕，请耐心等待');
			    }else{
			    	this.$api.msg(res.msg);
			    }
			   	this.toggleSpec();
			})
		},
		isShowPopup(){
			this.toggleSpec();
		},
		stopPrevent(){},
		toggleSpec(popup) {
            this.isPopup = popup;
            if (this.specClass === "show") {
                this.specClass = "hide";
                setTimeout(() => {
                    this.specClass = "none";
                }, 250);
            } else if (this.specClass === "none") {
                this.specClass = "show";
            }
		},
	}
}
</script>
<style lang="scss">
@import '../../mys/info/info.scss';
@import '../../mys/salesmaninfo/salesmaninfo.scss';
.img{
	width: 100vw;
	image{
		width: 100%;
	}
}
button{
	width: 30vw;
	margin-top: 15px;
	font-size: 16px;
	color: #FFFFFF;
	background-color: #ffa60f;
	text-align: center;
}
#ipt{
	margin-bottom: 10px;
	padding: 6px 0;
	border:1px solid #E3E3E3;
}
#tips{
	width: 100vw;
	font-size: 15px;
    color: rgba(233, 12, 29, 0.5);
}
#item{
	border: 0px;
}
.btn{
	width: 80vw;
	margin: 0;
	background-color: #ffa60f;
}
</style>