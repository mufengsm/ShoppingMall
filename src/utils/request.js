export default {
  storage:{
    access_token: uni.getStorageSync('access_token') ? uni.getStorageSync('access_token') : " "
  },
  async GET(dataObj) {
    const [error, res] = await uni.request({
      header:{
        'Token': this.storage.access_token,
      },
      url: dataObj.url,
      method: 'GET',
    });
    return res.data;
  },
  async POST(dataObj) {
    const [error, res] = await uni.request({
      header:{
        'Token': this.storage.access_token,
      },
      url: dataObj.url,
      method: 'POST',
      data: dataObj.data,
    });
    return res.data;
  },
};

