import axios from 'axios';
import qs from 'QS'

// 使用vant toast做消息提醒
import {
	Toast
} from 'vant';
import router from '../router'

axios.defaults.timeout = 30000;
axios.defaults.baseURL ='http://crm.xfd365.com/user';
// axios.defaults.baseURL ='http://www.crm.com/index.php/user'; // 林浩本地地址
// axios.defaults.baseURL ='http://crm.com/index.php/user'; // 陆宇辰本地地址
// axios.defaults.baseURL ='http://172.168.0.81/crm/index.php/user'; // 陆宇辰本地地址


//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    const token = localStorage.getItem('token')
    config.data = qs.stringify(config.data);
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
    if(token){
      config.params = {'token':token}
    }else{
      toLogin()
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

/**提示函数
 * 禁止点击蒙层、显示一秒后关闭 */
const tip = msg => {
	Toast({
		message: msg,
		duration: 1000,
		forbidClick: true
	});
}

/**  跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面*/
const toLogin = () => {
	router.replace({
		path: '/login',
		query: {
			redirect: router.currentRoute.fullPath // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
		}
	});
}

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
	//接收到响应数据并成功后的一些共有的处理，关闭loading等
	// return response
	if (response.status === 200) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(response);
	}
}, error => {
	/***** 接收到异常响应的处理开始 *****/
	if (error && error.response) {
		// 1.公共错误处理
		// 2.根据响应码具体处理
		switch (error.response.status) {
			case 401: // 401: 未登录
				toLogin();
				break;
			case 403: // 403 token过期
				tip('登录过期，请重新登录');
				Cookies.remove('token'); // 清除token
				setTimeout(() => {
					toLogin();
				}, 1000);
				break;
			case 404:
				tip('请求的资源不存在')
				Promise.reject(response);
				break;
      case 500:
        tip('服务器异常')
		Promise.reject(response);
        break;
			default:
				tip(`连接错误${error.response.status}`)
		}
	}else if(error.message.indexOf('Network') != -1){
		tip('网络异常')
	}else if(error.message.indexOf('timeout') != -1){
		tip('请求超时')
	}else{
		// 超时处理
		if (JSON.stringify(error).includes('timeout')) {
			Toast({
				message: '服务器响应超时，请刷新当前页',
				duration: 1500,
				forbidClick: true
			})
		}
		tip('连接服务器失败')
	}
	// tip(error.message)


	/***** 处理结束 *****/
	//如果不需要错误处理，以上的处理过程都可省略
	return Promise.resolve(error.response)
})


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(res => {
            resolve(res.data);
          },err => {
            reject(err)
          })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}


export const server = {
  // 登录
  login:function(paramObj){
    return post('/index/login',paramObj)
  },
  // 修改密码
  changePass:function(paramObj){
    return post('/user/changePass',paramObj)
  },
  // 上传水印拍照(废弃)
  // signUploadImg:function(paramObj){
  //   return post('/base/signUploadImg',paramObj)
  // },
  // base64转线上地址
  base64Img:function(paramObj){
    return post('/base/base64',paramObj)
  },
  // 新增/更新客户信息
  stationSave:function(paramObj){
    return post('/station/save',paramObj)
  },
  // 新增/更新关联客户信息
  linkStationSave:function(paramObj){
    return post('/station/guansave',paramObj)
  },
  // 客户列表
  stationList:function(paramObj){
    return post('/station/lists',paramObj)
  },
  // 关联客户列表
  linkStationList:function(paramObj){
    return post('/station/guanlian_detail',paramObj)
  },
  // 客户详情 暂时不用
  // stationDetail:function(paramObj){
  //   return post('/station/detail',paramObj)
  // },
  // 删除客户
  stationDel:function(paramObj){
    return post('/station/delete',paramObj)
  },
  // 客户跟进动态
  stationGenjin:function(paramObj){
    return post('/follow/lists',paramObj)
  },
  // 客户跟进
  stationFollow:function(paramObj){
    return post('/follow/add',paramObj)
  },
  // 客户跟进动态详情   暂时不用
  // stationFollowDetail:function(paramObj){
  //   return post('/follow/detail',paramObj)
  // },
  // 上传图片
  // stationUpload:function(paramObj){
  //   return post('/base/uploadImg',paramObj)
  // }
  // 个人信息
  userInfo:function(paramObj){
    return post('/user/user_info',paramObj)
  },
  // 修改个人信息
  userUpdate:function(paramObj){
    return post('/user/update_data',paramObj)
  },
  // 员工列表
  userList:function(paramObj){
    return post('/user/user_lists',paramObj)
  },
  // 消息列表
  messageList:function(paramObj){
    return post('/user/message_lists',paramObj)
  },
  // user_message
  userMessage:function(paramObj){
    return post('/user/user_message',paramObj)
  },
  // 签到列表
  signList:function(paramObj){
    return post('/sign/lists',paramObj)
  },
  // 签到
  signIn:function(paramObj){
    return post('/sign/add',paramObj)
  },
  // 检查token
  checkToken:function(paramObj){
    return post('/index/checkToken',paramObj)
  },
  // 获取验证码
  getCode:function(paramObj){
    return post('/index/get_code',paramObj)
  },
  // 忘记密码
  forgetPassword:function(paramObj){
    return post('/index/forget_password',paramObj)
  },
  // 验证忘记密码验证码
  checkCode:function(paramObj){
    return post('/index/check_code',paramObj)
  },
  // 添加待办
  addTask:function(paramObj){
    return post('/task/add',paramObj)
  },
  // 会议列表
  mettingLists:function(paramObj){
    return post('/metting/lists',paramObj)
  },
  // 新增会议
  mettingAdd:function(paramObj){
    return post('/metting/add',paramObj)
  },
  // 会议详情
  mettingDetail:function(paramObj){
    return post('/index/metting_detail',paramObj)
  },
  // 报名
  mettingRegAdd:function(paramObj){
    return post('/index/metting_reg_add',paramObj)
  },
  // 报名成功详情
  mettingRegDetail:function(paramObj){
    return post('/index/metting_reg_detail',paramObj)
  },
  // 生成二维码
  getQrcode:function(paramObj){
    return post('/index/getQrcode',paramObj)
  },
  // 报名列表
  mettingRegLists:function(paramObj){
    return post('/index/metting_reg_lists',paramObj)
  },
  // 签到列表
  mettingSignLists:function(paramObj){
    return post('/index/metting_sign_lists',paramObj)
  },
  // 建行客户列表
  ccbCustomerLists:function(paramObj){
    return post('/customer/lists',paramObj)
  },
  // 建行客户拜访数据列表
  ccbCustomerBaiFangLists:function(paramObj){
    return post('/customer/customer_lists',paramObj)
  },
  // 建行客户拜访数据列表
  ccbCustomerCahong:function(paramObj){
    return post('/customer/customer_select_lists',paramObj)
  },
  // 建行客户详情
  ccbCustomerDetail:function(paramObj){
    return post('/customer/detail',paramObj)
  },
  // 添加联系人
  addContact:function(paramObj){
    return post('/tag/linker_add',paramObj)
  },
  // 我的标签
  contactTagList:function(paramObj){
    return post('/tag/lists',paramObj)
  },
  // 联系人列表
  contactList:function(paramObj){
    return post('/tag/linker_lists',paramObj)
  },
  // 联系人详情
  contactDetail:function(paramObj){
    return post('/tag/detail',paramObj)
  },
  // 站点统计列表
  siteStatiseList:function(paramObj){
    return post('/site/site_lists',paramObj)
  },
  // 站点统计添加
  siteStatiseAdd:function(paramObj){
    return post('/site/site_add',paramObj)
  },
  // 站点统计详情
  siteStatiseDetail:function(paramObj){
    return post('/site/detail',paramObj)
  },
  // 附近客户列表
  nearbyList:function(paramObj){
    return post('/customer/nearby_list',paramObj)
  },
  // 新增标签----对不存在的标签进行添加标签和客户选择添加)
  tagAdd:function(paramObj){
    return post('/customertag/add',paramObj)
  },
  // 删除标签---根据标签ID删除标签
  tagDelete:function(paramObj){
    return post('/customertag/delete',paramObj)
  },
  // 修改客户标签
  tagUpdate:function(paramObj){
    return post('/customertag/update',paramObj)
  },
  // 所有标签列表---查询所有标签的列表
  tagList:function(paramObj){
    return post('/customertag/lists',paramObj)
  },
  // 客户标签追加联系人-----对已存在的标签进行客户追加)
  tagUserAdd:function(paramObj){
    return post('/customertag/tag_user_add',paramObj)
  },
  // 客户标签列表----查询0,1,2状态下的所有客户
  tagCustomerLists:function(paramObj){
    return post('/customer/tag_lists',paramObj)
  },
  // 标签联系人列表--查询列表----根据客户类型（0,1,2）和标签ID查找联系人
  tagUserList:function(paramObj){
    return post('/customertag/tag_user_lists',paramObj)
  },
  // 标签联系人列表--删除某个人
  tagUserDelete:function(paramObj){
    return post('/customertag/tag_user_delete',paramObj)
  },
  // 标签联系人列表--删除多个人
  tagUserDeleteAll:function(paramObj){
    return post('/customertag/tag_user_delete_all',paramObj)
  },
  // 编辑联系人标签---在客户详情页面编辑标签
  tagUserUpdate:function(paramObj){
    return post('/customertag/tag_user_update',paramObj)
  },
  // 时间列表
  timeLists:function(paramObj){
    return post('/report/time_lists',paramObj)
  },
  // 日程轨迹列表
  reportLogList:function(paramObj){
    return post('/report/log_list',paramObj)
  },
  // 添加周报/日报
  reportAdd:function(paramObj){
    return post('/report/add',paramObj)
  },
  // 查询当天日报
  report_search:function(paramObj){
    return post('/report/report_search',paramObj)
  },
  // 日报/周报列表
  reportLists:function(paramObj){
    return post('/report/lists',paramObj)
  },
  // 差旅费列表导出
  travel_export:function(paramObj){
    return post('travel/travel_export',paramObj)
  },
  // 日报/报详情
  reportDetail:function(paramObj){
    return post('/report/detail',paramObj)
  },
  // 日报周报汇报对象
  reportUserSel:function(paramObj){
    return post('/report/user_lists',paramObj)
  },
  // 日报/周报头部数据统计
  reportReport:function(paramObj){
    return post('/report/report',paramObj)
  },
  // 点击电话次数
  dialNum:function(paramObj){
    return post('/report/dial_num',paramObj)
  },
  // 查询所有二级分行
  secondBank:function(paramObj){
    return post('/customer/get_secondBank',paramObj)
  },
  // 跟进详情
  followDetail:function(paramObj){
    return post('/follow/detail',paramObj)
  },
  // 统计签到次数---当天
  countSignToday:function(paramObj){
    return post('/sign/countSign',paramObj)
  },
  // 添加组织活动
  addActivity:function(paramObj){
    return post('/activity/add',paramObj)
  },
  // 根据id查询组织详情
  activity_detail:function(paramObj){
    return post('/activity/activity_detail',paramObj)
  },
  // 修改我的客户详情手机号
  phoneMod:function(paramObj){
    return post('/customer/phoneMod',paramObj)
  },
  // test
  test:function(paramObj){
    return post('/user/test',paramObj)
  },
  // 追踪轨迹列表
  userTrail:function(paramObj){
    return post('/follow/user_trail',paramObj)
  },
  // 追踪轨迹日期
  trailDate:function(paramObj){
    return post('/follow/trail_date',paramObj)
  },
  // 客户列表(通讯录模式)
  listsAll:function(paramObj){
    return post('/station/lists_all',paramObj)
  },
  // 客户列表---所有客户
  customerAll:function(paramObj){
    return post('/customer/customer_all',paramObj)
  },
  // 获取site_id
  getSiteId:function(paramObj){
    return post('/site/get_site_id',paramObj)
  },
  // 移交客户
  transfer:function(paramObj){
    return post('/station/transfer',paramObj)
  },
  // 区域管理员业务统计
  followStatistical:function(paramObj){
    return post('/follow/statistical',paramObj)
  },
  // 区域管理员客户列表
  listsAllRegion:function(paramObj){
    return post('/station/lists_all_region',paramObj)
  },
  // 行车里程图片添加编辑
  carSave:function(paramObj){
    return post('/car/save',paramObj)
  },
  // 行车里程图片列表
  carList:function(paramObj){
    return post('/car/lists',paramObj)
  },
  // 行车里程图片详情
  carDetail:function(paramObj){
    return post('/car/detail',paramObj)
  },
  // 行车里程图片查询
  carSearch:function(paramObj){
    return post('/car/search',paramObj)
  },
  // 上传车辆图片和里程数
  travel_expense_save:function(paramObj){
    return post('/travel/travel_expense_save',paramObj)
  },
  // 差旅费查询
  travel_expense_search:function(paramObj){
    return post('/travel/travel_expense_search',paramObj)
  },
  // 差旅费详情
  travel_expense_detail:function(paramObj){
    return post('/travel/travel_expense_detail',paramObj)
  },
  // 差旅费列表
  travel_expense_lists:function(paramObj){
    return post('/travel/travel_expense_lists',paramObj)
  },


  // 区域员工列表
  userLIstRegion:function(paramObj){
    return post('/user/user_lists_region',paramObj)
  },
  // 区域客户列表
  listAllRegion:function(paramObj){
    return post('/station/lists_all_region',paramObj)
  },
  // 业务统计,根据人员查询
  statisticalUser:function(paramObj){
    return post('/follow/statistical_user',paramObj)
  },
  // 客户所有跟进的人
  followUserLists:function(paramObj){
    return post('/follow/follow_user_lists',paramObj)
  },

  // 差旅费查询
  travelExpenseSearch:function(paramObj){
    return post('/report/travel_expense_search',paramObj)
  },
   // 添加编辑差旅费
   travelExpenseAdd:function(paramObj){
    return post('/report/travel_expense_add',paramObj)
  },
   // 差旅费详情
   travelExpenseDetail:function(paramObj){
    return post('/report/travel_expense_detail',paramObj)
  },
   // 差旅费列表
   travelExpenseLists:function(paramObj){
    return post('/report/travel_expense_lists',paramObj)
  },
  // 查询版本号
   version:function(paramObj){
    return post('/index/version',paramObj)
  },
  // 新改客户详情
  stationDetail:function(paramObj){
    return post('/station/station_detail',paramObj)
  },
}
