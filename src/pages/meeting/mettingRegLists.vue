<template>
  <div class="mettingRegLists">
    <van-nav-bar left-text="报名列表" left-arrow fixed @click-left="leftBack" />
    <div v-if="regLists.length > 0">
      <div class="list" v-for="(item,index) in regLists" :key="index">
        <van-cell :title="item.reg_name" :value="item.reg_phone" :label="item.reg_time" />
      </div>
    </div>
    <div v-else class="zanwu">
      <img src="../../images/zanwu.png" alt />
      <span>暂无内容</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "mettingRegLists",
  data() {
    return {
      regLists: []
    };
  },
  mounted() {
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    document.documentElement.scrollTop = 0
    this.$api.mettingRegLists({metting_id: this.$route.query.metting_id}).then(res => {
        // console.log(res)
        if (res.errno === 0) {
          this.regLists = res.data;
        }
      });
  },
  methods: {
    leftBack(){
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="less">
.mettingRegLists {
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
  .list {
    border-bottom: 1px solid #eeeeee;
    &:last-child,
    &:nth-last-child(2) {
      border-bottom: none;
    }
    img {
      max-width: 100%;
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
  }
}
</style>
