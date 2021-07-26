<template>
  <div class="addCustomer">
    <van-nav-bar :left-text="leftText" fixed left-arrow @click-left="leftBack" />
    <div class="marBottom">
      <van-cell
        title="客户标签类型"
        @click="isType=true"
        is-link
        :value="typeName"
        icon="http://sc.xfd365.com/crmImages/tag.png"
      />
    </div>

    <div class="marBottom">
      <van-field
        placeholder="请输入客户姓名"
        label="客户名称"
        left-icon="http://sc.xfd365.com/crmImages/name.png"
        input-align="right"
        v-model="name"
      />
      <van-field
        placeholder="请输入手机号码"
        type="tel"
        label="联系电话"
        left-icon="http://sc.xfd365.com/crmImages/phone.png"
        input-align="right"
        v-model="mobile"
        maxlength="11"
      />
      <!-- <van-field
                placeholder="请选择客户地址"
                label="客户地址"
                left-icon="http://sc.xfd365.com/crmImages/address.png"
                input-align="right"
                v-model="address"
                @click="prov = true"
      />-->
      <van-field
        placeholder="请输入服务站点名称"
        label="服务站点名称"
        left-icon="http://sc.xfd365.com/crmImages/customerName.png"
        input-align="right"
        v-model="station_name"
      />
      <van-cell class="getAddress" title="服务点地址" :value="address" icon="http://sc.xfd365.com/crmImages/dingwei.png" is-link @click="mapSearch" />
      <baidu-map @ready="handler"></baidu-map>

    </div>

    <div class="provin" v-show="prov">
      <van-area :area-list="areaList" @cancel="hideProv" @confirm="confirmProv" />
      <van-overlay :show="prov" @click="prov = false" />
    </div>

    <div class="marBottom">
      <van-field
        :value="userName"
        label="归属人员"
        left-icon="http://sc.xfd365.com/crmImages/guishu.png"
        input-align="right"
        readonly
      />
    </div>

    <div class="marBottom">
      <van-cell
        title="新增关联客户"
        @click="addGlCustomer"
        is-link
        :value="linker_name"
        icon="http://sc.xfd365.com/crmImages/guanlian.png"
      />
    </div>
    <div class="marBottom">
      <van-cell title="上传客户相关图片" icon="http://sc.xfd365.com/crmImages/genjinFujian.png" is-link></van-cell>
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="8"
        :after-read="afterRead"
        :before-delete="beforeDelete"
      />
    </div>
    <div class="marBottom">
      <van-cell title="备注信息" icon="http://sc.xfd365.com/crmImages/beizhu.png"></van-cell>
      <van-field v-model="message" rows="2" autosize type="textarea" placeholder="请输入备注内容" />
    </div>

    <van-popup v-model="isType">
      <div class="content">
        <div class="imgDiv">
          <img src="http://sc.xfd365.com/crmImages/tags.png" alt />
        </div>
        <p>*可以选择多种标签</p>
        <ul>
          <li
            v-for="(item,index) in type"
            :key="index"
            :class="item.ischecked?'active':''"
            @click="item.ischecked = !item.ischecked"
          >{{item.tag_name}}</li>
        </ul>
        <button @click="closeType">确定</button>
      </div>
    </van-popup>
    <!-- <img src="http://sc.xfd365.com/crmImages/tags.png" alt v-show="isType" /> -->

    <button class="save" @click="save">保存</button>
  </div>
</template>
<script>
import AreaList from "../../styles/area";
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
export default {
  name: "addCustomer",
  data() {
    return {
      leftText: "新增客户",
      type: [
        // {
        //   title: "益农社站长",
        //   ischecked: false
        // }
      ],
      isType: false,
      station_id: "", // 编辑客户ID
      typeName: "请选择客户标签类型",
      label: "",
      customer_tag_id: "",
      name: "",
      mobile: "",
      station_name: "",
      address: '',
      lnglat: '',
      location: '',
      locationlnglat: '',
      userName: "",
      linker_id: "",
      linker_name: "",
      fileList: [],
      pics: "",
      message: "",
      from: '',

      station_address: "",
      areaList: AreaList,
      prov: false,
    };
  },
  mounted() {
    window.onAndroid = this.onAndroid;
    window.onGetLocation = this.onGetLocation;
    window.geoc = null;
    window.convertor = null
    window.vue = this;

    this.userName = localStorage.getItem("userName");
    this.tagList();
    var id = this.$route.query.id;
    if (this.$route.query.id) {
      // 编辑
      this.leftText = "编辑客户";
      this.$api.stationDetail({ station_id: id }).then(res => {
        //   console.log(res)
        if (res.errno === 0) {
          if (res.data) {
            this.station_id = res.data.station_id;
            this.label = res.data.label;
            this.customer_tag_id = res.data.customer_tag_id;
            if (this.label) {
              // let typeNameArray = this.label.substr(0, this.label.length - 1).split("#"); // 最后一位有#
              let typeNameArray = this.label.substr(0, this.label.length).split("#");
              var typeName = "";
              typeNameArray.forEach(ele => {
                typeName += ele + "、";
              });
            }
            this.typeName = typeName;
            this.name = res.data.name;
            this.mobile = res.data.mobile;
            this.station_name = res.data.station_name;
            if (res.data.station_address) {
              this.station_address = res.data.station_address;
            }
            this.addressDetail = res.data.address;
            this.message = res.data.note;
            this.pics = res.data.thumb;
            if (this.pics) {
              var pics = this.pics;
              pics = pics.split("#");
              var r = pics.filter(function(s) {
                return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
              });
              r = r.map(item => ({ url: item }));
              this.fileList = JSON.parse(JSON.stringify(r));
            } else {
              this.pics = "";
              this.fileList = [];
            }
          }
        }
      });
    } else {
      this.leftText = "新增客户";
      // 新增
      this.linker_id = this.$route.query.linker_id;
      this.linker_name = this.$route.query.linker_name;
    }
  },
  methods: {
    leftBack() {
      // this.$router.go(-1);
      if(this.from == "index"){
        this.$router.push({
          path: "/"
        });
      }else{
        this.$router.push({
          path: "/customer"
        });
      }
    },
    tagList(){ // 获取标签列表
      let that = this;
      this.$api.tagList({type: that.customer_type}).then(res=>{
        if(res.errno === 0){
          if(res.data){
            that.type = []
            res.data.forEach(ele => {
              ele.ischecked = false
              that.type.push(ele)
            });
          }
        }else{
          this.$toast(res.errmsg)
        }
      })
    },
    mapSearch(){
      this.$router.push({
        path: "/mapSearch",
        query: {
          from: 'addCustomer'
        }
      });
    },
    handler({ BMap, map }) {
      window.map = map; //注册为全局
      var that = this; // map方法中的this指向不对。所有申明一个。。小细节的东西
      // 刚进入页面中的定位，需要向用户授权
      var point = new BMap.Point(113.39852, 34.897445);

      var geolocation = new BMap.Geolocation();
      var geoc = new BMap.Geocoder();
      window.geoc = geoc;

      var convertor = new BMap.Convertor();
      window.convertor = convertor

      var isAndroid = localStorage.getItem("isAndroid");
      if (isAndroid == "123") {
        android.requestLocation();
      } else {
        geolocation.getCurrentPosition(
          function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              var pt = r.point;
              geoc.getLocation(pt, function(rs) {
                var addComp = rs.addressComponents;
                if (addComp.province) {
                  that.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                  that.location = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;

                  that.lnglat = rs.point.lng + ',' + rs.point.lat
                  that.locationlnglat = rs.point.lng + ',' + rs.point.lat
                }
              });
            } else {
              alert("failed" + this.getStatus());
            }
          },
          { enableHighAccuracy: true }
        );
      }
    },
    onAndroid() {
      localStorage.setItem("isAndroid", "123");
    },
    onGetLocation(lat, lon) {
      var that = this;
      var centerGet = new BMap.Point(lon, lat);
      var convertor = window.convertor;
      var pointArr = [];
      pointArr.push(centerGet);
      convertor.translate(pointArr, 1, 5, function(data) {
        if (data.status === 0) {
          var geoc = window.geoc;
          var center = new BMap.Point(data.points[0].lng, data.points[0].lat);
          geoc.getLocation(center, function(rs) {
            var addComp = rs.addressComponents;
            if (addComp.province) {
              that.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
              that.location = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                        
              that.lnglat = rs.point.lng + ',' + rs.point.lat
              that.locationlnglat = rs.point.lng + ',' + rs.point.lat

            }
          });
        }
      });
    },
    addGlCustomer() {
      this.$router.push({
        path: "/addGlCustomer"
      });
    },
    save() {
      // console.log(this.linker_id + "---22222222222222")
      if (this.name.trim().length == 0) {
        this.$toast("请填写客户名称！");
        return;
      }
      let reg = /^1[0-9]{10}$/;
      if (this.mobile.trim().length == 0) {
        this.$toast("请输入联系方式！");
        return;
      } else if (this.mobile.length <= 10 || !reg.test(this.mobile)) {
        this.$toast("请输入正确的联系方式！");
        return;
      }
      var data = {}
      data.station_id = this.station_id
      data.name = this.name
      data.mobile = this.mobile
      data.station_name = this.station_name
      data.station_address = this.address //  data.address = this.addressDetail
      data.lnglat = this.lnglat
      data.note = this.message
      data.thumb = this.pics
      data.label = this.label
      data.customer_tag_id = this.customer_tag_id
      data.linker_id = this.linker_id
      data.stype = 0

      // console.log(data)
      // return;

      this.$api.stationSave(data).then(res => {
          this.$toast(res.errmsg);
          if (res.errno === 0) {
            // this.$router.go(-1)
            this.leftBack();
          }
        });
    },

    hideProv: function() {
      this.prov = false;
    },
    confirmProv: function(val) {
      this.prov = false;
      this.addressDetail = "";
      let value = JSON.stringify(val);
      value = JSON.parse(value);
      this.station_address = "";
      value.forEach(element => {
        if (element.name == null) {
          return;
        } else {
          this.station_address += element.name + "/";
        }
      });
      this.station_address = this.station_address.substring(
        0,
        this.station_address.lastIndexOf("/")
      );
    },

    afterRead(file) {
      var formdata = new FormData();
      //可以通过append()方法来追加数据
      let token = localStorage.getItem("token");
      formdata.append("file", file.file);
      formdata.append("token", token);
      const instance = this.$axios.create({
        //withCredentials:true
      });
      instance
        .post("http://crm.xfd365.com/user/base/uploadImg", formdata)
        .then(res => {
          if (res.data.errno == 0) {
            this.$toast("上传成功");
            this.pics += res.data.data.url + "#";
          } else {
            this.$toast(res.errmsg);
          }
        });
    },
    beforeDelete(file) {
      this.fileList = this.fileList.filter(item => item != file);
      var formdata = new FormData();
      let token = localStorage.getItem("token");
      formdata.append("file", file.file);
      formdata.append("token", token);
      const instance = this.$axios.create({});
      // 删除图片接口
      // instance.post("http://crm.xfd365.com/user/base/uploadImg", formdata).then(res => {
      //   console.log(res)
      // })
    },
    closeType() {
      var type = this.type;
      var arr = type.filter(ele => {
        return ele.ischecked;
      });
      arr = JSON.parse(JSON.stringify(arr));
      var typeName = "";
      var label = "";
      var customer_tag_id = "";
      arr.forEach(ele => {
        typeName += ele.tag_name + "、";
        label += ele.tag_name + "#";
        customer_tag_id += ele.customer_tag_id + ","
      });
      this.typeName = typeName;
      this.label = label;
      this.customer_tag_id = customer_tag_id;
      this.isType = false;
    }
  },
  beforeRouteEnter(to, from, next) {
    if(from.path == "/"){
      to.meta.from = "index"
    }else if(from.path == "/customer"){
        to.meta.from = "customer"
    }  
    let linker_id = to.query.linker_id;
    let linker_name = to.query.linker_name;
    to.meta.linker_id = linker_id;
    to.meta.linker_name = linker_name;

    let addressSel = to.query.addressSel
    to.meta.addressSel = addressSel
    let lnglatSel = to.query.lnglatSel
    to.meta.lnglatSel = lnglatSel

    if (from.path == "/addGlCustomer" || from.path == "/mapSearch") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }

    next();
  },
  activated() {
    // console.log("activated");
    document.documentElement.scrollTop = 0;
    window.onAndroid = this.onAndroid;
    window.onGetLocation = this.onGetLocation;
    window.geoc = null;
    window.vue = this;
    this.from = this.$route.meta.from

    if(this.$route.meta.linker_id){
      this.linker_id = this.$route.meta.linker_id;
      this.linker_name = this.$route.meta.linker_name;
    }
   
    if(this.$route.meta.addressSel){
      this.address = this.$route.meta.addressSel
      this.lnglat = this.$route.meta.lnglatSel
    }
    if (!this.$route.meta.isBack) { // 不缓存
      this.station_id = "";
      this.typeName = "请选择客户标签类型";
      this.type = [],
      this.label = "";
      this.customer_tag_id = "",
      this.name = "";
      this.mobile = "";
      this.station_name = "";
      this.address = this.location
      this.lnglat = this.locationlnglat
      this.userName = localStorage.getItem("userName");
      this.linker_id = "";
      this.linker_name = "";
      this.pics = "";
      this.fileList = [];
      this.message = "";

      this.station_address = "";
      this.addressDetail = "";
      this.tagList();
      var id = this.$route.query.id;
      if (this.$route.query.id) {
        // 编辑
        this.leftText = "编辑客户";
        this.$api.stationDetail({ station_id: id }).then(res => {
          //   console.log(res)
          if (res.errno === 0) {
            if (res.data) {
              this.station_id = res.data.station_id;
              this.label = res.data.label;
              this.customer_tag_id = res.data.customer_tag_id;
              if (this.label.length > 0) {
                // let typeNameArray = this.label.substr(0, this.label.length - 1).split("#"); // 最后一位有#
                let typeNameArray = this.label.substr(0, this.label.length).split("#");
                var typeName = "";
                typeNameArray.forEach(ele => {
                  typeName += ele + "、";
                });
                this.typeName = typeName;
              }else{
                this.typeName = "请选择客户标签类型";
              }
              this.name = res.data.name;
              this.mobile = res.data.mobile;
              this.station_name = res.data.station_name;
              this.address = res.data.station_address
              this.lnglat = res.data.lnglat
              this.pics = res.data.thumb;
              if (this.pics) {
                var pics = this.pics;
                pics = pics.split("#");
                var r = pics.filter(function(s) {
                  return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
                });
                r = r.map(item => ({ url: item }));
                this.fileList = JSON.parse(JSON.stringify(r));
                // console.log(this.fileList)
              } else {
                this.pics = [];
                this.fileList = [];
              }
              this.message = res.data.note;

              if (res.data.station_address) {
                this.station_address = res.data.station_address;
              }
              this.addressDetail = res.data.address;
              
            }
          }
        });
      } else {
        this.leftText = "新增客户";
      }
    }
    this.$route.meta.isBack = false;
  },
  created() {
    document.documentElement.scrollTop = 0;
  }
};
</script>
<style lang="less">
.addCustomer {
  min-height: calc(100% - 100px);
  padding-top: 50px;
  padding-bottom: 50px;
  overflow-y: scroll;
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
.getAddress .van-cell__title{
    flex: 0.4;
  }
  .van-field__control {
    text-overflow: ellipsis;
  }
  .addressCont {
    position: relative;
    .van-field__label {
      width: 72px;
    }
    .addressIn {
      padding-right: 100px;
    }
    .getLocat {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      span {
        padding: 6px 5px;
        border-radius: 5px;
        background: #1c92ff;
        color: #ffffff;
        display: flex;
        margin: 8px 10px;
      }
    }
  }

  .van-picker {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
  }

  .marBottom {
    margin-bottom: 10px;
    background: #fff;
  }

  .van-uploader {
    margin: 10px;
  }

  .van-popup {
    width: 90%;
    border-radius: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    .content {
      .imgDiv{
        height: 36px;
        background: rgba(0, 0, 0, 0.7);
        img{
          width: 70px;
          height: 70px;
        }
      }
      p {
        text-align: right;
        color: #aaaaaa;
        margin-top: 15px;
        margin-right: 15px;
      }
      ul {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0 15px;
        li {
          height: 30px;
          padding: 0 10px;
          font-size: 16px;
          text-align: center;
          line-height: 30px;
          border-radius: 10px;
          margin-right: 10px;
          margin-top: 10px;
          border: 1px solid rgba(28, 146, 255, 1);
          background: rgba(28, 146, 255, 0.1);
          &.active {
            background: #1c92ff;
            border: 1px solid #1c92ff;
            color: #fff;
          }
          // &:nth-of-type(1) {
          //   border: 1px solid rgba(28, 146, 255, 1);
          //   background: rgba(28, 146, 255, 0.1);
          //   &.active {
          //     color: #1c92ff;
          //   }
          // }
          // &:nth-of-type(2) {
          //   background: rgba(255, 151, 28, 0.1);
          //   border: 1px solid rgba(255, 151, 28, 1);
          //   &.active {
          //     color: #ff971c;
          //   }
          // }
          // &:nth-of-type(3) {
          //   background: rgba(28, 252, 255, 0.1);
          //   border: 1px solid rgba(50, 209, 211, 1);
          //   &.active {
          //     color: #32d1d3;
          //   }
          // }
          // &:nth-of-type(4) {
          //   background: rgba(229, 206, 13, 0.1);
          //   border: 1px solid rgba(225, 193, 34, 1);
          //   &.active {
          //     color: #dfbd00;
          //   }
          // }
          // &:nth-of-type(5) {
          //   background: rgba(28, 255, 172, 0.1);
          //   border: 1px solid rgba(25, 226, 152, 1);
          //   &.active {
          //     color: #19e298;
          //   }
          // }
        }
      }
      button {
        width: 100%;
        height: 49px;
        border: none;
        border-top: 1px solid #eeeeee;
        background: #fff;
        margin-top: 25px;
        color: #1c92ff;
        font-size: 16px;
      }
    }
  }

  > img {
    width: 70px;
    height: 70px;
    position: fixed;
    top: 50%;
    margin-top: -140px;
    left: 5%;
    z-index: 9999;
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
    left: 0;
  }
}
</style>
