<template>
  <div class="contactList">
    <van-nav-bar
      left-text="联系人"
      right-text="添加"
      left-arrow
      fixed
      @click-left="leftBack"
      @click-right="onClickRight"
    />

    <div class="searchCont">
      <input type="text" placeholder="请输入联系人姓名/手机号" @click="searchAll" />
      <img src="../../images/searchContact.png" alt @click="searchAll" />
    </div>

    <div class="content">
      <van-cell title="内部联系人" @click="contactList(1)" is-link />
      <van-cell title="银行业务人员" @click="contactList(3)" is-link />
      <van-cell title="外部联系人" @click="contactList(2)" is-link />
    </div>
  </div>
</template>
<script>
export default {
  name: "contactList",
  data() {
    return {
      
    };
  },
  mounted(){
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    document.documentElement.scrollTop = 0
  },
  methods: {
    leftBack(){
      this.$router.push('/')
    },
    onClickRight() {
      this.$router.push({
        path: "/contactAdd"
      });
    },
    contactList(type) {
      this.$router.push({
        path: "/contactList",
        query: {
          type: type
        }
      });
    },
    searchAll() {
      this.$router.push({
        path: "/contactSearch",
        query: {
          type: ''
        }
      })
    }
  }
};
</script>
<style lang="less">
.contactList {
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
    position: relative;
    padding: 10px 15px;
    input {
      height: 35px;
      border: none;
      width: 100%;
      font-size: 14px;
      padding: 0 40px 0 15px;
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
      right: 15px;
      top: 10px;
      width: 16px;
      padding: 10px 15px;
    }
  }
}
</style>