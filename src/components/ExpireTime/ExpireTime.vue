<template>
    <span :endTime="endTime" :callback="callback" :endText="endText">
        <slot>
            {{content}}
        </slot>
    </span>
</template>
<script>
    export default {
        data(){
           return {
            content: '',
           }
        },
        props:{
            endTime:{
                type: Number,
                default :''
            },
            endText:{
               type : String,
               default:'已结束'
            },
            callback : {
                type : Function,
                default :''
            }
        },
        mounted () {
          this.countdowm(this.endTime)
        },
        methods: {
           countdowm(timestamp){
            let self = this;
            let timer = setInterval(function(){
                // 获取现在的日期和时间
                let nowTime = new Date();
                // 获取后端时间戳(秒)，转化为(毫秒)
                let endTime = new Date(timestamp * 1000);
                // 分别得到两个的时间戳,得出差多少
				let t = endTime.getTime() - nowTime.getTime();
                if(t>0){
                    
                    // 86400000是一天，得出有几天
                    let day = Math.floor(t/86400000);
                    // 3600000是一个小时，得出有几小时
                    let hour=Math.floor((t/3600000)%24);
                    // 60000是一个分钟，得出有几分钟
                    let min=Math.floor((t/60000)%60);
                    // 1000是一个秒，得出有几秒
                    let sec=Math.floor((t/1000)%60);
                    // 为了美观在小于10前加0
                    hour = hour < 10 ? "0" + hour : hour;
                    min = min < 10 ? "0" + min : min;
                    sec = sec < 10 ? "0" + sec : sec;
                    let format = '';
                    if(day > 0){
                       format =  `${day}天${hour}小时${min}分${sec}秒自动关闭`;
                    }
                    if(day <= 0 && hour > 0 ){
                       format = `${hour}小时${min}分${sec}秒自动关闭`;
                    }
                    if(day <= 0 && hour <= 0){
                       format =`${min}分${sec}秒自动关闭`;
					}
                    self.content = format;
                    }else{
                      clearInterval(timer);
                      self.content = self.endText;
                      self._callback();
                    }
                 },1000);
               },
               _callback(){
                if(this.callback && this.callback instanceof Function){
                    this.$emit('done', "订单已超时");
                }
            }
        }
    }
    
</script>