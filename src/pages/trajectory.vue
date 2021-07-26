<template>
  <div class="trajectory">
    <van-nav-bar left-text="员工轨迹" left-arrow fixed @click-left="leftBack" />
    <!-- 当为管理层时，才显示选择人员，默认为自己 -->
    <div class="searchCont" v-if="role != 1">
      <div class="searchDiv" @click="show1 = true">
        <input type="text" placeholder="选择人员" v-model="userName" readonly />
        <div class="arrow"></div>
      </div>
      <!-- <div class="searchDiv" @click="show2 = true">
        <input type="text" placeholder="2021年12月" v-model="selectTime" readonly />
        <div class="arrow"></div>
      </div> -->
    </div>
    <Calendar
      ref="Calendar"
      :markDateMore="arr"
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
    ></Calendar>

    <van-steps direction="vertical" inactive-icon="clock-o" :active="-1">
      <!-- 考勤签到 -->
      <van-step v-if="startsign">
        <p class="time">{{startsign.showTime}}</p>
        <div class="content">
            <div class="top">
              {{userName}}<span class="status">进行了</span>考勤签到
            </div>
            <p class="address" v-if="startsign.address">
              <img src="../images/dingwei.png" alt />{{startsign.address}}
            </p>
            <!-- <p class="address" v-if="startsign.pic">
              <img src="../images/pic.png" alt />
              <span style="color:#1c92ff" @click="imgShow(startsign.pic)">查看{{(startsign.signtype == 1 || startsign.signtype == 2) ? '签到' : '签退'}}照片</span>
            </p> -->
            <div class="startSignImg" v-if="startsign.pic">
              <img :src="startsign.pic" @click="imgShow(startsign.pic)" alt="" />
            </div>
        </div>
      </van-step>
      <!-- 前往了 -->
      <template v-if="polylinePath.length > 0">
        <van-step v-for="(item, index1) in polylinePath" :key="index1">
          <p class="time">{{item.showTime}}</p>
          <div class="content">
              <div class="top">
                {{userName}}<span class="status">前往了</span>{{item.addressMain}}
              </div>
              <div class="tags" v-if="item.time || item.dif">
                <van-tag class="info" round type="primary" v-if="item.time">共停留了{{item.time}}</van-tag>
                <van-tag round type="danger" v-if="item.dif">{{item.dif}}</van-tag>
              </div>
              <p class="address" v-if="item.address">
                <img src="../images/dingwei.png" alt />{{item.address}}
              </p>
          </div>
        </van-step>
      </template>

      <!-- 考勤签退 -->
      <van-step v-if="endsign">
        <p class="time">{{endsign.showTime}}</p>
        <div class="content">
            <div class="top">
              {{userName}}<span class="status">进行了</span>考勤签退
            </div>
            <p class="address" v-if="endsign.address">
              <img src="../images/dingwei.png" alt />{{endsign.address}}
            </p>
            <!-- <p class="address" v-if="endsign.pic">
              <img src="../images/pic.png" alt />
              <span style="color:#1c92ff" @click="imgShow(endsign.pic)">查看{{(endsign.signtype == 1 || endsign.signtype == 2) ? '签到' : '签退'}}照片</span>
            </p> -->
            <div class="startSignImg" v-if="endsign.pic">
              <img :src="endsign.pic" @click="imgShow(endsign.pic)" alt="" />
            </div>
        </div>
      </van-step>

      <!-- 轨迹 -->
      <van-step v-if="polylinePath.length > 0">
        <p class="time">{{lastTime}}</p>
        <div class="content">
          <div class="top">{{userName}}当日移动轨迹图</div>
          <p class="address"><img src="../images/dingwei.png" alt />共计里程<span style="color:#1c92ff;">{{totalDistance/1000}}</span>公里</p>
          <baidu-map class="map-polyline" id="map" @ready="handler1" :center="center1" :zoom="zoom" :scroll-wheel-zoom="true"></baidu-map>


          <p class="top" style="margin-top: 15px;">拜访签到轨迹图</p>
          <div v-if="polylinePathOther.length > 0">
            <p class="address"><img src="../images/dingwei.png" alt />共计里程<span style="color:#1c92ff;">{{totalDistanceOther/1000}}</span>公里</p>
            <baidu-map class="map-polyline" id="map2" @ready="handler2" :center="center2" :zoom="zoom" :scroll-wheel-zoom="true"></baidu-map>
          </div>
          <div style="padding: 10px 0 0 10px;" v-else-if="polylinePathOther.length == 0">暂无轨迹</div>


        </div>
      </van-step>
    </van-steps>

    <div v-if="polylinePath.length == 0 && polylinePathOther.length == 0 && !startsign && !endsign  && !isLoading && !isErr" class="zanwu">
      <span>暂无内容</span>
    </div>
    <div class="no-data-con" v-if="isErr">
      <p>服务异常，请稍后重试！</p>
      <van-button round type="danger" size="small" class="bottom-button" @click="getList()"> 刷新</van-button>
    </div>

    <!-- 选择人员 -->
    <van-action-sheet v-model="show1" title="选择人员">
        <ul class="actionCont">
            <li v-for="(item, index) in userListArray" :key="index" @click="selectPop(item.user_id, item.user_name)">{{item.user_name}}
              <img v-if="item.user_id == user_id && user_id != 0" class="selectImg" src="../images/select.png" alt /></li>
        </ul>
    </van-action-sheet>

    <!-- 选择月份 -->
    <van-popup v-model="show2" position="bottom" style="height: 264px">
      <van-datetime-picker
        v-model="dataNow"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :formatter="formatter"
        v-show="show2"
        @confirm="handleTime"
        @cancel="show2=false"
      />
    </van-popup>

  </div>
</template>

<script>
import Calendar from "@/components/vue-calendar-component";
import { ImagePreview } from 'vant';
import BaiMap from 'vue-baidu-map/components/map/Map.vue';
import calendar from "@/components/vue-calendar-component/calendar";
export default {
  name: "trajectory",
  components: {
    Calendar
  },
  data() {
    return {
      showMaps: false,
      show1: false,
      show2: false,
      userListArray: '',
      selectTime: '',
      minDate: new Date(1900, 1, 1),
      isBirth: false,
      userName: localStorage.getItem("userName"),
      user_id: localStorage.getItem("userId"),
      role: localStorage.getItem("role"), // 1为员工，2管理员
      // arr: [{date:'2021-03-01',className:"mark1"}, {date:'2021-03-04',className:"mark2"},{date:'2021-3-3',className:"mark3"}], // 多种不同的标记
     arr: [],
     startsign: '',
      endsign: '',
      isLoading: false,
      isErr: false,

      imagePreviewCover: '',
      dataNow: new Date(),

      zoom: 10, // 地图内的大小
      lastTime: '',
      center1: {lng: '', lat: ''}, // 地图初始化的位置
      center2: {lng: '', lat: ''}, // 地图初始化的位置
      polylinePath: [], // 组成轨迹的点的数组  Array[{lng:’’,lat:’’}]
      polylinePathOther: [],
      totalDistance: 0,
      totalDistanceOther: 0,
      offsetS1: '',
      offsetS2: '',
    };
  },
  mounted(){
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    document.documentElement.scrollTop = 0;
    let d = new Date();
    let datetime = d.getFullYear() + "年" + (d.getMonth() + 1) + "月";
    this.selectTime = datetime;
    this.getList(this.dataNow)
    this.getDateList(this.dataNow)
    this.getUserList()

    let lastDayMonth = calendar.getDaysInOneMonth(d) + 1; // 获取当前月有多少天
    for(let i=1; i < lastDayMonth; i++){
      let arrItem = {}
      arrItem.date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + i;
      arrItem.className = ''
      this.arr.push(arrItem)
    }
  },
  methods: {
    leftBack() {
      if (this.imagePreviewCover) {
        this.imagePreviewCover.close();
      }
      this.$router.go(-1);
    },
    // 选择员工
    selectPop(user_id, user_name){
      this.user_id = user_id
      this.userName = user_name
      this.show1 = false
      this.getDateList(this.dataNow)
      this.getList(this.dataNow)
    },
    handleTime(value) {
      let d = new Date(value);
      let datetime = d.getFullYear() + "年" + (d.getMonth() + 1) + "月";
      this.selectTime = datetime;
      this.show2 = false;

      let latDateDate = d.getFullYear() + "-" +
        ((d.getMonth()<9)? ('0'+(d.getMonth() + 1)) : (d.getMonth() + 1)) + "-" +
        ((d.getDate()<10)? ('0'+ d.getDate()): d.getDate())

      this.getList(latDateDate)
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    // 员工列表
    getUserList() {
      this.$api.userList({keyword: ''}).then(res => {
        if (res.errno === 0) {
          this.userListArray = res.data;
        }
      });
    },
    // 获取日期标记列表
    getDateList(latdate){
      this.arr = [];
      let latDate = new Date(latdate)
      let lastDayMonth = calendar.getDaysInOneMonth(latDate) + 1; // 获取当前月有多少天
      for(let i=1; i < lastDayMonth; i++){
        let arrItem = {}
        arrItem.date = latDate.getFullYear() + '-' + (latDate.getMonth() + 1) + '-' + i;
        arrItem.className = ''
        this.arr.push(arrItem)
      }

      let latDateDate = latDate.getFullYear() + "-" +
        ((latDate.getMonth()<9)? ('0'+(latDate.getMonth() + 1)) : (latDate.getMonth() + 1))
      let data={}
      data.add_time = latDateDate
      data.user_id = this.user_id
      this.$api.trailDate(data).then(res => {
        if (res.errno === 0) {
          let dataArray = res.data;
          this.arr.forEach(ele => {
            let newArray = ele.date.split('-')
            let newEleDate = newArray[0] + '-' + ((newArray[1]<10)? ('0'+newArray[1]) : newArray[1]) + "-" +
              ((newArray[2]<10)? ('0'+newArray[2]) : newArray[2])

            if(dataArray.length > 0){
              if(dataArray.indexOf(newEleDate) != -1){
                ele.className = 'mark1' // 签到
              }else if((new Date(ele.date)).getDay() != 0 && (new Date(ele.date)).getDay() != 6 && (dataArray.indexOf(newEleDate) == -1) && (new Date(ele.date) <= new Date())){
                ele.className = 'mark3' // 工作日未签到
              }
            }else if((new Date(ele.date)).getDay() != 0 && (new Date(ele.date)).getDay() != 6 && (new Date(ele.date) <= new Date())){
              ele.className = 'mark3' // 工作日未签到
            }

          });
        }
      });
    },
    // 选中某天
    clickDay(data) {
      this.getList(data);
      this.handler3
    },
    // 点击切换月份
    changeDate(data) {
      this.getDateList(data)
      this.getList(data)
    },
    // 查看完整图片
    imgShow(url) {
      let that = this
      this.imagePreviewCover = ImagePreview({
        images: [url],
        asyncClose: true,
        closeable: true,
      });
      this.$nextTick(() =>{
          document.querySelector('.van-image-preview__close-icon--top-right').addEventListener('click', function(e) {
            e.stopPropagation();//取消事件冒泡
            that.imagePreviewCover.close();
          })
      })
    },
    handler1({BMap, map}){
      map.clearOverlays()

      let poly = this.polylinePath;
      if(poly.length > 0){
        for(let i=0; i<poly.length; i++){
          let subItem = poly[i];
          subItem.distance = 0
          // 创建标注对象并添加到地图
          let point = new BMap.Point(subItem.lng, subItem.lat);
          // let myIcon = new BMap.Icon("http://sc.xfd365.com/crmImages/map/" + (i+1) +".png", new BMap.Size(23, 35), {
          //       anchor: new BMap.Size(12.5, 38),// 指定定位位置。
          //       imageSize: new BMap.Size(23,35), // 引用图片实际大小
          // });

          let myIcon = new BMap.Icon("http://sc.xfd365.com/crmImages/marker_bg.png", new BMap.Size(23, 35), {
                anchor: new BMap.Size(12.5, 38),// 指定定位位置。
                imageSize: new BMap.Size(23,35), // 引用图片实际大小
          });
          if((i+1) < 10){
            this.offsetS1 = new BMap.Size(7, 4)
          }else if((i+1) < 100){
            this.offsetS1 = new BMap.Size(4, 4)
          }else if((i+1) < 1000){
            this.offsetS1 = new BMap.Size(0, 4)
          }
          let label = new BMap.Label(i+1, {
            offset: this.offsetS1
          })
          label.setStyle({
            border: 'none',
            background: 'url(http://sc.xfd365.com/crmImages/marker_bg.png)',
            fontWeight: 'bold',
            color: 'block',
          });

          let marker = new BMap.Marker(point, {icon: myIcon});
          marker.setLabel(label)

          map.addOverlay(marker);

          if(i > 0){
            let curPoint = new BMap.Point(subItem.lng, subItem.lat);
            let lastPoint = new BMap.Point(poly[i-1].lng, poly[i-1].lat);
            this.driving(lastPoint,curPoint,poly,i,map, 1)
          }
        }
      }else{
        this.totalDistance = 0
      }
    },
    handler2({BMap, map}){
      map.clearOverlays();
      let poly = this.polylinePathOther;
      if(poly.length > 0){
        for(let i=0; i<poly.length; i++){
          let subItem = poly[i];
          subItem.distance = 0
          // 创建标注对象并添加到地图
          let point = new BMap.Point(subItem.lng, subItem.lat);
          // let myIcon = new BMap.Icon("http://sc.xfd365.com/crmImages/map/" + (i+1) +".png", new BMap.Size(23, 35), {
          //       anchor: new BMap.Size(12.5, 38),// 指定定位位置。
          //       imageSize: new BMap.Size(23,35), // 引用图片实际大小
          // });

          let myIcon = new BMap.Icon("http://sc.xfd365.com/crmImages/marker_bg.png", new BMap.Size(23, 35), {
                anchor: new BMap.Size(12.5, 38),// 指定定位位置。
                imageSize: new BMap.Size(23,35), // 引用图片实际大小
          });
          if((i+1) < 10){
            this.offsetS2 = new BMap.Size(7, 4)
          }else if((i+1) < 100){
            this.offsetS2 = new BMap.Size(4, 4)
          }else if((i+1) < 1000){
            this.offsetS2 = new BMap.Size(0, 4)
          }
          let label = new BMap.Label(i+1, {
            offset: this.offsetS2
          })

          label.setStyle({
            border: 'none',
            background: 'none',
            fontWeight: 'bold',
            color: 'block',
          });

          let marker = new BMap.Marker(point, {icon: myIcon});
          marker.setLabel(label)
          map.addOverlay(marker);


          if(i > 0){
            let curPoint = new BMap.Point(subItem.lng, subItem.lat);
            let lastPoint = new BMap.Point(poly[i-1].lng, poly[i-1].lat);
            this.driving(lastPoint,curPoint,poly,i,map, 2)
          }
        }
      }else{
        this.totalDistanceOther = 0
      }

    },
    getList(latdate){
      this.totalDistance = 0
      this.totalDistanceOther = 0
      let latDate = new Date(latdate)
      let latDateDate = latDate.getFullYear() + "-" +
        ((latDate.getMonth()<9)? ('0'+(latDate.getMonth() + 1)) : (latDate.getMonth() + 1)) + "-" +
        ((latDate.getDate()<10)? ('0'+ latDate.getDate()): latDate.getDate())
      this.startsign = ''
      this.endsign = ''
      this.polylinePath = []
      this.polylinePathOther = []
      if(this.isLoading) return
      let data={}
      this.isLoading = true
      this.isErr = false
      data.add_time = latDateDate
      data.user_id = this.user_id
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      this.$api.userTrail(data).then(res=>{
        this.isErr = false
        this.isLoading = false
        this.$toast.clear()
        if(res.errno === 0){
          if(res.startsign){
            res.startsign.showTime = res.startsign.datetime.slice(11, 16)
          }
          this.startsign = res.startsign
          if(res.endsign){
            res.endsign.showTime = res.endsign.datetime.slice(11, 16)
          }
          this.endsign = res.endsign;
          this.polylinePath = res.lngdata
          if(res.lngdata.length > 0){
            res.lngdata.forEach(ele => {
              ele.showTime = ele.add_time.slice(10, 16);
              ele.addressMain = ele.city + ele.district
            });
            // 轨迹跟踪最后时间
            this.lastTime = res.lngdata[0].add_time.slice(11, 16)

            // 获取首尾坐标点的中点坐标定义为中心坐标点
            let lng1 = parseFloat(res.lngdata[0].lng);
            let lat1 = parseFloat(res.lngdata[0].lat);

            let lng2 = parseFloat(res.lngdata[res.lngdata.length - 1].lng);
            let lat2 = parseFloat(res.lngdata[res.lngdata.length - 1].lat);

            let lngca = (Math.max(lng1,lng2)-Math.min(lng1,lng2))/2;
            let latca = (Math.max(lat1,lat2)-Math.min(lat1,lat2))/2;
            // 中心点
            this.center1 = {lng: Math.min(lng1,lng2)+lngca, lat: Math.min(lat1,lat2)+latca}
            this.zoom = 10
          }

          this.polylinePathOther = res.followData;
          if(res.followData.length > 0){
            // 获取首尾坐标点的中点坐标定义为中心坐标点
            let lng1 = parseFloat(res.followData[0].lng);
            let lat1 = parseFloat(res.followData[0].lat);

            let lng2 = parseFloat(res.followData[res.followData.length - 1].lng);
            let lat2 = parseFloat(res.followData[res.followData.length - 1].lat);

            let lngca = (Math.max(lng1,lng2)-Math.min(lng1,lng2))/2;
            let latca = (Math.max(lat1,lat2)-Math.min(lat1,lat2))/2;
            // 中心点
            this.center2 = {lng: Math.min(lng1,lng2)+lngca, lat: Math.min(lat1,lat2)+latca}
          }
        }
      }).catch(err =>{
        console.log(err)
        this.isErr = true
        this.isLoading = false
        this.$toast.clear()
      })
    },
    // 计算路线距离
    driving(po1,po2, poly, subIndex,map, id){
      let that = this
      let driving = new BMap.DrivingRoute(map, {
          renderOptions: {
              map : map,
          } ,
          onMarkersSet: function(routes){
            map.removeOverlay(routes[0].marker); //删除起点
            map.removeOverlay(routes[routes.length-1].marker); //删除终点
          },
          onSearchComplete: function(results){
              if (driving.getStatus() == BMAP_STATUS_SUCCESS){
                  // 获取第一条方案
                  var plan = results.getPlan(0);
                  // console.log(plan.getDistance(false))
                  var distance = Math.round(plan.getDistance(false));
                  if(id == 1){
                    that.totalDistance += distance
                  }else if(id == 2){
                    that.totalDistanceOther += distance
                  }
                  poly[subIndex].distance = distance
              }
          },
      });
      driving.search(po1,po2);
  },


  },
};
</script>
<style lang="less">
.trajectory {
  min-height: calc(100% - 60px);
  padding-top: 50px;
  padding-bottom: 10px;
  background: #f5f5f5;
  .van-nav-bar {
    background: url(../images/msgBg.jpg) no-repeat;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-size: 100% 50px;
    z-index: 9;
    .van-nav-bar__text {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__right img {
      width: 18px;
    }
  }
  .searchCont {
    display: flex;
    padding: 15px;
    background: #ffffff;
    .searchDiv {
      position: relative;
      &:nth-child(1) {
        margin-right: 10px;
      }
      .arrow{
        position: absolute;
        right: 10px;
        top: 15px;
        width: 0;
        height: 0;
        border: 5px solid;
        border-color:#bbbbbb transparent  transparent transparent;
      }
      input{
        height: 30px;
        border: 1px solid #eeeeee;
        width: 100px;
        font-size: 14px;
        padding-left: 10px;
        border-radius: 30px;
        background: #ffffff;
      }
      input:-ms-input-placeholder {
        color: #aaaaaa;
      }
      ::-webkit-input-placeholder {
        color: #aaaaaa;
      }
    }
  }
  .van-action-sheet__header{
    position: fixed;
    width: 100%;
    background: #ffffff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom: 1px solid #eeeeee;
    font-size: 15px;
  }
  .van-action-sheet__content{
    padding-top: 50px;
    padding-bottom: 10px;
  }
  .van-image-preview__cover{
    width: 48px;
    height: 48px;
    text-align: center;
    line-height: 54px;
    bottom: 12% !important;
    left: calc(50% - 24px) !important;
    top: auto;
    font-size: 24px;
    color: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 50%;
  }
  .van-overlay{
    z-index: 10;
  }
  .van-picker {
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 999;
    }
  .van-step--vertical .van-step__circle-container{
    font-size: 15px;
    top: 38px;
  }
  .van-step--vertical:first-child::before{
    width: 0;
  }
  .van-step--vertical:not(:last-child)::after{
    border-bottom-width: 0
  }
  .van-steps {
    background: #f5f5f5;
    padding-left: 70px;
    .van-step--vertical{
      position: relative;
      .van-step__line{
        top: 43px;
        background-color: #ddd;
        height: calc(100% - 12px);
      }
    }
    .startSignImg{
      padding: 6px 10px 0 30px;
      img{
        width: 50px;
        height: 50px;
      }
    }
    .time {
      color: #aaaaaa;
      position: absolute;
      left: -60px;
      top: 28px;
    }
    .content {
      margin-top: 5px;
      padding: 15px 0 15px 0;
      border-radius: 8px;
      border-top-left-radius: 0;
      background: #ffffff;
      position: relative;
    }
    .tags {
      padding: 10px 10px 5px 10px;
      .info {
        background: #666;
        color: #fff
      }
    }
    .top {
      padding: 0 10px;
      color: #444444;
      span.status {
        color: #1c92ff;
        background: rgba(28, 146, 255, 0.1);
        border: 1px solid rgba(28, 146, 255, 1);
        border-radius: 20px;
        padding: 2px 8px;
        margin: 0 20px;
        position: relative;
        &::before {
          position: absolute;
          left: -15px;
          top: 10px;
          width: 15px;
          height: 2px;
          content: " ";
          background: url("../images/track_bgl.png") no-repeat left;
        }
        &::after {
          position: absolute;
          right: -15px;
          top: 10px;
          width: 15px;
          height: 2px;
          content: " ";
          background: url("../images/track_bgr.png") no-repeat right;
        }
      }
    }
    .note {
      padding: 0 10px;
      margin-top: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &.noteNolimit{
        white-space: normal;
      }
    }
    .address {
      margin-top: 8px;
      position: relative;
      padding-left: 30px;
      padding-right: 10px;
      img {
        position: absolute;
        left: 10px;
        top: 2px;
        height: 14px;
      }
    }
    .van-uploader {
      margin-left: 10px;
      margin-top: 10px;
    }
    .van-uploader__upload,
    .van-uploader__preview-image {
      width: 56px;
      height: 56px;
      border-radius: 0;
    }
  }
  .zanwu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10%;
  }
  .no-data-con {
    text-align: center;
    margin-top: 15px;
    color: #8f8b8b;
    font-size: 13px;
    .van-button{
      margin-top: 10px;
    }
  }
  .actionCont{
    padding: 0 15px;
    line-height: 40px;
    font-size: 14px;
    .selectImg{
      width: 20px;
      float: right;
      margin-top: 8px;
    }
  }
  .map-polyline{
    margin: 10px 10px 0 10px;
    height: 160px;
  }
  .van-overlay {
    z-index: 10;
  }
  .van-picker {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
  }
}
</style>
