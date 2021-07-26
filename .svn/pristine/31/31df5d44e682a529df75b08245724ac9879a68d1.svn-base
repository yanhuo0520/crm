<template>
  <div class="work">
    <ul class="sign">
      <li :class="curr==0?'active':''" @click="curr=0">外勤签到</li>
      <li :class="curr==1?'active':''" @click="clickSign">签到列表</li>
    </ul>

    <div class="waiqin" v-show="curr==0">
      <baidu-map  class="map" :center="center" :zoom="zoom" @ready="handler" @click="mapSearch"> 
        <!-- 障碍物的设置。因为要跟随滑动，以及某个点的提醒 -->
        <bm-marker :position="center" :dragging="true">
            <bm-info-window :show="true">{{maptitle}}</bm-info-window>
        </bm-marker>
      </baidu-map>

      <div class="qiandao">
        <img src="../images/qiandao.png" alt="">
        <ul>
          <li>
            <p>{{qiandaoAddress}}</p>
            <!-- <p><input type="text" placeholder="填写备注" disabled="diasbled" id="note" v-model="note"> <img src="../images/pen.png" alt="" @click="edit"></p> -->
            <p><input type="text" placeholder="填写备注" id="note" v-model="note"> <img src="../images/pen.png" alt=""></p>
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
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
export default {
  name: "work",
  components: {
    tabbar
  },
  data () {
    return {
      curr: 0,
      // 地图初始化的位置
        center: {lng: 113.814473, lat: 34.797709},
        // 地图内的大小
        zoom: 14,
        // 这个是选择某个点的提醒以及搜索附近的东西的依据
        maptitle: "",
        // 这个是搜索下的东西
        location: '',
        // 这个是选择搜索列表中数据的title以及经纬度
        locationdata: {
          address: "",
          lng: '',
          lat: ''
        },
        geolocation: "",
        biaoji: false,

        qiandaoAddress: '',
        note: '',
        list: [],
        userName: '',
        lat: '',
        lon: '',
        locationIf: true
    };
  },
  mounted(){
    this.userName = localStorage.getItem('userName')
    window.onAndroid = this.onAndroid
    window.onGetLocation = this.onGetLocation
    window.geoc = null
    window.vue = this

    let address = this.$route.query.address
    if(address){
      this.locationIf = false
      this.locationdata.address = this.$route.query.address
      this.locationdata.lng = this.$route.query.lng
      this.locationdata.lat = this.$route.query.lat
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
    
    // 由于百度地图 JS API 只有 JSONP 一种加载方式，因此 BaiduMap 组件及其所有子组件的渲染只能是异步的。
    // 因此，请使用在组件的 ready 事件来执行地图 API 加载完毕后才能执行的代码，不要试图在 vue 自身的生命周期中调用 BMap 类，更不要在这些时机修改 model 层。
        handler ({BMap, map}) {
            window.map = map; //注册为全局
            var that = this;  // map方法中的this指向不对。所有申明一个。。小细节的东西
              // 刚进入页面中的定位，需要向用户授权
            var point = new BMap.Point(113.814473,34.797709);

            var geolocation = new BMap.Geolocation();
            var geoc = new BMap.Geocoder();    
            window.geoc = geoc

            var isAndroid = localStorage.getItem('isAndroid')
            if(isAndroid=='123'){
              android.requestLocation()
            }else{
              this.geolocation = geolocation;
              if(!that.locationIf){
                // console.log("选择位置")
                that.qiandaoAddress = that.locationdata.address
                that.center.lng = that.locationdata.lng
                that.center.lat = that.locationdata.lat
                var pointSel = new BMap.Point(that.locationdata.lng, that.locationdata.lat);
                var markerSel = new BMap.Marker(pointSel);
                  map.addOverlay(markerSel);
                  map.panTo(pointSel);

              }else{
                // console.log("定位")
                geolocation.getCurrentPosition(function(r){
                  // console.log(r)
                  if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    var marker = new BMap.Marker(r.point);
                    map.addOverlay(marker);
                    map.panTo(r.point);
                    var pt = r.point
                    geoc.getLocation(pt, function(rs){
                      // console.log(rs)
                      var addComp = rs.addressComponents;
                      that.qiandaoAddress = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                      that.center = rs.point
                    }); 
                  }
                  else {
                    alert('failed'+this.getStatus());
                  }        
                },{enableHighAccuracy: true})
              }
              
            }


            
        },
        // 移动开始
        movemapstart(){
            this.biaoji = false;
        },
        // 当用户移动选择某一个点
        // updatemap(e){
        //      // 把localtion值清空
        //     // this.location = {
        //     //     title: "",
        //     //      center: ""
        //     // }
        //     var that = this;
        //     // 先赋值经纬度
        //     const { lng, lat } = e.target.getCenter();
        //     that.center = {
        //     lng ,
        //     lat
        //     }
        //     // 然后根据经纬度查询地图的具体位置
        //     var geoc = new BMap.Geocoder();   
        //     geoc.getLocation(e.target.getCenter(), function(rs){
        //         // console.log(rs)
        //         // 然后赋值给搜索的条件
        //         that.locationdata.title = rs.address;
        //         that.locationdata.center = e.target.getCenter();
        //         that.maptitle = rs.address;
        //     },{enableHighAccuracy: true});  
           
        // },
        //   选择localtion的值
        getlocalsearch(e){
            // console.log(e)
            // this.maptitle = e.address

            this.locationdata.title = e.address + e.title;
            this.locationdata.center = e.point;
        },

        
        onAndroid(){
          // this.$isAndroid = true
          localStorage.setItem('isAndroid','123')
        },
        onGetLocation(lat,lon){
          var that = this
          this.lat = lat
          this.lon = lon
          this.center.lng = lon
          this.center.lat = lat
          var geoc = window.geoc
          var center = Object.assign({},this.center)
          center = new BMap.Point(center.lng,center.lat)
            geoc.getLocation(center, function(rs){
                var addComp = rs.addressComponents;
                that.qiandaoAddress = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                that.center = rs.point
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

        edit(){
          document.getElementById('note').removeAttribute('disabled')
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
          height: 80px;
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
            height: 30px;
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
    position: fixed;
    z-index: 999;
    bottom: 50px;
    width: 100%;
    display: flex;
    height: 190px;
    padding-left: 15px;
    align-items: center;
    >img{
      width: 20px;
      height: 90px;
    }
    ul{
      // height: 100%;
      height: calc(100% - 50px);
      width: calc(100% - 60px);
      margin-left: 10px;
      li{
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p:first-of-type{
          font-size: 14px
        }
        p:nth-of-type(2){
          font-size: 12px;
          color: #aaa;
          input{
            margin-top: 5px;
            padding-left: 5px;
            width: 80%;
            border: none;
            background: #f5f5f5;
            line-height: 28px;
          }
          img{
            width: 18px;
            height: 18px;
            margin-left: 5px;
            vertical-align: middle;
          }
        }
      }
    }
  }
  
  .xianchangSign{
    background: url('../images/qiandaoBg.png') no-repeat;
    width: 90px;
    height: 90px;
    background-size: 90px 90px;
    position: fixed;
    z-index: 1000;
    right: 10px;
    bottom: 200px;
    font-size: 14px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  .map {
    width: 100%;
    height: calc(100vh - 50px);
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