// 定义api接口方便接口更改
// 本地接口
const locaApi = "http://localhost:8888";
// 线上测试接口
const networkApi = "http://meizi.dnat.link";
// 线上正式接口
const formalNetworkApi = "https://meizi.manogue.com.cn";
// 局域网接口
const lanApi = "http://192.168.2.129";
// 商品推荐
export const GET_MERCHANDISE_RECOMMENDATION = locaApi+'/v1/goods/recommend';
// 用户登录
export const POST_USER_LOGIN = locaApi+'/v1/user/login';
// 搜索页面产品信息
export const POST_BRAND_LIBRARY_QUERY = locaApi+'/v4/goods/goods_list';
// 控区控价信息列表
export const POST_BRAND_LIST = locaApi+'/v4/Brands/index';
// 查询品牌
export const POST_QUERY_BRAND = locaApi+'/v4/goods/brand_list';
// 查询分类
export const POST_QUERY_CLASSIFICATION = locaApi+'/v4/goods/cate_list';