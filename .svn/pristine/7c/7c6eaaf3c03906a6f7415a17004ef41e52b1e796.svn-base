<template>
    <div class="info">
        <van-nav-bar
            left-text="个人资料"
            left-arrow
            fixed
            @click-left="leftBack"
        />

        <div class="marBottom">
            <van-cell title="性别" is-link :value="sex" icon="http://sc.xfd365.com/crmImages/sex.png" @click="isSex=true"></van-cell>
            <van-cell title="出生日期" :value="time" icon="http://sc.xfd365.com/crmImages/birthday.png" is-link @click="isTime=true" />
        </div>

        <div class="marBottom">
            <van-field
                placeholder="请输入手机号码"
                label="手机号码"
                left-icon="http://sc.xfd365.com/crmImages/phone.png"
                input-align="right"
                v-model="phone"
                readonly
            />
            <van-field
                placeholder="xxxx-xxxxxxx-xxx"
                label="座机/分机"
                left-icon="http://sc.xfd365.com/crmImages/zuoji.png"
                input-align="right"
                v-model="phone2"
            />
            <van-field
                placeholder="请输入电子邮箱地址"
                label="电子邮箱"
                left-icon="http://sc.xfd365.com/crmImages/email.png"
                input-align="right"
                v-model="email"
            />
            <van-field
                placeholder="请输入微信号"
                label="微信号"
                left-icon="http://sc.xfd365.com/crmImages/wechat.png"
                input-align="right"
                v-model="weixin"
            />
        </div>
        <button class="save" v-if="hidshowFooter" @click="save">保存</button>

        <van-action-sheet v-model="isSex" title="请选择性别" :round="isRound">
            <ul>
                <li v-for="(item,index) in sexs" :key="index" @click="selectSex(index)">
                    <img :src="item" alt="">
                </li>
            </ul>
        </van-action-sheet>

        <van-overlay :show="isTime" @click="isTime = false" />
        <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        v-show="isTime"
        @confirm="handleTime"
        @cancel="isTime=false"
        />
    </div>
</template>
<script>
export default {
  name: "info",
  data () {
    return {
        sex:'请选择',
        isTime: false,
        currentDate: new Date(),
        minDate: new Date(1900,1,1),
        time: '请选择',
        isRound: false,
        isSex: false,
        sexs:[
            require('../../images/male.png'),
            require('../../images/female.png')
        ],
        phone: '',
        phone2: '',
        email: '',
        weixin: '',

        docmHeight: document.documentElement.clientHeight,  //默认屏幕高度       
        showHeight:  '0',   //实时屏幕高度        
        hidshowFooter:true,  //显示或者隐藏footer, 
    };
  },
  mounted(){
      window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
      window.onresize = ()=>{   // 实时屏幕高度
		  this.showHeight = document.body.clientHeight     
      }
      
      document.documentElement.scrollTop = 0
      this.$api.userInfo().then(res=>{
          if(res.errno === 0){
              if(res.data.sex==1){
                  this.sex = '男'
              }else if(res.data.sex == 2){
                  this.sex = '女'
              }
              if(res.data.birthday=='' || res.data.birthday == null){
                  this.time = '请选择'
              }else{
                this.time = res.data.birthday
              }
              this.phone = res.data.phone
              this.phone2 = res.data.phone2
              this.email = res.data.email
              this.weixin = res.data.weixin
          }
      })
  },
  methods:{
      leftBack(){
          this.$router.go(-1)
      },
      handleTime(value){
          var d = new Date(value)
          var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
          this.time = datetime
          this.isTime = false
      },
      selectSex(index){
          this.isSex = false
          if(index==0){
              this.sex = '男'
          }else if(index == 1){
              this.sex = '女'
          }
      },
      save(){
        // 区号：前面一个0，后面跟2-3位数字 ： 0\d{2,3}
        // 电话号码：7-8位数字： \d{7,8}
        // 分机号：一般都是3位数字： \d{3,}
        // 这样连接起来就是验证电话的正则表达式了：/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
        var regPhone = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
        if (this.phone2.trim().length != 0 && !regPhone.test(this.phone2.trim())) {
            this.$toast("座机/分机格式错误！");
            return;
        }
        
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (this.email.trim().length != 0 && !regEmail.test(this.email.trim())) {
            this.$toast("邮箱格式错误！");
            return;
        }

        var userInfo = {}
        if(this.sex == '男'){
          userInfo.sex = 1
        }else{
            userInfo.sex = 2
        }
          userInfo.birthday = this.time
          userInfo.email = this.email.trim()
          userInfo.weixin = this.weixin.trim()
          userInfo.phone2 = this.phone2.trim()
          this.$api.userUpdate(userInfo).then(res=>{
              this.$toast(res.errmsg)
              if(res.errno === 0){
                  this.$router.go(-1)
              }
          })
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
}
</script>
<style lang="less">
.info{
    min-height: calc(100% - 100px);
    padding-top: 50px;
    padding-bottom: 50px;
    background: #f5f5f5;
    .van-nav-bar{
        background: url(../../images/msgBg.jpg) no-repeat;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background-size: 100% 50px;
        .van-nav-bar__text{
            color: #fff;
        }
        .van-icon{
            color: #fff;
        }
    }

    .marBottom{
        margin-bottom: 10px;
        background: #fff;
    }
    .van-picker{
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 999;
    }
    .van-action-sheet{
        ul{
            display: flex;
            justify-content: space-around;
            padding: 20px 0;
            img{
                width: 28px;
                height: 30px;
            }
        }
    }
    button.save{
        width: 100%;
        height: 50px;
        display: block;
        border: none;
        background: #1c92ff;
        color: #fff;
        position: fixed;
        bottom: 0
    }
}
</style>