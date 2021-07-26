<template>
    <div class="changepass">
        <van-nav-bar
            left-text="修改密码"
            left-arrow
            fixed
            @click-left="leftBack"
        />

        <van-field
                placeholder="请输入旧密码"
                label="旧密码"
                left-icon="http://sc.xfd365.com/crmImages/password.png"
                input-align="right"
                v-model="original"
                type="password"
            />
            <van-field
                placeholder="请输入新密码"
                label="新密码"
                left-icon="http://sc.xfd365.com/crmImages/password.png"
                input-align="right"
                v-model="newPwd"
                type="password"
            />
            <van-field
                placeholder="请输入新密码"
                label="确认密码"
                left-icon="http://sc.xfd365.com/crmImages/password.png"
                input-align="right"
                v-model="surePwd"
                type="password"
            />

        <button class="save" v-if="hidshowFooter" @click="changepwd">确定</button>
    </div>
</template>
<script>
export default {
  name: "changepass",
  data() {
    return {
      original: "",
      newPwd: "",
      surePwd: "",

      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度       
      showHeight:  '0',   //实时屏幕高度        
      hidshowFooter:true,  //显示或者隐藏footer, 
    };
  },
  mounted(){
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    document.documentElement.scrollTop = 0

    window.onresize = ()=>{   // 实时屏幕高度
		  this.showHeight = document.body.clientHeight     
      }
  },
  methods: {
    leftBack(){
      this.$router.go(-1)
    },
    changepwd() {
      this.$api.changePass({
          original: this.original,
          new: this.newPwd,
          sure: this.surePwd
        }).then(res => {
          this.$toast(res.errmsg);
          if (res.errno === 0) {
            this.$router.go(-1);
          }
        });
    }
  },
  watch:{
    showHeight: function(){
      if(this.docmHeight > this.showHeight){
        this.hidshowFooter = false
      }else{
        this.hidshowFooter = true
      }
    }
  },
};
</script>
<style lang="less">
.changepass {
  min-height: calc(100% - 100px);
  padding-top: 50px;
  padding-bottom: 50px;
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

  button.save {
    width: 100%;
    height: 50px;
    display: block;
    border: none;
    background: #1c92ff;
    color: #fff;
    position: fixed;
    bottom: 0;
  }
}
</style>