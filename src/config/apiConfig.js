// 定义api接口方便接口更改
// 定义图片地址
export const imgUrl = "https://meizi.manogue.com.cn/static/wap";
// 本地接口
const localApi = "http://localhost:8888";
// 线上测试接口
const networkApi = "http://meizi.pingbbs.com";
// 线上正式接口
const formalNetworkApi = "https://meizi.manogue.com.cn";
// 局域网接口
const lanApi = "http://192.168.2.130/meizi";
// 首页商品推荐
export const GET_MERCHANDISE_RECOMMENDATION = localApi+'/v1/goods/recommend';
// 用户登录
export const POST_USER_LOGIN = lanApi+'/v5/login';
// 搜索页面产品信息
export const POST_BRAND_LIBRARY_QUERY = lanApi+'/v5/goods_list';
// 控区控价信息列表
export const POST_BRAND_LIST = localApi+'/v4/Brands/index';
// 查询品牌
export const POST_QUERY_BRAND = localApi+'/v4/goods/brand_list';
// 查询分类
export const POST_QUERY_CLASSIFICATION = localApi+'/v4/goods/cate_list';
// 商品详情
export const GET_GOODS_INFO = lanApi+'/v5/goods_info';
// 商品评价
export const GET_GOODS_COMMENT = localApi +'/v1/goods/comment_list';