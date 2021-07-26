<template>
  <div class="carListAdmin">
    <van-nav-bar left-text="车辆管理" right-text="我要用车" left-arrow fixed @click-left="leftBack"
      @click-right="$router.push('/carAdd')" />

    <div class="searchCont">
      <div class="searchDiv" @click="selectShow = true">
        <input type="text" placeholder="选择人员" v-model="userName" readonly />
        <div class="arrow"></div>
      </div>
      <div class="searchInput" @click="dateShow = true">
        <input type="text" placeholder="请选择搜索日期" v-model="keyword" readonly />
        <img src="../../images/date1.png" alt />
      </div>

    </div>

    <van-overlay :show="dateShow" @click="closeDateTime" />
    <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" v-show="dateShow"
      @confirm="handleTime" @cancel="closeDateTime" />

    <!-- 选择人员 -->
    <van-action-sheet v-model="selectShow" title="选择人员">
      <ul class="actionCont">
        <li v-for="(item, index) in userListArray" :key="index" @click="selectPop(item.user_id, item.user_name)">
          {{item.user_name}}
          <img v-if="item.user_id == user_id && user_id != 0" class="selectImg" src="../../images/select.png" alt />
        </li>
      </ul>
    </van-action-sheet>

    <van-collapse v-model="activeName" accordion v-if="lists != ''">
      <van-collapse-item :title="item.date" :name="item.date" v-for="(item, index) in lists" :key="index">
        <div class="itemCont">
          <div class="item">
            <van-field label="用前公里数" :left-icon="require('../../images/num1.png')" readonly input-align="right"
              v-model="item.start_km" />
            <!-- <van-cell title="用前公里数照片" icon="http://sc.xfd365.com/crmImages/pic.png"></van-cell> -->
            <img :src="item.pic1" v-if="item.pic1" @click.stop="imgShow(item.pic1)" class="upLoadImg" />
            <p v-else class="tipTitle">未上传照片</p>
          </div>
          <div class="item">
            <van-field label="用后公里数" :left-icon="require('../../images/num1.png')" readonly input-align="right"
              v-model="item.end_km" />
            <!-- <van-cell title="用后公里数照片" icon="http://sc.xfd365.com/crmImages/pic.png"></van-cell> -->
            <img :src="item.pic2" v-if="item.pic2" @click.stop="imgShow(item.pic2)" class="upLoadImg" />
            <p v-else class="tipTitle">未上传照片</p>
          </div>
        </div>
        <div v-if="user_id == userId && Date.parse(new Date(curDate)) == Date.parse(new Date(item.date))" style="height: 35px">
          <p class="goChangeBtn" @click="goChange(item.travel_id)">去修改</p>
        </div>
      </van-collapse-item>
    </van-collapse>
    <div v-else-if="lists == '' && keyword && userName && !loading" class="zanwu">
      <span><span class="tip">"{{userName}}"</span>暂无<span class="tip">"{{keyword}}"</span>的公里照片</span>
    </div>
    <!-- <div v-else class="zanwu">
      <img src="../../images/zanwu.png" alt />
      <span>暂无内容</span>
    </div> -->
    <van-loading v-if="loading" size="24px">加载中...</van-loading>


  </div>
</template>
<script>
  import {
    ImagePreview
  } from 'vant';
  export default {
    name: "carListAdmin",
    data() {
      return {
        loading: 1,
        selectShow: false,
        dateShow: false,
        nowDate: '',
        currentDate: new Date(),
        curDate: '',
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(),
        userName: localStorage.getItem("userName"),
        userId: localStorage.getItem("userId"),
        user_id: localStorage.getItem("userId"),
        userListArray: [],
        keyword: "",
        page: 1,
        pageSize: 20,
        totalPage: 1,
        lists: [],
        activeName: '',
        imagePreviewCover: '',
      };
    },
    mounted() {
      window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
      this.getUserList()
      let d = new Date();
      this.nowDate = d.getFullYear() + "-" +
        ((d.getMonth() < 9) ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)) + "-" +
        ((d.getDate() < 10) ? ('0' + d.getDate()) : d.getDate());
      this.keyword = this.nowDate
      this.curDate = this.nowDate

      this.getList();
      document.documentElement.scrollTop = 0;
      window.addEventListener("scroll", this.scrollBottomCarAdmin);
    },
    methods: {
      leftBack() {
        if (this.imagePreviewCover) {
          this.imagePreviewCover.close();
          this.imagePreviewCover = ''
        } 
        else if (new Date(this.keyword).toDateString() !== new Date().toDateString()) {
          this.keyword = this.nowDate
          this.userName = localStorage.getItem("userName")
          this.user_id = localStorage.getItem("userId")
          this.page = 1
          this.getList()
        } else {
          this.$router.go(-1)
        }
      },
      // 员工列表
      getUserList() {
        this.$api.userList({
          keyword: ''
        }).then(res => {
          if (res.errno === 0) {
            this.userListArray = res.data;
          }
        });
      },
      // 选择员工
      selectPop(user_id, user_name) {
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
          ((d.getMonth() < 9) ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)) + "-" +
          ((d.getDate() < 10) ? ('0' + d.getDate()) : d.getDate());
        this.keyword = datetime;
        this.page = 1
        this.dateShow = false;
        this.getList()
      },
      closeDateTime() {
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
        this.$api.travel_expense_lists(data).then(res => {
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
      // 查看完整图片
      imgShow(url) {
        let that = this
        this.imagePreviewCover = ImagePreview({
          images: [url],
          asyncClose: true,
          closeable: true,
        });
        this.$nextTick(() => {
          document.querySelector('.van-image-preview__close-icon--top-right').addEventListener('click', function(
            e) {
            e.stopPropagation(); //取消事件冒泡
            that.imagePreviewCover.close();
            that.imagePreviewCover = ''
          })
        })
      },
      goChange(travel_id) {
        this.$router.push({
          path: '/carAdd',
          query: {
            travel_id: travel_id
          }
        })
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollBottomCarAdmin); //监听页面滚动事件
    }
  };
</script>
<style lang="less">
  .carListAdmin {
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

      .searchDiv {
        position: relative;

        input {
          width: 80px;
          padding: 0 20px 0 15px;
        }

        .arrow {
          position: absolute;
          right: 10px;
          top: 15px;
          width: 0;
          height: 0;
          border: 5px solid;
          border-color: #bbbbbb transparent transparent transparent;
        }
      }

      .searchInput {
        margin-left: 15px;
        position: relative;

        input {
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

    .van-collapse-item__content {
      padding: 0;

      .van-cell {
        padding: 5px 16px;
        font-size: 13px;
      }

      .van-icon__image {
        width: 0.9em;
        height: 0.9em;
      }

      .van-cell__left-icon {
        line-height: 20px;
      }

      .itemCont {
        display: flex;
      }

      .upLoadImg {
        margin: 5px 15px;
        width: 100px;
        height: 70px;
      }

      .tipTitle {
        margin: 5px 15px;
      }

      .goChangeBtn {
        float: right;
        margin: 2px 15px;
        padding: 0 10px;
        border-radius: 20px;
        font-size: 13px;
        line-height: 24px;
        color: #FFFFFF;
        background: #1c92ff;
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

      .tip {
        color: red;
      }
    }

    .van-loading {
      padding: 10px 0;
      text-align: center;
    }
  }
</style>
