<template>
    <view class="content">
        <picker-view
            v-if="visible"
            :indicator-style="indicatorStyle"
            :value="value"
            @change="bindChange"
			class="picker"
        >
            <picker-view-column>
                <view 
				class="item" v-for="(item,index) in largeArea" :key="index" 
				:data-id="item.id">{{item.name}}</view>
            </picker-view-column>
            <!-- <picker-view-column>
                <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
            </picker-view-column>
			<picker-view-column>
                <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
            </picker-view-column> -->
        </picker-view>
    </view>
</template>

<script>
export default {
    data: function() {
        const date = new Date();
        const years = [];
        const year = date.getFullYear();
        const months = [];
        const month = date.getMonth() + 1;
        const days = [];
        const day = date.getDate();
        for (let i = 1990; i <= date.getFullYear(); i++) {
            years.push(i);
        }
        for (let i = 1; i <= 12; i++) {
            months.push(i);
        }
        for (let i = 1; i <= 31; i++) {
            days.push(i);
        }
        return {
            title: "picker-view",

            value: [9999, month - 1, day - 1],
            visible: true,
            indicatorStyle: `height: ${Math.round(
                uni.getSystemInfoSync().screenWidth / (750 / 100)
			)}px;`,
			largeArea:[]
        };
	},
	onLoad(){
		this.watchCity(1).then(res=>{
			this.largeArea = res;
		})
	},
    methods: {
        bindChange: function(e) {
			const val = e.detail.value;
			console.log(this.largeArea[val]);
			
            // this.year = this.years[val[0]];
            // this.month = this.months[val[1]];
            // this.day = this.days[val[2]];
		},
		watchCity(level="",id=""){
			
			// 过去城市数据，只需要传id
			return this.$request.POST({
				url:this.$api.apiUrl.GET_CITY,
				data:{
					level:level
				}
			}).then(res=>{
				if(res.data.length){
					return res.data
				}
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
