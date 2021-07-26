<template>
    <div class="addSuccess">
        <div class="top">
            <p @click="$router.go(-1)">
                <span>
                    <img src="../../images/goback.png" alt="">
                    <span>创建成功</span>
                </span>
                <span>结束会议</span>
            </p>
            <div>
                <!-- <p>
                    <img src="../../images/share2.png" alt="">
                    <span>分享给好友</span>
                </p> -->
                <p>
                    <img src="../../images/erweima.png" alt="">
                    <span>生成二维码</span>
                </p>
            </div>
        </div>

        <div class="huiyi">
            <p><img src="../../images/avatar2.png" alt="">{{detail.metting_name}}</p>
            <ul>
                <li>
                    <img src="../../images/addSuccess1.png" alt="">
                    <span>{{userName}}</span>
                </li>
                <li>
                    <img src="../../images/customerStatus.png" alt="">
                    <span>正在进行</span>
                </li>
                <li>
                    <img src="../../images/time.png" alt="">
                    <span>{{detail.start_time}} 至 {{detail.end_time}} <br> 报名截止 {{detail.stop_time}} </span>
                </li>
                <li>
                    <img src="../../images/info.png" alt="">
                    <span>{{detail.intro}}</span>
                </li>
            </ul>
        </div>
        
        <van-cell value="查看报名列表" title="已报名1人" is-link>
            <template slot="icon">
                <img src="../../images/customerName.png" alt="">
            </template>
        </van-cell>
        <van-cell value="查看签到列表" title="已签到99人" is-link>
            <template slot="icon">
                <img src="../../images/beizhu.png" alt="">
            </template>
        </van-cell>

        <div class="btns">
            <button @click="isBaoming=true">立即报名</button>
            <button>名单导出</button>
        </div>

        <van-popup v-model="isBaoming" :close-on-click-overlay="baoming">
            <img src="../../images/baoming.png" alt="">
            <van-field
            v-model="name"
            label="姓名"
            placeholder="请输入姓名"
            input-align="right"
            >
                <template slot="left-icon">
                    <img src="../../images/jingli.png" alt=""> 
                </template>
            </van-field>
            <van-field
            v-model="phone"
            label="联系方式"
            placeholder="请输入联系方式"
            input-align="right"
            >
                <template slot="left-icon">
                    <img src="../../images/phone1.png" alt=""> 
                </template>
            </van-field>
            <button @click="sure">确定</button>
            <img src="../../images/close.png" alt="" @click="isBaoming=false">
        </van-popup>
    </div>
</template>
<script>
export default {
  name: "addSuccess",
  data () {
    return {
        isBaoming: false,
        baoming: false,
        detail: {},
        userName: '',
        name: '',
        phone: ''
    };
  },
  mounted(){
      this.$api.mettingDetail({metting_id: this.$route.query.metting_id}).then(res=>{
          if(res.errno == 0){
              this.detail = res.data
          }
      })
      this.userName = localStorage.getItem('userName')
  },
  methods:{
      sure(){
          this.$api.mettingRegAdd({
              metting_id: this.$route.query.metting_id,
              reg_name: this.name,
              reg_phone: this.phone
          }).then(res=>{
              if(res.errno == 0){
                  this.$toast(res.errmsg)
                    this.isBaoming=false
                    this.$router.push({
                        path: '/signUp',
                        query:{
                            metting_reg_id: res.metting_reg_id
                        }
                    })
              }
          })
      }
  }
}
</script>
<style lang="less">
.addSuccess{
    min-height: 100%;
    background: #f5f5f5;
    .top{
        background: url(../../images/topBg.jpg) no-repeat;
        width: 100%;
        height: 130px;
        background-size: 100% 130px;
        >p{
            height: 50px;
            line-height: 50px;
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 16px;
            padding-right: 16px;
            >span:first-of-type{
                display: flex;
                align-items: center;
            }
            img{
                width: 10px;
                height: 16px;
                margin-right: 10px;
            }
        }
        >div{
            display: flex;
            justify-content: space-around;
            p{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 14px;
                margin-top: 10px;
                img{
                    width: 15px;
                    height: 15px;
                    margin-bottom: 10px;
                }
            }
        }
    }

    .huiyi{
        background: #fff;
        margin-bottom: 10px;
        >p{
            height: 50px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 15px;
            padding-right: 15px;
            border-bottom: 1px solid #EEEEEE;
            img{
                width: 30px;
                height: 30px;
                margin-right: 10px;
            }
        }
        >ul{
            padding: 15px;
            li{
                display: flex;
                justify-content: flex-start;
                margin-bottom: 10px;
                color: #AAAAAA;
                img{
                    width: 15px;
                    height: 15px;
                    margin-right: 10px;
                }
            }
        }
    }

    .van-cell{
        align-items: center;
        img{
            width: 15px;
            height: 15px;
            margin-right: 5px;
        }
    }
    
    .btns{
        display: flex;
        justify-content: flex-start;
        position: fixed;
        bottom: 0;
        width: 100%;
        button{
            width: 50%;
            height: 50px;
            border: none;
        }
        button:first-child{
            background: #fff;
            color: #1C92FF;
        }
        button:last-child{
            background: #1C92FF;
            color: #fff
        }
    }

    .van-popup--center{
        width: 90%;
        border-radius: 20px;
        padding-top: 50px;
        overflow-y: initial;
        >img:first-child{
            position: absolute;
            top: -30px;
            left: 0;
            z-index: 999;
            width: 75px;
            height: 75px;
        }
        >img:last-child{
            position: fixed;
            bottom: -50px;
            left: 50%;
            margin-left: -12px;
            z-index: 999;
            width: 25px;
            height: 25px;
        }
        .van-cell{
            img{
                width: 14px;
                height: 15px;
            }
        }
        button{
            border: none;
            height: 50px;
            color: #1C92FF;
            width: 100%;
            background: #fff;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
        }
    }
}
</style>