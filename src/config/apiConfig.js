// 定义api接口方便接口更改
const locaApi = "http://localhost:8888";
// 商品推荐
export const GET_MERCHANDISE_RECOMMENDATION = locaApi+'/v1/goods/recommend';
// 用户登录
export const POST_USER_LOGIN = locaApi+'/v1/user/login';
// 品牌馆查询产品
export const POST_BRAND_LIBRARY_QUERY = locaApi+'/v4/goods/goods_list';
// 品牌列表
export const POST_BRAND_LIST = locaApi+'/v4/Brands/index';
// 查询品牌
export const POST_QUERY_BRAND = locaApi+'/v4/goods/brand_list';
// 查询分类
export const POST_QUERY_CLASSIFICATION = locaApi+'/v4/goods/cate_list';