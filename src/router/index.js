import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import customer from '@/pages/customer/index'
import customerGenjin from '@/pages/customer/genjin'
import addCustomer from '@/pages/customer/addCustomer'
import addGlCustomer from '@/pages/customer/addGlCustomer'
import customerDetail from '@/pages/customer/customerDetail'
import tagIndexList from '@/pages/tagIndexList'
import tagList from '@/pages/tagList'
import tagEdit from '@/pages/tagEdit'
import tagAdd from '@/pages/tagAdd'
import tagCustomerSel from '@/pages/tagCustomerSel'
import genjinRecord from '@/pages/genjinRecord'
import genjinDetail from '@/pages/genjinDetail'
import contact from '@/pages/contact/index'
import contactList from '@/pages/contact/contactList'
import contactAdd from '@/pages/contact/contactAdd'
import contactSearch from '@/pages/contact/contactSearch'
import statisticalForm from '@/pages/statisticalForm'
import work from '@/pages/work'
import msg from '@/pages/msg/index'
import msgDetail from '@/pages/msg/msgDetail'
import ucenter from '@/pages/ucenter/index'
import sign from '@/pages/ucenter/sign'
import myCustomer from '@/pages/ucenter/customer'
import perInfo from '@/pages/ucenter/info'
import changePass from '@/pages/ucenter/changepass'
import login from '@/pages/login'
import forgetPass from '@/pages/forgetPass'
import search from '@/pages/search'
import daiban from '@/pages/daiban'
import meeting from '@/pages/meeting/index'
import addMeeting from '@/pages/meeting/addMeeting'
import addSuccess from '@/pages/meeting/addSuccess'
import signUp from '@/pages/meeting/signUp'
import mettingRegLists from '@/pages/meeting/mettingRegLists'
import mettingSignLists from '@/pages/meeting/mettingSignLists'
import mapSearch from '@/pages/mapSearch'
import ccbCustomer from '@/pages/ccbCustomer/index'
import ccbCustomerDetail from '@/pages/ccbCustomer/ccbCustomerDetail'
import ccbSearch from '@/pages/ccbSearch'
import genjinSel from '@/pages/genjinSel'
import contactCcbSel from '@/pages/contactCcbSel'
import dupliCheck from '@/pages/dupliCheck'
import nearBy from '@/pages/nearBy/index'
import siteStatise from '@/pages/siteStatise/index'
import siteStatiseSearch from '@/pages/siteStatise/siteStatiseSearch'
import siteStatiseAdd from '@/pages/siteStatise/siteStatiseAdd' 
import siteStatiseDetail from '@/pages/siteStatise/siteStatiseDetail'
import dailyList from '@/pages/daily/index'
import dailyAdd from '@/pages/daily/add'
import dailyDetail from '@/pages/daily/detail'
import weeklyList from '@/pages/weekly/index'
import weeklyAdd from '@/pages/weekly/add'
import weeklyDetail from '@/pages/weekly/detail'
import trackList from '@/pages/track/index'
import trackListPersonal from '@/pages/track/indexPersonal'
import trackListAdmin from '@/pages/track/indexAdmin'
import trackDetail from '@/pages/track/trackDetail'
import reportSel from '@/pages/reportSel'
import siteAdd from '@/pages/siteAdd'
import addActivity from '@/pages/addActivity'
import activityDetail from '@/pages/activityDetail'
import reportUserList from '@/pages/reportUserList'

import testPage from '@/pages/test' // ????????????

import tagIndex from '@/pages/tag/index' // ???????????????????????????????????????????????????????????????????????????5???
import tagChild3 from '@/pages/tag/tagChild3'
import tagChild4 from '@/pages/tag/tagChild4'
import tagChildLast from '@/pages/tag/tagChildLast'
import tagEditList from '@/pages/tag/tagEditList'
import tagIndexEdit from '@/pages/tag/tagIndexEdit'
import tagIndexAdd from '@/pages/tag/tagIndexAdd'
import tagComList from '@/pages/tag/tagComList'
import trajectory from '@/pages/trajectory'

import kehuIndex from '@/pages/kehu'
import kehuAreaIndex from '@/pages/kehu/area'

// ???????????????
import regionIndex from '@/pages/region/index'

// ????????????
import carList from '@/pages/car/index'
import carListAdmin from '@/pages/car/indexAdmin'
import carAdd from '@/pages/car/add'

// ????????????
import chaiList from '@/pages/chai/index'
import chaiListAdmin from '@/pages/chai/indexAdmin'
import chaiAdd from '@/pages/chai/add'
import chaiDetail from '@/pages/chai/detail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'testPage',
      component: testPage
    },
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        keepAlive: false // ??????????????????
      }
    },
    {
      path: '/customer',
      name: '????????????',
      component: customer,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/customerGenjin',
      name: '????????????',
      component: customerGenjin,
      meta: {
        keepAlive: true,
        isBack: false,
        station_id: '',
        customer_id: '',
        customerName: '',
        cls: '',
        addressSel: '',
        lnglatSel: '',
        site_id: '',
      }
    },
    {
      path: '/addCustomer',
      name: '????????????',
      component: addCustomer,
      meta: {
        keepAlive: true,
        isBack: false,
        linker_id: '',
        linker_name: '',
        addressSel: '',
        lnglatSel: '',
        from: '',
        cls: 1
      }
    },
    {
      path: '/addGlCustomer',
      name: '??????????????????',
      component: addGlCustomer
    },
    {
      path: '/customerDetail',
      name: '????????????',
      component: customerDetail
    },
    {
      path: '/tagIndexList',
      name: '????????????',
      component: tagIndexList
    },
    {
      path: '/tagList',
      name: '????????????????????????',
      component: tagList
    },
    {
      path: '/tagEdit',
      name: '????????????',
      component: tagEdit
    },
    {
      path: '/tagAdd',
      name: '????????????',
      component: tagAdd
    },
    {
      path: '/tagCustomerSel',
      name: '????????????',
      component: tagCustomerSel
    },
    {
      path: '/genjinRecord',
      name: '????????????',
      component: genjinRecord,
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    {
      path: '/genjinDetail',
      name: '????????????',
      component: genjinDetail
    },
    {
      path: '/contact',
      name: '?????????',
      component: contact
    },
    {
      path: '/contactList',
      name: '???????????????',
      component: contactList,
      meta: {
        keepAlive: true,
        isBack: false,
        type: ''
      }
    },
    {
      path: '/contactAdd',
      name: '???????????????',
      component: contactAdd,
      meta: {
        keepAlive: true,
        isBack: false,
        addressSel: '',
        lnglatSel: '',
        from: ''
      }   
    },
    {
      path: '/contactSearch',
      name: '???????????????',
      component: contactSearch,
      meta: {
        keepAlive: true,
        isBack: false,
        type: '',
        keyword: '',
      }
    },
    {
      path: '/statisticalForm',
      name: '????????????',
      component: statisticalForm
    },
    {
      path: '/work',
      name: '??????',
      component: work
    },
    {
      path: '/msg',
      name: '??????',
      component: msg
    },
    {
      path: '/msgDetail',
      name: '????????????',
      component: msgDetail
    },
    {
      path: '/ucenter',
      name: '??????',
      component: ucenter
    },
    {
      path: '/sign',
      name: '????????????',
      component: sign
    },
    {
      path: '/myCustomer',
      name: '????????????',
      component: myCustomer
    },
    {
      path: '/perInfo',
      name: '????????????',
      component: perInfo
    },
    {
      path: '/changePass',
      name: '????????????',
      component: changePass
    },
    {
      path: '/login',
      name: '??????',
      component: login
    },
    {
      path: '/forgetPass',
      name: '????????????',
      component: forgetPass
    },
    {
      path: '/search',
      name: '??????',
      component: search,
      meta: {
        keepAlive: true,
        isBack: false,
        keyword: ''
      }
    },
    {
      path: '/daiban',
      name: '??????',
      component: daiban
    },
    {
      path: '/meeting',
      name: '????????????',
      component: meeting,
    },
    {
      path: '/addMeeting',
      name: '????????????',
      component: addMeeting
    },
    {
      path: '/addSuccess',
      name: '????????????',
      component: addSuccess
    },
    {
      path: '/signUp',
      name: '????????????',
      component: signUp
    },
    {
      path: '/mettingRegLists',
      name: '????????????',
      component: mettingRegLists
    },
    {
      path: '/mettingSignLists',
      name: '????????????',
      component: mettingSignLists
    },
    {
      path: '/mapSearch',
      name: '????????????',
      component: mapSearch
    },
    {
      path: '/ccbCustomer',
      name: '????????????',
      component: ccbCustomer,
      meta: {
        keepAlive: true,
        isBack: false,
        from: '',
        cls: 2
      }
    },
    {
      path: '/ccbCustomerDetail',
      name: '??????????????????',
      component: ccbCustomerDetail
    },
    {
      path: '/ccbSearch',
      name: '??????????????????',
      component: ccbSearch,
      meta: {
        keepAlive: true,
        isBack: false,
        keyword: ''
      }
    },
    {
      path: '/genjinSel',
      name: '????????????????????????',
      component: genjinSel,
      meta: {
        keepAlive: true,
        isBack: false,
        customer_id: '',
        customerName: '',
        addressSel: '',
        lnglatSel: '',
        site_id: '',
        cls: ''
      }
    },
    {
      path: '/contactCcbSel',
      name: '??????????????????',
      component: contactCcbSel
    },
    {
      path: '/dupliCheck',
      name: '??????',
      component: dupliCheck
    },
    {
      path: '/nearBy',
      name: '????????????',
      component: nearBy
    },
    {
      path: '/siteStatiseSearch',
      name: '??????????????????',
      component: siteStatiseSearch,
      meta: {
        keepAlive: true,
        isBack: false,
        keyword: ''
      }
    },
    {
      path: '/siteStatise',
      name: '????????????',
      component: siteStatise,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/siteStatiseAdd',
      name: '??????????????????',
      component: siteStatiseAdd
    },
    {
      path: '/siteStatiseDetail',
      name: '??????????????????',
      component: siteStatiseDetail
    },
    {
      path: '/dailyList',
      name: '????????????',
      component: dailyList,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/dailyAdd',
      name: '????????????',
      component: dailyAdd,
      meta: {
        keepAlive: true,
        isBack: false,
        addressSel: '',
        lnglatSel: ''
      }
    },{
      path: '/reportUserList',
      name: '???/??????????????????',
      component: reportUserList,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/dailyDetail',
      name: '????????????',
      component: dailyDetail
    },
    {
      path: '/reportSel',
      name: '????????????',
      component: reportSel
    },
    {
      path: '/weeklyList',
      name: '????????????',
      component: weeklyList,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/weeklyAdd',
      name: '????????????',
      component: weeklyAdd,
      meta: {
        keepAlive: true,
        isBack: false,
        addressSel: '',
        lnglatSel: ''
      }
    },
    {
      path: '/weeklyDetail',
      name: '????????????',
      component: weeklyDetail
    },
    {
      path: '/trackList',
      name: '????????????',
      component: trackList
    },
    {
      path: '/trackListPersonal',
      name: '????????????(??????)',
      component: trackListPersonal,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/trackListAdmin',
      name: '????????????(??????)',
      component: trackListAdmin,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/trackDetail',
      name: '????????????',
      component: trackDetail
    },
    {
      path: '/siteAdd',
      name: '??????????????????-????????????',
      component: siteAdd
    },{
      path: '/addActivity',
      name: '????????????',
      component: addActivity
    },
    {
      path: '/activityDetail',
      name: '????????????',
      component: activityDetail
    },
    {
      path: '/tagIndex',
      name: '?????????????????????????????????????????????',
      component: tagIndex
    },
    {
      path: '/tagChild3',
      name: '??????????????????????????????',
      component: tagChild3
    },
    {
      path: '/tagChild4',
      name: '??????????????????????????????',
      component: tagChild4
    },
    {
      path: '/tagChildLast',
      name: '??????????????????????????????',
      component: tagChildLast
    },
    {
      path: '/tagEditList',
      name: '??????????????????????????????',
      component: tagEditList
    },
    {
      path: '/tagIndexEdit',
      name: '????????????',
      component: tagIndexEdit
    },
    {
      path: '/tagIndexAdd',
      name: '??????/????????????',
      component: tagIndexAdd
    },
    {
      path: '/tagComList',
      name: '????????????????????????',
      component: tagComList
    },
    {
      path: '/trajectory',
      name: '????????????',
      component: trajectory
    },{
      path: '/kehu',
      name: '????????????',
      component: kehuIndex,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },{
      path: '/kehuAreaIndex',
      name: '????????????',
      component: kehuAreaIndex
    },{
      path: '/region',
      name: '???????????????',
      component: regionIndex
    },{
      path: '/car',
      name: '??????????????????',
      component: carList
    },{
      path: '/carAdmin',
      name: '???????????????????????????',
      component: carListAdmin
    },{
      path: '/carAdd',
      name: '??????????????????',
      component: carAdd
    },
    ,{
      path: '/chaiList',
      name: '??????????????????',
      component: chaiList
    },{
      path: '/chaiListAdmin',
      name: '???????????????????????????',
      component: chaiListAdmin
    },{
      path: '/chaiAdd',
      name: '??????????????????',
      component: chaiAdd
    },{
      path: '/chaiDetail',
      name: '??????????????????',
      component: chaiDetail
    },

    
  ]
})
