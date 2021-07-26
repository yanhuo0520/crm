<template>
  <div class="contact">
    <van-nav-bar :left-text="leftText" left-arrow @click-left="$router.go(-1)" />
    <!-- <van-icon name="search" slot="right" @click="$router.push('/search')" />
    </van-nav-bar>-->
    
    <!-- 暂未对接接口 -->
    <div class="search">
      <input type="text" placeholder="请输入联系人姓名/手机号" @click="searchAll" />
      <img src="../../images/searchContact.png" alt @click="searchAll" />
    </div>
    <div v-if="userData != ''">
      <div class="content" v-for="(item,index) in userData" :key="index">
        <div class="left" @click="showDetail(item.user_name)">
          <img src="../../images/avatar1.png" alt />
          <span>{{item.user_name}}</span>
          <img src="../../images/phone2.png" alt />
          <span>{{item.phone}}</span>
        </div>
        <div class="right">
          <a :href="'tel:'+item.phone">
            <img src="../../images/tel.png" alt />
          </a>
          <a :href="'sms:'+item.phone">
            <img src="../../images/message.png" alt />
          </a>
        </div>

        <van-overlay :show="item.user_name == showName" >
          <van-popup v-model="isShow" class="detail">
            <div class="top">
                <div class="left">
                  <img src="../../images/avatar1.png" alt />
                </div>
                <div class="right">
                  <p class="name">{{item.user_name}} <span>| 业务经理</span></p>
                  <p class="desc">中国华英农业有限公司</p>
                  <ul><li class="label-tip">益农社站在</li>
                    <li class="label-tip">益农社站在</li>
                    <li class="label-tip">益农社站在</li></ul>
                </div>
            </div>
            <div class="bottomCont">
              <div class="contLi">
                <van-cell title="电话" :label="item.phone" />
                <a :href="'tel:'+item.phone">
                  <img src="../../images/tel.png" alt />
                </a>
              </div>
              <div class="contLi">
                <van-cell title="邮箱" label="staouesgfssfgfsoj@163.com" />
                <img src="../../images/email.png" alt="" />
              </div>
              <div class="contLi">
                <van-cell title="地址" label="鹤壁淇滨区农业硅谷产业园" />
                <img src="../../images/address.png" alt="" />
              </div>
              <div class="contLast">
                <van-cell title="备注"></van-cell>
                <van-field value="暂无" rows="2" readonly autosize type="textarea" placeholder="请输入跟进内容" />
              </div>
            </div>
            <img src="../../images/close.png" alt class="closeDetail" @click="closeOverlay" />
          </van-popup>
        </van-overlay>

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
  name: "contact",
  data() {
    return {
      leftText: '联系人',
      showName: "",
      isShow: false,
      type: '',
      userData: []
    };
  },
  mounted() {
    var type = this.$route.query.type;
    this.type = type
    if(type == 1){
      this.leftText = "内部联系人"
    }else if(type == 3){
      this.leftText = "银行业务人员"
    }else if(type == 2){
      this.leftText = "外部联系人"
    }
    this.$api.contactList({type: that.type}).then(res => {
        if (res.errno === 0) {
          if (res.data) {
            this.userData = res.data;
          }
        }
      });
  },
  methods: {
    searchAll() {
      // this.$router.push({
      //   path: "/contactSearch"
      // });
    },
    showDetail(user_name) {
      this.isShow = true
      this.showName = user_name
    },
    closeOverlay(){
      this.isShow = false
      this.showName = '';
    }
  },
  created(){
    // this.getList();
    document.documentElement.scrollTop = 0
  }
};
</script>
<style lang="less">
.contact {
  min-height: 100%;
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
  .search {
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
      color: #aaaaaa;
    }
    ::-webkit-input-placeholder {
      color: #aaaaaa;
    }
    img {
      position: absolute;
      right: 15px;
      top: 10px;
      width: 16px;
      padding: 10px 15px;
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
      width: 70%;
      padding: 15px 0;
      justify-content: left;
      img {
        width: 20px;
        height: 20px;
        padding-right: 8px;
      }
      img:last-of-type {
        width: 10px;
        height: 15px;
        padding: 0 8px;
      }
      span:last-of-type {
        color: #aaa;
      }
    }
    .right {
      a {
        display: inline-block;
      }
      img {
        width: 30px;
        height: 30px;
        padding: 10px 0;
        margin-left: 10px;
      }
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
  .detail{
    width: 80%;
    background: url(../../images/contactBg.png) no-repeat center top;
    background-size: 100% auto;
    border-radius: 10px;
    .top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ffffff;
      margin: 30px 0 10px 0;
      .left{
        display: flex;
        justify-content: left;
        width: auto;
        img{
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }
      .name{
        font-size: 16px;
        span{
          font-size: 13px;
        }
      }
      .desc{
        margin-top: 5px;
        font-size: 13px;
      }
      .label-tip{
        background:rgba(255,255,255,0.2);
        border: 1px solid #ffffff;
        display: inline-block;
        border-radius: 15px;
        font-size: 12px;
        padding: 1px 5px;
        margin-top: 5px;
      }
      .right{
        width: calc(100% - 60px);
        padding-right: 10px;
      }
      
    }
    .bottomCont{
      .contLi{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #ffffff;
        img{
          width: 36px;
          margin-right: 10px;
        }
        .van-cell{
          padding: 5px 15px;
          width: calc(100% - 50px);
          span{
            color: #AAAAAA;
            font-size: 13px;
          }
          .van-cell__label{
            margin-top: 0;
            font-size: 15px;
            color: #444444;
          }
        }
      }
      .contLast{
        .van-cell{
          padding: 5px 15px;
          &:first-child{
            padding-bottom: 0;
            &::after{
              border-bottom: none;
            }
            span{
              color: #AAAAAA;
              font-size: 13px;
            }
          }
          &:last-child{
            padding-top: 0;
            font-size: 15px;
            color: #444444;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
        }
      }
    }
  }
  .closeDetail{
    width: 30px;
    display: flex;
    margin: 30px auto 0 auto;
  }
}
</style>