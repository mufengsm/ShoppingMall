<template>
    <view class="content">
        <picker-view
            v-if="visible"
            :indicator-style="indicatorStyle"
            @change="bindChange"
			class="picker"
        >
            <picker-view-column>
                <view 
				class="item" v-for="(item,index) in largeArea" :key="index" 
				>{{item.name}}</view>
            </picker-view-column>
            <picker-view-column>
                <view 
                class="item" v-for="(item,index) in cityClass" :key="index"
                >{{item.name}}</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in area" :key="index"
                >{{item.name}}</view>
            </picker-view-column>
            <picker-view-column v-if="street.length">
                <view class="item" v-for="(item,index) in street" :key="index"
                >{{item.name}}</view>
            </picker-view-column>
        </picker-view>
    </view>
</template>

<script>
export default {
    data: function() {
        return {
            title: "picker-view",
            visible: true,
            indicatorStyle: `height: ${Math.round(
                uni.getSystemInfoSync().screenWidth / (750 / 100)
			)}px;`,
            largeArea:[],
            cityClass:[],
            area:[],
            street:[],
        };
	},
	onLoad(){
       this.lodingCity(1,37,567)
	},
    methods: {
        bindChange: function(e) {
            const val = e.detail.value;
            const province = this.largeArea[val[0]];
            const city = this.cityClass[val[1]];
            const area = this.area[val[2]];
            const street = this.street[val[3]];
            if(this.street){
                this.lodingCity()
			console.log(this.largeArea[val[0]]);
            console.log(this.cityClass[val[1]]);
            console.log(this.area[val[2]]);
            console.log(this.street[val[3]]);
            }else{
            console.log(this.largeArea[val[0]]);
            console.log(this.cityClass[val[1]]);
            console.log(this.area[val[2]]);
            }
		},
		watchCity(id="",level=""){
			// 过去城市数据，只需要传id
			return this.$request.POST({
				url:this.$api.apiUrl.GET_CITY,
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
        lodingCity(city,area,street){
             // 获取默认省
            this.watchCity("",1).then(res=>{
                this.largeArea = res;
            })
            // 获取默认市
            this.watchCity(city).then(res=>{
                this.cityClass = res;
            })
            // 获取默认区
            this.watchCity(area).then(res=>{
                this.area = res;
            })
            // 获取街道
            this.watchCity(street).then(res=>{
                this.street = res;
            })
        }
    }
};
</script>

<style>
.content{
	height: 100vh;
	width: 100vw;
}
.picker{
	position: absolute;
	bottom: 0;
	left: 0;
	height: 30vh;
	width: 100vw;
}
</style>
