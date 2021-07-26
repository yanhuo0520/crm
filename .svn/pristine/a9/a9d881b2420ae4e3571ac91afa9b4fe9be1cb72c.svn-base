<template>
  <div class="contactSearch">
    <div class="headerTop">
      <img src="../../images/goback.png" alt @click="leftBack" />
      <input type="text" placeholder="请输入联系人姓名/手机号" v-model="value" @input="changeInput()" />
      <img src="../../images/search.png" alt @click="searchAll" />
    </div>
    <div v-if="userData != ''">
        <div class="content" v-for="(item,index) in userData" :key="index">
          <div class="left" @click="showDetail(item.linker_id)">
            <!-- <img src="../../images/avatar1.png" alt /> -->
            <span>{{item.name}}</span>
            <!-- <img src="../../images/phone2.png" alt />
            <span>{{item.phone}}</span> -->
          </div>
          <div class="right">
            <a :href="'tel:'+item.phone">
              <img src="../../images/tel.png" alt />
            </a>
            <a :href="'sms:'+item.phone">
              <img src="../../images/message.png" alt />
            </a>
          </div>

          <van-overlay :show="item.linker_id == linkerId" >
            <van-popup v-model="isShow" class="detail">
              <div class="top">
                  <div v-if="item.type==2" class="editCont" @click="editContact(item.linker_id)">
                    <img src="../../images/edit1.png" alt="" /> 编辑
                  </div>
                  <div class="left">
                     <div class="nameBg">{{item.name.substr(0, 1)}}</div>
                    <!-- <img src="../../images/avatar1.png" alt /> -->
                  </div>
                  <div class="right">
                    <p class="name">{{item.name}} <span v-if="item.position">| {{item.position}}</span></p>
                    <p class="desc">{{item.company}}</p>
                    <ul v-if="item.tag_name">
                      <li v-for="(itemLabel, indexLabe) in item.labelArray" :key="indexLabe" class="label-tip">{{itemLabel}}</li>
                    </ul>
                  </div>
              </div>
              <div class="bottomCont">
                <div class="contLi">
                  <van-cell title="电话" :label="item.phone" />
                  <a :href="'tel:'+item.phone">
                    <img src="../../images/tel.png" alt />
                  </a>
                </div>
                <div class="contLi" v-if="item.email">
                    <van-cell title="邮箱" :label="item.email" />
                    <img src="../../images/email.png" alt />
                  </div>
                  <div class="contLi" v-if="item.address">
                    <van-cell title="地址" :label="item.totalAddress" />
                    <img src="../../images/address.png" alt />
                  </div>
                  <div class="contLast" v-if="item.note">
                    <van-cell title="备注"></van-cell>
                    <van-field
                      :value="item.note"
                      rows="2"
                      readonly
                      autosize
                      type="textarea"
                      placeholder="请输入跟进内容"
                    />
                  </div>
                  <div class="contLast" v-else>
                    <van-cell title="备注"></van-cell>
                    <van-field
                      value="暂无"
                      rows="2"
                      readonly
                      autosize
                      type="textarea"
                      placeholder="请输入跟进内容"
                    />
                  </div>
              </div>
              <img src="../../images/close.png" alt class="closeDetail" @click="closeOverlay" />
            </van-popup>
          </van-overlay>
        </div>
      </div>

      <div v-else-if="userData == '' && value && ifShow" class="zanwu">
        <span>暂无<span class="tip">"{{value}}"</span>相关内容</span>
      </div>

      <!-- <div v-else class="zanwu">
        <img src="../../images/zanwu.png" alt />
        <span>暂无内容</span>
      </div> -->
  </div>
</template>
<script>
export default {
  name: "contactSearch",
  data() {
    return {
      value: "",
      linkerId: "",
      isShow: false,
      type: '',
      userData: [],
      ifShow: false
    };
  },
  mounted() {
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    document.documentElement.scrollTop = 0
  },
  methods: {
    leftBack(){
      this.$router.go(-1)
    },
    changeInput(){
      this.ifShow = false
    },
    searchAll() {
      let that = this;
      if(!that.value){
        that.$toast("请输入姓名/电话");
        return
      }
      let val = that.value.trim();
      if(!val){
        that.$toast("请输入姓名/电话");
        return
      }
      
      this.$api.contactList({type: that.type, keyword: val}).then(res => {
        if (res.errno === 0) {
          if (res.data) {
            if(res.data.length == 0){
              this.$toast("不存在")
              that.ifShow = true
              that.userData = []
            }
            for(let key in res.data){
              that.userData.push(...res.data[key])
              res.data[key].forEach(ele => {
                if(ele.tag_name){
                  ele.labelArray = ele.tag_name.substr(0, ele.tag_name.length - 1).split("#");
                }else{
                  ele.labelArray = []
                }

                if(ele.address){
                  if(ele.address.indexOf("#") == -1 && ele.address.indexOf("/") == -1){ // 不包含# /
                    ele.totalAddress = ele.address
                  }else if(ele.address.indexOf("#") == -1){ // 不包含#
                    let addressArray = ele.address.substr(0, ele.address.length).split("/")
                    ele.totalAddress = addressArray[0] + addressArray[1] + addressArray[2]
                  }else if(ele.address.indexOf("#") != -1){
                    let addressArray = ele.address.substr(0, ele.address.length).split("#")
                    let addArr = addressArray[0].substr(0, addressArray[0].length).split("/")
                    ele.totalAddress = addArr[0] + addArr[1] + addArr[2] + addressArray[1]
                  }
                }

              });
            }
          }
        }else{
          that.lists = []
          that.ifShow = true
          this.$toast(res.errmsg);
        }
      })
    },
    showDetail(id) {
      this.isShow = true
      this.linkerId = id
    },
    editContact(id) {
      this.$router.push({
        path: '/contactAdd',
        query:{
          id: id,
          keyword: this.value,
          type: this.type
        }
      })
    },
    closeOverlay(){
      this.isShow = false
      this.linkerId = '';
    }
  },
  beforeRouteEnter(to, from, next){
    let keyword = to.query.keyword
    to.meta.keyword = keyword

    let type = to.query.type
    to.meta.type = type
    if (from.path == "/contact" || from.path == "/contactAdd" || from.path == "/contactSearch") {
      if(from.path == "/contactAdd"){
        let keyword = from.query.keyword
        to.meta.keyword = keyword

        let type = from.query.type
        to.meta.type = type
      }
      to.meta.isBack = false;
    } else {
      to.meta.isBack = true;
    }
    next();
  },
  beforeRouteLeave(to, from, next){
     to.meta.keyword = '';
     to.meta.type = ''
     this.value = '';
     this.userData = [];
     next()
  },
  activated() {
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    this.type = this.$route.meta.type
    this.value = this.$route.meta.keyword
    if (!this.$route.meta.isBack) {  // 不缓存
      document.documentElement.scrollTop = 0
        if(this.$route.meta.keyword != '' && this.$route.meta.keyword != undefined){
          this.loading = 1
          this.searchAll()
        }else{
          document.documentElement.scrollTop = 0
          this.loading = 0
          this.userData = [];
        }
    }
    this.isShow = false;
    this.linkerId = "";
    this.$route.meta.isBack = false;
  },
};
</script>
<style lang="less">
.contactSearch {
  min-height: calc(100% - 50px);
  padding-top: 50px;
  background: #f5f5f5;
  .headerTop {
    position: fixed;
    top: 0;
    left: 0;
    background: url("../../images/msgBg.jpg") no-repeat;
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
  .content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 50px;
    background: #fff;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    .editCont{
      position: absolute;
      right: 0;
      top: 20px;
      background: #ffffff;
      color: #1C92FF;
      padding: 2px 6px 2px 10px;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      img{
        width: 15px;
        vertical-align: text-top;
      }
    }
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
      // span:last-of-type {
      //   color: #aaa;
      // }
    }
    .right {
      img {
        width: 30px;
        height: 30px;
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
    .tip{
      color: red;
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
        .nameBg{
          width: 60px;
          height: 60px;
          margin: 0 8px;
          line-height: 60px;
          color: #ffffff;
          border-radius: 50%;
          font-size: 26px;
          text-align: center;
          background:rgba(255,255,255,0.3);
          border: 2px solid #ffffff;
        }
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
  .van-overlay{
        .van-overlay{
            display: none;
        }
    }
  .closeDetail{
    width: 30px;
    display: flex;
    margin: 30px auto 0 auto;
  }
}
</style>