<template>
  <div class="siteAdd">
    <van-nav-bar left-text="站点统计" left-arrow fixed @click-left="leftBack" />
    <van-tabs v-model="active" title-active-color="#1C92FF" @click="onClick">
      <van-tab title="站长信息" class="nav-tab1">
        <div class="marBottom">
          <van-field
            placeholder="请输入站长姓名"
            label="站长姓名"
            left-icon="http://sc.xfd365.com/crmImages/name.png"
            input-align="right"
            v-model="site_name"
            @input="saveTab()"
          />
          <van-field name="sex" label="性别" input-align="right" left-icon="http://sc.xfd365.com/crmImages/sex.png">
            <template #input>
              <van-radio-group v-model="sex" direction="horizontal" @change="saveTab()">
                <van-radio name="男">男</van-radio>
                <van-radio name="女">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            placeholder="请输入签约手机号"
            type="tel"
            label="签约手机号"
            left-icon="http://sc.xfd365.com/crmImages/phone.png"
            input-align="right"
            v-model="sign_phone"
            maxlength="11"
            @blur="saveTab()"
          />
          <van-field
            placeholder="请选择出生年月"
            label="出生年月"
            is-link
            readonly
            left-icon="http://sc.xfd365.com/crmImages/birthday.png"
            input-align="right"
            v-model="date_of_birth"
            @click="isBirth=true"
          />
          <van-field name="edu" class="labelRadioEdu" :class="docmWidth < 345 ? 'labelRadioEduMix' : ''" label="教育程度" input-align="right" left-icon="http://sc.xfd365.com/crmImages/education.png">
            <template #input>
              <van-radio-group v-model="edu" direction="horizontal" @change="saveTab()">
                <van-radio name="本科及以上" icon-size="14px">本科及以上</van-radio>
                <van-radio name="大专" icon-size="14px">大专</van-radio>
                <van-radio name="高中及以下" icon-size="14px">高中及以下</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <div class="bottomTip">
            <p>填写人:{{userName}}</p>
            <p>填写日期:{{currentDateNow}}</p>
          </div>
        </div>

      </van-tab>

      <van-tab title="站点信息" class="nav-tab2">
        <div class="marBottom">
          <van-field
            placeholder="请输入经营类型"
            label="经营类型"
            left-icon="http://sc.xfd365.com/crmImages/type.png"
            input-align="right"
            v-model="business_type"
            @input="saveTab()"
          />
          <van-field
            placeholder="请选择经营规模"
            label="经营规模"
            is-link
            readonly
            left-icon="http://sc.xfd365.com/crmImages/busnumber.png"
            input-align="right"
            v-model="the_num"
            @click="isBusNumber=true"
          />
          <van-field
            placeholder="请选择经营地址"
            label="经营地址"
            is-link
            readonly
            left-icon="http://sc.xfd365.com/crmImages/dingwei.png"
            input-align="right"
            v-model="tab3BusRegion"
            @click="isRegion3=true"
          />
          <van-field placeholder="请输入经营详细地址" input-align="right" v-model="tab3BusRegDetail" @input="saveTab()" />
        </div>
        <div class="marBottom">
          <van-field name="work" class="labelRadioBank" label="银行业务熟悉情况" input-align="right" left-icon="http://sc.xfd365.com/crmImages/type.png">
            <template #input>
              <van-radio-group v-model="work" direction="horizontal" @change="saveTab()">
                <van-radio name="良好">良好</van-radio>
                <van-radio name="一般">一般</van-radio>
                <van-radio name="较差">较差</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="result" class="labelRadioEqu" label="裕农通设备" input-align="right" left-icon="http://sc.xfd365.com/crmImages/shebei.png">
            <template #input>
              <van-checkbox-group v-model="result" direction="horizontal" @change="checkBoxChange()">
                <van-checkbox name="APP">APP</van-checkbox>
                <van-checkbox name="POS">POS</van-checkbox>
                <van-checkbox name="互动触摸屏">互动触摸屏</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field
            placeholder="请输入办卡数量"
            label="办卡数量"
            left-icon="http://sc.xfd365.com/crmImages/carnum.png"
            input-align="right"
            v-model="card_num"
            @blur="saveTab()"
          />
        </div>
        <div class="marBottom">
          <van-cell title="上传门头照片" icon="http://sc.xfd365.com/crmImages/door.png"></van-cell>
          <van-uploader v-model="tab1PicList" :after-read="afterRead1" :before-delete="beforeDelete1" class="uploadCont">
            <img src="../images/jia.png" />
            <p>上传门头照片</p>
          </van-uploader>

          <van-cell title="上传店内环境照片" icon="http://sc.xfd365.com/crmImages/shopin.png"></van-cell>
          <van-uploader v-model="tab2PicList" :after-read="afterRead2" :before-delete="beforeDelete2" class="uploadCont">
            <img src="../images/jia.png" />
            <p>上传店内照片</p>
          </van-uploader>

          <van-cell title="上传营业执照" icon="http://sc.xfd365.com/crmImages/pic.png"></van-cell>
          <van-uploader v-model="tab3PicList" :after-read="afterRead3" :before-delete="beforeDelete3" class="uploadCont">
            <img src="../images/jia.png" />
            <p>上传营业执照</p>
          </van-uploader>
        </div>
        <div class="marBottom">
          <van-field name="credit_card" label="建行信用卡" input-align="right" left-icon="http://sc.xfd365.com/crmImages/ccb.png">
            <template #input>
              <van-radio-group v-model="credit_card" direction="horizontal" @change="saveTab()">
                <van-radio name="1">有</van-radio>
                <van-radio name="0">无</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-cell title="上传建行收款码" icon="http://sc.xfd365.com/crmImages/moneycode.png"></van-cell>
          <van-uploader v-model="tab4PicList" :after-read="afterRead4" :before-delete="beforeDelete4" class="uploadCont">
            <img src="../images/jia.png" />
            <p>上传建行收款码</p>
          </van-uploader>

        </div>
        <div class="bottomTip">
          <p>填写人:{{userName}}</p>
          <p>填写日期:{{currentDateNow}}</p>
        </div>
      </van-tab>
      <van-tab title="站点风险情况" class="nav-tab3">
        <div class="marBottom">
          <van-field name="site_VI" label="站点VI标识" input-align="right" left-icon="http://sc.xfd365.com/crmImages/vi.png">
            <template #input>
              <van-radio-group v-model="site_VI" direction="horizontal" @change="saveTab()">
                <van-radio name="有">有</van-radio>
                <van-radio name="无">无</van-radio>
                <van-radio name="缺失">缺失</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="risk" label="风险情况" input-align="right" left-icon="http://sc.xfd365.com/crmImages/vi.png">
            <template #input>
              <van-radio-group v-model="risk" direction="horizontal" @change="saveTab()">
                <van-radio name="高">高</van-radio>
                <van-radio name="中">中</van-radio>
                <van-radio name="低">低</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </div>

        <div class="bottomTip">
          <p>填写人:{{userName}}</p>
          <p>填写日期:{{currentDateNow}}</p>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 选择出生日期 -->
    <van-popup v-model="isBirth" position="bottom" style="height: 264px">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        v-show="isBirth"
        @confirm="handleTime"
        @cancel="isBirth=false"
      />
    </van-popup>

    <!-- 经营规模 -->
    <van-action-sheet
      class="listSheet"
      v-model="isBusNumber"
      title="经营规模"
      :actions="busNumberType"
      @select="onSelectBusNumber"
      :round="isRound"
    ></van-action-sheet>

    <!-- 经营地址 -->
    <div class="provin" v-show="isRegion3">
      <van-area :area-list="areaList" @cancel="hideProv" @confirm="confirmRegion3" />
      <van-overlay :show="isRegion3" @click="isRegion3 = false" />
    </div>

  </div>
</template>
<script>
import AreaList from "../styles/area";
export default {
  name: "siteAdd",
  data() {
    return {
      docmWidth: document.documentElement.clientWidth, //默认屏幕高度
      active: 0,
      areaList: AreaList,
      sex: "",
      site_name: "",
      sign_phone: "",

      currentDate: new Date(),
      minDate: new Date(1900, 1, 1),
      isBirth: false,
      date_of_birth: "",

      edu: "",
      business_type: '',

      isBusNumber: false,
      busNumberType: [
        { name: "10人及以上" },
        { name: "6-9人" },
        { name: "3-5人" },
        { name: "1-2人" },
        { name: "兼职" }
      ],
      the_num: "",

      isRegion3: false,
      tab3BusRegion: "",
      tab3BusRegDetail: "",
      work: '',
      result: [],
      device: "",
      card_num: '',

      tab1PicList: [],
      door_pic: "",
      tab1PicArray: [],


      tab2PicList: [],
      store_pic: "",
      tab2PicArray: [],

      tab3PicList: [],
      business_pic: "",
      tab3PicArray: [],

      credit_card: '',
      tab4PicList: [],
      collection_pic: "",
      tab4PicArray: [],

      site_VI: '',
      risk: '',

      site_id: "",
      user_id: "",
      userName: "",
      currentDateNow: "",

       isPhone: false,
      isRound: false,
      user_type: "",
      id: "", // 建行或新增客户ID
      site_id: '',

      filesObj: {
        name: "",
        type: "",
        index: ''
      },
      headerImage: "",
      picValue: "",
      upImgUrl: "",
    };
  },
  mounted() {
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    document.documentElement.scrollTop = 0;
    this.userName = localStorage.getItem("userName");
    this.user_id = localStorage.getItem("userId");
    this.currentDateNow =
      this.currentDate.getFullYear() +
      "." +
      (this.currentDate.getMonth() + 1) +
      "." +
      this.currentDate.getDate();
    this.user_type = this.$route.query.cls; //1新增，2建行
    this.id = this.$route.query.id;
    var site_id = this.$route.query.site_id;
    if (this.$route.query.site_id) {
      this.site_id = site_id;
      this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0,
        });
      this.$api.siteStatiseDetail({ site_id: this.site_id }).then(res => {
        this.$toast.clear()
        if (res.errno === 0) {
          if (res.data) {
            this.site_name = res.data.site_name;
            this.sex = res.data.sex;
            this.sign_phone = res.data.sign_phone;
            this.date_of_birth = res.data.date_of_birth;
            let edu = res.data.edu
            if(edu == '中专或高中' || edu == '初中及以下'){
              this.edu = '高中及以下'
            }else{
              this.edu = edu;
            }
            this.business_type = res.data.business_type;
            this.the_num = res.data.the_num;

            let business_address = res.data.business_address;
            if (business_address) {
              if (business_address.indexOf("/") == -1) {
                // 不包含/
                this.tab3BusRegDetail = business_address;
              } else {
                let addArr = business_address.substr(0, business_address.length).split("/");
                this.tab3BusRegDetail = addArr[addArr.length - 1];

                this.tab3BusRegion = business_address.substr(0,business_address.length - this.tab3BusRegDetail.length);
              }
            }
            this.work = res.data.work;
            this.device = res.data.device;
            this.result = []
            if(res.data.device){
              this.result = this.device.split('#')
            }
            this.card_num = res.data.card_num ? res.data.card_num : '';

            // 门头
            this.door_pic = res.data.door_pic;
            if (this.door_pic) {
              var pics = this.door_pic;
              pics = pics.split("#");
              var r = pics.filter(function(s) {
                return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
              });
              this.tab1PicArray = r;
              r = r.map(item => ({ url: item }));
              this.tab1PicList = JSON.parse(JSON.stringify(r));
            } else {
              this.door_pic = "";
              this.tab1PicArray = [];
              this.tab1PicList = [];
            }

            // 店内环境
            this.store_pic = res.data.store_pic;
            if (this.store_pic) {
              var pics = this.store_pic;
              pics = pics.split("#");
              var r = pics.filter(function(s) {
                return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
              });
              this.tab2PicArray = r;
              r = r.map(item => ({ url: item }));
              this.tab2PicList = JSON.parse(JSON.stringify(r));
            } else {
              this.store_pic = "";
              this.tab2PicArray = [];
              this.tab2PicList = [];
            }

            // 营业执照
            this.business_pic = res.data.business_pic;
            if (this.business_pic) {
              var pics = this.business_pic;
              pics = pics.split("#");
              var r = pics.filter(function(s) {
                return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
              });
              this.tab3PicArray = r;
              r = r.map(item => ({ url: item }));
              this.tab3PicList = JSON.parse(JSON.stringify(r));
            } else {
              this.business_pic = "";
              this.tab3PicArray = [];
              this.tab3PicList = [];
            }

            this.credit_card = String(res.data.credit_card)
            // 建行收款码
            this.collection_pic = res.data.collection_pic;
            if (this.collection_pic) {
              var pics = this.collection_pic;
              pics = pics.split("#");
              var r = pics.filter(function(s) {
                return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
              });
              this.tab4PicArray = r;
              r = r.map(item => ({ url: item }));
              this.tab4PicList = JSON.parse(JSON.stringify(r));
            } else {
              this.collection_pic = "";
              this.tab4PicArray = [];
              this.tab4PicList = [];
            }
            this.site_VI = res.data.site_VI;

            let risk = res.data.risk
            if(risk == '高风险'){
              this.risk = '高'
            }else if(risk == '中风险'){
              this.risk = '中'
            }else if(risk == '低风险'){
              this.risk = '低'
            }else{
              this.risk = risk;
            }
          }
        }
      }).catch(err =>{
        this.$toast.clear()
      });
    }
  },
  methods: {
    leftBack(){
      this.$router.go(-1)
    },
    onClick(){

    },
    handleTime(value) {
      var d = new Date(value);
      var datetime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.date_of_birth = datetime;
      this.isBirth = false;
      this.saveTab();
    },
    onSelectBusNumber(item) {
      // 经营规模 - 从业人数
      this.the_num = item.name;
      this.isBusNumber = false;
      this.saveTab();
    },
    hideProv: function() {
      this.isRegion1 = false;
      this.isRegion3 = false;
    },
    // 经营地址
    confirmRegion3: function(val) {
      this.isRegion3 = false;
      this.tab3BusRegDetail = "";
      let value = JSON.stringify(val);
      value = JSON.parse(value);
      this.tab3BusRegion = "";
      value.forEach(element => {
        if (element.name == null) {
          return;
        } else {
          this.tab3BusRegion += element.name + "/";
        }
      });
      this.saveTab();
      // this.tab3BusRegion = this.tab3BusRegion.substring(0,this.tab3BusRegion.lastIndexOf("/"));
    },
    // 上传门头照片
    afterRead1(file) {
				// 判断图片大小，确定是否压缩图片
				this.$compreImg(file.content).then(result => {
          this.$toast.loading({
            message: '上传中...',
            forbidClick: true,
            duration: 0,
          });
					if (result.size > file.file.size){ //压缩后比原来更大，则将原图上传
						this._uploadFile(file.file, file.file.name, 1);
					} else { //压缩后比原来小，上传压缩后的
						this._uploadFile(result, file.file.name, 1)
					}
				})
		},
    // 上传店内照片
    afterRead2(file) {
				this.$toast.loading({
					message: '上传中...',
					forbidClick: true,
					duration: 0,
				});
    		// 判断图片大小，确定是否压缩图片
    		this.$compreImg(file.content).then(result => {
    			if (result.size > file.file.size){ //压缩后比原来更大，则将原图上传
    				this._uploadFile(file.file, file.file.name, 2);
    			} else { //压缩后比原来小，上传压缩后的
    				this._uploadFile(result, file.file.name, 2)
    			}
    		})
    },
    // 上传营业执照照片
    afterRead3(file) {
				this.$toast.loading({
					message: '上传中...',
					forbidClick: true,
					duration: 0,
				});
    		// 判断图片大小，确定是否压缩图片
    		this.$compreImg(file.content).then(result => {
    			if (result.size > file.file.size){ //压缩后比原来更大，则将原图上传
    				this._uploadFile(file.file, file.file.name, 3);
    			} else { //压缩后比原来小，上传压缩后的
    				this._uploadFile(result, file.file.name, 3)
    			}
    		})
    },
    // 上传建行收款码照片
    afterRead4(file) {
				this.$toast.loading({
					message: '上传中...',
					forbidClick: true,
					duration: 0,
				});
    		// 判断图片大小，确定是否压缩图片
    		this.$compreImg(file.content).then(result => {
    			if (result.size > file.file.size){ //压缩后比原来更大，则将原图上传
    				this._uploadFile(file.file, file.file.name, 4);
    			} else { //压缩后比原来小，上传压缩后的
    				this._uploadFile(result, file.file.name, 4)
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
				instance.post("http://crm.xfd365.com/user/base/uploadImg", formdata).then(res => {
					this.$toast.clear()
					if (res.data.errno === 0) {
            if(id == 1){
              this.tab1PicArray.push(res.data.data.url);
            }else if(id == 2){
              this.tab2PicArray.push(res.data.data.url);
            }else if(id == 3){
              this.tab3PicArray.push(res.data.data.url);
            }else if(id == 4){
              this.tab4PicArray.push(res.data.data.url);
            }
            this.saveTab();
					} else {
						this.$toast(res.errmsg);
            if(id == 1){
              this.tab1PicList[this.filesObj.index].status = 'failed'
              this.tab1PicList[this.filesObj.index].message = '上传失败'
            }else if(id == 2){
              this.tab2PicList[this.filesObj.index].status = 'failed'
              this.tab2PicList[this.filesObj.index].message = '上传失败'
            }else if(id == 3){
              this.tab3PicList[this.filesObj.index].status = 'failed'
              this.tab3PicList[this.filesObj.index].message = '上传失败'
            }else if(id == 4){
              this.tab4PicList[this.filesObj.index].status = 'failed'
              this.tab4PicList[this.filesObj.index].message = '上传失败'
            }
					}
				}, err => {
          if(id == 1){
            this.tab1PicList[this.filesObj.index].status = 'failed'
            this.tab1PicList[this.filesObj.index].message = '上传失败'
          }else if(id == 2){
            this.tab2PicList[this.filesObj.index].status = 'failed'
            this.tab2PicList[this.filesObj.index].message = '上传失败'
          }else if(id == 3){
            this.tab3PicList[this.filesObj.index].status = 'failed'
            this.tab3PicList[this.filesObj.index].message = '上传失败'
          }else if(id == 4){
            this.tab4PicList[this.filesObj.index].status = 'failed'
            this.tab4PicList[this.filesObj.index].message = '上传失败'
          }
        });
			},
    // 删除门头
    beforeDelete1(file ,detail){
      let index = detail.index
      this.tab1PicArray.splice(index, 1);
      this.tab1PicList.splice(index, 1);
      this.saveTab();
    },
    // 删除店内环境
    beforeDelete2(file ,detail){
      let index = detail.index
      this.tab2PicArray.splice(index, 1);
      this.tab2PicList.splice(index, 1);
      this.saveTab();
    },
     // 删除营业执照
    beforeDelete3(file ,detail){
      let index = detail.index
      this.tab3PicArray.splice(index, 1);
      this.tab3PicList.splice(index, 1);
      this.saveTab();
    },
    // 删除建行收款码
    beforeDelete4(file ,detail){
      let index = detail.index
      this.tab4PicArray.splice(index, 1);
      this.tab4PicList.splice(index, 1);
      this.saveTab();
    },
    checkBoxChange(){
      this.device = ''
      if(this.result.length > 0){
        this.result.forEach(ele=>{
          if(ele.length > 0){
            this.device += ele + '#'
          }
        })
      }else{
        this.device = ''
      }
      this.saveTab()
    },
    saveTab() {
      let reg = /^1[0-9]{10}$/;
      // 签约手机号
      if (!reg.test(this.sign_phone) && this.sign_phone.trim().length > 0) {
        this.$toast("请输入正确手机号！");
        return;
      }
       // 门头
      this.door_pic = "";
      if (this.tab1PicArray != "") {
        this.tab1PicArray.forEach(ele => {
          this.door_pic += ele + "#";
        });
      }
      // 店内环境
      this.store_pic = "";
      if (this.tab2PicArray != "") {
        this.tab2PicArray.forEach(ele => {
          this.store_pic += ele + "#";
        });
      }
      // 营业执照
      this.business_pic = "";
      if (this.tab3PicArray != "") {
        this.tab3PicArray.forEach(ele => {
          this.business_pic += ele + "#";
        });
      }

      // 建行收款码
      this.collection_pic = "";
      if (this.tab4PicArray != "") {
        this.tab4PicArray.forEach(ele => {
          this.collection_pic += ele + "#";
        });
      }

      var data = {};
      data.site_name = this.site_name;
      data.sex = this.sex;
      data.sign_phone = this.sign_phone;
      data.date_of_birth = this.date_of_birth;
      data.edu = this.edu;
      data.business_type = this.business_type;
      data.the_num = this.the_num;
      data.business_address = this.tab3BusRegion + this.tab3BusRegDetail;
      data.work = this.work;
      data.device = this.device;
      data.card_num = this.card_num;
      data.door_pic = this.door_pic;
      data.store_pic = this.store_pic;
      data.business_pic = this.business_pic;
      data.credit_card = this.credit_card;
      data.collection_pic = this.collection_pic;
      data.site_VI = this.site_VI;
      data.risk = this.risk;

      data.site_id = this.site_id;
      data.user_id = this.user_id;

      data.user_type = this.user_type;
      data.customer_id = this.id;

      this.$api.siteStatiseAdd(data).then(res => {
        if (res.errno === 0) {
          // this.$toast("添加成功");
          // this.$router.go(-1);
          // 如果是从跟进页面进入，保存时需要更新站点ID
          if(localStorage.getItem("siteAddFrom")){
            localStorage.setItem("site_id_new", res.data.site_id)
          }else{
            localStorage.removeItem("site_id_new")
          }

          // 如果是新增客户详情页面进入站点统计页面，返回详情时需要更新site_id更新内容
          localStorage.setItem("siteId", res.data.site_id)
        } else {
          this.$toast(res.errmsg);
        }
      });
    }
  }
};
</script>
<style lang="less">
.siteAdd {
  // min-height: 100%;
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
  .van-tabs__wrap {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .van-tabs__line {
    background-color: #1c92ff;
  }
  .van-tab__pane {
    padding-top: 44px;
    .marBottom {
      margin-bottom: 10px;
      background: #fff;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .van-cell{
      color: #646566;
      .van-field__label{
        margin-right: 0;
      }
      .van-radio__label,
      .van-checkbox__label{
        margin-left: 2px;
      }
      .van-radio__icon,
      .van-checkbox__icon{
        font-size: 14px;
      }
      .van-radio--horizontal,
      .van-checkbox--horizontal{
        margin-right: 6px;
      }
      &.labelRadioEdu{
        .van-field__label{
          width: 58px;
        }
      }
      &.labelRadioEduMix{
        .van-radio__label{
          font-size: 13px;
        }
        .van-radio--horizontal{
          margin-right: 2px;
        }
      }
      &.labelRadioBank{
        .van-field__label{
          width: 115px;
        }
      }
      &.labelRadioEqu{
        .van-field__label{
          width: 70px;
        }
      }
    }
    .uploadCont {
				margin: 10px;

				.van-uploader__preview-image{
					width: 100px;
					height: 70px;
				}
				.van-uploader__input-wrapper{
					background: #F0F6FC;
					width: 100px;
					height: 70px;
					text-align: center;
					color: #9AA8B6;
					img{
						width: 15px;
						height: 15px;
						margin: 16px 0 5px 0;
					}
				}
			}

    .bottomTip {
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      color: #aaaaaa;
      background: #f5f5f5;
      font-size: 14px;
      line-height: 32px;
    }
  }
  .van-picker {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
  }

  .van-action-sheet.listSheet {
    .van-action-sheet__header,
    .van-action-sheet__item {
      padding: 0 20px;
    }
    .van-action-sheet__header {
      font-size: 15px;
      font-weight: bold;
    }
    .van-action-sheet__item {
      font-size: 14px;
      height: 42px;
      line-height: 42px;
      &:active {
        color: #1c92ff;
        background: rgba(28, 146, 255, 0.2);
      }
    }
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

  .van-overlay {
    z-index: 3;
  }
}
</style>
