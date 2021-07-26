<template>
  <div class="work">
    <ul class="sign">
      <li :class="curr==0?'active':''" @click="curr=0">外勤签到</li>
      <li :class="curr==1?'active':''" @click="clickSign">签到列表</li>
    </ul>

    <div class="waiqin" v-show="curr==0">
      <van-loading v-if="!loading" size="24px" vertical color="#ffffff">定位中……</van-loading>
      <el-amap vid="amap" :plugin="plugin" :events="events" class="amap" :center="center" :zoom="zoom">
        <!-- <el-amap-marker :position="center" vid="amapMarker"></el-amap-marker> -->
      </el-amap>

      <div class="qiandao">
        <ul>
          <li>
            <p>{{qiandaoAddress}}</p><van-field
                v-model="note"
                rows="2"
                autosize
                label="备注"
                type="textarea"
                placeholder="填写备注"
                show-word-limit
              />
          </li>
        </ul>
      </div>

      <div class="xianchangSign" @click="xianchangSign">
        现场<br>签到
      </div>
    </div>
    <div class="signList" v-show="curr==1">
      <img src="../images/mapBg.png" alt="" width="100%">
      <div class="list" v-for="(item,index) in list" :key="index">
        <p>
          <img src="../images/avatar1.png" alt="">
          <span>{{userName}}</span>
          <!-- <span>销售经理</span> -->
        </p>
        <div>
          <img src="../images/icon.png" alt="">
          <ul>
            <li>
              <img src="../images/time.png" alt="">
              <span>{{item.add_time}}</span>
            </li>
            <li>
              <img src="../images/dingwei.png" alt="">
              <span>{{item.address}}</span>
            </li>
            <li>
              <img src="../images/beizhu.png" alt="">
              <span>{{item.note}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <tabbar :idx="1"></tabbar>
  </div>
</template>
<script>
import tabbar from "@/components/bottom";
export default {
  name: "work",
  components: {
    tabbar
  },
  data () {
    return {
      curr: 0,
      center: [0, 0], // 高德地图中心点
      zoom: 15, // 地图内的大小
      loading: false,
      events: {
        'click': (e)=> {
          this.$router.push({
            path: "/mapSearch"
          });
        }
      },
      plugin: [{
        pName: 'Geolocation',
        // noIpLocate: 1, // ios11： 禁止ip定位：ios11之后默认是ip定位，参数为1则是禁止ip定位
        events: {
          init: (o)=> {
            this.GDinit(o, self); // 获取当前位置
          }
        }
      }],
        // 这个是选择搜索列表中数据的title以及经纬度
        locationdata: {
          address: "",
          lng: '',
          lat: ''
        },
        qiandaoAddress: '',
        note: '',
        list: [],
        userName: '',
        locationIf: true,
        page: 1,
        pageSize: 10,
        totalPage: 1
    };
  },
  mounted(){
    this.userName = localStorage.getItem('userName')

    let address = this.$route.query.address
    if(address){
      this.locationIf = false
      this.locationdata.address = this.$route.query.address
      this.locationdata.lng = this.$route.query.lng
      this.locationdata.lat = this.$route.query.lat
      this.qiandaoAddress = this.$route.query.address
      this.center = [this.$route.query.lng, this.$route.query.lat]
    }else{
      this.locationIf = true
    }

  },
  methods:{
    mapSearch(){
      this.$router.push({
        path: "/mapSearch"
      });
    },
    GDinit(o){
      let that = this;
      if(that.locationIf == true){
        o.getCurrentPosition((status, result) => {
          console.log(status)
           console.log(result)
        if(status === 'complete' && result.info === 'SUCCESS'){
          that.loading = true;
          that.center = [result.position.lng, result.position.lat]
          that.locationdata.lng = result.position.lng
          that.locationdata.lat = result.position.lat

          that.GDmapGetInfoOfNearby(result.position.lng, result.position.lat); // 获取周边信息

        }else{
          that.loading = true;
          that.$toast("定位失败，请重试")
        }
      })
      }else{
        that.loading = true;
      }
      
    },
    /* 获取周边建筑信息 */
    GDmapGetInfoOfNearby (lng, lat) {
      let that = this;
      let geocoder = new AMap.Geocoder({ 
        // radius: 500,
        // extensions: 'all',
        // poitype: ''
      });
      geocoder.getAddress([lng, lat], (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.regeocode) {
            that.qiandaoAddress = result.regeocode.formattedAddress
            that.locationdata.address = result.regeocode.formattedAddress
          }
        }
      });
    },
   
        // 点击切换签到列表
        clickSign(){
          this.curr=1
          this.$api.signList().then(res=>{
            if(res.errno === 0){
              if(res.data){
                this.list = res.data.data
              }
            }
          })
        },

        // 现场签到
        xianchangSign(){
          this.$api.signIn({
            address: this.qiandaoAddress,
            location: this.center.lng + ',' + this.center.lat,
            note: this.note
          }).then(res=>{
            this.$toast(res.errmsg)
            if(res.errno === 0){
              location.reload()
            }
          })
        },

  }
}
</script>
<style lang="less">
.work{
  .sign{
    width: 215px;
    height: 46px;
    box-shadow: 3px 3px 10px 0 #ddd;
    border-radius: 30px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 15px;
    left: 50%;
    margin-left: -108px;
    z-index: 999;
    background: #fff;
    li{
      border-right: 1px solid #eeeeee;
      width: 50%;
      text-align: center;
    }
    li.active{
      color: #1c92ff;
    }
  }

  .signList{
    .list{
      border-bottom: 1px solid #eeeeee;
      padding-left: 15px;
      margin-bottom: 10px;
      >p{
        display: flex;
        align-items: center;
        img{
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
        span:nth-of-type(2){
          font-size: 12px;
          border: 1px solid #1c92ff;
          color: #1c92ff;
          padding: 3px;
          border-radius: 20px;
          margin-left: 10px;
        }
      }
      >div{
        display: flex;
        margin-top: 20px;
        >img{
          width: 15px;
          height: 56px;
        }
        >img.icon1{
          width: 15px;
          height: 110px;
        }
        ul{
          margin-left: 10px;
          li{
            display: flex;
            align-items: top;
            height: 24px;
            color: #aaa;
            img{
              width: 14px;
              height: 14px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }

  .qiandao{
    background: #fff;
    z-index: 999;
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    padding-top: 10px;
    ul{
      width: 100%;
      li{
        display: flex;
        flex-direction: column;
        justify-content: center;
        p:first-of-type{
          font-size: 14px;
          padding: 0 15px;
        }
        .van-field__label{
          width: 40px;
        }
        .van-field__control{
          border: 1px solid #f7f7f7;
          padding: 5px;
        }
      }
    }
  }
  
  .xianchangSign{
    background: url('../images/qiandaoBg.png') no-repeat;
    width: 120px;
    height: 120px;
    background-size: 120px 120px;
    position: fixed;
    bottom: 70px;
    left: calc(50% - 60px);
    font-size: 16px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .van-loading{
    position: absolute;
    top: 20%;
    left: calc(50% - 40px);
    z-index: 200;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 10px;
    .van-loading__text{
      color: #ffffff;
    }
  }
  .amap {
    width: 100%;
    height: calc(100vh - 320px);
  }
  .anchorBL {  
    display:none  
  }
  .map_title{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.1533rem;
    .map_title_span{
      font-size: 0.29rem;
    }
  }

  .BMap_pop{
    display: none
  }
  .BMap_shadow{
    display: none;
  }
}
</style>