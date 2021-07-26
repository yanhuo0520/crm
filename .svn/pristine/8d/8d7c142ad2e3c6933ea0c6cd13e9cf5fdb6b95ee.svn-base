// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vant from 'vant';
import 'vant/lib/index.css';
import BaiduMap from 'vue-baidu-map'
import VueAMap from 'vue-amap'
import axios from 'axios'
import 'lib-flexible/flexible';

import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

import {server} from './request/http'
Vue.config.productionTip = false

import {compressImage} from './javascript/compressImg.js' // 压缩图片
Vue.prototype.$compreImg = compressImage

Vue.prototype.$api = server
Vue.prototype.$axios = axios

// 引入公共方法
import {toLogin, isAndroid} from "./javascript/common";
Vue.prototype.$toLogin = toLogin // 跳转登录页面
Vue.prototype.$isAndroid = isAndroid // 判断机型是isAndroid


// Vue.prototype.$isAndroid = ''
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  // ak: 'YOUR_APP_KEY'
  ak: 'smZPCVTuah1zIemCZPgjrNvOlx074Ca0'
})


Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '29158da2f55417cb62242251293b6fcf',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation']
})

Vue.use(Vant);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
