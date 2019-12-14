<template>
	<view>
		<view class="ipts">
			<input class="ipt" v-model="realname" type="text" placeholder="请填入业务员姓名">
			<input class="ipt" v-model="id" type="text" placeholder="请填入身份证号" maxlength="18">
			<input class="ipt" v-model="phone" type="text" @blur="checkAccount('phone')" placeholder="请填入业务员手机号码" maxlength="11">
			<input class="ipt" v-model="username" type="text" @blur="checkAccount('username')" placeholder="请设置业务员登录账号">
			<input class="ipt" v-model="password" type="text" placeholder="请设置业务员登录密码" password>
		</view>
		<button class="btn" @tap="submit">确认添加</button>
	</view>
</template>
<script>
export default {
	data(){
		return {
			realname:"",
			id:"",
			phone:"",
			username:"",
			password:"",
		}
	},
	methods:{
		checkAccount(e){
			let reqData = {}
			// 检测你是验证手机号还是用户名
			if(e==='phone'){
				reqData.mobile = this.phone;
			}else{
				reqData.username = this.username;
			}
			this.$request.POST({
				url:this.$api.apiUrl.POST_V6_PARTNER_CHECKSALESMAN,
				data:reqData,
			}).then(res=>{
				if(res.code == "ERROR"){
					// 有误就清空内容
					this[e] = "";
					this.$api.msg(res.msg);
					return false;
				}
			})
		},
		submit(){
			// 验证手机号
			var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
			// 验证密码
			var myregs = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
			// 身份证号码
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			// 业务员姓名
			if(!this.realname){this.$api.msg('业务员姓名不能为空');return false;}
			// 身份证
			if(reg.test(this.id) === false){this.$api.msg('身份证输入不合法');return false;}
			// 手机号
			if(!myreg.test(this.phone)){this.$api.msg('请输入正确的手机号码');return false;}
			// 登录账号
			if(!this.username){this.$api.msg('业务员登录账号不能为空');return false;}
			// 登录密码
			if(!myregs.test(this.password)){this.$api.msg('密码需在6-16位数字和字母的组合');return false;}

			this.$request.POST({
				url:this.$api.apiUrl.POST_V6_PARTNER_ADDSALESMAN,
				data:{
					"username": this.username,
		        	"idcrad": this.id,
		        	"password": this.password,
		        	"realname": this.realname,
		        	"mobile": this.phone
				}
			}).then(res=>{
				if(res.code == 'SECCUSS'){
					this.$api.msg(res.msg);
				}else{
					this.$api.msg(res.msg);
				}
			})
		}
	}
}
</script>
<style lang="scss">
.ipts{
	padding: 0 10px;
}
.ipt{
	margin: 28px 0;
	border-bottom: 1px solid rgba(236,99,80,0.5);
}
.btn{
    background-color: rgba(236,99,80,1);
    width: 78vw;
    border: 0;
    color: #fff;
    font-size: 17px;
    border-radius: 30px;
}
</style>