<template>
  <div class="dailyAdd">
    <div class="top">
      <p @click="leftBack">
        <img src="../../images/goback.png" alt />
        <span>{{leftText}}</span>
      </p>
      <ul>
        <li>
          <span>{{reportData.station ? reportData.station : 0}}</span>
          <span>新增客户</span>
        </li>
        <li>
          <span>{{reportData.follow ? reportData.follow : 0}}</span>
          <span>跟进客户</span>
        </li>
        <li>
          <span>{{reportData.bai_follow ? reportData.bai_follow : 0}}</span>
          <span>拜访客户</span>
        </li>
        <li>
          <span>{{reportData.zong ? reportData.zong : 0}}</span>
          <span>管理客户</span>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="marBottom">
        <van-cell title="报告时间" :value="time" icon="http://sc.xfd365.com/crmImages/genjinTime.png"></van-cell>
        <van-cell class="getAddress" title="所在位置" :value="address" icon="http://sc.xfd365.com/crmImages/dingwei.png"
          is-link @click="mapSearch" />
        <baidu-map @ready="handler"></baidu-map>
      </div>

      <van-tabs v-model="active" color="#1c92ff" sticky>
        <van-tab title="业绩填报">
          <div class="marBottom">
            <van-field placeholder="请输入拜访拜访业主数量" type="number" label="拜访业主数"
              :left-icon="require('../../images/person2.png')" input-align="right" v-model="customer"
              @input="blurInput(customer, '拜访业主数')" />
            <!-- <van-field placeholder="请输入拜访银行客户数" type="number" label="拜访银行客户数" class="label8"
              :left-icon="require('../../images/bank1.png')" input-align="right"
              v-model="bank" @input="blurInput(bank, '拜访银行客户数')" />
            <van-field placeholder="请输入组织活动次数" type="number" label="组织活动次数"
              :left-icon="require('../../images/huodong.png')" input-align="right" v-model="activity"
              @input="blurInput(activity, '组织活动次数')" />
            <van-field placeholder="请输入活动参与人数" type="number" label="活动参与人数"
              :left-icon="require('../../images/num1.png')" input-align="right" v-model="people"
              @input="blurInput(people, '活动参与人数')" />
            <van-field placeholder="请输入电话沟通数" type="number" label="电话沟通数"
              :left-icon="require('../../images/tel2.png')" input-align="right"
              v-model="tel_num" @input="blurInput(tel_num, '电话沟通数')" /> -->
            <van-field placeholder="请输入裕农通APP推广数" type="number" label="裕农通APP推广数" class="label8"
             :left-icon="require('../../images/num2.png')" input-align="right" v-model="app"
              @input="blurInput(app, '裕农通APP推广数')" />
            <van-field placeholder="请输入签约客户数" type="number" label="签约客户数"
              :left-icon="require('../../images/num3.png')" input-align="right" v-model="sign"
              @input="blurInput(sign, '签约客户数')" />
            <van-field placeholder="请输入收集办卡资料数" type="number" label="收集办卡资料数" class="label8"
              :left-icon="require('../../images/num4.png')" input-align="right"
              v-model="card_information" @input="blurInput(card_information, '收集办卡资料数')" />
            <van-field placeholder="请输入发卡数" type="number" label="发卡数"
              :left-icon="require('../../images/faka.png')" input-align="right" v-model="card"
              @input="blurInput(card, '发卡数')" />
            <van-field placeholder="请输入手机银行开通数" type="number" label="手机银行开通数" class="label8"
              :left-icon="require('../../images/num5.png')" input-align="right" v-model="mobile_bank"
              @input="blurInput(mobile_bank, '手机银行开通数')" />
            <van-field placeholder="请输入裕农通公众号关注数" type="number" label="裕农通公众号关注数" class="label10"
              :left-icon="require('../../images/wx.png')" input-align="right" v-model="yu_weixin"
              @input="blurInput(yu_weixin, '裕农通公众号关注数')" />
            <van-field placeholder="请输入快捷支付绑卡数" type="number" label="快捷支付绑卡数" class="label8"
              :left-icon="require('../../images/num6.png')" input-align="right" v-model="fast_pay"
              @input="blurInput(fast_pay, '快捷支付绑卡数')" />
            <van-field placeholder="请输入互动触摸屏维护数" type="number" label="互动触摸屏维护数" class="label8"
              :left-icon="require('../../images/num7.png')" input-align="right" v-model="ping"
              @input="blurInput(ping, '互动触摸屏维护数')" />
            <van-field placeholder="请输入企业微信添加数" type="number" label="企业微信添加数" class="label8"
              :left-icon="require('../../images/wx.png')" input-align="right" v-model="weixin"
              @input="blurInput(weixin, '企业微信添加数')" />
            <van-field placeholder="请输入营销推广阳光村务平台" type="number" label="营销推广阳光村务平台" class="label12"
              :left-icon="require('../../images/wx.png')" input-align="right" v-model="yangguang"
              @input="blurInput(yangguang, '营销推广阳光村务平台')" />
            <van-field placeholder="请输入裕农快贷地押云贷" type="number" label="裕农快贷地押云贷" class="label10"
              :left-icon="require('../../images/wx.png')" input-align="right" v-model="yunong"
              @input="blurInput(yunong, '裕农快贷地押云贷')" />
            <!-- <van-field placeholder="请输入冀时办下载数" type="number" label="冀时办下载数" class="label8"
              :left-icon="require('../../images/wx.png')" input-align="right" v-model="jishiban"
              @input="blurInput(jishiban, '冀时办下载数')" /> -->


            <van-cell title="详细工作内容" icon="http://sc.xfd365.com/crmImages/beizhu.png"></van-cell>
            <van-field rows="3" :autosize=autosize type="textarea" maxlength="5000" placeholder="请输入详细工作内容"
              show-word-limit v-model="now_summary" />
          </div>
          <div class="marBottom">
            <van-cell title="上传图片" icon="http://sc.xfd365.com/crmImages/pic.png"></van-cell>
            <van-uploader v-model="fileList1" :after-read="afterRead1" :before-delete="beforeDelete1" class="uploadCont">
              <img src="../../images/jia.png" />
              <p>上传图片</p>
             </van-uploader>

          </div>
          <div class="marBottom">
            <van-cell title="上传附件" icon="http://sc.xfd365.com/crmImages/genjinFujian.png"></van-cell>
            <van-uploader v-model="fileList2" :after-read="afterRead2" :before-delete="beforeDelete2" class="uploadCont">
              <img src="../../images/jia.png" />
              <p>上传附件</p>
             </van-uploader>
          </div>
          <div class="marBottom">
            <van-cell title="明日计划" icon="http://sc.xfd365.com/crmImages/plan.png"></van-cell>
            <van-field rows="3" :autosize=autosize type="textarea" maxlength="5000" placeholder="请输入明日计划内容"
              show-word-limit v-model="future_plan" />
          </div>
        </van-tab>
        <van-tab title="今日费用">
          <div class="marBottom">
            <!-- 不要了 -->
            <!-- <van-field placeholder="请输入行程地点" label="行程地点" :left-icon="require('../../images/xingcheng.png')"
              input-align="right" v-model="travel" @input="blurInput(travel, '行程地点')" /> -->
            <!-- <van-field placeholder="请输入里程数" type="number" label="里程数" :left-icon="require('../../images/chefei.png')"
              input-align="right" v-model="km" @input="blurInput(km, '里程数')" /> -->
            <van-field placeholder="请输入加油发票额" type="number" label="加油发票额" :left-icon="require('../../images/youfei.png')"
              input-align="right" v-model="oil" @input="blurInput(oil, '加油发票额')" />
            <van-field placeholder="请输入公共车辆费" type="number" label="公共车辆费"
              :left-icon="require('../../images/bus.png')" input-align="right" v-model="publicM"
              @input="blurInput(publicM, '公共车辆费')" />
            <van-field placeholder="请输入过路过桥费" type="number" label="过路过桥费"
              :left-icon="require('../../images/gaosu.png')" input-align="right" v-model="gaosu"
              @input="blurInput(gaosu, '过路过桥费')" />
            <van-field placeholder="请输入停车费" type="number" label="停车费" :left-icon="require('../../images/stop.png')"
              input-align="right" v-model="tingche" @input="blurInput(tingche, '停车费')" />
            <van-field placeholder="请输入飞机票" type="number" label="飞机票"
              :left-icon="require('../../images/plane.png')" input-align="right" v-model="plane"
              @input="blurInput(plane, '飞机票')" />
            <van-field placeholder="请输入火车票" type="number" label="火车票"
              :left-icon="require('../../images/bus.png')" input-align="right" v-model="train"
              @input="blurInput(train, '火车票')" />
            <van-field placeholder="请输入住宿费" type="number" label="住宿费" :left-icon="require('../../images/zhusu.png')"
              input-align="right" v-model="hotel" @input="blurInput(hotel, '住宿费')" />
            <van-field placeholder="请输入差旅补助" type="number" label="差旅补助"
              :left-icon="require('../../images/chailv.png')" input-align="right" v-model="chailv"
              @input="blurInput(chailv, '差旅补助')" />
          </div>
          <!-- 暂时先去掉 -->
          <!-- <div class="marBottom">
            <van-cell center title="是否有招待">
              <template #right-icon>
                <van-switch v-model="ifZhaoDai" size="24" @change="changeZhaodai()" />
              </template>
            </van-cell>
            <template v-if="ifZhaoDai">
              <van-field placeholder="请输入招待费用" type="number" label="招待费用"
                :left-icon="require('../../images/zhaodai.png')" input-align="right" v-model="entertain_expenses"
                @input="blurInput(entertain_expenses, '招待')" />
              <van-cell title="招待说明">
                <template #icon>
                  <img src="../../images/rizhi.png" alt="" />
                </template>
              </van-cell>
              <van-field rows="3" type="textarea" maxlength="1000" v-model="entertain_note"
                placeholder="请输入招待说明（原因、招待人数、公司参与人员名单）  其他费用说明（费用发生原因及明细）" show-word-limit />
            </template>

          </div> -->

          <div class="marBottom">
            <van-cell center title="是否有其他费用">
              <template #right-icon>
                <van-switch v-model="ifOther" size="24" @change="changeOther()" />
              </template>
            </van-cell>
            <template v-if="ifOther">
              <van-field placeholder="请输入其他费用" type="number" label="其他费用" :left-icon="require('../../images/qita.png')"
                input-align="right" v-model="other_expenses" @input="blurInput(other_expenses, '其他')" />
              <van-cell title="其他费用说明">
                <template #icon>
                  <img src="../../images/rizhi.png" alt="" />
                </template>
              </van-cell>
              <van-field rows="2" :autosize="autosize" type="textarea" maxlength="1000" placeholder="请输入其他费用说明" show-word-limit
                v-model="other_note" />
              <van-cell title="请上传其他费用图片">
                <template #icon>
                  <img src="../../images/pic.png" alt="" />
                </template>
              </van-cell>
              <van-uploader v-model="fileList3" :max-count="3" :after-read="afterRead3" :before-delete="beforeDelete3" class="uploadCont">
                <img src="../../images/jia.png" />
                <p>上传费用图片</p>
               </van-uploader>
            </template>
          </div>
        </van-tab>
      </van-tabs>
      <div class="marBottom">
        <van-cell title="汇报对象" icon="http://sc.xfd365.com/crmImages/name.png"></van-cell>
        <ul class="selectUl">
          <li v-for="(item, index) in lockListArray" :key="'lock-'+index">
            <span>{{item.firstName}}</span>
            <img src="../../images/lock.png" alt />
          </li>
          <li v-for="(item, index) in reportArray" :key="index">
            <span>{{item.firstName}}</span>
            <img src="../../images/delete.png" alt @click="deleteSel(item.id, item.firstName)" />
          </li>
          <img src="../../images/add.png" alt class="addSelImg" @click="addSelPop" />
        </ul>
      </div>
    </div>
    <div class="footer" v-if="hidshowFooter">
      <div @click="toDailyList()">
        <img src="../../images/lylist.png" alt /> 日报列表
      </div>
      <button class="save" @click="saveInfo">提交</button>
    </div>
    <van-dialog v-model="showAddrDialog" title="提示" show-cancel-button @confirm="changeAddrConfirm">
      <div class="addr-dialog-desc">当前定位未获取到详细地址,请手动输入</div>
      <van-field class="addr-dialog-input" v-model="dialogAddr" label="所在位置" placeholder="请输入所在位置" />
    </van-dialog>
  </div>
</template>
<script>
  // import axios from 'axios';
  export default {
    name: "dailyAdd",
    data() {
      return {
        leftText: "日报",
        active: 0,
        autosize: {
          maxHeight: 290,
          minHeight: 50
        },
        time: "",
        address: "",
        lnglat: "",
        location: "",
        locationlnglat: "",

        customer: '',
        // bank: '',
        // activity: '',
        // people: '',
        // tel_num: '',
        app: '',
        sign: '',
        card_information: '',
        card: '',
        mobile_bank: '',
        yu_weixin: '',
        fast_pay: '',
        ping: '',
        weixin: '',
        yangguang: '',
        yunong: '',
        jishiban: '',
        
        now_summary: "",
        future_plan: "",

        fileList1: [],
        pics1: "", // pic
        picsArray1: [],

        fileList2: [],
        files: "", // file
        filesArray2: [],

        reportArray: [],
        report_ids: "",
        reportData: {},
        lockListArray: [],
        lockList_id: "",
        report_id: "", // 编辑时日报ID

        travel: '',
        // km: '',
        publicM: '',
        gaosu: '',
        hotel: '',
        oil: '',
        tingche: '',
        plane: '',
        train: '',
        chailv: '',

        // ifZhaoDai: false,
        // entertain_expenses: '',
        // entertain_note: '',

        ifOther: false,
        other_expenses: '',
        other_note: '',
        fileList3: [],
        pics2: "", // other_pic
        picsArray3: [],

        filesObj: {
          name: "",
          type: "",
          index: ''
        },

        docmHeight: document.documentElement.clientHeight, //默认屏幕高度
        showHeight: "0", //实时屏幕高度
        hidshowFooter: true, //显示或者隐藏footer,

        showAddrDialog: false,
        dialogAddr: ''
      };
    },
    mounted() {
      window.leftBack = this.leftBack; // Android原生返回按钮执行leftBack()方法
      window.locationGDAll = this.locationGDAll
      window.geoc = null;
      window.convertor = null;
      window.vue = this;

      window.onresize = () => {
        // 实时屏幕高度
        this.showHeight = document.body.clientHeight;
      };

      document.documentElement.scrollTop = 0;
      var d = new Date();
      var datetime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.time = datetime;
    },
    methods: {
      leftBack() {
        localStorage.removeItem('ifSave')
        if (this.report_id) {
          // 编辑返回列表页面
          this.$router.push({
            path: "/dailyList"
          });
        } else {
          // 新增返回首页
          this.$router.push({
            path: "/"
          });
        }
      },
      toDailyList () {
        this.goList()
        let role = localStorage.getItem('role')
        if (role == 1) { // 普通用户
          this.$router.push('/dailyList')
        } else { // 管理员
          this.$router.push({
            path: '/reportUserList',
            query: {
              type: 1
            }
          })
        }
      },
      goList() {
        localStorage.removeItem('ifSave')
      },
      // 获取头部数据
      getReport() {
        let data = {};
        data.lat_time = this.time;
        data.end_time = this.time;
        this.$api.reportReport(data).then(res => {
          if (res.errno === 0) {
            this.reportData = res.data;
          } else {
            this.$toast(res.errmsg);
          }
        });
      },
      // 验证输入数字不能为负数
      blurInput(num, tip) {
        if (num < 0) {
          this.$toast(tip + "不能小于0")
        }
      },
      changeZhaodai(){
        if(this.ifZhaoDai == false){
          this.entertain_expenses = ''
          this.entertain_note = ''
        }
      },
      changeOther(){
        if(this.ifOther == false){
          this.other_expenses = ''
          this.other_note = ''
          this.pics2 = "";
          this.picsArray2 = [];
          this.fileList3 = [];
        }
      },
			afterRead1(file) {
				// 判断图片大小，确定是否压缩图片
				this.$compreImg(file.content).then(result => {
					if (result.size > file.file.size){ //压缩后比原来更大，则将原图上传
						this._uploadFile(file.file, file.file.name, 1);
					} else { //压缩后比原来小，上传压缩后的
						this._uploadFile(result, file.file.name, 1)
					}
				})
			},
      afterRead2(file) {
      	// 判断图片大小，确定是否压缩图片
      	this.$compreImg(file.content).then(result => {
      		if (result.size > file.file.size){ //压缩后比原来更大，则将原图上传
      			this._uploadFile(file.file, file.file.name, 2);
      		} else { //压缩后比原来小，上传压缩后的
      			this._uploadFile(result, file.file.name, 2)
      		}
      	})
      },
      afterRead3(file) {
      	// 判断图片大小，确定是否压缩图片
      	this.$compreImg(file.content).then(result => {
      		if (result.size > file.file.size){ //压缩后比原来更大，则将原图上传
      			this._uploadFile(file.file, file.file.name, 3);
      		} else { //压缩后比原来小，上传压缩后的
      			this._uploadFile(result, file.file.name, 3)
      		}
      	})
      },
      _uploadFile(file, filename, id){
				var formdata = new FormData(); //可以通过append()方法来追加数据
        let token = localStorage.getItem("token");
				formdata.append("file", file, filename);
				formdata.append("token", token);
				const instance = this.$axios.create({
					//withCredentials:true
				});
				this.$toast.loading({
					message: '上传中...',
					forbidClick: true,
					duration: 0,
				});
				instance.post("http://crm.xfd365.com/user/base/uploadImg", formdata).then(res => {
					this.$toast.clear()
					if (res.data.errno === 0) {
            // 上传图片
            if(id == 1){
              this.picsArray1.push(res.data.data.url)
            }else if(id == 2){
              this.filesArray2.push(res.data.data.url)
            }else if(id == 3){
              this.picsArray3.push(res.data.data.url)
            }
					} else {
						this.$toast(res.errmsg);
            if(id == 1){
              this.fileList1[this.filesObj.index].status = 'failed'
              this.fileList1[this.filesObj.index].message = '上传失败'
            }else if(id == 2){
              this.fileList2[this.filesObj.index].status = 'failed'
              this.fileList2[this.filesObj.index].message = '上传失败'
            }else if(id == 3){
              this.fileList3[this.filesObj.index].status = 'failed'
              this.fileList3[this.filesObj.index].message = '上传失败'
            }
					}
				}, err => {
          if(id == 1){
            this.fileList1[this.filesObj.index].status = 'failed'
            this.fileList1[this.filesObj.index].message = '上传失败'
          }else if(id == 2){
              this.fileList2[this.filesObj.index].status = 'failed'
              this.fileList2[this.filesObj.index].message = '上传失败'
            }else if(id == 3){
              this.fileList3[this.filesObj.index].status = 'failed'
              this.fileList3[this.filesObj.index].message = '上传失败'
            }
        });
			},

      beforeDelete1(file, detail) {
        let index = detail.index
        this.fileList1.splice(index, 1);
        this.picsArray1.splice(index, 1);
      },
      beforeDelete2(file, detail) {
        let index = detail.index
        this.fileList2.splice(index, 1);
        this.filesArray2.splice(index, 1);
      },
      beforeDelete3(file, detail) {
        let index = detail.index
        this.fileList3.splice(index, 1);
        this.picsArray3.splice(index, 1);
      },
      deleteSel(user_id, firstName) {
        let that = this;
        let selReport = localStorage.getItem("selReport");
        selReport = JSON.parse(selReport);
        let index = selReport.indexOf(user_id + "-" + firstName);
        selReport.splice(index, 1);
        that.report_ids = "";
        that.reportArray = [];
        selReport.forEach(ele => {
          let eleJson = {};
          eleJson.id = ele.substr(0, ele.length).split("-")[0];
          eleJson.firstName = ele.substr(0, ele.length).split("-")[1];
          that.report_ids += eleJson.id + ",";
          that.reportArray.push(eleJson);
        });

        localStorage.setItem("selReport", JSON.stringify(selReport));
      },
      addSelPop() {
        this.$router.push({
          path: "/reportSel"
        });
      },
      // 获取锁定汇报对象
      getLockList() {
        this.$api.reportUserSel().then(res => {
          if (res.errno === 0) {
            // this.list = res.data
            this.lockListArray = [];
            this.lockList_id = "";
            if (res.data) {
              res.data.forEach(ele => {
                if (ele.is_lock == 1) {
                  this.lockListArray.push(ele);
                  this.lockList_id += ele.user_id + ",";
                }
              });
            }
            if (this.lockListArray) {
              this.lockListArray.forEach(ele => {
                ele.firstName = ele.user_name.substr(0, 1);
              });
            }
          }
        });
      },
      saveInfo() {
        this.pics1 = "";
        if (this.picsArray1 != "") {
          this.picsArray1.forEach(ele => {
            this.pics1 += ele + "#";
          });
        }

        this.files = "";
        if (this.filesArray2 != "") {
          this.filesArray2.forEach(ele => {
            this.files += ele + "#";
          });
        }

        this.pics2 = "";
        if (this.picsArray3 != "") {
          this.picsArray3.forEach(ele => {
            this.pics2 += ele + "#";
          });
        }
        var data = {};
        data.type = 1; //1日报2周报
        data.start_time = this.time;
        data.end_time = this.time;
        data.address = this.address;
        data.lnglat = this.lnglat;

        data.customer = this.customer;
        // data.bank = this.bank;
        // data.activity = this.activity;
        // data.people = this.people;
        // data.tel_num = this.tel_num;
        data.app = this.app;
        data.sign = this.sign;
        data.card_information = this.card_information;
        data.card = this.card;
        data.mobile_bank = this.mobile_bank;
        data.yu_weixin = this.yu_weixin;
        data.fast_pay = this.fast_pay;
        data.ping = this.ping;
        data.weixin = this.weixin;
        data.yangguang = this.yangguang;
        data.yunong = this.yunong;
        // data.jishiban = this.jishiban;
        data.now_summary = this.now_summary;
        data.pic = this.pics1;
        data.file = this.files;
        data.future_plan = this.future_plan;
        if (this.lockList_id) {
          data.report_ids = this.lockList_id + this.report_ids;
        } else {
          data.report_ids = this.report_ids;
        }

        // data.travel = this.travel;
        // data.km = this.km;
        data.pub = this.publicM;
        data.gaosu = this.gaosu;
        data.hotel = this.hotel;
        data.oil = this.oil;
        data.tingche = this.tingche;
        data.plane = this.plane;
        data.train = this.train;
        data.chailv = this.chailv;
        // data.entertain_expenses = this.entertain_expenses;
        // data.entertain_note = this.entertain_note;
        data.other_expenses = this.other_expenses;
        data.other_note = this.other_note;
        data.other_pic = this.pics2;

        this.$api.reportAdd(data).then(res => {
          if (res.errno === 0) {
            this.$toast("提交成功");
            this.leftBack();
          } else if (res.errno == 99) {
            this.$dialog.alert({
              title: '提示',
              message: '登陆过期,请重新登陆,此次操作不会清空您已填信息',
              theme: 'round-button',
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              this.login()
            }).catch(() =>{});
          } else {
            this.$toast(res.errmsg);
          }
        });
      },
      mapSearch() {
        if (!this.address) {
          this.showAddrDialog = true
        }
        // this.$router.push({
        //   path: "/mapSearch",
        //   query: {
        //     from: "dailyAdd"
        //   }
        // });
      },
      login(){
        let phone = localStorage.getItem('account')
        let pwd = localStorage.getItem('basestr')
        this.$api.login({
          phone: phone,
          password: window.atob(pwd)
        }).then(res=>{
          if(res.errno === 0){
            if(res.token){
              localStorage.setItem('token',res.token)
              this.$toast('重新登陆成功,请再次提交重试')
            }
          }
        })
      },
      // 手动输入地址确定
      changeAddrConfirm() {
        this.address = this.dialogAddr
      },
      handler({
        BMap,
        map
      }) {
        window.map = map; //注册为全局
        var that = this; // map方法中的this指向不对。所有申明一个。。小细节的东西
        // 刚进入页面中的定位，需要向用户授权
        var point = new BMap.Point(113.39852, 34.897445);

        var geolocation = new BMap.Geolocation();
        var geoc = new BMap.Geocoder();
        window.geoc = geoc;

        var convertor = new BMap.Convertor();
        window.convertor = convertor;

        if (typeof android != 'undefined') {
          android.requestLocation();
        } else {
          geolocation.getCurrentPosition(
            function(r) {
              if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var pt = r.point;
                geoc.getLocation(pt, function(rs) {
                  if (rs.surroundingPois.length > 0) {
                    if (rs.surroundingPois[0].address.length > 1) {
                      that.address = rs.surroundingPois[0].address + '(' + rs.surroundingPois[0].title + ')'
                      that.location = rs.surroundingPois[0].address + '(' + rs.surroundingPois[0].title + ')'
                    } else {
                      that.address = rs.surroundingPois[0].title
                      that.location = rs.surroundingPois[0].title
                    }
                    that.lnglat = rs.surroundingPois[0].point.lng + ',' + rs.surroundingPois[0].point.lat
                    that.locationlnglat = rs.surroundingPois[0].point.lng + ',' + rs.surroundingPois[0].point.lat
                  } else {
                    that.address = rs.address;
                    that.location = rs.address;
                    that.lnglat = rs.point.lng + ',' + rs.point.lat
                    that.locationlnglat = rs.point.lng + ',' + rs.point.lat
                  }
                });
              } else {
                alert("failed" + this.getStatus());
              }
            }, {
              enableHighAccuracy: true
            }
          );
        }
      },
      refresh() {
        if (typeof android != 'undefined') {
          android.requestLocation()
        }
      },
      // 执行Android方法获取位置信息----（高德坐标转换成百度坐标）
      locationGDAll(location) {
        // alert(JSON.stringify(location))
        let that = this
        let X_PI = Math.PI * 3000.0 / 180.0;
        let x = location.longitude,
          y = location.latitude;
        let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
        let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);

        that.lnglat = (z * Math.cos(theta) + 0.0065) + ',' + (z * Math.sin(theta) + 0.006);
        that.locationlnglat = (z * Math.cos(theta) + 0.0065) + ',' + (z * Math.sin(theta) + 0.006);
        that.address = location.address
        that.location = location.address
      },
    },
    beforeRouteEnter(to, from, next) {
      document.documentElement.scrollTop = 0;
      let addressSel = to.query.addressSel;
      let lnglatSel = to.query.lnglatSel;
      to.meta.addressSel = addressSel;
      to.meta.lnglatSel = lnglatSel;

      if (from.path == "/mapSearch" || from.path == "/reportSel" || localStorage.getItem('ifSave') || from.path == "/reportUserList") {
        to.meta.isBack = true;
      } else {
        to.meta.isBack = false;
      }
      next();
    },
    activated() {
      window.leftBack = this.leftBack; // Android原生返回按钮执行leftBack()方法
      window.locationGDAll = this.locationGDAll
      window.geoc = null;
      window.convertor = null;
      window.vue = this;
      this.active = 0

      localStorage.setItem('ifSave', 1)

      window.onresize = () => {
        // 实时屏幕高度
        this.showHeight = document.body.clientHeight;
      };

      if (this.$route.meta.addressSel) {
        this.address = this.$route.meta.addressSel;
        this.lnglat = this.$route.meta.lnglatSel;
      }
      this.getReport();
      this.getLockList();

      // 获取已选择汇报对象
      let selReport = localStorage.getItem("selReport");
      if (selReport) {
        this.report_ids = "";
        this.reportArray = [];
        JSON.parse(selReport).forEach(ele => {
          let eleArray = ele.substr(0, ele.length).split("-");
          let eleJson = {};
          eleJson.id = eleArray[0];
          eleJson.firstName = eleArray[1];
          this.report_ids += eleJson.id + ",";
          this.reportArray.push(eleJson);
        });
      }

      if (!this.$route.meta.isBack) {
        // 不缓存
        this.refresh()
        document.documentElement.scrollTop = 0;
        let aData = new Date();
        this.time =
          aData.getFullYear() +
          "-" +
          (aData.getMonth() + 1) +
          "-" +
          aData.getDate();
        this.address = this.location;
        this.lnglat = this.locationlnglat;
        this.customer = ''
        // this.bank = ''
        // this.activity = ''
        // this.people = ''
        // this.tel_num = ''
        this.app = ''
        this.sign = ''
        this.card_information = ''
        this.card = ''
        this.mobile_bank = ''
        this.yu_weixin = ''
        this.fast_pay = ''
        this.ping = ''
        this.weixin = ''
        this.yangguang = ''
        this.yunong = ''
        this.jishiban = ''
        this.now_summary = ''
        this.future_plan = ''
        this.fileList1 = [];
        this.pics = "";
        this.picsArray1 = [];
        this.fileList2 = [];
        this.files = "";
        this.filesArray2 = [];

        this.travel = "";
        // this.km = "";
        this.publicM = "";
        this.gaosu = "";
        this.hotel = "";
        this.oil = "";
        this.tingche = "";
        this.plane = "";
        this.train = "";
        this.chailv = "";
        // this.ifZhaoDai = false
        // this.entertain_expenses = ''
        // this.entertain_note = ''

        this.ifOther = false;
        this.other_expenses = "";
        this.other_note = ""
        this.fileList3 = []
        this.pics2 = ''
        this.picsArray3 = []

        this.report_id = "";
        this.leftText = "日报";


        // 查询今日日报
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
        });
        this.$api.report_search().then(res => {
          this.$toast.clear()
          if(res.errno == 0){ // 今日日报存在--进行编辑
            this.leftText = "编辑日报";
            this.time = res.data.add_time.substr(0, 10)
              this.address = res.data.address;
              this.lnglat = res.data.lnglat;

              this.pics1 = res.data.pic;
              this.files = res.data.file;
              this.pics2 = res.data.other_pic;
              if (res.data.pic) {
                var pics = res.data.pic;
                pics = pics.split("#");
                var r = pics.filter(function(s) {
                  return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
                });
                this.picsArray1 = r
                r = r.map(item => ({
                  url: item
                }));
                this.fileList1 = JSON.parse(JSON.stringify(r));
              }
              if (res.data.file) {
                var file = res.data.file;
                file = file.split("#");
                var r = file.filter(function(s) {
                  return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
                });
                this.filesArray2 = r
                r = r.map(item => ({
                  url: item
                }));
                this.fileList2 = JSON.parse(JSON.stringify(r));
              }
              if (res.data.other_pic) {
                var file = res.data.other_pic;
                file = file.split("#");
                var r = file.filter(function(s) {
                  return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
                });
                this.picsArray3 = r
                r = r.map(item => ({
                  url: item
                }));
                this.fileList3 = JSON.parse(JSON.stringify(r));
              }

              this.customer = res.data.customer;
              // this.bank = res.data.bank;
              // this.activity = res.data.activity;
              // this.people = res.data.people
              // this.tel_num = res.data.tel_num
              this.app = res.data.app
              this.sign = res.data.sign
              this.card_information = res.data.card_information
              this.card = res.data.card
              this.mobile_bank = res.data.mobile_bank;
              this.yu_weixin = res.data.yu_weixin;
              this.fast_pay = res.data.fast_pay;
              this.ping = res.data.ping;
              this.weixin = res.data.weixin;
              this.yangguang = res.data.yangguang;
              this.yunong = res.data.yunong;
              this.jishiban = res.data.jishiban;
              this.now_summary = res.data.now_summary;
              this.future_plan = res.data.future_plan;


              this.travel = res.data.travel;
              // this.km = res.data.km;
              this.publicM = res.data.pub;
              this.gaosu = res.data.gaosu;
              this.hotel = res.data.hotel;
              this.oil = res.data.oil;
              this.tingche = res.data.tingche;
              this.plane = res.data.plane;
              this.train = res.data.train;
              this.chailv = res.data.chailv;
              // this.entertain_expenses = res.data.entertain_expenses;
              // this.entertain_note = res.data.entertain_note;
              // if(this.entertain_expenses){
              //   this.ifZhaoDai = true
              // }

              this.other_expenses = res.data.other_expenses;
              this.other_note = res.data.other_note;
              if(this.other_expenses){
                this.ifOther = true
              }

          }
        }).catch(err=>{
          this.$toast.clear()
        })
      }
      this.$route.meta.isBack = false;
    },
    watch: {
      showHeight: function() {
        if (this.docmHeight > this.showHeight) {
          this.hidshowFooter = false;
        } else {
          this.hidshowFooter = true;
        }
      }
    }
  };
</script>
<style lang="less">
  .dailyAdd {
    min-height: calc(100% - 96px);
    background: #f5f5f5;
    padding-top: 46px;
    padding-bottom: 46px;

    .top {
      z-index: 1;
      background: #ffffff url(../../images/topBg.jpg) no-repeat;
      width: 100%;
      height: 75px;
      background-size: 100% 75px;

      >p {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        background: #ffffff url(../../images/topBg.jpg) no-repeat top;
        font-size: 14px;
        height: 46px;
        line-height: 46px;
        color: #fff;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 16px;

        img {
          width: 10px;
          height: 16px;
          margin-right: 10px;
        }

        span {
          line-height: 18px;
        }
      }

      ul {
        margin: 0 10px;
        padding: 5px;
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        border-radius: 5px;
        background: #f3feff url(../../images/inheader1.png) no-repeat center bottom;
        background-size: 100% auto;

        li {
          width: 25%;
          padding: 5px 0;
          text-align: center;
        }

        span {
          display: block;
          line-height: 20px;

          &:first-child {
            font-size: 16px;
          }
        }
      }
    }

    .marBottom {
      margin-bottom: 10px;
      background: #fff;

      .selectUl {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        color: #ffffff;
        padding: 5px;

        li {
          margin: 5px 8px;
          width: 36px;
          height: 36px;
          line-height: 36px;
          font-size: 16px;
          text-align: center;
          background: #1c92ff;
          border-radius: 50%;
          position: relative;

          img {
            position: absolute;
            right: -6px;
            top: -6px;
            width: 16px;
            height: 16px;
            padding: 5px;
          }
        }

        .addSelImg {
          margin: 5px;
          width: 36px;
          height: 36px;
        }
      }
    }

    .van-cell {
      img {
        margin: 3px 2px 0 0;
        width: 16px;
        height: 16px;
      }
    }
    .uploadCont {
      margin: 10px;
      .van-uploader__preview-image {
        width: 100px;
        height: 70px;
      }

      .van-uploader__input-wrapper {
        background: #F0F6FC;
        width: 100px;
        height: 70px;
        text-align: center;
        color: #9AA8B6;

        img {
          width: 15px;
          height: 15px;
          margin: 16px 0 5px 0;
        }
      }
    }

    .getAddress .van-cell__title {
      flex: 0.35;
    }

    .label8 .van-cell__title {
      width: 115px;
    }
    .label10 .van-cell__title {
      width: 130px;
    }
		.label12 .van-cell__title {
		  width: 142px;
		}

    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 50px;
      background: #ffffff;
      display: inline-flex;

      div {
        width: 80px;
        display: grid;
        text-align: center;

        img {
          width: 20px;
          margin: 5px 30px 0 30px;
        }
      }

      .save {
        width: calc(100% - 80px);
        display: block;
        border: none;
        background: #1c92ff;
        color: #fff;
        height: 36px;
        margin: 7px 10px;
        border-radius: 10px;
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
  }
</style>
