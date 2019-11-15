export default {
  storage:{
    access_token: uni.getStorageSync('access_token') ? uni.getStorageSync('access_token') : " "
  },
  async GET(dataObj) {
    // 这个函数是为了过滤get请求的data
    const parseQuery = (obj) => {
      let str = ''
      for (let key in obj) {
        const value = typeof obj[key] === 'string'
          ? obj[key]
          : JSON.stringify(obj[key])
        str += '&' + key + '=' + value
      }
      return str.substr(1)
    }
    const [error, res] = await uni.request({
      header:{
        'Token': uni.getStorageSync('access_token') ? uni.getStorageSync('access_token') : " ",
      },
      url: dataObj.url += '?' + parseQuery(dataObj.data),
      method: 'GET',
    });
    return res.data;
  },
  async POST(dataObj) {
    const [error, res] = await uni.request({
      header:{
        'Token': uni.getStorageSync('access_token') ? uni.getStorageSync('access_token') : " ",
      },
      url: dataObj.url,
      method: 'POST',
      data: dataObj.data,
    });
    return res.data;
  },
};

