<template>
    <div class="index">
        <div class="top">
            <img src="../images/logo.png" alt="">
            <div>
              <img src="../images/search.png" alt="" @click="$router.push('/search')">
              <img src="../images/daiban.png" alt="" @click="$router.push('/daiban')">
              <img src="../images/lianxi.png" alt="" @click="$router.push('/contact')">
            </div>
        </div>
        
        <ul class="module">
          <li @click="$router.push('/ccbCustomer')">
                <img src="../images/jianhang.png" alt="">
                <span>建行客户</span>
            </li>
            <li @click="$router.push('/customer')">
                <img src="../images/customer.png" alt="">
                <span>客户管理</span>
            </li>
            <li @click="$router.push('/meeting')">
                <img src="../images/huiyi.png" alt="" style="width:50px;height:43px;">
                <span>会议管理</span>
            </li>
            <li @click="$router.push('/genjinRecord')">
                <img src="../images/jilu.png" alt="">
                <span>跟进记录</span>
            </li>
            <li @click="$router.push('/statisticalForm')">
                <img src="../images/form.png" alt="">
                <span>统计报表</span>
            </li>
        </ul>
        <tabbar :idx="0"></tabbar>
    </div>
</template>
<script>
import tabbar from "@/components/bottom";
export default {
  name: "index",
  components: {
    tabbar
  },
  data() {
    return {};
  },
  mounted(){
    this.$api.checkToken().then(res=>{
      if(res.errno === 0){
        this.$api.userInfo().then(res=>{
          if(res.errno === 0){
            localStorage.setItem('userName',res.data.user_name)
          }
        })
      }else{
        this.$router.push('/login')
      }
    })
    
  }
};
</script>
<style lang="less">
.index {
  height: calc(100vh - 50px);
  background: url(../images/index.jpg) no-repeat;
  width: 100%;
  background-size: 100% calc(100vh - 50px);

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 15px;
    >img:first-child {
      width: 48px;
      height: 16px;
    }
    div{
      img {
        width: 20px;
        height: 20px;
        margin-left: 10px
      }
    }
    
  }

  .module {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    position: fixed;
    bottom: 120px;
    width: calc(100% - 80px);
    li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 14px;
        img {
          width: 40px;
          height: 44px;
          margin-bottom: 10px;
        }
    }
  }
}
</style>