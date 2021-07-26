<template>
  <div class="regionIndex">
    <div class="topNav">
      <p class="title" @click="leftBack">
        <img src="../../images/goback.png" alt />
        <span>区域管理员</span>
      </p>
      <div class="desc">
        <img src="../../images/avatar1.png" />
        <div class="desc-cont">
          <p class="name">{{userName}}<span class="tip">区域管理员</span></p>
          <p class="company">信服达科技有限公司<span v-if="province == 130000">河北</span><span v-if="province == 410000">河南</span>分公司</p>
        </div>
       
      </div>
    </div>
    <van-tabs v-model="active" title-active-color="#1C92FF" @click="onClick">
      <van-tab title="业务统计" class="nav-tab1">
        <div class="searchCont1">
          <div class="searchDiv" @click="dateShow1 = true">
            <input type="text" placeholder="开始日期" v-model="lat_time" readonly />
            <img src="../../images/date2.png" alt />
          </div>
          <div class="andLine">-</div>
          <div class="searchDiv" @click="dateShow2 = true">
            <input type="text" placeholder="结束日期" v-model="end_time" readonly />
            <img src="../../images/date2.png" alt />
          </div>
          <div class="searchBtn" @click="searchDate()">搜索</div>
        </div>
          <div class="ulDiv">
            <div>
              <span>{{followStatisDetail.customer_all ? followStatisDetail.customer_all: 0}}</span>
              <span>管理客户数</span>
            </div>
            <div>
              <span>{{followStatisDetail.station ? followStatisDetail.station: 0}}</span>
              <span>累积新增客户数</span>
            </div>
            <div>
              <span>{{followStatisDetail.station_today ? followStatisDetail.station_today: 0}}</span>
              <span>今日新增客户</span>
            </div>
            <div>
              <span>{{followStatisDetail.follow ? followStatisDetail.follow: 0}}</span>
              <span>今日跟进客户</span>
            </div>
            <div>
              <span>{{followStatisDetail.tel_num ? followStatisDetail.tel_num: 0}}</span>
              <span>打电话次数</span>
            </div>
            <div>
              <span>{{followStatisDetail.customer ? followStatisDetail.customer: 0}}</span>
              <span>拜访业主户数</span>
            </div>
            <div>
              <span>{{followStatisDetail.bank ? followStatisDetail.bank: 0}}</span>
              <span>拜访银行客户个数</span>
            </div>
            <div>
              <span>{{followStatisDetail.activity ? followStatisDetail.activity: 0}}</span>
              <span>组织活动次数</span>
            </div>           
          </div>
        
      </van-tab>
      <van-tab title="客户列表" class="nav-tab2">
        <div class="main-title">
          <p>共查询到{{totalNum}}条相关信息</p>
          <div class="searchDiv" @click="selectShow = true">
            <input type="text" placeholder="选择管辖人员" v-model="selectName" readonly />
            <div class="arrow"></div>
          </div>
        </div>
        <template v-if="lists!=''">
          <div class="listCont" v-for="(item, index) in lists" :key="index" >
            <div class="top" v-if="!ifbatchTrans" >
              <div style="display: flex;align-items: center;">
                <img src="../../images/avatar1.png" />
                <p class="name">{{item.name}}</p>
              </div>
              
              <div>
                <a :href="'tel:' + item.mobile" class="phone" @click.stop>
                  <img src="../../images/tel.png" alt />
                </a>
                <img class="transfer" @click.stop="onlySelect(item.name, item.id)" src="../../images/change.png" alt />
              </div>
            </div>

            <van-checkbox
              v-if="ifbatchTrans"
              :name="item.id"
              v-model="item.tag"
              @click="checkSel(item.id, item.name)"
            >
            <div style="display: flex;align-items: center;">
                <img src="../../images/avatar1.png" />
                <p class="name">{{item.name}}</p>
              </div>
            </van-checkbox>
          </div>
        </template>
        <div v-else-if="lists == '' && selectName && !loading" class="zanwu">
          <span>暂无<span class="tip">"{{selectName}}"</span>的客户</span>
        </div>
        <div v-else class="zanwu">
          <img src="../../images/zanwu.png" alt />
          <span>暂无内容</span>
        </div>
        <div class="btnCont">
          <van-button icon="http://sc.xfd365.com/crmImages/change.png" round type="info" class="ifchangeBtn" v-if="!ifbatchTrans" @click.stop="ifbatchTrans = true">批量转移客户</van-button> 
        </div>
          
          <div class="showAllBtn" v-if="ifbatchTrans">
            <van-button icon="http://sc.xfd365.com/crmImages/change.png" round type="info" class="changeBtn" @click.stop="sureTransfer()">确定<span v-if="selectNum > 0">({{selectNum}})</span></van-button> 
            <van-button round type="info" class="cancelBtn" @click.stop="cancelTransfer()">取消</van-button>
          </div>
          
      </van-tab>
      <van-tab title="员工动态" class="nav-tab3">
        <div class="searchCont2">
          <div class="searchDiv" @click="selectTab3Show = true">
            <input type="text" placeholder="选择人员" v-model="tab3Name" readonly />
            <div class="arrow"></div>
          </div>
          <div class="searchInput" @click="dateShow3 = true">
            <input type="text" placeholder="请选择搜索日期" v-model="keywordDate" readonly />
            <img src="../../images/date1.png" alt  />
          </div>
        </div>
        <van-steps direction="vertical" inactive-icon="clock-o" :active="-1" v-if="logList != ''">
          <van-step v-for="(item, index) in logList" :key="index">
             <p class="time">{{item.add_time}}
               <span v-if="item.genre === 'sign'">考勤<span v-if="item.signtype === 3 || item.signtype === 4">签退</span><span v-else>签到</span></span>
               <span v-if="item.genre === 'follow'">拜访/跟进了<span v-if="item.cls === 1">客户</span><span v-if="item.cls === 2">业主</span>{{item.name}}</span>
               <span v-if="item.genre === 'report'">上传了{{item.reportName}}</span>
             </p>
          </van-step>
        </van-steps>
        <div v-if="(!logList || logList.length == 0) && !loading3" class="zanwu">
          <img src="../../images/zanwu.png" alt />
          <span>暂无内容</span>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 选择管辖人员 -->
    <van-action-sheet v-model="selectShow" title="选择管辖人员">
        <ul class="actionCont">
            <li v-for="(item1, index1) in selectArray" :key="index1" @click="selectPop(item1.user_id, item1.user_name)">{{item1.user_name}}
              <img v-if="item1.user_id == select_show_id && select_show_id != 0" class="selectImg" src="../../images/select.png" alt /></li>
        </ul>
    </van-action-sheet>

    <!-- 选择移交人 -->
    <van-action-sheet v-model="transferShow" title="选择管辖人员">
        <ul class="actionCont">
            <li v-for="(item2, index2) in selectArray" :key="index2" @click="transferPop(item2.user_id, item2.user_name)">{{item2.user_name}}
              <img v-if="(item2.user_id == select_transfer_id && select_transfer_id != 0) || (item2.user_id == select_show_id && select_show_id != 0)" class="selectImg" src="../../images/select.png" alt /></li>
        </ul>
    </van-action-sheet>

    <!-- 选择动态搜索人员 -->
    <van-action-sheet v-model="selectTab3Show" title="选择管辖人员">
        <ul class="actionCont">
            <li v-for="(item3, index3) in selectArray" :key="index3" @click="dongPop(item3.user_id, item3.user_name)">{{item3.user_name}}
              <img v-if="item3.user_id == select_dong_id && select_dong_id != 0" class="selectImg" src="../../images/select.png" alt /></li>
        </ul>
    </van-action-sheet>
      <van-overlay :show="dateShow1" @click="closeDateTime1" />
      <van-datetime-picker
        v-model="currentDate1"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        v-show="dateShow1"
        @confirm="handleTime1"
        @cancel="closeDateTime1"
      />

    <van-overlay :show="dateShow2" @click="closeDateTime2" />
      <van-datetime-picker
        v-model="currentDate2"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        v-show="dateShow2"
        @confirm="handleTime2"
        @cancel="closeDateTime2"
      />
    <van-overlay :show="dateShow3" @click="closeDateTime3" />
      <van-datetime-picker
        v-model="currentDate3"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        v-show="dateShow3"
        @confirm="handleTime3"
        @cancel="closeDateTime3"
      />
  </div>
</template>
<script>
export default {
  name: "regionIndex",
  data() {
    return {
      userName: localStorage.getItem("userName"),
      province: localStorage.getItem("province"),
      active: 0,
      lat_time: '',
      currentDate1: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      dateShow1: false,

      end_time: '',
      currentDate2: new Date(),
      dateShow2: false,
      followStatisDetail: '',

      selectShow: false,
      select_show_id: localStorage.getItem("userId"),
      selectName: '',
      selectArray: [],

      loading: 1,
      totalNum: 0,
      page: 1,
      pageSize: 20,
      totalPage: 1,
      lists: [],
      ifbatchTrans: false, // 是否批量移交

      select_transfer_id: localStorage.getItem("userId"),
      transferShow: false,
      selectIdArray: [],
      selectNameArray: [], // 选择客户名称数组
      selectNum: 0,
      tipName: '',

      loading3: false,
      selectTab3Show: false,
      currentDate3: new Date(),
      dateShow3: false,
      keywordDate: '',
      tab3Name: localStorage.getItem("userName"),
      select_dong_id: localStorage.getItem("userId"),
      logList: []

    };
  },
  mounted() {
    window.leftBack = this.leftBack; // Android原生返回按钮执行leftBack()方法
    document.documentElement.scrollTop = 0;
    window.addEventListener("scroll", this.scrollBottomRegion);
    let d = new Date();
    let nowDate = d.getFullYear() + "-" + 
        ((d.getMonth()<9)? ('0'+(d.getMonth() + 1)) : (d.getMonth() + 1)) + "-" + 
        ((d.getDate()<10)? ('0'+ d.getDate()): d.getDate());
    this.lat_time = nowDate
    this.end_time = nowDate
    this.keywordDate = nowDate
    // 业务统计
    this.searchDate();
    // 选择人员
    this.getUserList();
  },
  methods: {
    leftBack(){
      if(this.active == 1){
        if(this.select_id != localStorage.getItem("userId") || this.ifbatchTrans){
          this.ifbatchTrans = false
          this.selectIdArray = []
          this.selectNameArray = []
          this.selectNum = 0
          this.tipName = ''
          this.select_id = localStorage.getItem("userId")
          this.selectName = ''
          this.page = 1
          this.lists = []
          this.getList()
        }else{
          this.$router.go(-1) 
        }
      }else{
        this.$router.go(-1)   
      }
      
    },
    onClick(){
      if(this.active == 0){
        this.searchDate();
      }else if(this.active == 1){
        this.getList();
      }else if(this.active == 2){
        this.getLog();
      }
    },
    handleTime1(value) {
      var d = new Date(value);
      var datetime = d.getFullYear() + "-" + 
        ((d.getMonth()<9)? ('0'+(d.getMonth() + 1)) : (d.getMonth() + 1)) + "-" + 
        ((d.getDate()<10)? ('0'+ d.getDate()): d.getDate());

      if(datetime > this.end_time && this.end_time){
        this.$toast("开始时间大于结束时间")
        return
      }
      this.currentDate1 = datetime;
      this.lat_time = datetime;
      this.dateShow1 = false
    },
    closeDateTime1(){
      this.dateShow1 = false
      this.currentDate1 = new Date()
    },
    handleTime2(value) {
      var d = new Date(value);
      var datetime = d.getFullYear() + "-" + 
        ((d.getMonth()<9)? ('0'+(d.getMonth() + 1)) : (d.getMonth() + 1)) + "-" + 
        ((d.getDate()<10)? ('0'+ d.getDate()): d.getDate());
        

        if(datetime < this.lat_time && this.lat_time){
          this.$toast("结束时间小于开始时间")
          return
        }
      this.currentDate2 = datetime;
      this.end_time = datetime;
      this.dateShow2 = false
    },
    closeDateTime2(){
      this.dateShow2 = false
      this.currentDate2 = new Date()
    },
    handleTime3(value) {
      var d = new Date(value);
      var datetime = d.getFullYear() + "-" + 
        ((d.getMonth()<9)? ('0'+(d.getMonth() + 1)) : (d.getMonth() + 1)) + "-" + 
        ((d.getDate()<10)? ('0'+ d.getDate()): d.getDate());
 
      this.currentDate3 = datetime;
      this.keywordDate = datetime;
      this.dateShow3 = false
      this.getLog();
    },
    closeDateTime3(){
      this.dateShow3 = false
      this.currentDate3 = new Date()
    },
    // 业务统计
    searchDate(){
      if(this.active == 0){
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0,
        });
      }
      this.$api.followStatistical({starttime: this.lat_time + ' 00:00:00', endtime: this.end_time + ' 23:59:59'}).then(res => {
        this.$toast.clear()
        if (res.errno === 0) {
          this.followStatisDetail = res.data;
        }
      }).catch(err =>{
         this.$toast.clear()
      });
    },
    
    // 单个移交
    onlySelect(name, id){
      this.transferShow = true;
      this.selectIdArray = []
      this.selectNameArray = []
      this.tipName = ''

      this.selectIdArray.push(id);
      this.selectNameArray.push(name);

    },
    // 批量选择移交人
    checkSel(id, name){
        let index = this.selectIdArray.indexOf(id);
        let nameIndex = this.selectNameArray.indexOf(name);
        if(index == -1){
          this.selectIdArray.push(id)
        }else{
          this.selectIdArray.splice(index, 1);
        }

        if(nameIndex == -1){
          this.selectNameArray.push(name)
        }else{
          this.selectNameArray.splice(nameIndex, 1);
        }

        this.selectNum = this.selectIdArray.length; 
    },
    // 确定移交
    sureTransfer(){
      if(this.selectIdArray.length > 0){
        this.transferShow = true
      }else{
        this.$toast("请先选择移交人")
      }
      
    },
    // 取消批量移交
    cancelTransfer(){
      this.ifbatchTrans = false
      this.selectIdArray = []
      this.selectNameArray = []
      this.selectNum = 0
      this.tipName = ''
      this.lists.forEach(ele=>{
        if(ele.tag == 1){
          ele.tag = 0
        }
      })
    },
    // 管辖人员列表
    getUserList() {
      this.$api.userList({keyword: ''}).then(res => {
        if (res.errno === 0) {
          this.selectArray = res.data;
        }
      });
    },
    // 选择管辖人员
    selectPop(user_id, user_name){
      this.select_show_id = user_id
      this.selectName = user_name
      this.selectShow = false
      this.page = 1
      this.lists = []
      this.getList()
    },
    // 移交
    transferPop(user_id, user_name){
      let selectIdString = '';
      this.selectIdArray.forEach(ele=>{  // 转换成字符串传给后台
        selectIdString += ele + ','
      })
      if(selectIdString.lastIndexOf(',') > -1){ // 去掉最后一个逗号
        selectIdString = selectIdString.substr(0,selectIdString.length-1)
      }
     
      let selectNameString = '';
      if(this.selectNameArray.length > 3){ // 只取前三个人的名字传给后台
        for(let i=0; i<3; i++){
          selectNameString += this.selectNameArray[i] + ','
          this.tipName = selectNameString.substr(0,selectNameString.length-1) + '…'
        }
      }else{
        this.selectNameArray.forEach(ele=>{  // 转换成字符串传给后台
          selectNameString += ele + ','
          this.tipName = selectNameString.substr(0,selectNameString.length-1)
        })
      }
      if(selectNameString.lastIndexOf(',') > -1){ // 去掉最后一个逗号
        selectNameString = selectNameString.substr(0,selectNameString.length-1)
      }

      if(localStorage.getItem("userId") == user_id || user_id == this.select_show_id){
        this.$toast("已是我的客户！")
      }else{
        this.$dialog.confirm({
          title: '标题',
          message: '确定把客户-【' + this.tipName + '】移交给【' + user_name + '】'
        }).then(()=>{
          this.$api.transfer({station_id: selectIdString, name: selectNameString, user_id: user_id}).then(res => {
            this.transferShow = false
            if (res.errno === 0) {
              this.$toast("移交成功");
              this.ifbatchTrans = false
              this.page = 1;
              this.lists = []
              this.getList();
              this.selectIdArray = []
              this.selectNameArray = []
              this.totalNum = 0
              this.tipName = ''
            }else{
              this.$toast(res.data.msg)
            }
          });
        }).catch(()=>{
          // on cancel
        })
      }

    },
    scrollBottomRegion(e) {
      let that = this;
      var scrollTop =
        e.target.documentElement.scrollTop || e.target.body.scrollTop;

      let clientHeight = document.documentElement.clientHeight; /*当前可视高度*/
      let scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ); /*文档完整的高度*/
      if (
        scrollHeight - clientHeight - scrollTop <= 0 &&
        that.page < that.totalPage
      ) {
        that.page += 1;
        that.loading = 1;
        that.getList();
      }
    },
    getList() {
      var that = this;
      let data = {}
        data.user_id = this.select_show_id
        data.page = that.page
        data.size = that.pageSize
        if(this.active == 1){
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
          }); 
        }
      this.$api.listsAllRegion(data).then(res => {
        this.$toast.clear()
          that.totalPage = res.total_page;
          that.totalNum = res.count
          if (res.errno === 0) {
            if (that.page == 1) {
              that.loading = 0;
              that.lists = res.data;
            } else if (res.data.length > 0) {
              that.lists.push(...res.data);
              if (res.data.length < that.pageSize ||(res.data.length == that.pageSize && that.page == that.totalPage)) {
                that.loading = 0;
              }
            } else if (that.page == that.totalPage) {
              that.loading = 0;
            }

          } else {
            that.loading = 0;
            that.totalNum = 0
            that.lists = []
            this.$toast(res.errmsg);
          }
        }).catch(err =>{
         this.$toast.clear()
      });
    },
    dongPop(user_id, user_name){
      this.selectTab3Show = false
      this.tab3Name = user_name
      this.select_dong_id = user_id
      this.getLog();
    },
    getLog(){
      let data={}
      this.logList = []
      if(this.loading3) return
      this.loading3 = true
      data.lat_time = this.keywordDate
      data.end_time = this.keywordDate
      data.user_id = this.select_dong_id
      if(this.active == 2){
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0,
        });
      }
      this.$api.reportLogList(data).then(res=>{
        this.loading3 = false
        this.$toast.clear()
        if(res.errno === 0){
          this.logList = res.data
        }
      }).catch(err =>{
        this.$toast.clear()
         this.loading3 = false
      })
    },
  },
  destroyed() {
      window.removeEventListener('scroll', this.scrollBottomRegion);//监听页面滚动事件
    }
};
</script>
<style lang="less">
.regionIndex {
  min-height: calc(100% - 130px);
  padding-top: 130px;
  background: #f5f5f5;
  .topNav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background: url(../../images/topBg.jpg) no-repeat;
    width: 100%;
    height: 130px;
    background-size: 100% 130px;
    .title{
      height: 50px;
      line-height: 18px;
      color: #fff;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 16px;
      img {
        width: 10px;
        height: 16px;
        margin-right: 10px;
      }
    }
    .desc{
      display: flex;
      padding: 15px;
      img{
        width: 40px;
        height: 40px;
        border: 2px solid #fff;
        border-radius: 50%;
      }
      .desc-cont{
        padding-left: 10px;
        .name{
          font-size: 14px;
          color: #fff;
          display: flex;
          .tip{
            font-size: 12px;
            margin-left: 2px;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid #FFFFFF; 
            padding: 0 5px;
            transform: scale(0.9);
          }
        }
      }
      .company{
        margin-top: 4px;
        color: #B2DAFF;
        font-size: 13px;
      }
    }
  }
  .van-tabs__line {
    background-color: transparent;
  }
  .van-tabs{
    .van-tabs__wrap{
      position: fixed;
      left: 0;right: 0; z-index: 1;
      border-bottom: 1px solid #eeeeee;
    }
    .van-tabs__content{
      padding-top: 44px;
    }
    .nav-tab2{
      padding-top: 46px;
      padding-bottom: 70px;
    }
    .ulDiv {
      margin-top: 15px;
      display: flex;
      justify-content: left;
      flex-wrap: wrap;
      background: #ffffff;
      div {
        width: 33.33333333%;
        text-align: center;
        padding: 10px 0;
        float: left;
        position: relative;
        &::after {
          position: absolute;
          content: " ";
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: #eeeeee;
        }
        &::before {
          position: absolute;
          content: " ";
          top: 0;
          right: 0;
          bottom: 0;
          width: 1px;
          background: #eeeeee;
        }
        span {
          display: block;
          line-height: 24px;
          color: #AAAAAA;
          &:first-child {
            color: #444444;
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
    }
    .main-title{
      position: fixed;
      left: 0;
      right: 0;
      top: 175px;
      background: #f5f5f5;
      z-index: 1;
      display: flex;
      align-items: center;
      padding: 10px;
      justify-content: space-between;
      font-size: 13px;
      color: #444444;
      .searchDiv{
        position: relative;
        input{
          width: 110px;
          padding: 0 20px 0 15px;
          height: 26px;
          border: none;
          border-radius: 35px;
          background: #ffffff;
        }
        input:-ms-input-placeholder {
          color: #444444;
        }
        ::-webkit-input-placeholder {
          color: #444444;
        }
        .arrow{
          position: absolute;
          right: 10px;
          top: 11px;
          width: 0;
          height: 0;
          border: 5px solid;
          border-color:#bbbbbb transparent  transparent transparent;
        }
      }
    }
    .listCont {
      padding: 8px 10px 8px 10px;
      background: #fff;
      font-size: 14px;
      border-bottom: 1px solid #eee;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
        img {
          width: 26px;
          height: 26px;
          padding: 0 5px;
        }
      .van-checkbox__icon .van-icon{
        font-size: 0.68em;
        margin-top: 0.1em;
        margin-left: 3px;
      }
      .van-checkbox__label{
        line-height: 24px;
      }

    }
    .btnCont{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #ffffff;
      box-shadow: 0 -5px 5px rgba(193, 188, 188, 0.2);
      .ifchangeBtn{
        margin: 10px;
        width: calc(100% - 20px);
        background: linear-gradient(90deg, #0E6EF0 0%, #1C92FF 100%);
      }
    }
    .showAllBtn{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #ffffff;
      box-shadow: 0 -5px 5px rgba(193, 188, 188, 0.2);
      display: flex;
      justify-content: space-between;
      padding: 10px;
      .changeBtn{
        width: calc(50% - 5px);
        background: linear-gradient(90deg, #0E6EF0 0%, #1C92FF 100%);       
      }
      .cancelBtn{
        width: calc(50% - 5px);
        background: #ffffff;
        color: #0E6EF0;
        border: 1px solid #0E6EF0;    
      }
    }
    
  }
  .actionCont{
    padding: 0 15px;
    line-height: 40px;
    font-size: 14px;
    .selectImg{
      width: 20px;
      float: right;
      margin-top: 8px;
    }
  }
  .searchCont1{
    display: flex;
    align-items: center;
    padding: 0 15px;
    .andLine{
      margin: 10px 5px 0 5px;
    }
    .searchDiv {
      display: flex;
      position: relative;
      padding-top: 10px;
      input {
        height: 35px;
        border: none;
        width: 100%;
        font-size: 14px;
        padding-left: 10px;
        border-radius: 30px;
        background: #ffffff;
      }
      input:-ms-input-placeholder {
        color: #AAAAAA;
      }
      ::-webkit-input-placeholder {
        color: #AAAAAA;
      }
      img {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 14px;
        padding: 12px 0;
      }
    }
    .searchBtn{
      margin-left: 10px;
      margin-top: 10px;
      font-size: 14px;
      color: #ffffff;
      width: 70px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 30px;
      background: #1c92ff;
    }
  }
  .searchCont2 {
    display: flex;
    padding: 10px 15px;
    .searchDiv{
      position: relative;
      input{
        width: 80px;
        padding: 0 20px 0 15px;
      }
      .arrow{
        position: absolute;
        right: 10px;
        top: 15px;
        width: 0;
        height: 0;
        border: 5px solid;
        border-color:#bbbbbb transparent  transparent transparent;
      }
    }
    .searchInput{
      margin-left: 15px;
      position: relative;
      input{
        width: calc(100% - 55px);
        padding: 0 40px 0 15px;
      }
      img {
        position: absolute;
        right: 0;
        top: 2px;
        width: 20px;
        padding: 6px 15px;
      }
    }
    input {
      height: 35px;
      border: none;
      font-size: 14px;
      border-radius: 30px;
      background: #ffffff;
    }
    input:-ms-input-placeholder {
      color: #AAAAAA;
    }
    ::-webkit-input-placeholder {
      color: #AAAAAA;
    }

  }
  .van-steps{
    .time{
      span{
        color: #333333;
      }
    }
    .van-step--vertical:not(:last-child)::after{
      border-bottom-width: 0
    }
  }
  .zanwu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10%;
    img {
      width: 80%;
    }
    .tip{
      color: red;
    }
  }
  .van-overlay{
    z-index: 999;
  }
  .van-picker {
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 999;
  }
  .van-loading {
    padding: 10px 0;
    text-align: center;
  }
}
</style>