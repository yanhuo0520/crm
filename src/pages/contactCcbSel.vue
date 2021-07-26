<template>
  <div class="contactCcbSel">
    <van-nav-bar left-text="客户名称" left-arrow fixed @click-left="leftBack" />
    <van-search
      v-model="value"
      @input="searchCont"
      placeholder="请输入搜索关键词"
    />
    <div v-if="lists != ''">
      <div class="content" v-for="(item,index) in lists" :key="index">
        <div class="left" @click="selectSure(item.id, item.name, item.type)">
          <img src="../images/avatar1.png" alt />
          <span>{{item.name}}</span>
          <!-- 1查询新增，2查询建行 -->
          <span class="tip" v-if="item.type == 2">【建行】</span>
          <!-- <img v-if="item.phones" src="../images/phone2.png" class="phone" alt /> -->
          <template v-if="item.netName">
            <span class="phone" >{{item.netName}}</span>
          </template>
          <template v-else>
            <span class="phone">{{item.mobile}}</span>
          </template>


        </div>
        <img
          class="selectImg"
          v-if="item.id == selectId && selectId != 0"
          src="../images/select.png"
          alt
        />
      </div>
    </div>

    <van-loading v-if="loading" size="24px">加载中...</van-loading>
    <div v-else-if="lists=='' && !loading" class="zanwu">
      <!-- <img src="../images/zanwu.png" alt /> -->
      <!-- <span>暂无内容</span> -->
      <span>暂无<span class="tip">"{{value}}"</span>相关内容</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "contactCcbSel",
  data() {
    return {
      value: "",
      loading: 1,
      page: 1,
      pageSize: 20,
      totalPage: 1,
      lists: [],
      selectId: "",
      fromPath: ""
    };
  },
  mounted() {
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    this.selectId = this.$route.query.customer_id;
    let fromPath = this.$route.query.fromPath;
    if (fromPath) {
      this.fromPath = fromPath;
    }

    this.getList();
    document.documentElement.scrollTop = 0;
    window.addEventListener("scroll", this.scrollBottomContact);
  },
  methods: {
    searchCont() {
      let that = this;
      that.value = this.value;
      that.lists = []
      that.loading = 1
      that.page = 1
      that.getList();
    },
    scrollBottomContact(e) {
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
      this.$api
        .customerAll({
          page: that.page,
          size: that.pageSize,
          key_word: that.value
        })
        .then(res => {
          that.totalPage = res.total_page;
          if (res.errno === 0) {
            if (that.page == 1) {
              that.loading = 0;
              that.lists = res.data;
            } else if (res.data.length > 0) {
              that.lists.push(...res.data);
              if (
                res.data.length < that.pageSize ||
                (res.data.length == that.pageSize &&
                  that.page == that.totalPage)
              ) {
                that.loading = 0;
              }
            } else if (that.page == that.totalPage) {
              that.loading = 0;
            }
          } else {
            that.loading = 0
            that.lists = []
            this.$toast(res.errmsg);
          }
        });
    },
    leftBack() {
      // this.$router.push({
      //   path: '/genjinSel'
      // })
      this.$router.go(-1);
    },
    selectSure(id, name, type) {
      let routerPath;
      if (this.fromPath == "work") {
        routerPath = "/work"
      } else {
        routerPath = "/genjinSel"
      }
      this.$api.getSiteId({
          id: id,
          type: type,
        }).then(res => {
          if (res.errno === 0) {
            this.$router.push({
              path: routerPath,
              query: {
                customer_id: id,
                customerName: name,
                cls: type,
                site_id: res.data.site_id,
              }
            });
          } else {
            this.$router.push({
              path: routerPath,
              query: {
                customer_id: id,
                customerName: name,
                cls: type,
                site_id: ''
              }
            });
          }
        });

    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollBottomContact);//监听页面滚动事件
  }
};
</script>
<style lang="less">
.contactCcbSel {
  min-height: calc(100% - 50px);
  padding-top: 50px;
  background: #f5f5f5;
  .van-nav-bar {
    background: url(../images/msgBg.jpg) no-repeat;
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
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 50px;
    background: #fff;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    .left {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 15px 0;
      justify-content: left;
      img {
        width: 20px;
        height: 20px;
        padding-right: 8px;
      }
      img.phone {
        width: 10px;
        height: 15px;
        padding: 0 8px;
      }
      span.tip{
        font-size: 12px;
        color: #1C92FF;
      }
      span.phone {
        padding-left: 6px;
        color: #aaa;
      }
    }
    .selectImg {
      width: 20px;
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
  .van-loading {
    padding: 10px 0;
    text-align: center;
  }
}
</style>
