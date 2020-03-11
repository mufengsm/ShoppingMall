<template>
    <view>
        <view class="formtable">
            <view class="logintitle">
                <view class="bigtitle_words">手机号登录</view>
                <view class="font-ml">若您是首次登录本香世界，请使用验证码登录</view>
            </view>
            <!-- 手机号输入 -->
            <view class="phoneinput">
                <text class="font-l">手机号码</text>
                <input class="font-l phone_cubeinput" :maxlength="11" placeholder="请填写您的手机号码" />
            </view>
            <!-- 验证码 -->
            <view class="paswormsm">
                <view class="flex msmcode full-height full-width flex-alin-center">
                    <view class="phoneinput">
                        <text class="font-l">验证码</text>
                        <input
                            class="font-l phone_cubeinput"
                            :maxlength="11"
                            placeholder="请填写您的验证码"
                        />
                    </view>
                    <!-- <view class="btn getmsmcodebtn" @click="getyzm">获取验证码</view> -->
                </view>
            </view>
            <!-- 切换验证模式 -->
            <view class="flex changemode">
                <view class="flex-item">
                    <text @click="changeloginkind">使用密码登录</text>
                </view>
				<view class="flex-item">
                    <text @click="changeloginkind">忘记密码</text>
                </view>
            </view>
            <!-- 勾选条项18岁 -->
            <view class="checkbox_low">
				<view class="research_radio_in">
					<view class="checkbox"></view>我已年满18周岁
				</view>
				<view class="research_radio_in">
					<view class="checkbox"></view>我已阅读并同意《用户服务协议》
				</view>
            </view>
        </view>
    	<view class="subform btn align-center font-ml" @click="login">登录</view>
    </view>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style lang="scss">
@import "./login.scss"
</style>
