<template>
  <div class="addActivity">
	<van-sticky>
		<van-nav-bar
            left-text="添加活动"
            left-arrow
            @click-left="leftBack"
			:border="false"
        />
	</van-sticky>
   

    <van-cell-group class="add-group-con">
		<div class="tit">活动主题</div>
        <van-field v-model="title" placeholder="请输入主题" clearable />
		<div class="tit">开始时间</div>
        <van-field v-model="startDateText"  placeholder="请选择活动开始时间" readonly @click="startDateShow = true" />
		<div class="tit">结束时间</div>
        <van-field v-model="endDateText"  placeholder="请选择活动结束时间" readonly @click="endDateShow = true" />
		<!-- <div class="date-con van-hairline--bottom">
			<span class="date-text" :class="{'color-black': startDateText}" @click="startDateShow = true">{{startDateText ? startDateText : '请选择活动初始日期'}}</span>
			<span class="date-icon">至</span>
			<span class="date-text" :class="{'color-black': endDateText}" @click="endDateShow = true">{{endDateText ? endDateText : '请选择活动结束日期'}}</span>
		</div> -->
		<div class="tit">活动地址</div>
        <van-field v-model="address"  placeholder="请填写详细地址" clearable />
		<div class="tit">参会人员</div>
        <van-field v-model="people"  rows="1" autosize type="textarea"  placeholder="请输入参会人员姓名" clearable />
		<div class="tit">活动场景</div>
		<div class="upload-con">
			<van-uploader v-model="fileList"  :after-read="afterRead" :max-count="1"/>
		</div>
		<div class="tit">活动详情</div>
		<van-field v-model="detail" rows="1" autosize type="textarea" placeholder="请概述活动详情" clearable />
		<baidu-map @ready="handler"></baidu-map>
	
		<div class="tit">海报模板</div>
		<van-radio-group v-model="radio">
			<div class="poster-radio">
				<div class="item">
					<img  :src="modelImg1" @click="imgPreview(modelImg1)" alt="">
					<van-radio name="1" icon-size="24px"></van-radio>
				</div>
				<div class="item">
					<img  :src="modelImg2" @click="imgPreview(modelImg2)" alt="">
					<van-radio name="2" icon-size="24px"></van-radio>
				</div>
			</div>
		</van-radio-group>
   		<div class="btn-con" v-if="!imgUrl">
			<van-button type="primary" @click="renderPoster">生成海报</van-button>
		</div>
		<div class="btn-con2" v-else>
			<van-button type="primary" @click="lookPoster">查看海报</van-button>
			<van-button type="primary" @click="renderPoster">重新生成海报</van-button>
		</div>
    </van-cell-group>
    <div id="poster1" style="position:fixed;top:-3000px;left:0;width:100%" >
        <div class="poster1-bg">
            <div class="poster-tit">
                <div class="tit-bg">
                  <img src="../images/poster/logo1.png" alt="">
                </div>
                <div class="tit-con">
                    {{title}}
                </div>
                <div class="activity-info-con">
                    <div class="date">开始时间:{{startDateText}}</div>
					<div class="date">结束时间:{{endDateText}}</div>
                    <div class="address">活动地点:{{address}}</div>
                </div>
            </div>
            <div class="poster1-info">
                <div class="info-item">
                  <div class="info-tit">
                    活动集锦
                  </div>
                    <div class="people-desc"> 
                        参会嘉宾:{{people}}
                    </div>
                    <div class="pic-con">
                      <van-image
                          fit="contain"
                          :src="activityPic"
                        />
                        <img class="icon2" src="../images/poster/poster1-icon2.png" alt="">
                    </div>
                </div>
                 <div class="info-item">
                  <div class="info-tit">
                    扫码了解更多详情
                  </div>
                  <!-- <img class="qrcode" src="../images/poster/qrcode.png" alt="">                    -->
					<div id="qrcode1" class="qrcode"></div>
                </div>
                <img class="icon1" src="../images/poster/poster1-icon1.png" alt="">
            </div>
            <img class="icon3" src="../images/poster/poster1-icon3.png" alt="">
        </div>
    </div>
    <div id="poster2" style="position:fixed;top:-3000px;left:0;width:100%" >
        <div class="poster2-bg">
			<div class="poster2-top-bg">
				<div class="poster2-top">
					<img class="logo" src="../images/poster/logo1.png" alt="">
					<div class="activity-tit">{{title}}</div>
					<div class="activity-date">开始时间:{{startDateText}}</div>
					<div class="activity-date">结束时间:{{endDateText}}</div>
				</div>
				<div class="poster-img">
					<img src="../images/poster/poster2-img.png" alt="">
				</div>
			</div>
			
			<div class="poster-info">
				<div class="info-item">
					<div class="tit-bg">
						活动详情
					</div>
					<div class="activity-addr">活动地点:{{address}}</div>
					<div class="activity-addr">参会嘉宾:{{people}}</div>
				</div>
				<div class="info-item">
					<div class="tit-bg">
						照片区域
					</div>
					 <div class="pic-con">
                      <van-image
                          fit="contain"
                           :src="activityPic"
                        />
                    </div>
				</div>
			</div>
			<div class="poster-bot-con">
				<div class="tit">扫码了解更多详情</div>
				<!-- <img class="qrcode" src="../images/poster/qrcode.png" alt=""> -->
				<div id="qrcode2" class="qrcode"></div>
			</div>
		</div>
    </div>
    <van-image-preview
        v-model="isImgPreview"
        :images="[imgUrl]"
    >
    <div slot="cover" class="color-high">
		<div class="btn-con">
			<van-button type="primary" @click="showShare = true">分享给好友</van-button>
		</div>
		<!-- <van-icon name="down" class="down-img" @click="showShare = true"/> -->
		<van-share-sheet title="立即分享给好友" v-model="showShare" :options="options" @select="selectShareType" />

    </div>
  </van-image-preview>
    <!-- <van-calendar v-model="show" type="range" @confirm="onConfirm" /> -->
	<van-popup v-model="startDateShow" position="bottom" >
		<van-datetime-picker
			type="datetime"
			title="选择活动开始时间"
			:formatter="formatter"
			:min-date="minDate"
			@cancel="startDateShow = false"
			@confirm="startDateConfirm"
		/>
	</van-popup>
	<van-popup v-model="endDateShow" position="bottom" >
		<van-datetime-picker
			type="datetime"
			title="选择活动结束时间"
			:formatter="formatter"
			 :min-date="minDate"
			@cancel="endDateShow = false"
			@confirm="endDateConfirm"
		/>
	</van-popup>

	
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
import { ImagePreview } from 'vant';
import QRCode from 'qrcodejs2';
export default {
  name: "addActivity",
  data() {
    return {
		title: '',
		posterDate: '',
      	startDate: '',
		endDate: '',
        people:'',
		address:'',
		detail:'',
		show: false,
		minDate: new Date(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate(),new Date().getHours(),0),
		imgUrl: '',
		activityPic: '',
		fileList: [],
		isImgPreview:false,
		modelImg1: require('../images/poster/model-1.png'),
		modelImg2: require('../images/poster/model-2.png'),
		radio:'1',

		lastParams1: {},
		lastParams2: {},
		posterImg1: '',
		posterImg2: '',

		startDateShow: false,
		endDateShow: false,
		startDateText: '',
		endDateText: '',

        showShare: false,
        options: [
          {
            name: '微信好友',
            icon: 'wechat',
          },{
            name: '微信朋友圈',
            icon: 'http://ljj-dom.oss-cn-beijing.aliyuncs.com/xfd/wx-moments.png',
          },{
            name: 'QQ',
            icon: 'qq',
          },
          {
            name: '保存相册',
            icon: 'poster',
          },
		],
		imagePreviewCover: ''
    };
  },
  mounted(){
	window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
	window.locationGDAll = this.locationGDAll
	if(typeof android != 'undefined'){
        android.barColor('#4580f3')
    }
  },
  methods: {
    leftBack(){
		if(this.imagePreviewCover) {
			this.imagePreviewCover.close();
		}
        this.$router.push({
          path: "/",
        });
	},
	// 初始化日期值
	formatter(type, val) {
      if (type === 'year') {
        return val + '年';
      }
      if (type === 'month') {
        return val + '月';
      }
      if (type === 'day') {
        return val + '日';
	  }
	  if (type === 'hour') {
        return val + '时';
	  }
	  if (type === 'minute') {
        return val + '分';
	  }
      return val;
	},
	// 选择活动日期初始日期
	startDateConfirm(val) {
		this.startDate = val
		this.startDateText = this.dateFormat('yyyy年MM月dd日 HH时mm分', val)
		if(this.endDate) {
			// this.posterDate = this.dateFormat('yyyy年MM月dd日 HH时mm分', val) +' - '+ this.dateFormat('yyyy年MM月dd日 HH时mm分', this.endDate)
			this.startDateShow = false
		} else {
			this.startDateShow = false
			this.endDateShow = true
		}
	},
	// 选择活动日期结束日期
	endDateConfirm(val) {
		this.endDate = val
		this.endDateText = this.dateFormat('yyyy年MM月dd日 HH时mm分', val)
		// if(this.startDate) {
		// 	this.posterDate = this.dateFormat('yyyy年MM月dd日 HH时mm分', this.startDate) +' - '+ this.dateFormat('yyyy年MM月dd日 HH时mm分', val)
		// }
		this.endDateShow = false
	},
	// 上传活动场景图片之后
	afterRead(file) {
		let token = localStorage.getItem("token");
		var formdata = new FormData();
		formdata.append("token", localStorage.getItem('token'));
		formdata.append("file", file.file)
		const instance = this.$axios.create({
		});
		this.fileList = [{
          url: 'https://img.yzcdn.cn/vant/leaf.jpg',
          status: 'uploading',
          message: '上传中...',
		}]
		instance.post("http://crm.xfd365.com/user/base/uploadImg", formdata).then(res => {
		if (res.data.errno == 0) {
			this.activityPic = file.content
			this.fileList = [{
				url: res.data.data.url,
				status: 'done',
				message: '',
			}]
		} else {
			this.$toast(res.data.errmsg);
			this.fileList = [{
				url: res.data.data.url,
				status: 'failed',
				message: '上传失败',
			}]
		}
		}).catch(() =>{
			this.fileList = [{
				url: res.data.data.url,
				status: 'failed',
				message: '上传失败',
			}]
		});
	},
	// 预览海报模板
	imgPreview(url) {
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
	// 确定日期选择
	onConfirm(date) {
		this.startDate = this.dateFormat('yyyy-MM-dd', date[0])
		this.endDate = this.dateFormat('yyyy-MM-dd', date[1])
		this.posterDate = this.dateFormat('yyyy年MM月dd日', date[0]) + ' - ' + this.dateFormat('yyyy年MM月dd日', date[1])
		this.show = false
	},
	// 生成手机端查看详情二维码
    renderQrcode(id) {
        let qrcode = new QRCode('qrcode'+this.radio, {
            width: document.body.clientWidth*0.25,
            height: document.body.clientWidth*0.25,        // 高度
			// text:  'http://kehu.xfd365.com/#/activityDetail?id='+id,   // 二维码内容
			text: window.location.protocol+'//'+ window.location.host +'/#/activityDetail?id='+id,   // 二维码内容
		})
		// document.querySelector('#qrcode'+this.radio).style.width = 2.4+'rem'
		// document.querySelector('#qrcode'+this.radio).style.height = 2.4+'rem'
		document.querySelector('#qrcode'+this.radio +' img').style.width = 2.4+'rem'
		document.querySelector('#qrcode'+this.radio +' img').style.height = 2.4+'rem'
	},
	// 添加活动接口
	addActivityApi(callBack) {
		let that = this;
		let params = {};
		if(that.fileList && that.fileList.length >= 1) {
			if(that.fileList[0].status == 'uploading') {
				that.$toast('正在上传场景图片，请稍后重试！')
				return
			}
			if(that.fileList[0].status == 'failed') {
				that.$toast('上传场景图片失败,请先重新上传场景图片!')
				return
			}
		}
		if(!that.title.trim()) {
			that.$toast('请输入活动主题')
			scroll(0,0)
			return
		}
		if(!that.startDate) {
			that.$toast('请选择活动开始时间')
			scroll(0,0)
			return
		}
		if(!that.endDate) {
			that.$toast('请选择活动结束时间')
			scroll(0,0)
			return
		}
		if(!that.address) {
			that.$toast('请输入活动地址')
			return
		}
		if(!that.people) {
			that.$toast('请输入参会人员')
			return
		}
		if((!that.fileList || that.fileList.length < 1 || !that.fileList[0].url) && !that.activityPic) {
			that.$toast('请上传活动场景图片')
			return
		}
		if(that.radio != 1 && that.radio != 2) {
			that.$toast('请选择海报模板')
			return
		}

		params.title = that.title
		params.start_date = that.startDate
		params.end_date = that.endDate
		params.address = that.address
		params.participant = that.people
		params.detail = that.detail
		params.activity_pic = that.fileList[0].url
		params.poster_id = that.radio
		if(that.radio == 1) {
			if(JSON.stringify(that.lastParams1) == JSON.stringify(params)) {
				that.$toast.loading({
					message: '海报生成中...',
					forbidClick: true,
					duration: 0
				});
				that.imgUrl = that.posterImg1
				that.$toast.clear()
				that.isImgPreview = true
				return
			} else {
				that.lastParams1 = params
			}
		} else if(that.radio == 2) {
			if(JSON.stringify(that.lastParams2) == JSON.stringify(params)) {
				that.$toast.loading({
					message: '海报生成中...',
					forbidClick: true,
					duration: 0
				});
				that.imgUrl = that.posterImg2
				that.$toast.clear()
				that.isImgPreview = true
				return
			} else {
				that.lastParams2 = params
			}
		}
		that.$toast.loading({
			message: '接口请求中...',
			forbidClick: true,
			duration: 0
		});
		// 线上删除
		// document.getElementById("qrcode1").innerHTML = ''
		// document.getElementById("qrcode2").innerHTML = ''
		// that.renderQrcode(6)
		// that.$nextTick(() =>{
		// 	setTimeout(() =>{
		// 		callBack && typeof callBack == 'function' && callBack()
		// 	},500)
		// })
		// return

		that.$api.addActivity(params).then(res=>{
			if(res.errno === 0){
				document.getElementById("qrcode1").innerHTML = ''
				document.getElementById("qrcode2").innerHTML = ''
				that.$nextTick(() =>{
					that.renderQrcode(res.data.activity_id)
					setTimeout(() =>{
						callBack && typeof callBack == 'function' && callBack()
					},500)
				})
				
			} else {
				that.$toast.clear()
				that.$toast(res.errmsg);
			}
		}).catch(() =>{
			that.$toast.clear()
			that.$toast('添加活动接口请求失败');
		})
	},
    // 生成海报
    renderPoster() {
		let that = this;
		that.addActivityApi(() =>{
			let htmlDom = ''
			if(that.radio == 1) {
				htmlDom = document.getElementById('poster1');
			} else if(that.radio == 2){
				htmlDom = document.getElementById('poster2');
			}
			that.$toast.loading({
				message: '正在生成海报...',
				forbidClick: true,
				duration: 5000
			});
			html2canvas(htmlDom, {
				logging: false, //日志开关，便于查看html2canvas的内部执行流程
				backgroundColor: 'transparent',
				allowTaint: true,
				taintTest: false,
				useCORS: true,
				width: htmlDom.clientWidth, //dom 原始宽度
				height: htmlDom.clientHeight,
				// windowWidth: htmlDom.scrollWidth,
				// windowHeight: htmlDom.scrollHeight,
				scrollY: 0, 
				scrollX: 0,
			}).then(function(canvas) {
				// let imgUri = canvas.toDataURL("image/png", 2); // 获取生成的图片的url
				let imgUri = canvas.toDataURL();//图片地址
				that.imgUrl = imgUri
				if(that.radio == 1) {
					that.posterImg1 = imgUri
				} else if(that.radio == 2) {
					that.posterImg2 = imgUri
				}
				that.isImgPreview = true
				that.$toast.clear()
			}).catch(err =>{
				that.$toast.clear()
			})
		})
		
	},
	// 查看海报
	lookPoster(){
		this.isImgPreview = true
	},
	// 选择分享方式
	selectShareType(options,index) {
		let base64 = this.imgUrl.replace('data:image/png;base64,','')
		if(index == 0) {
			if(typeof android != 'undefined'){
				android.sharePicBase64Wx(base64)
            }
		} else if(index == 1) {
			if(typeof android != 'undefined'){
				android.sharePicBase64WxFriend(base64)
            }
		} else if(index == 2) {
			if(typeof android != 'undefined'){
				android.sharePicBase64WxQQ(base64)
            }
		} else {
			this.downLoadHandle()
		}
		setTimeout(() =>{
			this.showShare = false
		},500)

	},
    downLoadHandle(){
      if(typeof android != 'undefined'){
        android.saveToPhoneBase64('png', this.imgUrl.replace('data:image/png;base64,','')); // 调用Android方法保存图片到手机相册
        this.$toast({
          message: '保存成功',
          icon: 'success'
        })
      }else{
        var alink = document.createElement("a");
        var event = new MouseEvent('click')  
        alink.href = this.imgUrl;
        alink.download = "pic"; //图片名
        alink.dispatchEvent(event);
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
	// 由于百度地图 JS API 只有 JSONP 一种加载方式，因此 BaiduMap 组件及其所有子组件的渲染只能是异步的。
    // 因此，请使用在组件的 ready 事件来执行地图 API 加载完毕后才能执行的代码，不要试图在 vue 自身的生命周期中调用 BMap 类，更不要在这些时机修改 model 层。
        handler ({BMap, map}) {
            window.map = map; //注册为全局
            var that = this;  // map方法中的this指向不对。所有申明一个。。小细节的东西
              // 刚进入页面中的定位，需要向用户授权
            var point = new BMap.Point(113.39852,34.897445);
            var geolocation = new BMap.Geolocation();
            var geoc = new BMap.Geocoder();    
            window.geoc = geoc

            var convertor = new BMap.Convertor();
            window.convertor = convertor

            if(typeof android != 'undefined'){
              android.requestLocation()
            }else{
               geolocation.getCurrentPosition(function(r){
                  if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    var pt = r.point
                    geoc.getLocation(pt, function(rs){
                      // console.log(rs)
                      if(rs.surroundingPois.length > 0){ // 附近的POI点，默认取第一个值
                        if(rs.surroundingPois[0].address.length > 1){ // eg:地铁站address为' '
                          that.address = rs.surroundingPois[0].address  + '(' + rs.surroundingPois[0].title + ')'
                        }else{
                          that.address = rs.surroundingPois[0].title
                        }
                      }else{
                        that.address = rs.address;
                      }
                    }); 
                  }
                  else {
                    alert('failed'+this.getStatus());
                  }        
                },{enableHighAccuracy: true})
              
            }
		},
		 // 执行Android方法获取位置信息----（高德坐标转换成百度坐标）
        locationGDAll(location){
          let that = this
          let X_PI = Math.PI * 3000.0 / 180.0;
          let x = location.longitude, y = location.latitude;
          let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
          let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
          that.address = location.address
        },

	
  },
};
</script>
<style lang="less">
div { box-sizing: border-box }
.addActivity {
  min-height: 100%;
  background: url('../images/poster/add-bg.png') no-repeat;
  background-size: 100% 100%;
  padding-bottom: 0.5rem;
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
  .van-cell { font-size: 0.37rem; padding-right: 0; }
  .add-group-con {
	  width: 90%;
	  margin: 0.5rem auto;
	  border-radius: 0.22rem;
	  overflow: hidden;
	  padding-right: 16px;
	  margin-bottom: 0;
	  .tit {
		  padding-left: 16px;
		  padding-top: 10px;
		  font-size: 0.37rem;
		  font-weight: bold;
	  }
	  .date-con {
		  display: flex;
		  align-items: center;
		  padding: 10px 0;
		  margin-left: 16px;
		  .date-text {
			  color: #969799;
			  font-size: 0.3rem;
		  }
		  .date-icon {
			  padding: 0 0.1rem;
			  font-size: 0.3rem;
		  }
		  .color-black {
			  color: #333;
			}
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
			  border: none;
		  }
	  }
	  .btn-con2 {
		  width: 90%;
		  height:1.1rem;
		  margin: 0.6rem auto;
		  border-radius: 100px;
		  overflow: hidden;
		  display: flex;
		  justify-content: space-between;
		  .van-button {
			  width: 45%;
			  height: 100%;
			  background: #3e74ef;
			  border: none;
			  border-radius: 1000px;
		  }
	  }
  }
  .poster1-bg {
    position: relative;
    background: url('../images/poster/poster-bg1.png') no-repeat;
    background-size: 100% 100%;
    padding-top: 1.2rem;
    .poster-tit {
      position: relative;
      background: url('../images/poster/poster1-tit-bg.png') no-repeat;
      background-size: 100% 100%;
      width: 81%;
      left: 50%;
      transform: translateX(-50%);
      .tit-bg {
        position: absolute;
        top:0;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 50%;
        text-align: center;
        background: url('../images/poster/poster1-logo-bg.png') no-repeat;
        background-size: 100% 100%;
        height: 1rem;
        img {
          height: 80%;
          transform: translateY(5%)
        }
      }
      .tit-con {
        padding: 1rem;
        padding-bottom: 0;
        text-align: center;
        font-size: 0.8rem;
        font-weight: bold;
        color: #fff;
      }
      .activity-info-con {
        color: #fff;
        padding: 1rem 0.5rem;
		padding-top: 0.6rem;
		text-align: center;
		font-size: 0.4rem;
        .date {
		  padding-bottom: 0.1rem;
        }
      }
    }
    .poster1-info {
      position: relative;
      background: url('../images/poster/poster-info-bg1.png') no-repeat;
      background-size: 100% 100%;
      min-height: 15rem;
      box-sizing: border-box;
      padding-top: 2.8rem;
      margin-top: -1rem;
      .info-item {
          box-sizing: border-box;
          position: relative;
          background: url('../images/poster/poster1-info-bg1.png') no-repeat;
          background-size: 100% 100%;
          width: 90%;
          left: 50%;
          transform: translateX(-50%);
          padding: 1rem 5%  0.6rem 5%;
          text-align: center;
          .info-tit {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%,-50%);
            color: #fff;
            font-size: 0.5rem;
            background: url('../images/poster/poseter1-info-tit-bg1.png');
            background-size: 100% 100%;
            width: 3.65rem;
            height: 1.22rem;
            text-align: center;
            line-height: 1.22rem;

          }
          .people-desc {
            color: #000a73;
            font-size: 0.4rem;
            padding-bottom: 0.3rem;
          }
          .pic-con {
            position: relative;
            width: 100%;
            .van-image {
              width: 100%;
			  height: 4rem;
			  display: flex;
			  align-items: center;
			  justify-content: center;
			  img {
				  width: auto;
				  height: auto;
				  max-width: 100%;
				  max-height: 100%;
			  }
            }
            .icon2 {
              position: absolute;
              width: 0.66rem;
              bottom: 0;
              right: -10vw;

            }
          }
          &:nth-child(2) {
            background: url('../images/poster/poster1-info-bg2.png') no-repeat;
            background-size: 100% 100%;
            margin-top: 1rem;
            .info-tit {
              width: 4.8rem;
              height: 1.22rem;
              background: url('../images/poster/poseter1-info-tit-bg.png') no-repeat;
              background-size: 100% 100%;
            }
            #qrcode1 {
              width: 2.4rem;
			  height: 2.4rem;
			  margin: 0 auto;
			  img {
				  width: 2.4rem;
				  height: 2.4rem;
			  }
            }
          }
      }
      .icon1 {
        position: relative;
        top: 0;
        left: 0;
        width: 0.66rem;
        transform: translateY(-50%);
      }
    }
    .icon3 {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 2.53rem;
    }
  }
  .poster2-bg {
	  background: #ebf0fa;
	  .poster2-top-bg {
		  background: url('../images/poster/poster2-tit-bg.png') no-repeat;
		  background-size: 100% 100%;
		  .poster2-top {
			padding: 1rem 0.53rem;
			padding-bottom: 0;
			.logo {
				width: 2rem;
			}
			.activity-tit {
				font-size: 1rem;
				font-weight: bold;
				text-align: center;
				color: #d3eeff;
				padding: 0.3rem 0;
				
			}
			.activity-date {
				color: #fff;
				font-size: 0.4rem;
				text-align: center;
				padding-bottom: 0.2rem;
			}
		  }	
		  .poster-img {
			  width: 100%;
			  img {
				  width: 100%;
			  }
		  }  
		  
	  }
	  .poster-info {
		  padding-left: 5%;
		  padding-bottom: 0.5rem;
		  margin-top: -2.5rem;
		  background: #ebf0fa;
		  position: relative;
		  .info-item {
			  width: 90%;
			  border: 2px solid #1a59bf;
			  border-radius: 0.2rem;
			  background: #fff;
			  padding: 0.63rem 0;
			  min-height: 5.8rem;
			  .tit-bg {
				  background-color: #fff;
				  background-image: url('../images/poster/poster2-info-tit-bg.png');
				  background-size: 101% 100%;
				  width: 3.73rem;
				  height: 0.8rem;
				  color: #fff;
				  font-size: 0.4rem;
				  line-height: 0.8rem;
				  padding-left: 0.7rem;
			  }
			  .activity-addr {
				  padding: 0.2rem 0.7rem;
				  color: #1a59bf;
				  font-size: 0.4rem;
				  &:last-child {
					  padding-top: 0;
				  }
			  }
			  &:nth-child(2) {
				  margin-top: 0.5rem;
				  .pic-con {
					position: relative;
					width: 90%;
					margin: 0 auto;
					margin-top: 0.3rem;
					.van-image {
						width: 100%;
						height: 4rem;
						display: flex;
						align-items: center;
						justify-content: center;
						img {
							width: auto;
							height: auto;
							max-width: 100%;
							max-height: 100%;
						}
					}
					.icon2 {
					position: absolute;
					width: 0.66rem;
					bottom: 0;
					right: -10vw;

					}
				}
			  }
		  }
	  }
	  .poster-bot-con {
		 background: url('../images/poster/poster2-bot-bg.png') no-repeat;
		 background-size: 100% 100%;
		 display: flex;
		 align-items: center;
		 flex-direction: column;
		 padding: 0.9rem 0;
		 .tit {
			 color: #fff;
			 font-size: 0.5rem;
			 padding-bottom: 0.63rem;
		 }
		 #qrcode2 {
			width: 2.4rem;
			height: 2.4rem;
			margin: 0 auto;
			img {
				width: 2.4rem;
				height: 2.4rem;
			}
		}
	  }

  }
  .van-image-preview__cover{
    width: 100%;
   	height:1.1rem;
    text-align: center;
    bottom: 12% !important;
    top: auto;
	.btn-con {
		width: 40%;
		height:1.1rem;
		margin: 0.6rem auto;
		border-radius: 100px;
		// border:1px solid #3e74ef;

		overflow: hidden;
		.van-button {
			width: 100%;
			height: 100%;
			background: #3e74ef;
			color: #fff;
			border: none;
		}
	}
  	.van-share-sheet__cancel {
		  color: #333;
	  }
	
  }
}
</style>