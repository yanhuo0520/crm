<template>
  <div class="chaiDetail">
    <van-nav-bar :left-text="leftText" left-arrow fixed @click-left="leftBack" />
    <div class="marBottom">
      <van-field readonly label="行程" :left-icon="require('../../images/xingcheng.png')" input-align="right"
        v-model="detail.travel" />
      <van-field readonly type="number" label="车费" :left-icon="require('../../images/chefei.png')"
        input-align="right" v-model="detail.car"  />
      <van-field readonly type="number" label="住宿" :left-icon="require('../../images/zhusu.png')"
        input-align="right" v-model="detail.hotel" />
      <van-field readonly type="number" label="油费" :left-icon="require('../../images/youfei.png')"
        input-align="right" v-model="detail.oil" />
      <van-cell title="工作日志及当日公里数" v-if="ifnow_summaryKm">
        <template #icon>
          <img src="../../images/rizhi.png" alt="" />
        </template>
      </van-cell>
      <van-field rows="3" type="textarea" v-if="ifnow_summaryKm"
        readonly v-model="now_summaryKm" />
    </div>

    <div class="marBottom">
      <van-cell center title="是否有招待">
        <template #right-icon>
          <van-switch v-model="ifZhaoDai" size="24" disabled />
        </template>
      </van-cell>
      <template v-if="ifZhaoDai">
        <van-field readonly type="number" label="招待费用"
          :left-icon="require('../../images/zhaodai.png')" input-align="right" v-model="detail.entertain_expenses"/>
        <van-cell title="招待说明">
          <template #icon>
            <img src="../../images/rizhi.png" alt="" />
          </template>
        </van-cell>
        <van-field rows="3" type="textarea" v-if="detail.entertain_note.length > 0"
          readonly v-model="detail.entertain_note" />
      </template>

    </div>

    <div class="marBottom">
      <van-cell center title="是否有其他费用">
        <template #right-icon>
          <van-switch v-model="ifOther" size="24" disabled />
        </template>
      </van-cell>
      <template v-if="ifOther">
        <van-field readonly type="number" label="其他" :left-icon="require('../../images/qita.png')"
          input-align="right" v-model="detail.other_expenses" />
        <van-cell title="其他费用说明" v-if="detail.other_note.length > 0">
          <template #icon>
            <img src="../../images/rizhi.png" alt="" />
          </template>
        </van-cell>
        <van-field rows="2" type="textarea" readonly v-if="detail.other_note.length > 0"
          v-model="detail.other_note" />
        <van-cell title="请上传其他费用图片" v-if="fileListOn.length > 0">
        <template #icon>
            <img src="../../images/pic.png" alt="" />
          </template>
        </van-cell>
        <van-uploader v-model="fileListOn" :show-upload="showUpload" :deletable="showUpload" />
      </template>

    </div>


  </div>
</template>
<script>
  import Exif from "exif-js";
  export default {
    name: "chaiDetail",
    data() {
      return {
        role: localStorage.getItem("role"), // 1为员工，2管理员
        leftText: '差旅费详情',
        chai_id: '',
        detail: '',
        rizhilicheng: '',

        ifZhaoDai: false,
        zhaodaiCont: '',

        ifOther: false,
        qitaCont: '',

        fileListOn: [],
        picsOn: "",
        picsOnArray: [],
        showUpload: false,

        ifnow_summaryKm: false,
        now_summaryKm: ''
      };
    },
    mounted() {
      window.leftBack = this.leftBack; // Android原生返回按钮执行leftBack()方法
      var travel_id = this.$route.query.travel_id;
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      this.$api.travelExpenseDetail({'travel_id': travel_id}).then(res => {
        this.$toast.clear()
        if (res.errno === 0) {
          this.detail = res.data
          if(res.data.now_summary || res.data.report_km){
            this.ifnow_summaryKm = true
          }

          this.now_summaryKm = res.data.now_summary + res.data.report_km + '公里'

          if(res.data.entertain_expenses > 0){
            this.ifZhaoDai = true
          }
          if(res.data.other_expenses > 0){
            this.ifOther = true
          }
          this.picsOn = res.data.other_pic;
          if (this.picsOn) {
            var pics = this.picsOn;
            pics = pics.split("#");
            var r = pics.filter(function(s) {
              return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
            });
            this.picsOnArray = r;
            r = r.map(item => ({
              url: item
            }));
            this.fileListOn = JSON.parse(JSON.stringify(r));
          } else {
            this.picsOn = "";
            this.picsOnArray = [];
            this.fileListOn = [];
          }
        } else {
          // this.$toast(res.errmsg);
        }
      }).catch(err => {
        this.$toast.clear()
      });

    },
    methods: {
      leftBack() {
        this.$router.go(-1)
      },
    },
  };
</script>
<style lang="less">
  .chaiDetail {
    min-height: calc(100% - 50px);
    padding-top: 50px;
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
 .van-cell{
      img{
        margin: 3px 2px 0 0;
        width: 16px;
        height: 16px;
      }
    }
    .marBottom {
      margin-bottom: 10px;
      background: #fff;
    }

    .van-uploader {
      padding: 10px 15px 0 15px;
    }

    .van-uploader__preview {
      margin-right: 15px;
      margin-bottom: 15px;
    }
  }
</style>
