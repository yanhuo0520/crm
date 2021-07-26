<template>
  <div class="regionIndex">
    <div class="topNav">
      <p class="title" @click="leftBack">
        <img src="../../images/goback.png" alt />
        <span>业务统计</span>
      </p>
      <div class="desc">
        <img src="../../images/avatar1.png" />
        <div class="desc-cont">
          <p class="name">{{userName}}<span class="tip">区域管理员</span></p>
          <p class="company">信服达科技有限公司<span v-if="province == 130000">河北</span><span
              v-if="province == 410000">河南</span>分公司</p>
        </div>

      </div>
    </div>
    <div class="searchCont1">
      <div class="searchDiv" @click="dateShow1 = true">
        <input type="text" placeholder="开始日期" v-model="lat_time1" readonly />
        <img src="../../images/date2.png" alt />
      </div>
      <div class="andLine">-</div>
      <div class="searchDiv" @click="dateShow2 = true">
        <input type="text" placeholder="结束日期" v-model="end_time1" readonly />
        <img src="../../images/date2.png" alt />
      </div>
      <div class="searchBtn" @click="searchDate()">搜索</div>
    </div>
    <div class="ulDiv" v-if="followList.length > 0">
      <div v-for="(item1, index1) in followList" :key="index1">
        <span>{{item1.val ? item1.val: 0}}</span>
        <span>{{item1.name}}</span>
      </div>
    </div>

    <div class="searchDivPer" @click="selectShow = true">
      <input type="text" placeholder="选择管辖人员" v-model="selectName" readonly />
      <div class="arrow"></div>
    </div>

    <div class="ulDiv" v-if="selectId && followListSel.length > 0">
       <div v-for="(item1, index1) in followListSel" :key="index1">
        <span>{{item1.val ? item1.val: 0}}</span>
        <span>{{item1.name}}</span>
      </div>
    </div>

    <!-- 选择动态搜索人员 -->
    <van-action-sheet v-model="selectShow" title="选择管理人员">
      <ul class="actionCont">
        <li v-for="(item1, index1) in selectArray" :key="index1" @click="selectPer(item1.user_id, item1.user_name)">
          {{item1.user_name}}
          <img v-if="item1.user_id == selectId && selectId != 0" class="selectImg" src="../../images/select.png" alt />
        </li>
      </ul>
    </van-action-sheet>
    <van-overlay :show="dateShow1" @click="closeDateTime1" />
    <van-datetime-picker v-model="currentDate1" type="date" :min-date="minDate" :max-date="maxDate" v-show="dateShow1"
      @confirm="handleTime1" @cancel="closeDateTime1" />

    <van-overlay :show="dateShow2" @click="closeDateTime2" />
    <van-datetime-picker v-model="currentDate2" type="date" :min-date="minDate" :max-date="maxDate" v-show="dateShow2"
      @confirm="handleTime2" @cancel="closeDateTime2" />
  </div>
</template>
<script>
  export default {
    name: "regionIndex",
    data() {
      return {
        userName: localStorage.getItem("userName"),
        province: localStorage.getItem("province"),
        
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(),

        lat_time1: '',
        currentDate1: new Date(),
        dateShow1: false,

        end_time1: '',
        currentDate2: new Date(),
        dateShow2: false,

        followList: [],
        followListSel: [],

        selectShow: false,
        selectArray: '',
        selectId: '',
        selectName: '',
      };
    },
    mounted() {
      window.leftBack = this.leftBack; // Android原生返回按钮执行leftBack()方法
      document.documentElement.scrollTop = 0;
      window.addEventListener("scroll", this.scrollBottomRegion);
      let d = new Date();
      let nowDate = d.getFullYear() + "-" +
        ((d.getMonth() < 9) ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)) + "-" +
        ((d.getDate() < 10) ? ('0' + d.getDate()) : d.getDate());
      this.lat_time1 = nowDate
      this.end_time1 = nowDate
      this.keywordDate = nowDate
      // 业务统计
      this.searchDate();
      this.getUserList()
    },
    methods: {
      leftBack() {
        this.$router.go(-1)
      },
      onClick() {
        if (this.active == 0) {
          this.searchDate();
        } else if (this.active == 1) {
          this.getLog();
          // 选择人员
          this.getUserList();
        }
      },
      handleTime1(value) {
        var d = new Date(value);
        var datetime = d.getFullYear() + "-" +
          ((d.getMonth() < 9) ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)) + "-" +
          ((d.getDate() < 10) ? ('0' + d.getDate()) : d.getDate());

        if (datetime > this.end_time1 && this.end_time1) {
          this.$toast("开始时间大于结束时间")
          return
        }
        // if(new Date(value).setHours(0,0,0,0) !== new Date(this.lat_time1).setHours(0,0,0,0)){
        //  this.selectId = ''
        //  this.selectName = ''
        // }
        this.currentDate1 = datetime;
        this.lat_time1 = datetime;
        this.dateShow1 = false
        
      },
      closeDateTime1() {
        this.dateShow1 = false
        this.currentDate1 = new Date()
      },
      handleTime2(value) {
        var d = new Date(value);
        var datetime = d.getFullYear() + "-" +
          ((d.getMonth() < 9) ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)) + "-" +
          ((d.getDate() < 10) ? ('0' + d.getDate()) : d.getDate());


        if (datetime < this.lat_time1 && this.lat_time1) {
          this.$toast("结束时间小于开始时间")
          return
        }
        // if(new Date(value).setHours(0,0,0,0) !== new Date(this.end_time1).setHours(0,0,0,0)){
        //  this.selectId = ''
        //  this.selectName = ''
        // }
        this.currentDate2 = datetime;
        this.end_time1 = datetime;
        this.dateShow2 = false
      },
      closeDateTime2() {
        this.dateShow2 = false
        this.currentDate2 = new Date()
      },
      // 业务统计-所有
      searchDate() {
        if(this.selectId){
          this.searchDatePerson()
        }
        if (this.active == 0) {
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
          });
        }
        this.$api.followStatistical({
          starttime: this.lat_time1 + ' 00:00:00',
          endtime: this.end_time1 + ' 23:59:59',
        }).then(res => {
          this.$toast.clear()
          if (res.errno === 0) {
            this.followList = res.data;
          }
        }).catch(err => {
          this.$toast.clear()
        });
      },
      // 管辖人员列表
      getUserList() {
        this.$api.userList({
          keyword: ''
        }).then(res => {
          if (res.errno === 0) {
            this.selectArray = res.data;
          }
        });
      },
      selectPer(user_id, user_name) {
        this.selectShow = false
        this.selectName = user_name
        this.selectId = user_id
        this.searchDatePerson();
      },
      searchDatePerson() {
        if (this.active == 0) {
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
          });
        }
        this.$api.statisticalUser({
          starttime: this.lat_time1 + ' 00:00:00',
          endtime: this.end_time1 + ' 23:59:59',
          user_id: this.selectId
        }).then(res => {
          this.$toast.clear()
          if (res.errno === 0) {
            this.followListSel = res.data;
          }
        }).catch(err => {
          this.$toast.clear()
        });
      },

    },
  };
</script>
<style lang="less">
  .regionIndex {
    min-height: calc(100% - 115px);
    padding-top: 115px;
    background: #f5f5f5;

    .topNav {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      background: url(../../images/topBg.jpg) no-repeat;
      width: 100%;
      height: 115px;
      background-size: 100% 115px;

      .title {
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

      .desc {
        display: flex;
        padding: 10px 15px;

        img {
          width: 40px;
          height: 40px;
          border: 2px solid #fff;
          border-radius: 50%;
        }

        .desc-cont {
          padding-left: 10px;

          .name {
            font-size: 14px;
            color: #fff;
            display: flex;

            .tip {
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

        .company {
          margin-top: 4px;
          color: #B2DAFF;
          font-size: 13px;
        }
      }
    }

    .van-tabs__line {
      background-color: transparent;
    }

    .ulDiv {
      margin-top: 12px;
      display: flex;
      justify-content: left;
      flex-wrap: wrap;
      background: #ffffff;

      div {
        width: 33.33333333%;
        text-align: center;
        padding: 6px 0;
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

    .actionCont {
      padding: 0 15px;
      line-height: 40px;
      font-size: 14px;

      .selectImg {
        width: 20px;
        float: right;
        margin-top: 8px;
      }
    }

    .searchCont1 {
      display: flex;
      align-items: center;
      padding: 0 15px;

      .andLine {
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

      .searchBtn {
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
    .searchDivPer{
        margin: 10px;
        position: relative;
        input{
          width: 110px;
          padding: 0 15px;
          height: 32px;
          line-height: 32px;
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
          left: 110px;
          top: 11px;
          width: 0;
          height: 0;
          border: 5px solid;
          border-color:#bbbbbb transparent  transparent transparent;
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

      .tip {
        color: red;
      }
    }

    .van-overlay {
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
