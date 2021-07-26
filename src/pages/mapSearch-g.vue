<template>
  <div class="mapSearch">
    <van-nav-bar
      title="地点微调"
      left-text="取消"
      right-text="确定"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- <van-search v-model="searchValue" placeholder="请输入搜索关键词" @search="onSearch" /> -->
    <!-- <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="GDonSearchResult"></el-amap-search-box> -->
    <van-loading v-if="!loading" size="24px" vertical color="#ffffff">定位中……</van-loading>
    <el-amap vid="amap" :plugin="plugin" class="amap" :center="center" :zoom="zoom">
      <!-- <el-amap-marker :position="center" vid="amapMarker"></el-amap-marker> -->
    </el-amap>
    <div class="searchRust">
      <ul v-for="(item, index) in lists" :key="index">
        <li
          :class="{'active': item.active}"
          @click="selectBtn(item.id, item.fullAddress, item.location.lng, item.location.lat)"
        >
          <p class="title">{{item.name}}</p>
          <p class="address">{{item.fullAddress}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "mapSearch",
  data() {
    return {
      searchValue: "",
      center: [0, 0], // 高德地图中心点
      zoom: 15, // 地图内的大小
      loading: false,
      plugin: [
        {
          pName: "Geolocation",
          // noIpLocate: 1, // ios11： 禁止ip定位：ios11之后默认是ip定位，参数为1则是禁止ip定位
          events: {
            init: o => {
              this.GDinit(o, self); // 获取当前位置
            }
          }
        }
      ],
      // 这个是选择搜索列表中数据的title以及经纬度
      locationdata: {
        address: "",
        lng: "",
        lat: ""
      },
      lists: []
    };
  },
  mounted() {},
  methods: {
    GDinit(o) {
      let that = this;
      o.getCurrentPosition((status, result) => {
        if (status === "complete" && result.info === "SUCCESS") {
          that.loading = true;
          that.center = [result.position.lng, result.position.lat];
          that.GDmapGetInfoOfNearby(result.position.lng, result.position.lat); // 获取周边信息
        } else {
          that.loading = true;
          that.$toast("定位失败，请重试");
        }
      });
    },
    /* 获取周边建筑信息 */
    GDmapGetInfoOfNearby(lng, lat) {
      let that = this;
      let geocoder = new AMap.Geocoder({
        radius: 1000, // 搜索半径，
        extensions: "all", // 返回结果控制，参数为 all 时poitype才生效
        poitype: ""
      });
      geocoder.getAddress([lng, lat], (status, result) => {
        if (status === "complete" && result.info === "OK") {
          if (result && result.regeocode) {
            let addressComponent = result.regeocode.addressComponent;
            let baseRoad = addressComponent.province + addressComponent.city + addressComponent.district
            let searchList = result.regeocode.pois;
                searchList[0].active = true
                searchList[0].fullAddress = baseRoad + searchList[0].address;
                that.locationdata.address = baseRoad + searchList[0].address;
                that.locationdata.lng = searchList[0].location.lng
                that.locationdata.lat = searchList[0].location.lat
            for(var i=1; i < searchList.length; i++){
                searchList[i].active = false
                searchList[i].fullAddress = baseRoad + searchList[i].address
            }
            that.lists = searchList
          }
        }
      });
    },
    
    onClickLeft() {
      this.$router.push({
        path: "/work"
      });
    },
    onClickRight() {
      if (!this.locationdata.address) {
        this.$toast("请选择位置");
        return;
      } else {
        this.$router.push({
          path: "/work",
          query: {
            address: this.locationdata.address,
            lng: this.locationdata.lng,
            lat: this.locationdata.lat
          }
        });
      }
    },
    selectBtn(id, fullAddress, lng, lat) {
      this.locationdata.address = fullAddress;
      this.locationdata.lng = lng;
      this.locationdata.lat = lat;
      this.center = [lng, lat]
      for (var i = 0; i < this.lists.length; i++) {
        this.lists[i].active = false;
        if (this.lists[i].id == id) {
          this.lists[i].active = true;
        }
      }
    }
  },
};
</script>
<style lang="less">
.mapSearch {
  height: 100%;
  .van-nav-bar {
    background: url(../images/msgBg.jpg) no-repeat;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-size: 100% 50px;
    .van-nav-bar__text,
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .van-loading {
    position: absolute;
    top: 20%;
    left: calc(50% - 40px);
    z-index: 200;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 10px;
    .van-loading__text {
      color: #ffffff;
    }
  }
  .amap {
    width: 100%;
    height: 160px;
  }
  .searchRust {
    height: calc(100% - 285px);
    overflow-y: scroll;
    padding: 10px 15px;
    li {
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eeeeee;
      .title {
        font-size: 14px;
      }
      .address {
        color: #666666;
        padding-right: 20px;
      }
      &.active {
        background: url(../images/select.png) no-repeat center right;
        background-size: 16px auto;
      }
    }
  }
}
</style>