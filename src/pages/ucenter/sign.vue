<template>
  <div class="mySign">
    <van-nav-bar left-text="我的签到" left-arrow fixed @click-left="leftBack" />

    <van-collapse v-model="activeName1" accordion v-if="list!=''">
      <van-collapse-item
        :title="item.address"
        :name="item.sign_id"
        icon="http://sc.xfd365.com/crmImages/customerName.png"
        v-for="(item,index) in list"
        :key="index"
      >
        <ul>
          <li v-if="item.customerName">
            <img src="../../images/customerName.png" alt="">
            <span>{{item.customerName}}</span>
          </li>
          <li>
            <img src="../../images/time.png" alt />
            <span>{{item.add_time}}</span>
          </li>
          <li>
            <img src="../../images/beizhu.png" alt />
            <span>{{item.note}}</span>
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>

    <div v-else class="zanwu">
      <img src="../../images/zanwu.png" alt="">
      <span>暂无内容</span>
    </div>

    <van-loading v-if="loading" size="24px">加载中...</van-loading>
  </div>
</template>
<script>
export default {
  name: "mySign",
  data() {
    return {
      activeName1: "",
      loading: 0,
      list: [],
      page: 1,
      pageSize: 15,
      totalPage: 1
    };
  },
  mounted() {
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    document.documentElement.scrollTop = 0
    this.getList();
    window.addEventListener('scroll', this.scrollBottomSign)
  },
  methods: {
    leftBack(){
      this.$router.go(-1)
    },
    scrollBottomSign() {
      let that = this;
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }

        let clientHeight = document.documentElement.clientHeight; /*当前可视高度*/
        let scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); /*文档完整的高度*/
        if ((scrollHeight - clientHeight - scrollTop) <= 0 && that.page < that.totalPage) {
            that.page +=1
            that.loading = 1
            that.getList();
        }
    },
    getList() {
      let that = this;
      this.$api.signList({page: that.page, size: that.pageSize}).then(res => {
        that.totalPage = res.data.total
        if (res.errno === 0) {
            if(that.page == 1){
              that.loading = 0
              that.list = res.data.data
            }else if(res.data.data.length > 0){
              that.list.push(...res.data.data)
              if(res.data.data.length < that.pageSize){
                that.loading = 0
              }
            }else if(that.page == that.totalPage){
              that.loading = 0
            }
        }
      });
    }
  },
  destroyed() {
      window.removeEventListener('scroll', this.scrollBottomSign);//监听页面滚动事件
    }
};
</script>
<style lang="less">
.mySign {
  min-height: calc(100% - 50px);
  padding-top: 50px;
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
  .time {
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    padding-left: 20px;
    color: #aaa;
  }

  .van-collapse {
    ul {
      li {
        height: 30px;
        color: #aaa;
        display: flex;
        // align-items: center;
        img {
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
        &:last-child{
          height: auto;
        }
      }
    }
  }

  .van-loading{
        padding: 10px 0;
        text-align: center;
    }
    .zanwu{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 10%;
        img{
            width: 80%;
        }
    }
}
</style>