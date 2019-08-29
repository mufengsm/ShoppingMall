const url_prefix = '/';// 开发环境
// var url_prefix = "https://meizi.manogue.com.cn";//线上环境

export default {
  async GET(data_obj) {
    const [error, res] = await uni.request({
      url: url_prefix + data_obj.url,
      method: 'GET',
    });
    return res.data;
  },
  async POST(data_obj) {
    const [error, res] = await uni.request({
      url: url_prefix + data_obj.url,
      method: 'POST',
      data: data_obj.data,
    });
    return res.data;
  },
};
