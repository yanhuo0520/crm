<template>
  <div class="ccbSearch">
    <div class="top">
      <img src="../images/goback.png" alt @click="leftBack" />
      <input type="text" placeholder="请输入搜索内容" v-model="value" @input="changeInput()" />
      <img src="../images/search.png" alt @click="searchAll" />
    </div>
    <p>历史搜索</p>

    <ul>
      <li v-for="(item,index) in historyList" :key="index" @click="searchItem(item)">{{item}}</li>
    </ul>
    <div class="content" v-if="lists!=''">
      <div class="detail" v-for="(item,index) in lists" :key="index">
        <div @click="toDetail(item.customer_id, item.site_id)">
          <img src="../images/customerName.png" alt />
          <h4>{{item.customerName}}</h4>
          <!-- <span v-if="item.status==1">正在跟进</span> -->
        </div>
        <ul @click="toDetail(item.customer_id, item.site_id)">
          <li>
            <img src="../images/gongsi.png" alt />
            <div class="label-cont">{{item.serverName}}</div>
          </li>
          <li v-if="item.label!= ''">
            <img src="http://sc.xfd365.com/crmImages/tag.png" alt="">
              <div class="label-cont">
                <span class="label-tip" v-for="(itemLabel, indexLabe) in item.labelArray" :key="indexLabe">{{itemLabel}}</span>
              </div>
          </li>
          <li>
            <img src="../images/customerName.png" alt />
            <span>{{item.secondBank}}</span>
          </li>
          <li v-if="item.type!='' && item.type != undefined">
            <img src="../images/customerStatus.png" alt />
            <span v-if="item.type==1">到访</span>
            <span v-else-if="item.type==2">电话</span>
            <span v-else-if="item.type==3">微信</span>
            <span v-else-if="item.type==4">短信</span>
            <span v-else-if="item.type==5">其他</span>
          </li>
          <li v-if="item.follow_time!='' && item.follow_time != undefined">
            <img src="../images/time.png" alt />
            <span>{{item.follow_time}}</span>
          </li>
        </ul>
        <ul>
          <li @click="toDetail(item.customer_id, item.site_id)">
            <img src="../images/detail.png" alt />
            <span>查看详情</span>
          </li>
          <li @click="tel(item.customer_id)">
            <img src="../images/customerPhone.png" alt />
            <span>电话</span>
          </li>
          <li @click="toGenjin(item.customer_id, item.name, item.site_id)">
            <img src="../images/customerGenjin.png" alt />
            <span>跟进</span>
          </li>
          <li @click="siteStatiseAdd(item.customer_id, item.site_id)">
            <img src="../images/inzhandian.png" alt />
            <span>站点统计</span>
          </li>
        </ul>

        <van-overlay
          :show="item.customer_id==customerId"
          @click="closeOverlay"
          style="height:100vh"
        >
          <van-action-sheet
            v-model="isPhone"
            title="拨打电话"
            :round="isRound"
            @click.stop
            @cancel="closeOverlay"
          >
            <a
              :href="'tel:'+item.phones"
              style="color:#000;margin:20px;display:block;"
              @click="dialNum"
            >{{item.phones}}</a>
          </van-action-sheet>
        </van-overlay>
      </div>
    </div>
    <div v-else-if="lists == '' && value && loading != 1 && ifShow" class="zanwu">
      <!-- <img src="../images/zanwu.png" alt /> -->
      <span>暂无<span class="tip">"{{value}}"</span>相关内容</span>
    </div>
    <van-loading v-if="loading" size="24px">加载中...</van-loading>
  </div>
</template>
<script>
export default {
  name: "ccbSearch",
  data() {
    return {
      value: "",
      loading: 0,
      isRound: false,
      isPhone: false,
      activeName1: "",
      lists: [],
      customerId: '',
      historyList: [],
      page: 1,
      pageSize: 10,
      totalPage: 1,
      ifShow: false
    };
  },
  created() {
    document.documentElement.scrollTop = 0
    let that = this;
    //获取localstorage
    let storage = window.localStorage;
    if (storage.getItem("ccbSearchWord") !== null) {
      that.historyList = JSON.parse(storage.getItem("ccbSearchWord"));
    }
  },
  mounted(){
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    window.addEventListener('scroll', this.scrollBottomccSearch)
  },
  methods: {
    leftBack(){
      // 判断是从首页进入还是从我的客户列表进入
      let ccbSearchFrom = localStorage.getItem("ccbSearchFrom")
      if(ccbSearchFrom == "ccbCustomer"){
        this.$router.push({
          path: "/ccbCustomer",
        });
      }else{
        this.$router.push({
          path: "/",
        });
      }
      localStorage.removeItem("ccbSearchFrom")
      
    },
    changeInput(){
      this.ifShow = false
    },
    scrollBottomccSearch() {
      let that = this;
      var scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }

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
        that.searchAll();
      }
    },
    searchAll: function(item) {
      var that = this;
      var val = that.value.trim();
      
      if (val != "") {
        that.loading = 1
        let storage = window.localStorage;
        if (storage.getItem("ccbSearchWord") == null) {
          that.historyList.unshift(val);
          storage.setItem("ccbSearchWord", JSON.stringify(that.historyList));
        } else {
          if (that.historyList.indexOf(val) != -1) {
            that.historyList.splice(that.historyList.indexOf(val), 1);
            that.historyList.unshift(val);
          } else {
            that.historyList.unshift(val);
          }

          if (that.historyList.length > 5) {
            that.historyList.pop();
          }
          storage.setItem("ccbSearchWord", JSON.stringify(that.historyList));
        }

        this.$api.ccbCustomerLists({
            page: that.page,
            size: that.pageSize,
            key_word: val
          })
          .then(res => {
            that.totalPage = res.total_page;
            if (res.errno === 0) {
              if (that.page == 1) {
                that.loading = 0;
                that.lists = res.data;
              } else if (res.data.length > 0) {
                that.lists.push(...res.data);
                if (res.data.length < that.pageSize || (res.data.length == that.pageSize && that.page == that.totalPage)) {
                  that.loading = 0;
                }
              } else if (that.page == that.totalPage) {
                that.loading = 0;
              }

              if (that.lists) {
                that.lists.forEach(ele => {
                  if (ele.label) {
                    ele.labelArray = ele.label
                      .substr(0, ele.label.length)
                      .split("#");
                  } else {
                    ele.labelArray = [];
                  }
                });
              }
            } else {
              that.loading = 0
              that.lists = []
              that.ifShow = true
              this.$toast(res.errmsg);
            }
          });
      } else {
        
      }
    },
    searchItem(item) {
      let that = this;
      that.value = item;
      that.page = 1;
      that.searchAll();
    },
    toDetail(id, site_id) {
      localStorage.removeItem("tagupdate");
      this.$router.push({
        path: "/ccbCustomerDetail",
        query: {
          id: id,
          site_id: site_id,
          keyword: this.value
        }
      });
    },
    tel(id){
      this.isPhone = true
      this.customerId = id
    },
    // 统计打电话次数
    dialNum(){
      this.$api.dialNum().then(res=>{})
    },
    closeOverlay(){
      this.isPhone = false
      this.customerId = ''
    },
    toGenjin(id, name, site_id) {
      this.$router.push({
        path: "/customerGenjin",
        query: {
          customer_id: id,
          station_id: 0,
          customerName: name,
          cls: 2,
          keyword: this.value,
          site_id: site_id
        }
      });
    },
    siteStatiseAdd(id, site_id){
      this.$router.push({
        path: "/siteAdd",
        query: {
          id: id,
          site_id: site_id,
          cls: 2,
          keyword: this.value
        }
      });
    },
  },
  beforeRouteEnter(to, from, next){
    let keyword = from.query.keyword
    if(keyword != '' && keyword != undefined){
      to.meta.keyword = keyword
    }else{
      to.meta.keyword = ''
    }
    let tagupdate = localStorage.getItem("tagupdate")
    if (from.path == "/" || 
        from.path == "/ccbCustomerDetail" && tagupdate == "1"|| 
        from.path == "/ccbCustomer" || 
        from.path == "/customerGenjin" ||
        from.path == "/siteAdd") {
      to.meta.isBack = false;
    } else {
      to.meta.isBack = true;
    }
    next();
  },
  beforeRouteLeave(to, from, next){
     to.meta.keyword = '';
     this.value = ''
     next()
  },
  activated() {
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    this.value = this.$route.meta.keyword;

    if (!this.$route.meta.isBack) {
      document.documentElement.scrollTop = 0;
      if(this.$route.meta.keyword != ''){
        this.searchItem(this.value)
      }else{
        this.loading = 0
        this.page = 1
        this.lists = [];
      }
    }
    this.isPhone = false;
    this.customerId = "";
    this.$route.meta.isBack = false;
  },
  destroyed() {
      window.removeEventListener('scroll', this.scrollBottomccSearch);//监听页面滚动事件
    }
};
</script>
<style lang="less">
.ccbSearch {
  min-height: calc(100% - 50px);
  background: #f5f5f5;
  padding-top: 50px;
  .top {
    position: fixed;
    left: 0;top: 0;
    background: url("../images/msgBg.jpg") no-repeat;
    width: calc(100% - 32px);
    height: 50px;
    background-size: 100% 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    img:first-of-type {
      width: 10px;
      height: 16px;
      margin-right: 10px;
    }
    img:last-of-type {
      width: 20px;
      height: 20px;
    }
    input {
      height: 35px;
      border: none;
      width: 95%;
      border-bottom: 1px solid #ffffff;
      color: #fff;
      background: transparent;
    }
    input:-ms-input-placeholder {
      color: #fff;
    }
    ::-webkit-input-placeholder {
      color: #fff;
    }
  }
  > p {
    background: #ffffff;
    color: #aaa;
    font-size: 14px;
    padding: 10px 0 0 16px;
  }
  > ul {
    background: #ffffff;
    padding-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      padding: 5px 10px;
      background: #eee;
      color: #444;
      margin-left: 16px;
      margin-top: 10px;
      border-radius: 20px;
      font-size: 14px;
    }
  }
  .content {
    background: #f5f5f5;
    margin-top: 10px;
    .detail {
      margin-bottom: 10px;
      background: #fff;
      > div {
        padding-left: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid #eeeeee;
        > img {
          width: 15px;
          height: 15px;
        }
        h4 {
          margin: 0 10px;
        }
        > span {
          font-size: 14px;
          background: #ddefff;
          color: #1c92ff;
          border-radius: 20px;
          padding: 3px 10px;
        }
      }
      > ul:first-of-type {
        padding: 10px 20px;
        border-bottom: 1px solid #eeeeee;
        li {
          // line-height: 30px;
           padding: 3px 0;
          color: #aaa;
          font-size: 14px;
          img {
            width: 15px;
            height: 15px;
            margin-right: 5px;
            vertical-align: middle;
          }
          .label-cont {
            padding-left: 25px;
            margin-top: -18px;
          }
          .label-tip {
            border-radius: 10px;
            margin-right: 5px;
            padding: 0 5px;
            display: inline-block;
            line-height: 24px;
            color: #1c92ff;
            border:1px solid rgba(28, 146, 255, 1);
            // &:nth-of-type(1) {
            //   border: 1px solid rgba(28, 146, 255, 1);
            //   background: rgba(28, 146, 255, 0.1);
            // }
            // &:nth-of-type(2) {
            //   background: rgba(255, 151, 28, 0.1);
            //   border: 1px solid rgba(255, 151, 28, 1);
            // }
            // &:nth-of-type(3) {
            //   background: rgba(28, 252, 255, 0.1);
            //   border: 1px solid rgba(50, 209, 211, 1);
            // }
            // &:nth-of-type(4) {
            //   background: rgba(229, 206, 13, 0.1);
            //   border: 1px solid rgba(225, 193, 34, 1);
            // }
            // &:nth-of-type(5) {
            //   background: rgba(28, 255, 172, 0.1);
            //   border: 1px solid rgba(25, 226, 152, 1);
            // }
          }
        }
      }
      > ul:last-of-type {
        display: flex;
        justify-content: flex-start;
        li {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          border-right: 1px solid #eeeeee;
          img {
            width: 20px;
            height: 20px;
            margin-right: 6px;
          }
        }
      }
    }
  }

  .van-loading {
    padding: 10px 0;
    text-align: center;
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

  .van-popup{
        .van-action-sheet__header{
            text-align: left;
            padding-left: 20px;
        }
        ul{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 84px;
            li{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: 20px;
                img{
                    width: 20px;
                    height: 20px;
                    margin-bottom: 5px;
                }
            }
        }

        p{
            border-bottom: 1px solid #eee;
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
        }
    }

    .van-overlay{
        .van-overlay{
            display: none;
        }
    }
}
</style>