export default {
  async GET(dataObj) {
    const [error, res] = await uni.request({
      url: dataObj.url,
      method: 'GET',
    });
    return res.data;
  },
  async POST(dataObj) {
    const [error, res] = await uni.request({
      url: dataObj.url,
      method: 'POST',
      data: dataObj.data,
    });
    return res.data;
  },
};

