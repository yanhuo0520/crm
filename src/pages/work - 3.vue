<template>
  <div class="work" :style='{height: deviceHeight + "px"}'>
    <ul class="sign">
      <li :class="curr==0?'active':''" @click="curr=0">考勤签到</li>
      <li :class="curr==1?'active':''" @click="clickSign">签到列表</li>
    </ul>

    <div class="waiqin" v-show="curr==0">
      <baidu-map class="map" id="map" :center="center" :zoom="zoom" @ready="handler" @click="selAddress">
        <!-- 障碍物的设置。因为要跟随滑动，以及某个点的提醒 -->
        <bm-marker :position="center" :dragging="true"></bm-marker>
      </baidu-map>
      <van-notice-bar left-icon="info-o" mode="link" v-if="locOff || locPermission" @click="handleLoc()">
        <span style="margin-left:10px">{{locOff ? '手机定位服务被关闭,去处理' : '手机定位权限被关闭,去处理' }}</span>
        <template #left-icon>
          <van-icon name="warning" color="red" size="20"></van-icon>
        </template>
      </van-notice-bar>
      <div class="qiandao">
        <ul>
          <li @click="selBtn">地点微调</li>
          <li>
            <p @click="showAddrDialog">{{qiandaoAddress ? qiandaoAddress : '未知地址(点击手动输入)'}}</p>

            <van-cell :title="((signtype == 1 || signtype == 2) ? '签到': '签退') + '照片:'" class="pic-con"
              v-if="curSignUrl">
              <!-- <img :src="curSignUrl" @click.stop="imgShow(curSignUrl)" alt=""> -->
              <span style="color:#1c92ff"
                @click.stop="imgShow(curSignUrl)">查看{{(signtype == 1 || signtype == 2) ? '签到': '签退'}}图片</span>
            </van-cell>

            <van-field rows="2" autosize type="textarea" maxlength="30" label="备注:" placeholder="填写备注" show-word-limit
              v-model="note" class="noteCont" />
             <van-cell center title="是否用车" class="cheCell">
               <template #right-icon>
                 <van-switch v-model="ifUseChe" :disabled="ifHasUse" size="20" @change="changeOther()"  />
               </template>
             </van-cell>
          </li>
          <li></li>
        </ul>
      </div>
      <template v-if="!locOff && !locWorking && !locPermission && getDistance <= 1000">
        <div class="xianchangSign" :class="{'ifRed': ifRed}" @click="goQiandao()">
          <!-- <van-uploader :after-read="upLoadImg" capture="camera"> -->
          <p class="signBtn">{{signText}}</p>
          <p class="currentTime">{{currentTime}}</p>
          <!-- </van-uploader> -->
        </div>
      </template>
      <template v-else>
        <div class="xianchangSign" @click="xianchangSign" :style="locWorking ? '' : 'filter:grayscale(1)'">
          <p class="signBtn">{{locWorking ? '定位中' : '无法打卡'}}</p>
          <p class="currentTime">{{currentTime}}</p>
        </div>
      </template>
      <p class="num-tip" v-if="countSign == 0">今日你还未签到</p>
      <p class="num-tip" v-else>今日你已签到<span>{{countSign}}</span>次</p>

    </div>

    <van-popup class="tipCont" v-model="showSelect" :closeable="tipCloseable" :close-on-click-overlay="tipCloseable" @close="closeSelect()">
      <img src="../images/camera.png" class="tipIMg" />
      <div class="content">
        <div class="item">
          <p class="title">
            <template v-if="signtype == 1 || signtype == 2">签到</template>
            <template v-else> 签到</template>
          </p>
          <div class="btnCont">
            <template v-if="img1">
              <img :src="img1" class="upIMg" @click="imgShow(img1)" />
            </template>
            <template v-else>
              <div @click="requestCamera(1)">
                <img src="../images/add1.png" class="imgIcon" />
                <p>上传<template v-if="signtype == 1 || signtype == 2">签到</template>
                <template v-else>签到</template>图片</p>
              </div>
            </template>
          </div>
        </div>
        <div class="item" v-if="ifUseChe">
          <div class="leftInput">
            <p class="title"><template v-if="signtype == 1 || signtype == 2">签到</template>
            <template v-else> 签到</template>里程</p>
            <p class="m-title">公里数</p>
            <input type="number" v-model="inGongli" class="inNUm" />
          </div>

          <div class="btnCont">
            <template v-if="img2">
              <img :src="img2" class="upIMg" @click="imgShow(img2)" />
            </template>
            <template v-else>
              <div @click="requestCamera(2)">
                <img src="../images/add1.png" class="imgIcon" />
                <p>上传车辆里程照片</p>
              </div>
            </template>
          </div>
        </div>
      </div>
      <img src="../images/close.png" class="closeIMg" @click="showSelect = false, closeSelect()" />
    </van-popup>


    <div class="signList" v-show="curr==1">
      <img src="../images/mapBg.png" alt="" width="100%">
      <div v-if="list != ''">
        <div class="list" v-for="(item,index) in list" :key="index">
          <p>
            <img src="../images/avatar1.png" alt="">
            <span>{{userName}}</span>
            <!-- <span>销售经理</span> -->
          </p>
          <div>
            <ul>
              <li v-if="item.customerName">
                <img src="../images/customerName.png" alt="">
                <span>{{item.customerName}}</span>
              </li>
              <li>
                <img src="../images/time.png" alt="">
                <span>{{item.add_time}}</span>
              </li>
              <li>
                <img src="../images/dingwei.png" alt="">
                <span>{{item.address}}</span>
              </li>
              <li v-if="item.pic">
                <img src="../images/pic.png" alt="">
                <span @click="imgShow(item.pic)"
                  style="color:#1c92ff">查看{{(item.signtype == 1 || item.signtype == 2) ? '签到': '签退'}}图片</span>
              </li>
              <li v-if="item.note">
                <img src="../images/beizhu.png" alt="">
                <span>{{item.note}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else class="zanwu">
        <img src="../images/zanwu.png" alt="">
        <span>暂无内容</span>
      </div>
      <van-loading v-if="loading" size="24px">加载中...</van-loading>

    </div>

    <van-dialog v-model="isDialogShow" title="提示" :showConfirmButton="false" :close-on-click-overlay="true">
      <div class="dialog-desc">{{locOff ? '定位服务没有开启,是否允许重新定位' : '定位权限没有开启,是否允许重新获取'}}</div>
      <div class="btn-con">
        <van-button type="default" @click="locGD">刷新定位</van-button>
        <van-button type="info" @click="handleLoc">允许</van-button>
      </div>
    </van-dialog>
    <tabbar :idx="1" v-if="hidshowFooter"></tabbar>

    <van-dialog v-model="qiaindaoAddrDialog" title="提示" show-cancel-button @confirm="changeAddrConfirm">
      <div class="addr-dialog-desc">当前定位未获取到详细地址,请手动输入</div>
      <van-field class="addr-dialog-input" v-model="dialogAddr" label="签到地址" placeholder="请输入签到地址" />
    </van-dialog>
  </div>
</template>
<script>
  import tabbar from "@/components/bottom";
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import {
    ImagePreview
  } from 'vant';
  export default {
    name: "work",
    components: {
      tabbar
    },
    data() {
      return {
        deviceHeight: document.body.clientHeight,
        curr: 0,
        loading: 0,
        center: {
          lng: '',
          lat: ''
        }, // 地图初始化的位置
        zoom: 14, // 地图内的大小
        maptitle: "", // 这个是选择某个点的提醒以及搜索附近的东西的依据
        geolocation: "",

        getLocationAddress: '',
        qiandaoAddress: '',
        note: '',
        list: [],
        userName: '',
        lat: '',
        lon: '',
        ifChange: false, // 是否进行地点微调
        getDistance: 0, // 微调距离

        page: 1,
        pageSize: 10,
        totalPage: 1,

        signText: '考勤签到',
        signtype: '',
        ifRed: false,
        timer: "", //定义一个定时器的变量
        currentTime: '', // 获取当前时间
        currentDate: '',
        countSign: 0,
        ifLocation: false,

        locOff: false, // 定位服务是否关闭
        locWorking: true, //  是否为定位中
        locPermission: false, //  定位权限是否关闭
        isDialogShow: false, // 获取权限弹框
        qiaindaoAddrDialog: false, // 地址输入弹窗
        dialogAddr: '', // 地址弹窗内输入的地址(单独声明个变量不用qiandaoAddress,为了防止以后希望手动输入地址简化省市区的输入)

        docmHeight: document.documentElement.clientHeight, //默认屏幕高度
        showHeight: '0', //实时屏幕高度
        hidshowFooter: true, //显示或者隐藏footer,
        curSignUrl: '', // 签到照片
        imagePreviewCover: '',

        ifUseChe: false,
        ifHasUse: false, // 是否已经进行过签到用车，用户判断签退的时候上传签退用车图片
        showSelect: false,
        tipCloseable: false,
        upId: 1, // 1--上班签到图片，2--公里数图片
				img1: '', // 签到照片
        inGongli: '',
				img2: '',
      };
    },
    mounted() {
      this.userName = localStorage.getItem('userName')
      window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法

      // window.onAndroid = this.onAndroid // 判断打开设备是否是Android手机
      // window.onGetLocation = this.onGetLocation
      window.locGD = this.locGD
      window.locationGDAll = this.locationGDAll
      window.locServerOff = this.locServerOff
      window.locPermissionError = this.locPermissionError
      window.locIsWorking = this.locIsWorking
      window.savePic64 = this.savePic64
      window.requestCamera = this.requestCamera
      window.onGetPic = this.onGetPic
      window.geoc = null
      window.convertor = null
      window.vue = this

      window.addEventListener("scroll", this.scrollBottomWork);

      this.countSignToday();

      window.onresize = () => { // 实时屏幕高度
        this.showHeight = document.body.clientHeight
      }

    },
    methods: {
      // 主页面返回退出应用
      leftBack() {
        let that = this
        var first = null
        if (this.imagePreviewCover) {
          this.imagePreviewCover.close();
        }
        window.leftBack = function() {
          if (!first) {
            first = new Date().getTime();
            that.$toast("再按一次退出应用");
            setTimeout(function() {
              first = null;
            }, 1500);
          } else {
            if (new Date().getTime() - first < 1500) {
              android.closeWindow();
            }
          }
        }

      },
      scrollBottomWork(e) {
        let that = this;
        var scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop;
        // console.log(scrollTop)
        let clientHeight = document.documentElement.clientHeight; /*当前可视高度*/
        let scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); /*文档完整的高度*/
        if ((scrollHeight - clientHeight - scrollTop) <= 0 && that.page < that.totalPage) {
          that.page += 1
          that.loading = 1
          that.getList();
        }
      },
      // 点击地点微调，显示可调范围
      selBtn(e) {
        this.ifChange = true;
        window.map.clearOverlays();
        var circle = new BMap.Circle(this.center, 1000, {
          strokeColor: "#1C92FF",
          strokeWeight: 2,
          strokeOpacity: 0.5
        }); //创建圆
        window.map.addOverlay(circle);
        var marker = new BMap.Marker(this.center);
        window.map.addOverlay(marker);
      },
      // 微调签到地点
      selAddress(e) {
        let that = this
        if (that.ifChange == false) {
          return
        }
        map.clearOverlays();
        var circle = new BMap.Circle(this.center, 1000, {
          strokeColor: "#1C92FF",
          strokeWeight: 2,
          strokeOpacity: 0.5
        }); //创建圆
        map.addOverlay(circle);
        var markerCenter = new BMap.Marker(this.center);
        map.addOverlay(markerCenter);

        // var pointA = new BMap.Point(that.lon, that.lat);  // 创建点坐标A
        var pointB = new BMap.Point(that.center.lng, that.center.lat); // 创建中心坐标
        // let getDistance = (map.getDistance(pointA,pointB)).toFixed(2) // //获取两点距离,保留小数点后两位
        // // console.log(getDistance)
        // that.getDistance = getDistance
        // if(getDistance > 1000){
        //   that.$toast("超过可微调范围！")
        // }

        geoc.getLocation(e.point, function(rs) {
          // console.log(rs)
          if (rs.surroundingPois.length > 0) { // 附近的POI点，默认取第一个值
            that.lat = rs.surroundingPois[0].point.lat
            that.lon = rs.surroundingPois[0].point.lng
            var marker = new BMap.Marker(rs.surroundingPois[0].point);
            map.addOverlay(marker);

            var pointA = new BMap.Point(that.lon, that.lat); // 创建点坐标A
            let getDistance = (map.getDistance(pointA, pointB)).toFixed(2) // //获取两点距离,保留小数点后两位
            // console.log(getDistance)
            that.getDistance = getDistance
            if (getDistance > 1000) {
              that.$toast("超过可微调范围！")
            }
            if (rs.surroundingPois[0].address.length > 1) { // eg:地铁站address为' '
              that.qiandaoAddress = rs.surroundingPois[0].address + '(' + rs.surroundingPois[0].title + ')';
            } else {
              that.qiandaoAddress = rs.surroundingPois[0].title;
            }

          } else {
            that.lat = rs.point.lat
            that.lon = rs.point.lng
            var marker = new BMap.Marker(rs.point);
            map.addOverlay(marker);

            var pointA = new BMap.Point(that.lon, that.lat); // 创建点坐标A--大渡口区
            let getDistance = (map.getDistance(pointA, pointB)).toFixed(2) // //获取两点距离,保留小数点后两位
            // console.log(getDistance)
            that.getDistance = getDistance
            if (getDistance > 1000) {
              that.$toast("超过可微调范围！")
            }
            that.qiandaoAddress = rs.address;
          }
        });
      },
      // 统计今日签到次数
      countSignToday() {
        this.$api.countSignToday().then(res => {
          if (res.errno === 0) {
            this.countSign = res.data
            // is_car 	1.用车2.不用车
            if(res.data.is_car == 1){
              // 已经进行过签到用车,签退的时候必传用车图片
              this.ifHasUse = true
              this.ifUseChe = true
            }else{
              this.ifHasUse = false
            }
          }
        })
      },
      // 由于百度地图 JS API 只有 JSONP 一种加载方式，因此 BaiduMap 组件及其所有子组件的渲染只能是异步的。
      // 因此，请使用在组件的 ready 事件来执行地图 API 加载完毕后才能执行的代码，不要试图在 vue 自身的生命周期中调用 BMap 类，更不要在这些时机修改 model 层。
      handler({
        BMap,
        map
      }) {
        window.map = map; //注册为全局
        var that = this; // map方法中的this指向不对。所有申明一个。。小细节的东西
        that.loading = 0
        // 刚进入页面中的定位，需要向用户授权
        var point = new BMap.Point(113.39852, 34.897445);

        var geolocation = new BMap.Geolocation();
        var geoc = new BMap.Geocoder();
        window.geoc = geoc

        var convertor = new BMap.Convertor();
        window.convertor = convertor

        if (typeof android != 'undefined') {
          android.requestLocation()
        } else {
          this.geolocation = geolocation;
          geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              var pt = r.point
              that.center = r.point
              geoc.getLocation(pt, function(rs) {
                if (rs.surroundingPois.length > 0) { // 附近的POI点，默认取第一个值
                  that.lat = rs.surroundingPois[0].point.lat
                  that.lon = rs.surroundingPois[0].point.lng
                  var marker = new BMap.Marker(rs.surroundingPois[0].point);
                  map.addOverlay(marker);
                  map.panTo(rs.surroundingPois[0].point);
                  if (rs.surroundingPois[0].address.length > 1) { // eg:地铁站address为' '
                    that.getLocationAddress = rs.surroundingPois[0].address + '(' + rs.surroundingPois[0]
                      .title + ')';
                    that.qiandaoAddress = rs.surroundingPois[0].address + '(' + rs.surroundingPois[0].title +
                      ')';
                  } else {
                    that.getLocationAddress = rs.surroundingPois[0].title;
                    that.qiandaoAddress = rs.surroundingPois[0].title;
                  };
                } else {
                  that.lat = rs.point.lat
                  that.lon = rs.point.lng
                  var marker = new BMap.Marker(rs.point);
                  map.addOverlay(marker);
                  map.panTo(rs.point);
                  that.getLocationAddress = rs.address;
                  that.qiandaoAddress = rs.address;
                }
              });
            } else {
              alert('failed' + this.getStatus());
            }
          }, {
            enableHighAccuracy: true
          })

        }
      },

      // 执行Android方法获取位置
      locGD() {
        this.isDialogShow = false;
        this.locWorking = true;
        android.requestLocation();
      },
      // 执行Android方法获取位置----（高德坐标转换成百度坐标）
      locationGDAll(location) {
        let that = this
        let X_PI = Math.PI * 3000.0 / 180.0;
        let x = location.longitude,
          y = location.latitude;
        let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
        let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
        that.center.lng = z * Math.cos(theta) + 0.0065;
        that.center.lat = z * Math.sin(theta) + 0.006;
        that.lon = z * Math.cos(theta) + 0.0065;
        that.lat = z * Math.sin(theta) + 0.006;

        that.getLocationAddress = location.address
        that.qiandaoAddress = location.address
        that.locOff = false;
        that.locWorking = false;
        that.locPermission = false;
      },
      // 执行Android方法定位未开启
      locServerOff() {
        this.locOff = true
        this.locWorking = false
        this.locPermission = false
        this.isDialogShow = true
      },
      // 执行Android方法未获取定位权限
      locPermissionError() {
        this.locPermission = true
        this.locWorking = false
        this.locOff = false
        this.isDialogShow = true
      },
      // 执行Android方法正在定位
      locIsWorking() {
        this.locWorking = true
        this.locOff = false
        this.locPermission = false
        this.$toast("正在获取定位")
      },
      // 处理安卓定位
      handleLoc() {
        if (this.locOff) {
          android.toOpenLocServer();
          return
        }
        if (this.locPermission) {
          android.openSetApp()
          return
        }
      },
      // 调用安卓方法拍照
      requestCamera(id) {
        this.upId = id
        if(!this.$isAndroid()){
          this.$toast("请用手机端打开")
          return
        }
        if(id == 1){
          let curDate = this.dateFormat('yyyy-MM-dd hh:mm:ss')
          android.requestPic(localStorage.getItem('userName') + ' ' + curDate, '#ffffff')
        }else if(id == 2){
          if(!this.inGongli){
            this.$toast("请先输入里程数再进行拍照")
            return
          }
          android.requestPic(localStorage.getItem('userName') + '输入公里数： ' + this.inGongli, '#ffffff')
        }

      },
      // 获取照片
      onGetPic(b) {
        let curSignUrl = 'data:image/jpeg;base64,' + b
        let blod = this.base64ToBlob(curSignUrl)
        let file = this.blobToFile(blod, 'sign' + new Date().getTime())
        this.upLoadImg(file)
      },
      // base64转二进制
      base64ToBlob(base64) {
        let parts = base64.split(';base64,');
        let contentType = parts[0].split(':')[1];
        let raw = window.atob(parts[1]);
        let rawLength = raw.length;
        let uInt8Array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {
          type: contentType
        });
      },
      // 二进制转file
      blobToFile(blob, fileName) {
        let file = blob
        file.lastModifiedDate = new Date();
        file.name = fileName;
        return file;
      },
      goQiandao(){
        if(!this.ifUseChe){
          this.curSignUrl = ''
          this.requestCamera(1)
        }else{
          this.showSelect = true
        }
        // this.img1 = ''
        // this.curSignUrl = ''
        // this.inGongli = ''
        // this.img2 = ''
        // if(this.ifUseChe){
        //   this.showSelect = true
        // }else{
        //   this.requestCamera(1)
        // }

      },
      changeOther(){
        this.img1 = ''
        this.curSignUrl = ''
        this.inGongli = ''
        this.img2 = ''
      },
      closeSelect(){

      },

      // 点击切换签到列表
      clickSign() {
        this.$toast.loading({
        	message: '加载中...',
        	forbidClick: true,
        	duration: 0,
        });
        this.curr = 1
        this.page = 1
        this.list = []
        this.getList();
      },
      getList() {
        let that = this;
        this.$api.signList({
          page: that.page,
          size: that.pageSize
        }).then(res => {
          this.$toast.clear()
          that.totalPage = res.data.total
          if (res.errno === 0) {
            if (that.page == 1) {
              that.loading = 0;
              that.list = res.data.data
            } else if (res.data.data.length > 0) {
              that.list.push(...res.data.data)
              if (res.data.data.length < that.pageSize) {
                that.loading = 0
              }
            } else if (that.page == that.totalPage) {
              that.loading = 0
            }
          }
        });
      },
      // 查看完整图片
      imgShow(url) {
        let that = this
        this.imagePreviewCover = ImagePreview({
          images: [url],
          asyncClose: true,
          closeable: true,
        });
        this.$nextTick(() => {
          document.querySelector('.van-image-preview__close-icon--top-right').addEventListener('click', function(
          e) {
            e.stopPropagation(); //取消事件冒泡
            that.imagePreviewCover.close();
          })
        })
      },
      // 上传拍照
      upLoadImg(file) {
        this.$toast.loading({
          message: '正在上传照片...',
          forbidClick: true,
          duration: 0,
        });
        let formdata = new FormData();
        formdata.append("file", file);
        formdata.append("token", localStorage.getItem('token'));
        const instance = this.$axios.create({
          //withCredentials:true
        });
        instance.post("http://crm.xfd365.com/user/base/uploadImg", formdata).then(res => {
          this.$toast.clear()
          if (res.data.errno === 0) {
            // this.$toast(res.errmsg)
            if(this.upId == 1){
              this.img1 = res.data.data.url
              this.curSignUrl = res.data.data.url
            }else if(this.upId == 2){
              this.img2 = res.data.data.url
            }
            if(!this.ifUseChe){
              this.xianchangSign()
            }

          } else {
            let text = ((this.signtype == 1 || this.signtype == 2) ? '签到' : '签退')
            this.$toast('上传照片失败，请重新' + text)
          }
        }).catch(() => {
          this.$toast.clear()
        });
      },
      // 现场签到
      xianchangSign() {
        this.$dialog.confirm({
            message: '弹窗内容',
          })  .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
        if (!this.locOff && !this.locWorking && !this.locPermission) {
          if (this.getDistance > 1000) {
            this.$toast("超过可微调范围！")
            return
          }
          if (this.lon && this.lat) {
            if (!this.qiandaoAddress) {
              this.qiaindaoAddrDialog = true
              return
            }
          } else {
            this.$toast('当前位置，无法获取地址,请稍后重试')
            if (typeof android != 'undefined') {
              android.requestLocation()
            }
            return
          }
          if(!img1){
            this.$toast("请上传签到照片")
            return
          }
          if(this.ifUseChe && !img2){
            this.$toast("请上传公里照片")
            return
          }
          this.$toast.loading({
            message: '签到中...',
            forbidClick: true,
            duration: 0,
          });
          let data = {}
          data.address = this.qiandaoAddress
          data.location = this.lon + ',' + this.lat
          data.note = this.note
          data.signtype = this.signtype
          data.pic = this.img1
          data.pic2 = this.img2


          alert(JSON.stringify(data))
          return

          let work = android.isKeepLocWorking(); //手机持续定位是否开启
          this.$api.signIn(data).then(res => {
            this.$toast.clear()
            this.showSelect = false
            if (res.errno === 0) {
              // 签到开启定位，签退关闭定位
              if (!work && (this.signtype == 1 || this.signtype == 2)) {
                android.startKeepLoc(localStorage.getItem('token'), '300') // 开启手机持续定位，token为登录,5分钟300s定位一次
                this.$toast("持续定位已开启")
              } else if (work && (this.signtype == 3 || this.signtype == 4)) {
                android.stopKeepLoc(); //关闭手机持续定位
                this.$toast("持续定位已关启")
              }
              // this.$router.replace({path: "/work"})
              // location.reload()
              let text = ((this.signtype == 1 || this.signtype == 2) ? '签到' : '签退')
              this.$toast({
                message: text + '成功',
                icon: 'success'
              })
              this.countSignToday()
              window.map.clearOverlays();
              var markerCenter = new BMap.Marker(this.center);
              map.addOverlay(markerCenter);
              this.ifChange = false
              this.qiandaoAddress = this.getLocationAddress
              this.lon = this.center.lng
              this.lat = this.center.lat
              this.note = ''
            } else {
              this.$toast(res.errmsg)
            }
          }).catch(() => {
            this.$toast.clear()
            this.$toast('签到接口请求失败')
          })
        } else {
          this.locGD()
        }
      },
      // 手动输入地址确定
      changeAddrConfirm() {
        this.qiandaoAddress = this.dialogAddr
        this.xianchangSign()
      },
      // 若未能获取签到地址详情 可点击弹窗输入地址
      showAddrDialog() {
        if (this.locOff || this.locPermission) {
          this.$toast('请检查是否开始定位服务/权限')
          return
        }
        if (this.locWorking) {
          this.$toast('正在定位中,请先等待')
          return
        }
        if (!this.qiandaoAddress) {
          this.qiaindaoAddrDialog = true
        }
      },
      /**
       * 日期格式转换
       * @param fmt 要处理成的日期格式 例: 'yyyy-MM-dd hh:mm:ss'
       * @param date 要处理的日期，需Date类型
       */
      dateFormat(fmt, date, hType) {
        date = date ? date : new Date();
        let o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": hType ? (date.getHours() % 12 === 0 ? 12 : date.getHours() % 12) : date.getHours(), //小时
          "H+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds(), //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds() //毫秒
        };
        let week = {
          "0": "/u65e5",
          "1": "/u4e00",
          "2": "/u4e8c",
          "3": "/u4e09",
          "4": "/u56db",
          "5": "/u4e94",
          "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") :
            "") + week[date.getDay() + ""]);
        }
        for (let k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
            .length)));
          }
        }
        return fmt;
      }

    },
    created() {
      var that = this; //声明一个变量指向Vue实例this，保证作用域一致
      that.currentTime = new Date().getHours() + ":" +
        ((new Date().getMinutes() > 9) ? new Date().getMinutes() : '0' + new Date().getMinutes()) + ":" +
        ((new Date().getSeconds() > 9) ? new Date().getSeconds() : '0' + new Date().getSeconds());
      that.currentDate = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()

      if (new Date(Date.parse(that.currentDate + ' ' + that.currentTime)) > new Date(Date.parse(that.currentDate +
          ' 00:00:00')) && new Date(Date.parse(that.currentDate + ' ' + that.currentTime)) <= new Date(Date.parse(that
          .currentDate + ' 9:00:59'))) {
        that.signText = "考勤签到";
        that.signtype = 1;
        that.ifRed = false;
      } else if (new Date(Date.parse(that.currentDate + ' ' + that.currentTime)) > new Date(Date.parse(that
          .currentDate + ' 9:00:59')) && new Date(Date.parse(that.currentDate + ' ' + that.currentTime)) <= new Date(
          Date.parse(that.currentDate + ' 12:00:59'))) {
        that.signText = "考勤签到";
        that.signtype = 2;
        that.ifRed = true;
      } else if (that.countSign == 0 && new Date(Date.parse(that.currentDate + ' ' + that.currentTime)) > new Date(Date
          .parse(that.currentDate + ' 12:00:59')) && new Date(Date.parse(that.currentDate + ' ' + that.currentTime)) <=
        new Date(Date.parse(that.currentDate + ' 13:30:59'))) {
        that.signText = "开始上班";
        that.signtype = 2;
        that.ifRed = true;
      } else if (that.countSign != 0 && new Date(Date.parse(that.currentDate + ' ' + that.currentTime)) > new Date(Date
          .parse(that.currentDate + ' 12:00:59')) && new Date(Date.parse(that.currentDate + ' ' + that.currentTime)) <=
        new Date(Date.parse(that.currentDate + ' 18:00:59'))) {
        that.signText = "考勤签退";
        that.signtype = 3;
        that.ifRed = true;
      } else {
        that.signText = "考勤签退";
        that.signtype = 4;
        that.ifRed = false;
      }
      this.timer = setInterval(function() {
        that.currentTime = //修改数据date
          new Date().getHours() + ":" +
          ((new Date().getMinutes() > 9) ? new Date().getMinutes() : '0' + new Date().getMinutes()) + ":" +
          ((new Date().getSeconds() > 9) ? new Date().getSeconds() : '0' + new Date().getSeconds());
        that.currentDate = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()

        if (new Date(Date.parse(that.currentDate + ' ' + that.currentTime)) > new Date(Date.parse(that.currentDate +
            ' 00:00:00')) && new Date(Date.parse(that.currentDate + ' ' + that.currentTime)) <= new Date(Date.parse(
            that.currentDate + ' 9:00:59'))) {
          that.signText = "考勤签到";
          that.signtype = 1;
          that.ifRed = false;
        } else if (new Date(Date.parse(that.currentDate + ' ' + that.currentTime)) > new Date(Date.parse(that
            .currentDate + ' 9:00:59')) && new Date(Date.parse(that.currentDate + ' ' + that.currentTime)) <=
          new Date(Date.parse(that.currentDate + ' 12:00:59'))) {
          that.signText = "考勤签到";
          that.signtype = 2;
          that.ifRed = true;
        } else if (that.countSign == 0 && new Date(Date.parse(that.currentDate + ' ' + that.currentTime)) >
          new Date(Date.parse(that.currentDate + ' 12:00:59')) && new Date(Date.parse(that.currentDate + ' ' + that
            .currentTime)) <= new Date(Date.parse(that.currentDate + ' 13:30:59'))) {
          that.signText = "开始上班";
          that.signtype = 2;
          that.ifRed = true;
        } else if (that.countSign != 0 && new Date(Date.parse(that.currentDate + ' ' + that.currentTime)) >
          new Date(Date.parse(that.currentDate + ' 12:00:59')) && new Date(Date.parse(that.currentDate + ' ' + that
            .currentTime)) <= new Date(Date.parse(that.currentDate + ' 18:00:59'))) {
          that.signText = "考勤签退";
          that.signtype = 3;
          that.ifRed = true;
        } else {
          that.signText = "考勤签退";
          that.signtype = 4;
          that.ifRed = false;
        }

      }, 1000);
    },
    watch: {
      showHeight: function() {
        if (this.docmHeight > this.showHeight) {
          this.hidshowFooter = false
        } else {
          this.hidshowFooter = true
        }
      }
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollBottomContact); //监听页面滚动事件
    }

  }
</script>
<style lang="less">
  .work {
    background: #ffffff;
    overflow: auto;

    .waiqin {
      height: 100%;
    }

    .sign {
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

      li {
        border-right: 1px solid #eeeeee;
        width: 50%;
        text-align: center;
      }

      li.active {
        color: #1c92ff;
      }
    }

    .signList {
      padding-bottom: 40px;

      .list {
        border-bottom: 1px solid #eeeeee;
        padding-left: 15px;
        margin-bottom: 10px;

        >p {
          display: flex;
          align-items: center;

          img {
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }

          span:nth-of-type(2) {
            font-size: 12px;
            border: 1px solid #1c92ff;
            color: #1c92ff;
            padding: 3px;
            border-radius: 20px;
            margin-left: 10px;
          }
        }

        >div {
          display: flex;
          margin-top: 10px;
          margin-bottom: 10px;

          >img {
            width: 15px;
            height: 56px;
          }

          >img.icon1 {
            width: 15px;
            height: 80px;
          }

          ul {
            margin-left: 10px;

            li {
              display: flex;
              align-items: top;
              color: #aaa;
              margin-top: 5px;
              padding-right: 15px;

              img {
                width: 14px;
                height: 14px;
                margin-right: 10px;
              }

              &:nth-last-child(1),
              &:nth-last-child(2) {
                height: auto;
              }
            }
          }
        }
      }
    }

    .van-loading {
      padding: 10px 0;
      text-align: center;
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

    .qiandao {
      background: #fff;
      z-index: 999;
      width: 100%;
      display: flex;
      align-items: center;

      ul {
        width: 100%;

        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          clear: both;

          p:first-of-type {
            font-size: 14px;
            padding: 0 15px;
          }

          .van-cell {
            margin-top: 5px;
            &.cheCell{
              margin-top: 0;
              padding: 0 16px;
            }

            &::after {
              border-bottom: none;
            }

            .van-cell__title {
              text-align: right;
            }

            .van-cell__value {
              padding-left: 10px;
            }
          }

          .van-field__label {
            width: 40px;
          }

          .van-field__control {
            border: 1px solid #f7f7f7;
            padding: 5px;
          }

          &:first-child {
            color: #1c92ff;
            padding: 0 15px;
            line-height: 34px;
            display: inline-block;
            float: right;
          }

          .pic-con {
            .van-cell__title {
              width: 60px;
              flex: inherit;
              text-align: right;
            }

            .van-cell__value {
              // height: 50px;
              text-align: left;
              // img {
              //   height: 100%;
              // }
            }
          }
        }
      }
    }

    .noteCont {
      position: relative;

      .van-field__word-limit {
        position: absolute;
        right: 5px;
        bottom: 5px;
      }
    }

    .xianchangSign {
      background: url('../images/qiandaoBg.png') no-repeat;
      width: 120px;
      height: 120px;
      background-size: 120px 120px;
      position: fixed;
      bottom: 80px;
      left: calc(50% - 60px);
      font-size: 16px;
      color: #fff;
      text-align: center;
      line-height: 20px;

      // display: flex;
      // justify-content: center;
      // align-items: center;
      &.ifRed {
        background: url('../images/qiandaoBgRed.png') no-repeat;
        background-size: 120px 120px;
      }

      .signBtn {
        margin-top: 42px;
      }

      .currentTime {
        font-size: 14px;
      }

      .van-uploader {
        width: 100%;
        height: 100%;

        .van-uploader__wrapper {
          width: 100%;
          height: 100%;

          .van-uploader__input-wrapper {
            width: 100%;
            height: 100%;
          }
        }
      }

    }

    .num-tip {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 75px;
      color: #666666;
      text-align: center;

      span {
        color: red;
      }
    }


    .map {
      width: 100%;
      height: calc(100% - 380px);
    }

    .anchorBL {
      display: none
    }

    .map_title {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.1533rem;

      .map_title_span {
        font-size: 0.29rem;
      }
    }

    .BMap_pop {
      display: none
    }

    .BMap_shadow {
      display: none;
    }

    .dialog-desc {
      width: 100%;
      text-align: center;
      padding: 30px 0;
      font-size: 14px;
      color: #333;
    }

    .btn-con {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .van-button {
        flex: 1;
        cursor: pointer;
        border-radius: 0;
      }

      .van-button:nth-child(1) {
        color: #1989fa
      }
    }

    .addr-dialog-desc {
      color: #666;
      padding: 10px 16px;
      font-size: 14px;
      text-align: center
    }

    .addr-dialog-input {
      margin-bottom: 20px
    }

    .tipCont{
      width: 280px;
      background: transparent;
      .tipIMg{
        width: 75px;
        height: 75px;
      }
      .content{
        margin-top: -37px;
        background: #FFFFFF;
        border-radius: 0 15px 15px 15px;
        padding: 30px 15px 15px 15px;
        .item{
          margin-top: 10px;
          height: 95px;
          padding: 10px;
          border-radius: 10px;
          background: #F5F5F5;
          display: flex;
          justify-content: space-between;
          .title{
            font-size: 15px;
            color: #444444;
            position: relative;
            font-weight: bold;
            &::after{
              position: absolute;
              left: 0;
              top: 25px;
              content: '';
              width: 28px;
              height: 2px;
              background: #1C92FF;
            }
          }
          .m-title{
            margin-top: 30px;
            color: #AAAAAA;
            line-height: 26px;
          }
          .inNUm{
            background: transparent;
            border: none;
            border-bottom: 1px solid #CCCCCC;
            width: 70px;
          }
          .btnCont{
            background: #FFFFFF;
            border-radius: 10px;
            width: 140px;
            height: 95px;
            text-align: center;
            line-height: 20px;
            color: #AAAAAA;
            .upIMg{
              width: 140px;
              height: 95px;
            }
            .imgIcon{
              width: 20px;
              height: 20px;
              margin-top: 28px;
            }
          }
        }
      }
      .closeIMg{
        width: 25px;
        margin-top: 25px;
        margin-left: calc(50% - 12.5px);
      }
    }
  }
</style>
