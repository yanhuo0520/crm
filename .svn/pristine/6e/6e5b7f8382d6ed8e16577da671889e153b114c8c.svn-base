<template>
  <div class="activityDetail">
    <van-nav-bar
        left-text="活动详情"
        :border="false"
    />
    <van-cell-group class="add-group-con">
		<div class="tit">活动主题</div>
        <van-field v-model="detailInfo.title" placeholder="请输入主题" readonly/>
		<div class="tit">活动日期</div>
		<van-field v-model="detailInfo.posterDate" placeholder="x年x月x日-x年x月x日" readonly />
		<div class="tit">活动地址</div>
        <van-field v-model="detailInfo.address"  placeholder="请填写详细地址" readonly/>
		<div class="tit">参会人员</div>
        <van-field v-model="detailInfo.participant"  rows="1" autosize type="textarea"  placeholder="请输入参会人员姓名" readonly/>
		<div class="tit">活动场景</div>
		<div class="upload-con">
			<van-uploader v-model="detailInfo.fileList" :max-count="1" disabled />
		</div>
		<div class="tit">活动详情</div>
		<van-field v-model="detailInfo.detail" rows="1" autosize type="textarea" placeholder="请概述活动详情" readonly/>
    </van-cell-group>
    
  </div>
</template>
<script>
import { ImagePreview } from 'vant';
export default {
  name: "activityDetail",
  data() {
    return {
        id: '',
		detailInfo: {},
        fileList:[{
            url: 'https://img.yzcdn.cn/vant/leaf.jpg'
        }],
		detail:'',
    };
  },
  mounted(){
    this.id = this.$route.query.id ? this.$route.query.id : ''
    console.log(this.id)
    this.getDetail()
  },
  methods: {
    getDetail() {
        if(this.id) {
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
            this.$api.activity_detail({activity_id: this.id}).then(res=>{
                this.$toast.clear()
                if(res.errno === 0){
                    res.data.posterDate = this.dateFormat('yyyy年MM月dd日', new Date(res.data.start_date.replace(/-/g,'/'))) + ' - ' + this.dateFormat('yyyy年MM月dd日', new Date(res.data.end_date.replace(/-/g,'/')))
                    res.data.fileList = [{url: res.data.activity_pic}]
                    this.detailInfo = res.data
                } else {
                    this.$toast(res.errmsg)
                }
            }).catch(err =>{
                this.$toast.clear()
                this.$toast('服务异常，请稍后重试!')
            })
        } else {
            this.$toast('获取活动id失败！')
        }
    },
   
	dateFormat(fmt, date) {
		date = date ? date : new Date();
		let o = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours() % 12, //小时
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
			fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
		}
		for (let k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	},
  },
};
</script>
<style lang="less">
div { box-sizing: border-box }
#app { position: absolute; top: 0; left: 0; width: 100%; height: 100%;}
.activityDetail {
  min-height: 100%;
  background: url('../images/poster/add-bg.png') no-repeat;
  background-size: 100% 100%;
  .van-nav-bar {
	  background: transparent;
	  .van-nav-bar__left {
		  .van-icon { color: #fff;}
		  .van-nav-bar__text { color: #fff; }
	  }
  }
  .van-sticky--fixed  {
	  .van-nav-bar {
	 	 background: #4580f3;
	  }
  }
  .van-cell { font-size: 0.32rem; padding-right: 0; }
  .add-group-con {
	  width: 90%;
	  margin: 0.5rem auto;
	  border-radius: 0.22rem;
	  overflow: hidden;
	  padding-right: 16px;
	  .tit {
		  padding-left: 16px;
		  padding-top: 10px;
		  font-size: 0.32rem;
		  font-weight: bold;
	  }
	  .upload-con {
		  padding-left: 16px;
		  padding-top: 10px;
	  }
	  .poster-radio {
		  padding-left: 16px;
		  padding-top: 10px;
		  display: flex;
		  align-content: center;
		  .item {
			  width: 20%;
			  display: flex;
			  align-items: center;
			  flex-direction: column;
			  margin-right: 10%;
			  img {
				width: 100%;
				margin-bottom: 0.3rem;
				height: 3.4rem;
			  }
		  }
	  }
	  .btn-con {
		  width: 90%;
		  height:1.1rem;
		  margin: 0.6rem auto;
		  border-radius: 100px;
		  overflow: hidden;
		  .van-button {
			  width: 100%;
			  height: 100%;
			  background: #3e74ef;
		  }
      }
      .van-uploader__preview-delete {
          display: none;
      }
      .van-uploader__wrapper--disabled {
          opacity: 1;
      }
  }
}
</style>