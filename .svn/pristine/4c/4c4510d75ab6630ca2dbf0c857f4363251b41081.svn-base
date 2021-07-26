<template>
  <div class="chaiListAdmin">
    <van-nav-bar left-text="差旅费列表" left-arrow fixed @click-left="leftBack">
      <template #right>
         <van-icon name="down" size="18" @click="dateShowDown=true" />
       </template>
    </van-nav-bar>

    <van-overlay :show="dateShowDown" @click="dateShowDown=false" />
    <van-datetime-picker v-model="currentDateDown" type="year-month" title="选择导出年月" :min-date="minDate" :max-date="maxDate" v-show="dateShowDown" :formatter="formatter"
      @confirm="handleTimeDown" @cancel="dateShowDown=false" />

    <div class="searchCont">
      <div class="searchDiv" @click="selectShow = true">
        <input type="text" placeholder="选择人员" v-model="userName" readonly />
        <div class="arrow"></div>
      </div>
      <div class="searchInput" @click="dateShow = true">
        <input type="text" placeholder="请选择搜索日期" v-model="keyword" readonly />
        <img src="../../images/date1.png" alt  />
      </div>

    </div>

    <van-overlay :show="dateShow" @click="closeDateTime" />
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      v-show="dateShow"
      @confirm="handleTime"
      @cancel="closeDateTime"
    />

    <!-- 选择人员 -->
    <van-action-sheet v-model="selectShow" title="选择人员">
        <ul class="actionCont">
            <li v-for="(item, index) in userListArray" :key="index" @click="selectPop(item.user_id, item.user_name)">{{item.user_name}}
              <img v-if="item.user_id == user_id && user_id != 0" class="selectImg" src="../../images/select.png" alt /></li>
        </ul>
    </van-action-sheet>

    <div class="content" v-if="lists!=''">
      <div class="listUl" v-for="(item, index) in lists" :key="index">
        <div class="liTop" @click="detail(item.travel_id)">
          <img class="header" src="../../images/avatar1.png" alt />
          <div>
            <p>{{userName}}的差旅报</p>
            <p>{{item.date}}</p>
          </div>
        </div>
        <div class="itemCont">
          <div class="item">
            <p class="title">行程</p>
            <p>{{item.travel}}</p>
          </div>
          <div class="item">
            <p class="title">车费</p>
            <p>{{item.car}}</p>
          </div>
          <div class="item">
            <p class="title">住宿</p>
            <p>{{item.hotel}}</p>
          </div>
          <div class="item">
            <p class="title">油费</p>
            <p>{{item.oil}}</p>
          </div>
        </div>
        <ul>
          <li @click="detail(item.travel_id)">详情</li>
          <li v-if='localUserId == user_id' @click="edit(item.travel_id)">编辑</li>
        </ul>
      </div>
    </div>
    <div v-else-if="lists == '' && keyword && userName && !loading" class="zanwu">
      <span><span  class="tip">"{{userName}}"</span>暂无<span class="tip">"{{keyword}}"</span>的费用</span>
    </div>
    <!-- <div v-else class="zanwu">
      <img src="../../images/zanwu.png" alt />
      <span>暂无内容</span>
    </div> -->
    <van-loading v-if="loading" size="24px">加载中...</van-loading>


  </div>
</template>
<script>
export default {
  name: "chaiListAdmin",
  data() {
    return {
      loading: 1,
      selectShow: false,
      dateShow: false,
      nowDate: '',
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      userName: localStorage.getItem("userName"),
      localUserId: localStorage.getItem("userId"),
      user_id: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      userListArray: [],
      keyword: "",
      page: 1,
      pageSize: 20,
      totalPage: 1,
      lists: [],
      activeName: '',
      deletable: false, // 是否展示删除按钮
      showUpload: false, // 是否展示上传区域

      dateShowDown: false,
      currentDateDown: new Date(),
    };
  },
  mounted() {
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    this.getUserList()
    let d = new Date();
    this.nowDate = d.getFullYear() + "-" +
        ((d.getMonth()<9)? ('0'+(d.getMonth() + 1)) : (d.getMonth() + 1)) + "-" +
        ((d.getDate()<10)? ('0'+ d.getDate()): d.getDate());
    this.keyword = this.nowDate

    this.getList();
    document.documentElement.scrollTop = 0;
    window.addEventListener("scroll", this.scrollBottomCarAdmin);
  },
  methods: {
    leftBack(){
      if(new Date(this.keyword).toDateString() !== new Date().toDateString()){
        this.keyword = this.nowDate
        this.userName = localStorage.getItem("userName")
        this.user_id = localStorage.getItem("userId")
        this.page = 1
        this.getList()
      }else{
        this.$router.go(-1)
      }
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    // 选择完日期进行导出
    handleTimeDown(value){
      var d = new Date(value);
      var datetime = d.getFullYear() + "-" +
        ((d.getMonth() < 9) ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1));
      this.dateShowDown = false

      window.location.href = 'http://crm.xfd365.com/user/report/export?user_id=' + this.user_id + '&date=' + datetime + '&token=' + this.token

    },
    // 员工列表
    getUserList() {
      this.$api.userList({keyword: ''}).then(res => {
        if (res.errno === 0) {
          this.userListArray = res.data;
        }
      });
    },
    // 选择员工
    selectPop(user_id, user_name){
      this.user_id = user_id
      this.userName = user_name
      this.selectShow = false
      this.getList()
    },
    scrollBottomCarAdmin(e) {
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
    handleTime(value) {
      var d = new Date(value);
      var datetime = d.getFullYear() + "-" +
        ((d.getMonth()<9)? ('0'+(d.getMonth() + 1)) : (d.getMonth() + 1)) + "-" +
        ((d.getDate()<10)? ('0'+ d.getDate()): d.getDate());
      this.keyword = datetime;
      this.page = 1
      this.dateShow = false;
      this.getList()
    },
    closeDateTime(){
      this.dateShow = false
      this.keyword = ''
      this.page = 1
      this.getList()
    },
    // 员工列表
    getList() {
      let that = this;
      let data = {};
      data.page = that.page;
      data.size = that.pageSize;
      data.user_id = this.user_id;
      data.date = that.keyword;
      // console.log(data)
      this.$api.travelExpenseLists(data).then(res => {
        that.totalPage = res.data.total;
        if (res.errno === 0) {
          if (that.page == 1) {
            that.loading = 0;
            that.lists = res.data.data;
          } else if (res.data.data.length > 0) {
            that.lists.push(...res.data.data);
            if (
              res.data.data.length < that.pageSize ||
              (res.data.data.length == that.pageSize &&
                that.page == that.totalPage)
            ) {
              that.loading = 0;
            }
          } else if (
            that.page == that.totalPage ||
            (res.data.data.length == that.pageSize &&
              that.page == that.totalPage)
          ) {
            that.loading = 0;
          }

        } else {
          this.loading = 0;
          this.lists = []
          this.$toast(res.errmsg);
        }
      });
    },
    // 查看详情
    detail(travel_id) {
      this.$router.push({
        path: '/chaiDetail',
        query: {
          travel_id: travel_id,
        }
      })
    },
    // 编辑
    edit(travel_id) {
      this.$router.push({
        path: '/chaiAdd',
        query: {
          travel_id: travel_id,
        }
      })
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollBottomCarAdmin);//监听页面滚动事件
  }
};
</script>
<style lang="less">
.chaiListAdmin {
  min-height: calc(100% - 50px);
  padding-top: 50px;
  background: #f5f5f5;
  .van-nav-bar {
    background: url(../../images/msgBg.jpg) no-repeat;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-size: 100% 50px;
    .van-nav-bar__text {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
  .searchCont {
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

  .listUl {
    padding: 15px;
    font-size: 14px;
    background: #ffffff;
    border-bottom: 1px solid #eeeeee;

    .liTop {
      display: flex;

      img.header {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        margin-right: 10px;
      }

      div {
        p {
          &:first-child {
            font-size: 14px;
            font-weight: bold;
          }

          &:last-child {
            margin-top: 3px;
            font-size: 12px;
            color: #666666;
          }
        }
      }
    }

    .itemCont {
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
      text-align: center;

      .title {
        color: #666666;
        line-height: 24px;
      }
    }

    ul {
      display: flex;
      color: #1c92ff;

      li {
        padding-top: 10px;
        width: 50px;
      }
    }
  }
  .van-collapse-item__content{
    padding: 0;
    .van-cell{
      padding: 5px 16px;
      font-size: 13px;
    }
    .van-icon__image {
      width: 0.9em;
      height: 0.9em;
    }
    .van-cell__left-icon{
      line-height: 20px;
    }
  }
  .van-uploader{
    padding: 10px 16px;
    .van-uploader__preview-image{
      width: 60px;
      height: 60px;
    }
  }
  .unloader{
    padding: 10px 16px;
    font-size: 13px;
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
  .van-picker {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
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
  .van-loading {
    padding: 10px 0;
    text-align: center;
  }
}
</style>
