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
					<view class="item">
						<view class="value">
							<input class="salesman_phone" type="number" :value="setValue" :disabled="setDisabled" :placeholder="setPlaceholder" />
						</view>
					</view>
					<view class="item">
						<view class="value">
							<input placeholder="请输入昵称" v-model="nickname"></input>
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
			setPlaceholder:"请输入业务员手机号码",
			setValue:"",
			setDisabled:false,
			icon:"",
			logoImg:"",
			isPopup:"",
			specClass:"none"
		}
	},
	onLoad(e){
		console.log(e.brandId);
		// 获取商品信息
		this.$request.GET({
			url:this.$api.apiUrl.GET_V6_BRAND_DETAILS,
			data:{
				brand_id:e.brandId
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
		isShowPopup(){
			this.toggleSpec();
		},
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
</style>