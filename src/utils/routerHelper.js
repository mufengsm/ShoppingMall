// 判断路由权限
export const router = () => {
	const TOKEN = uni.getStorageSync('access_token');
	if (!TOKEN){
		uni.showToast({
			url:"请先登录",
			icon:"none"
		})
		uni.navigateTo({
			url:"/pages/mys/login/login"
		})
	}
};