<template>
	<view class="wrap">
        <view class="content">
            <view class="consignee">
				<input class="uni-input" v-model="username" maxlength="6" placeholder="请输入收件人姓名" />
            </view>
            <view class="consignee">
				<input class="uni-input" v-model="tel" maxlength="11" type="number" placeholder="请输入收件人手机号码" />
            </view>
            <view class="uni-list-cell-db">
                <!-- <picker mode="region" @change="addressDetermination">
                    <view class="uni-input">
                        <text class="txt">所在地区</text>
                        <text class="folat_rigth">{{address}} <text class="iconfont icon-youjiantou"></text></text>
                    </view>
                </picker> -->
                <picker 
                mode="multiSelector" 
                @columnchange="bindMultiPickerColumnChange"
                @change="regionalChoice" 
                :value="multiIndex" 
                :range="multiArray"
                range-key="name"
                >
						<view class="uni-input">
                           <text class="txt">所在地区</text>
                        <text class="folat_rigth">{{address}} <text class="iconfont icon-youjiantou"></text></text>
                        </view>
					</picker>
            </view>
            <view class="detailed_address">
                 <textarea v-model="detailedAddress" placeholder="街道、门牌号等详细地址"/>
            </view>
        </view>
        <view class="footer" @tap="addAddress">
       		<button class="cw">保存地址</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
                id:"",
                address:"请选择地址",
                username:"",
                tel:"",
                detailedAddress:"",
                city:[],
                multiIndex: [0,0,0,0],
                multiArray: [[],[],[]],
			}
        },
        onLoad(e){
            if(e.id){
                this.id = e.id;
                this.$request.GET({
                    url:this.$api.apiUrl.GET_FIND_ADRESS,
                    data:{
                        id:e.id
                    }
                }).then(res=>{
                    const result = res.data;
                    this.username = result.truename;
                    this.detailedAddress = result.address;
                    this.address = result.province+result.city+result.area;
                    this.tel = result.phone;
                })
            }
            // 获取默认省
            this.watchCity("",1).then(res=>{
                this.multiArray.splice(0,1,res);
                this.multiArray[0].unshift({name:"请选择"});
            })
        },
		methods: {
            addressDetermination(e){
                let addressArr = [...new Set(e.detail.value)];
                let cityAddress = "";                
                for (const key of addressArr) {
                    cityAddress+=key
                }
                // 等待拼接详细地址
                this.address=cityAddress
                this.city = cityAddress
            },
            addAddress(){
                if(!this.username){
                    this.$api.msg("请填输入收件人姓名");                    
                }
                if(!this.tel){
                    this.$api.msg("请输入联系电话");                    
                }
                if(!this.city){
                    this.$api.msg("请选择所在城市");
                }
                if(!this.detailedAddress){
                    this.$api.msg("请填写详细地址");                    
                }
                this.$request.POST({
                    url:this.$api.apiUrl.POST_ADDRESS_FORM,
                    data:{
                        id:this.id,
                        truename:this.username,
                        phone:this.tel,
                        area_ids:this.city.join(","),
                        address:this.detailedAddress
                    }
                }).then(res=>{
                    uni.showToast({
                        title:res.errmsg,
                        success:()=>{
                            if(res.errcode===1){
                                uni.navigateTo({url:"/pages/mys/address/address"})
                            }
                        }
                    })
                })
            },
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


}
		}
	}
</script>

<style lang="scss">
.wrap{
    width: 100vw;
    height: 100vh;
    padding-top: 15px;
    background-color: #efeff4;
}
.content{
    width: 100%;
    border-radius: 5px;
    background-color: white;
    .consignee{
        margin-top:10px;
        padding: 8px;
        border-bottom: 1px solid #c8c7cc;
    }
    .detailed_address{
        textarea{
            padding: 10px 0 0 10px;
            border-top:1px solid #c8c7cc;
            width: 100vw;
        }
    }
    .uni-list-cell-db{
        font-size: 15px;
        .uni-input{
            height: 100upx;
            line-height: 100upx;
            .folat_rigth{
                float: right;
                color: #888;
            }
            .txt{
                margin-left:5px;
            }
        }
    }
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
	
</style>
