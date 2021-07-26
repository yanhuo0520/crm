import router from '../router'
// 跳转登录页面
export const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        }
    });
}

// 判断机型是android
export const isAndroid = () => {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //判断android
  return isAndroid;
}
