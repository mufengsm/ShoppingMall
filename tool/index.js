import Json from '../Json'; // 测试时用的数据
// 调用消息提醒
export const msg = (title, duration = 1500, mask = false, icon = 'none') => {
  if (Boolean(title) === false) {
    return;
  }
  uni.showToast({
    title,
    duration,
    mask,
    icon,
  });
};
// 模拟异步请求数据
export const json = (type) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(Json[type]);
  }, 500);
});
// 关于页面的
export const prePage = () => {
  const pages = getCurrentPages();
  const prePage = pages[pages.length - 2];
  // #ifdef H5
  return prePage;
  // #endif
  return prePage.$vm;
};
