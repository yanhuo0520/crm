<template>
    <div class="signUp">
        <div class="top">
            <p @click="leftBack">
                    <img src="../../images/goback.png" alt="">
                    <span>报名成功</span>
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
            <img src="../../images/yibaoming.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
  name: "signUp",
  data () {
    return {
        detail: {},
        userName: ''
    };
  },
  mounted(){
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    this.userName = localStorage.getItem('userName')
    document.documentElement.scrollTop = 0
    this.$api.mettingRegDetail({metting_reg_id: this.$route.query.metting_reg_id}).then(res=>{
        if(res.errno === 0){
            this.detail = res.data
        }
    })
  },
  methods: {
      leftBack(){
        this.$router.go(-1)
      }
  }
}
</script>
<style lang="less">
.signUp{
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
            justify-content: flex-start;
            align-items: center;
            padding-left: 16px;
            padding-right: 16px;
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
        position: relative;
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
        >img{
            width: 109px;
            height: 77px;
            position: absolute;
            right: 15px;
            top: 60px;
        }
    }
}
</style>