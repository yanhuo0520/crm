<template>
    <div class="genjinDetail">
        <van-nav-bar
            left-text="跟进详情"
            left-arrow
            fixed
            @click-left="leftBack"
        />
        <div class="marBottom">
            <van-cell title="客户名称" :value="followDetail.name" icon="http://sc.xfd365.com/crmImages/name.png" />
        </div>
        <div class="marBottom">
            <van-cell title="跟进类型" :value="typeName" icon="http://sc.xfd365.com/crmImages/genjinType.png" />
            <van-cell title="跟进时间" :value="followDetail.follow_time" icon="http://sc.xfd365.com/crmImages/genjinTime.png" />
            <van-cell class="getAddress" title="跟进地点" :value="followDetail.address" icon="http://sc.xfd365.com/crmImages/dingwei.png"/>
        </div>
        <div class="marBottom">
            <van-cell title="上传图片" icon="http://sc.xfd365.com/crmImages/pic.png"></van-cell>
            <!-- <van-uploader v-model="thumbList"/> -->
          <van-uploader v-model="thumbList" :preview-full-image="previewFullImage" :deletable="deletable" :show-upload="showUpload" @click-preview="clickPreview"/>
          <div class="image-preview" v-if="ifPreview">
              <van-image-preview
                    v-model="ifPreview"
                    :images="thumbListPre"
                    :loop="isLoop"
                    :startPosition = "startPosition"
                    @change="onChange"
                    @close="onClose()"
                    
                >
                <template v-slot:index>{{pageIn}} / {{totalPage}}</template>
                <div slot="cover" class="color-high">
                  <van-icon name="down" class="down-img" @click="downLoadHandle"/>
                </div>
              </van-image-preview>
            </div>

        </div>
        <div class="marBottom">
            <van-cell title="跟进内容" icon="http://sc.xfd365.com/crmImages/genjinContent.png"></van-cell>
            <van-field
                v-model="followDetail.content"
                rows="2"
                autosize
                type="textarea"
                placeholder="请输入跟进内容"
            />
        </div>
        <div class="marBottom">
            <!-- 客户修改为不可选择状态 -->
            <!-- <van-cell title="客户名称" :value="customerName" icon="http://sc.xfd365.com/crmImages/customerName.png" is-link @click="isCustomer=true" /> -->
            <van-cell title="归属人员" :value="userName" icon="http://sc.xfd365.com/crmImages/guishu.png" />
        </div>
        
    </div>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
export default {
  name: "genjinDetail",
  data() {
    return {
      userName: '',
      followDetail: '',
      typeName: '',
      thumbList: [],

      previewFullImage: false, // 是否在点击预览图后展示全屏图片预览
      deletable: false, // 是否展示删除按钮
      showUpload: false, // 是否展示上传区域
      isLoop: true,
      ifPreview: false,
      thumbListPre: [],
      downUrl: '',
      startPosition: 1,
      pageIn: 1,
      totalPage: 0
    };
  },
  mounted() {
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    document.documentElement.scrollTop = 0;
    this.userName = localStorage.getItem('userName')
    var follow_id = this.$route.query.follow_id;
    this.$api.followDetail({ follow_id: follow_id }).then(res => {
      if (res.errno === 0) {
        if (res.data) {
          this.followDetail = res.data;

          if(res.data.type == 1){
            this.typeName = "到访"
          }else if(res.data.type == 2){
            this.typeName = "电话"
          }else if(res.data.type == 3){
            this.typeName = "微信"
          }else if(res.data.type == 4){
            this.typeName = "短信"
          }else if(res.data.type == 5){
            this.typeName = "其他"
          }


          if(res.data.file){
            var pics = res.data.file;
              pics = pics.split("#");
              var r = pics.filter(function(s) {
                return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
              });
              this.thumbListPre = r
              this.totalPage = r.length
              r = r.map((item, index) => ({ url: item, index: index}));
              this.thumbList = JSON.parse(JSON.stringify(r));
          }
        }
      } else {
        this.$toast(res.errmsg);
      }
    });

  },
  methods: {
    leftBack(){
      this.$router.go(-1)
      localStorage.setItem("toCustomDetail", 1) // 用于判断如果返回详情页面，定位到跟进状态显示
    },
    clickPreview(file, detail){
      this.downUrl = file.url
      this.startPosition = detail.index
      this.pageIn = detail.index + 1
      this.ifPreview = true
    },
    onChange(index){
      this.downUrl = this.thumbList[index].url
      this.pageIn = index + 1
    },
    onClose(index, url) {
      this.downUrl = '';
      this.ifPreview = false
    },
    downLoadHandle(){
      // console.log(this.downUrl)
      if(typeof android != 'undefined'){
        android.saveToPhone(this.downUrl); // 调用Android方法保存图片到手机相册
        this.$toast({
          message: '保存成功',
          icon: 'success'
        })
      }else{
        var alink = document.createElement("a");
        var event = new MouseEvent('click')  
        alink.href = this.downUrl;
        alink.download = "pic"; //图片名
        alink.dispatchEvent(event);
      }
    }
  },
};
</script>
<style lang="less">
.genjinDetail {
  min-height: calc(100% - 50px);
  padding-top: 50px;
  background: #f5f5f5;
  .van-nav-bar {
    background: url(../images/msgBg.jpg) no-repeat;
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
    flex: 0.3;
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
  .van-uploader {
    padding: 10px 15px 0 15px;
  }
  .van-uploader__preview{
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .marBottom {
    margin-bottom: 10px;
    background: #fff;
  }

}
</style>