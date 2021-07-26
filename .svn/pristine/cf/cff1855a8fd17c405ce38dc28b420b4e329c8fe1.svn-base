<template>
  <div class="customerDetail" ref="customerDetail" :style='{height: deviceHeight + "px"}'>
    <!-- <van-nav-bar
            left-text="北京新希望有限责任公司"
            left-arrow
            @click-left="$router.go(-1)"
    />-->
    <div class="top">
      <p @click="leftBack">
        <img src="../../images/goback.png" alt />
        <span>{{stationDetail.station_name}}</span>
      </p>
      <div>
        <p>
          <img src="../../images/name.png" alt />
          <span>{{stationDetail.name}}</span>
        </p>
        <a :href="'tel:' + stationDetail.mobile" class="pHref">
          <img src="../../images/phone.png" alt />
          <span>{{stationDetail.mobile}}</span>
        </a>
      </div>
    </div>
    <!-- top -->

    <van-tabs tab-class="tab-class" @click="onClick" title-active-color="#1c92ff" line-width="0" line-height="0"
      v-model="stationActive">
      <van-tab title="站点基本情况" name="站点基本情况">
        <div class="base-box">
          <template v-if="isErr">
            <div class="err-con">
              <span class="err-text">接口请求失败,请稍后重试</span>
              <van-button plain round type="info" size="small" @click="detail()">点击重试</van-button>
            </div>
          </template>
          <template v-else>
            <div class="base-left-con">
              <div class="base-left-item" :class="{'opacity': curScrollTop >= 0 && curScrollTop < scrollTop2 - 50}"
                @click="changeScroll(1)">站长信息</div>
              <div class="base-left-item"
                :class="{'opacity': curScrollTop >= scrollTop2 - 50 && curScrollTop < scrollTop3 - 200}"
                @click="changeScroll(2)">站点信息</div>
              <div class="base-left-item" :class="{'opacity': curScrollTop >= scrollTop3 - 200}"
                @click="changeScroll(3)">业主信息</div>
              <!-- <div class="base-left-item" :class="{'opacity': curScrollTop >= scrollTop4}" @click="changeScroll(4)">交易数据</div> -->
            </div>
            <div class="base-right-con" ref="baseRightCon">
              <p class="dataTitle" id="zhanzhang">站长信息</p>
              <div class="marBottom">
                <!-- 姓名可编辑 -->
                <van-field placeholder="请输入站长姓名" label="站长姓名" left-icon="http://sc.xfd365.com/crmImages/name.png"
                  input-align="right" v-model="tab1Name" @input="saveTab()" />
                <!-- 性别可编辑 -->
                <van-field name="tab1Sex" label="性别" input-align="right"
                  left-icon="http://sc.xfd365.com/crmImages/sex.png">
                  <template #input>
                    <van-radio-group v-model="tab1Sex" direction="horizontal" @change="saveTab()">
                      <van-radio name="男">男</van-radio>
                      <van-radio name="女">女</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
                <!-- 手机号可编辑 -->
                <van-field placeholder="请输入签约手机号" type="tel" label="签约手机号"
                  left-icon="http://sc.xfd365.com/crmImages/phone.png" input-align="right" v-model="tab1Mobile"
                  maxlength="11" @input="saveTab()" />
                <!-- 年龄 -->
                <van-field placeholder="请选择站长出生年月" label="出生年月" left-icon="http://sc.xfd365.com/crmImages/birthday.png"
                  input-align="right" v-model="dateBirth" readonly @click="isBirth=true" />
                <van-field name="tab1Educatione" class="labelRadioEdu"
                  :class="docmWidth < 345 ? 'labelRadioEduMix' : ''" label="教育程度" input-align="right"
                  left-icon="http://sc.xfd365.com/crmImages/education.png">
                  <template #input>
                    <van-radio-group v-model="tab1Educatione" direction="horizontal" @change="saveTab()">
                      <van-radio name="本科及以上">本科及以上</van-radio>
                      <van-radio name="大专">大专</van-radio>
                      <van-radio name="高中及以下">高中及以下</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>

              </div>
              <p class="dataTitle" id="zhandian">站点信息</p>
              <div class="marBottom">
                <div class="listLi">
                  <span class="iconImg"><img src="http://sc.xfd365.com/crmImages/dingwei.png" alt /></span>
                  <span class="title">经营地址</span>
                  <span class="desc">{{tab3BusRegion}}</span>
                </div>
                <van-field placeholder="请输入经营类型" label="经营类型" left-icon="http://sc.xfd365.com/crmImages/type.png"
                  input-align="right" v-model="tab3BusType" @input="saveTab()" />
                <van-field placeholder="请选择经营规模" label="经营规模" is-link readonly
                  left-icon="http://sc.xfd365.com/crmImages/busnumber.png" input-align="right" v-model="tab3BusNumber"
                  @click="isBusNumber=true" />
                <van-field name="bankWork" class="labelRadioBank" :class="docmWidth < 345 ? 'labelRadioBankMix' : ''"
                  label="银行业务熟悉情况" input-align="right" left-icon="http://sc.xfd365.com/crmImages/education.png">
                  <template #input>
                    <van-radio-group v-model="bankWork" direction="horizontal" @change="saveTab()">
                      <van-radio name="良好">良好</van-radio>
                      <van-radio name="一般">一般</van-radio>
                      <van-radio name="较差">较差</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
                <van-field name="result" class="labelRadioEqu" label="裕农通设备" input-align="right"
                  left-icon="http://sc.xfd365.com/crmImages/shebei.png">
                  <template #input>
                    <van-checkbox-group v-model="result" direction="horizontal" @change="checkBoxChange()">
                      <van-checkbox name="APP">APP</van-checkbox>
                      <van-checkbox name="POS">POS</van-checkbox>
                      <van-checkbox name="互动触摸屏">互动触摸屏</van-checkbox>
                    </van-checkbox-group>
                  </template>
                </van-field>
                <van-field placeholder="请输入办卡数量" label="办卡数量" left-icon="http://sc.xfd365.com/crmImages/carnum.png"
                  input-align="right" v-model="tab3BusCardNum" :maxlength="5" @input="saveTab()" />
                <van-cell title="门头" icon="http://sc.xfd365.com/crmImages/door.png"></van-cell>
                <van-uploader v-model="tab1PicList" :after-read="afterRead1" :before-delete="beforeDelete1"
                  class="uploadCont">
                  <img src="../../images/jia.png" />
                  <p>上传门头照片</p>
                </van-uploader>


                <van-cell title="店内环境" icon="http://sc.xfd365.com/crmImages/shopin.png"></van-cell>
                <van-uploader v-model="tab2PicList" :after-read="afterRead2" :before-delete="beforeDelete2"
                  class="uploadCont">
                  <img src="../../images/jia.png" />
                  <p>上传店内环境</p>
                </van-uploader>

                <van-cell title="营业执照" icon="http://sc.xfd365.com/crmImages/pic.png"></van-cell>
                <van-uploader v-model="tab3PicList" :after-read="afterRead3" :before-delete="beforeDelete3"
                  class="uploadCont">
                  <img src="../../images/jia.png" />
                  <p>上传营业执照</p>
                </van-uploader>

                <van-field name="tab3BusCcbRadio" label="建行信用卡" input-align="right"
                  left-icon="http://sc.xfd365.com/crmImages/ccb.png">
                  <template #input>
                    <van-radio-group v-model="tab3BusCcbRadio" direction="horizontal" @change="saveTab()">
                      <van-radio name="1">有</van-radio>
                      <van-radio name="0">无</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>

                <van-cell title="上传建行收款码" icon="http://sc.xfd365.com/crmImages/moneycode.png"></van-cell>
                <van-uploader v-model="tab4PicList" :after-read="afterRead4" :before-delete="beforeDelete4"
                  class="uploadCont">
                  <img src="../../images/jia.png" />
                  <p>上传建行收款码</p>
                </van-uploader>
              </div>
              <p class="dataTitle" id="yezhu">业主信息</p>
              <div class="marBottom" id="yezhuCon">
                <div class="listLi">
                  <span class="iconImg"><img src="http://sc.xfd365.com/crmImages/name.png" alt /></span>
                  <span class="title">业主名称</span>
                  <span class="desc">{{stationDetail.name}}</span>
                </div>
                <a :href="'tel:' + stationDetail.mobile" class="listLi">
                  <span class="iconImg"><img src="http://sc.xfd365.com/crmImages/phone.png" alt /></span>
                  <span class="title">联系电话</span>
                  <span class="desc">{{stationDetail.mobile}}</span>
                </a>
                <div class="listLi tagLi" @click="tagList">
                  <!-- <div class="listLi tagLi" @click="isType=true"> -->
                  <span class="iconImg"><img src="http://sc.xfd365.com/crmImages/tag.png" alt /></span>
                  <span class="title">业主标签</span>
                  <span class="desc">
                    <span v-for="(item, index) in labelArray" :key="index" class="tips">{{item}}</span>
                  </span>
                </div>
                <div class="listLi">
                  <span class="iconImg"><img src="http://sc.xfd365.com/crmImages/customerName.png" alt /></span>
                  <span class="title">服务站点名称</span>
                  <span class="desc">{{stationDetail.station_name}}</span>
                </div>
                <van-field :value="userName" label="归属人员" readonly left-icon="http://sc.xfd365.com/crmImages/guishu.png"
                  input-align="right" />


                <!-- <van-uploader v-model="thumbList"/> -->
                <template v-if="thumbList.length > 0">
                  <van-cell title="业主相关图片" icon="http://sc.xfd365.com/crmImages/pic.png"></van-cell>
                  <van-uploader v-model="thumbList" :preview-full-image="previewFullImage" :deletable="deletable" :show-upload="showUpload"
                    @click-preview="clickPreview" />
                  <div class="image-preview" v-if="ifPreview">
                    <van-image-preview v-model="ifPreview" :images="thumbListPre" :loop="isLoop"
                      :startPosition="startPosition" @change="onChange" @close="onClose()">
                      <template v-slot:index>{{pageIn}} / {{totalPage}}</template>
                      <div slot="cover" class="color-high">
                        <van-icon name="down" class="down-img" @click="downLoadHandle" />
                      </div>
                    </van-image-preview>
                  </div>
                </template>
                <template v-if="stationDetail.note">
                  <van-cell title="备注信息" icon="http://sc.xfd365.com/crmImages/beizhu.png"></van-cell>
                  <van-field v-model="stationDetail.note" readonly rows="2" autosize type="textarea" />
                </template>

              </div>
            </div>
          </template>
        </div>
      </van-tab>
      <van-tab title="业绩及跟进" name="业绩及跟进" >
        <div class="base-other-box" @scroll="scrollEvent($event)">
          <ul class="tipList" v-if="tipList.length > 0">
            <li class="keyword" :class="selectId == '' || selectId == undefined ? 'active' : ''" @click="selTip()">全部
            </li>
            <li class="keyword" :class="selectId == item1.user_id ? 'active' : ''" v-for="(item1, index1) in tipList"
              :key="index1" @click="selTip(item1.user_id)">
              {{ item1.user_name }}
            </li>
          </ul>
          <div v-for="(item,index) in genjin" :key="index" class="genjinlCont">
            <p class="fllow-title">{{item.follow_time}}</p>
            <ul @click="genjinDetail(item.follow_id)">
              <li>
                <img src="../../images/avatar1.png" alt />
                <span>{{item.user_name}}</span>
                <!-- <span>客户经理</span> -->
                <span class="tip" v-if="item.role==2">超级管理员</span>
                <span class="tip" v-else-if="item.role==3">区域管理员</span>
                <span class="tip" v-else>客户经理</span>
                <span class="num">第{{item.num}}次</span>
              </li>
              <li>
                <img src="../../images/info.png" alt />
                <span>{{item.content}}</span>
              </li>
              <li>
                <img src="../../images/time.png" alt />
                <span>{{item.follow_time}}</span>
              </li>
              <li v-if="item.address">
                <img src="../../images/dingwei.png" alt />
                <span>{{item.address}}</span>
              </li>
              <li>
                <img src="../../images/customerStatus.png" alt />
                <span v-if="item.type==1">到访</span>
                <span v-else-if="item.type==2">电话</span>
                <span v-else-if="item.type==3">微信</span>
                <span v-else-if="item.type==4">短信</span>
                <span v-else-if="item.type==5">其他</span>
              </li>
            </ul>
            <p class="detailBtn" @click="genjinDetail(item.follow_id)">查看详情</p>
          </div>
          <!-- 加载中 -->
          <van-loading v-if="isLoading" size="24px">{{deviceTip}}</van-loading>
          <!-- 没有更多了 -->
          <p v-if="!isLoading" class="noMore">{{deviceTip}}</p>
        </div>
      </van-tab>
      <van-tab title="站点风险情况" name="站点风险情况">
        <div class="base-other-box">
          <template v-if="isErr">
            <div class="err-con">
              <span class="err-text">接口请求失败,请稍后重试</span>
              <van-button plain round type="info" size="small" @click="detail()">点击重试</van-button>
            </div>
          </template>
          <template v-else>
            <div class="marBottom">
              <van-field name="tab3BusVIRadio" label="站点VI标识" input-align="right"
                left-icon="http://sc.xfd365.com/crmImages/vi.png">
                <template #input>
                  <van-radio-group v-model="tab3BusVIRadio" direction="horizontal" @change="saveTab()">
                    <van-radio name="有">有</van-radio>
                    <van-radio name="无">无</van-radio>
                    <van-radio name="缺失">缺失</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <van-field name="tab3BusRisk" label="风险情况" input-align="right"
                left-icon="http://sc.xfd365.com/crmImages/vi.png">
                <template #input>
                  <van-radio-group v-model="tab3BusRisk" direction="horizontal" @change="saveTab()">
                    <van-radio name="高">高</van-radio>
                    <van-radio name="中">中</van-radio>
                    <van-radio name="低">低</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
            </div>
          </template>
        </div>
      </van-tab>
      <van-tab title="关联客户" name="关联客户">
        <div class="base-other-box">
          <van-collapse class="van-collapse" v-model="activeNames" accordion>
            <van-collapse-item v-for="(item, index) in linkList" :key="index">
              <template #title>
                <div>{{item.name}} | {{item.mobile}}</div>
                <div class="label-cont" v-if="item.label">
                  <span class="label-tip" v-for="(itemLabel, indexLabe) in item.labelArray"
                    :key="indexLabe">{{itemLabel}}</span>
                </div>
              </template>
              <div class="collapse-item" v-if="item.address">
                <img src="http://sc.xfd365.com/crmImages/address.png" alt />
                <span>{{item.address}}</span>
              </div>
              <div class="collapse-item" v-if="item.industry">
                <img src="http://sc.xfd365.com/crmImages/hangye.png" alt />
                <span>{{item.industry}}</span>
              </div>
              <div class="collapse-item" v-if="item.business">
                <img src="http://sc.xfd365.com/crmImages/yewu.png" alt />
                <span>{{item.business}}</span>
              </div>
              <div class="collapse-item" v-if="item.note">
                <img src="http://sc.xfd365.com/crmImages/beizhu.png" alt />
                <span>{{item.note}}</span>
              </div>
              <div class="editUl">
                <div class="editLi" @click="editLink(item.station_id)">
                  <img src="../../images/customerEdit.png" alt />
                  <span>编辑</span>
                </div>
                <div class="editLi" @click="delLink(item.station_id)">
                  <img src="../../images/customerDel.png" alt />
                  <span>删除</span>
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
        </div>
      </van-tab>
    </van-tabs>
    <ul class="bottom">
      <li @click="toGenjin(stationId, site_id)">
        <img src="../../images/genjin.png" alt />
        <span>写新跟进</span>
      </li>
      <li @click="isPhone=true">
        <img src="../../images/telephone.png" alt />
        <span>拨打电话</span>
      </li>
      <li @click="isMore=true">
        <img src="../../images/more.png" alt />
        <span>更多操作</span>
      </li>
    </ul>
    <van-action-sheet class="vanSheet" v-model="isMore" title="更多操作" :round="isRound">
      <ul>
        <li @click="addRel(stationId)">
          <img src="../../images/customerAdd.png" alt />
          <span>增加关联客户</span>
        </li>
        <li @click="siteStatiseAdd(stationId, site_id)">
          <img src="../../images/inzhandian.png" alt />
          <span>站点统计</span>
        </li>
        <li @click="edit(stationId)">
          <img src="../../images/customerEdit.png" alt />
          <span>编辑客户</span>
        </li>
        <li @click="del(stationId)">
          <img src="../../images/customerDel.png" alt />
          <span>删除客户</span>
        </li>
      </ul>
    </van-action-sheet>

    <van-action-sheet class="vanSheet" v-model="isPhone" title="拨打电话" :round="isRound">
      <a :href="'tel:' + stationDetail.mobile" style="color: #000;padding:20px;display:block"
        @click="dialNum">{{stationDetail.mobile}}</a>
    </van-action-sheet>

    <van-popup class="tagPopup" v-model="isType" @click-overlay="closePopup">
      <div class="content">
        <div class="imgDiv">
          <img src="http://sc.xfd365.com/crmImages/tags.png" alt />
        </div>
        <p>*可以选择多种标签</p>
        <ul>
          <li v-for="(item,index) in type" :key="index" :class="item.ischecked?'active':''"
            @click="item.ischecked = !item.ischecked">{{item.tag_name}}</li>
        </ul>
        <button @click="closeType">确定</button>
      </div>
    </van-popup>
    <!-- 选择出生日期 -->
    <van-popup v-model="isBirth" position="bottom" style="height: 264px">
      <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" v-show="isBirth" @confirm="handleTime"
        @cancel="isBirth=false" />
    </van-popup>

    <!-- 经营规模 -->
    <van-action-sheet class="listSheet" v-model="isBusNumber" title="经营规模" :actions="busNumberType"
      @select="onSelectBusNumber" :round="false"></van-action-sheet>

  </div>
</template>
<script>
  import Exif from "exif-js";
  export default {
    name: "customerDetail",
    data() {
      return {
        docmWidth: document.documentElement.clientWidth, //默认屏幕高度
        deviceHeight: document.body.clientHeight,
        stationActive: "站点基本情况",
        isRound: false,
        isMore: false,
        isPhone: false,
        stationDetail: {},
        deletable: false,
        showUpload: false,


        selectId: '',
        tipList: [],

        ifChange: false,
        genjin: [],
        pageSize: 10, //每页显示
				page: 1, //当前页
				totalNum: 0, //总条数
				totalPage: 1, //总页数
				ifFinish: false, //是否加载完成
				isLoading: true, //是否加载更多
				deviceTip: '',


        userName: "",
        stationId: "",
        activeNames: ["11111"],
        linkList: [],
        labelArray: [],
        thumbList: [],
        isType: false,
        type: [],

        previewFullImage: false, // 是否在点击预览图后展示全屏图片预览
        isLoop: true,
        ifPreview: false,
        thumbListPre: [],
        downUrl: '',
        startPosition: 1,
        pageIn: 1,
        totalPage: 0,

        siteDetail: '',
        site_id: '',
        tab1Name: "",
        tab1Sex: "",
        tab1Mobile: "",

        dateBirth: "",
        currentDate: new Date(),
        minDate: new Date(1900, 1, 1),
        isBirth: false,
        tab1Educatione: "",
        tab3BusRegion: "",
        tab3BusType: '',
        tab3BusNumber: '',
        isBusNumber: false,
        busNumberType: [{
            name: "10人及以上"
          },
          {
            name: "6-9人"
          },
          {
            name: "3-5人"
          },
          {
            name: "1-2人"
          },
          {
            name: "兼职"
          }
        ],
        bankWork: "",
        result: [],
        device: "",
        tab3BusCardNum: '',

        tab1PicList: [],
        door_pic: "",
        tab1PicArray: [],


        tab2PicList: [],
        store_pic: "",
        tab2PicArray: [],

        tab3PicList: [],
        business_pic: "",
        tab3PicArray: [],

        tab3BusCcbRadio: '',
        tab4PicList: [],
        collection_pic: "",
        tab4PicArray: [],

        tab3BusVIRadio: '',
        tab3BusRisk: "",

        userName: "",
        currentDateNow: "",

        filesObj: {
          name: "",
          type: "",
          index: ''
        },
        headerImage: "",
        picValue: "",
        upImgUrl: "",
        scrollTop1: 0,
        scrollTop2: 0,
        scrollTop3: 0,
        scrollTop4: 0,
        curScrollTop: 0,
        isErr: false
      };
    },
    mounted() {
      window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
      this.$refs.customerDetail.scrollTop = 0

      var site_id_loc = localStorage.getItem("siteId")
      var site_id = this.$route.query.site_id;
      if (site_id_loc !== null) {
        this.site_id = site_id_loc
      } else {
        this.site_id = site_id
      }

      this.stationId = this.$route.query.id;
      this.userName = localStorage.getItem("userName");

      let stationActive = localStorage.getItem("stationActive")
      let toCustomDetail = localStorage.getItem("toCustomDetail")
      let editGlustomer = localStorage.getItem("editGlustomer")
      if (stationActive || editGlustomer) { // 判断是否是从标签模块或者编辑关联客户进入的关联客户
        this.stationActive = "关联客户"
        this.getLinkList()
      } else if (toCustomDetail) {
        this.stationActive = "业绩及跟进"
        this.genjinList()
      } else {
        this.stationActive = "站点基本情况"
      }

      this.scrollTop1 = 0
      this.scrollTop2 = 0
      this.scrollTop3 = 0
      this.scrollTop4 = 0
      this.curScrollTop = 0
      // 客户详情
      this.detail();
      this.genUserList()
    },
    methods: {
      changeScroll(type) {
        if (type == 1) {
          document.querySelector('#zhanzhang').scrollIntoView()
        } else if (type == 2) {
          document.querySelector('#zhandian').scrollIntoView()
        } else if (type == 3) {
          document.querySelector('#yezhu').scrollIntoView()
        }
      },
      onClick(tab) {
        this.ifChange = true
        if (tab == '站点基本情况') {
          let toCustomDetail = localStorage.getItem("toCustomDetail");
          let stationActive = localStorage.getItem("stationActive")
          let editGlustomer = localStorage.getItem("editGlustomer")
          if (stationActive || editGlustomer || toCustomDetail) {
            let that = this
            setTimeout(() => {
              this.scrollTop1 = document.querySelector('#zhanzhang').offsetTop - 8
              this.scrollTop2 = document.querySelector('#zhandian').offsetTop - 8
              this.scrollTop3 = document.querySelector('#yezhu').offsetTop - 8
              // this.scrollTop4 = document.querySelector('.base-right-con').scrollHeight - (document.querySelector('.base-right-con').offsetHeight - (document.querySelector('#jiaoyi').clientHeight + document.querySelector('#jiaoyiCon').clientHeight)) - 60
              this.curScrollTop = document.querySelector('#zhanzhang').offsetTop - 8
              document.querySelector('.base-right-con').scrollTop = 0
              document.querySelector('.base-right-con').onscroll = () => {
                that.curScrollTop = document.querySelector('.base-right-con').scrollTop
              }
              localStorage.removeItem('toCustomDetail')
            }, 200)
          }
        }else if(tab == '业绩及跟进'){
          this.page = 1
          this.genjin = []
          this.totalNum = 0
				this.totalPage = 1
				this.ifFinish = false
				this.isLoading = true
				this.deviceTip = ''
          this.genjinList()
        }else if(tab == '关联客户'){
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
          });
          this.getLinkList()
        }
      },
      leftBack() {
        this.$router.go(-1)
      },
      // 客户详情
      detail(err) {
        let that = this
        this.isErr = false
        this.$api.stationDetail({
          station_id: this.stationId,
          type: 1
        }).then(res => {
          if (res.errno === 0) {
            if (res.data) {
              this.stationDetail = res.data;
              // 从详情获取site_id从而获取站点详情
              this.site_id = res.data.site_id;
              // this.getSiteStatiseDetail()

              if (res.data.label) {
                let label = res.data.label
                // this.labelArray = ele.label.substr(0, ele.label.length - 1).split("#"); // 最后一位有#
                this.labelArray = label.substr(0, label.length).split("#");
              } else {
                this.labelArray = []
              }
              if (res.data.thumb) {
                var pics = res.data.thumb;
                pics = pics.split("#");
                var r = pics.filter(function(s) {
                  return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
                });
                this.thumbListPre = r
                this.totalPage = r.length
                r = r.map((item, index) => ({
                  url: item,
                  index: index
                }));
                this.thumbList = JSON.parse(JSON.stringify(r));
              }

              if (res.site_data) {
                this.siteDetail = res.site_data;
                this.tab1Name = this.siteDetail.site_name ? this.siteDetail.site_name : '';
                this.tab1Sex = this.siteDetail.sex;
                this.tab1Mobile = this.siteDetail.sign_phone ? this.siteDetail.sign_phone : '';
                this.dateBirth = this.siteDetail.date_of_birth ? this.siteDetail.date_of_birth : ''
                let edu = this.siteDetail.edu
                if (edu == '中专或高中' || edu == '初中及以下') {
                  this.tab1Educatione = '高中及以下'
                } else {
                  this.tab1Educatione = edu;
                }

                this.tab3BusRegion = this.siteDetail.business_address
                this.tab3BusType = this.siteDetail.business_type;
                this.tab3BusNumber = this.siteDetail.the_num ? this.siteDetail.the_num : ''
                this.bankWork = this.siteDetail.work ? this.siteDetail.work : ''
                this.device = this.siteDetail.device;
                this.result = []
                if (this.device) {
                  this.result = this.device.split('#')
                }
                this.tab3BusCardNum = this.siteDetail.card_num ? this.siteDetail.card_num : '';

                // 门头
                this.door_pic = this.siteDetail.door_pic;
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
                this.store_pic = this.siteDetail.store_pic;
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
                this.business_pic = this.siteDetail.business_pic;
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

                this.tab3BusCcbRadio = String(this.siteDetail.credit_card)
                // 建行收款码
                this.tab3BusCcbPics = this.siteDetail.collection_pic;
                this.collection_pic = this.siteDetail.collection_pic;
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


                this.tab3BusVIRadio = this.siteDetail.site_VI;
                let risk = this.siteDetail.risk
                if (risk == '高风险') {
                  this.tab3BusRisk = '高'
                } else if (risk == '中风险') {
                  this.tab3BusRisk = '中'
                } else if (risk == '低风险') {
                  this.tab3BusRisk = '低'
                } else {
                  this.tab3BusRisk = risk;
                }

                this.currentDateNow = this.siteDetail.add_time.substr(0, 10)

              }
            }
            if (document.querySelector('.base-right-con')) {
              this.scrollTop1 = document.querySelector('#zhanzhang').offsetTop - 8
              this.scrollTop2 = document.querySelector('#zhandian').offsetTop - 8
              this.scrollTop3 = document.querySelector('#yezhu').offsetTop - 8
              // this.scrollTop4 = document.querySelector('.base-right-con').scrollHeight - (document.querySelector('.base-right-con').offsetHeight - (document.querySelector('#jiaoyi').clientHeight + document.querySelector('#jiaoyiCon').clientHeight)) - 60
              this.curScrollTop = document.querySelector('#zhanzhang').offsetTop - 8
              document.querySelector('.base-right-con').scrollTop = 0
              document.querySelector('.base-right-con').onscroll = () => {
                that.curScrollTop = document.querySelector('.base-right-con').scrollTop
              }
            }
          } else {
            this.$toast(res.errmsg);
            this.isErr = true
            if (document.querySelector('.base-right-con')) {
              this.scrollTop1 = document.querySelector('#zhanzhang').offsetTop - 8
              this.scrollTop2 = document.querySelector('#zhandian').offsetTop - 8
              this.scrollTop3 = document.querySelector('#yezhu').offsetTop - 8
              // this.scrollTop4 = document.querySelector('.base-right-con').scrollHeight - (document.querySelector('.base-right-con').offsetHeight - (document.querySelector('#jiaoyi').clientHeight + document.querySelector('#jiaoyiCon').clientHeight)) - 60
              this.curScrollTop = document.querySelector('#zhanzhang').offsetTop - 8
              document.querySelector('.base-right-con').scrollTop = 0
              document.querySelector('.base-right-con').onscroll = () => {
                that.curScrollTop = document.querySelector('.base-right-con').scrollTop
              }
            }
          }
        }).catch(err => {
          this.isErr = true
        });
      },
      scrollEvent(e) {
        if (e instanceof Event) {
					let el = e.target;
					let scrollTop = el.scrollTop;
					let clientHeight = el.clientHeight; // 获取可视区的高度
					let scrollHeight = el.scrollHeight; // 获取滚动条的总高度
					let height = 50;
					//到底了
					//是否继续加载且已完成加载
					if (scrollTop + clientHeight >= scrollHeight && this.isLoading && !this.ifFinish && this.page <= this.totalPage && !this.ifChange) {
						// 把距离顶部的距离加上可视区域的高度 等于或者大于滚动条的总高度就是到达底部
						this.isLoading = true;
						// console.log("到底了");
						setTimeout(() => {
							this.genjinList();
						}, 1000);
					}
				}
      },
      genjinList() {
        let that = this;
        let data = {}
        data.page = that.page
        data.size = that.pageSize
        data.station_id = this.stationId
        data.user_id = this.selectId
        data.cls = 1
        this.$api.stationGenjin(data).then(res => {
          this.ifChange = false
          this.$toast.clear()
          if (res.errno == 0) {
						this.totalNum = res.data.count;
						this.totalPage = res.data.total
						if (this.totalNum == 0) {
							// console.log("没有数据");
							this.isLoading = false;
							this.ifFinish = true;
							this.page = 1;
							this.deviceTip = "暂无数据";
							return false;
						}
						this.genjin = this.genjin.concat(res.data.data);
						// console.log(this.page, this.totalPage);
						if (this.page == this.totalPage) {
							this.isLoading = false;
							this.ifFinish = true;
							// this.page = 1;
							this.deviceTip = "没有更多了~";
							// console.log("没有更多了");
						} else {
							// console.log("下一页");
							this.isLoading = true;
							this.ifFinish = false;
							this.page++;
							this.deviceTip = "正在加载中~";
						}
					} else {
						this.genjin = [];
						this.isLoading = false;
						this.ifFinish = true;
						this.page = 1;
						this.deviceTip = "数据加载失败~";
					}
        }).catch(err =>{
          this.$toast.clear()
        });
      },
      genUserList() {
        this.$api.followUserLists({
          station_id: this.stationId,
          cls: 1
        }).then(res => {
          if (res.errno === 0) {
            this.tipList = res.data;
          }
        });
      },
      selTip(id) {
        this.selectId = id
        this.genjin = []
				this.page = 1
				this.totalNum = 0
				this.totalPage = 1
				this.ifFinish = false
				this.isLoading = true
				this.deviceTip = ''
        this.genjinList()
      },
      checkBoxChange() {
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
      // 上传门头照片
      afterRead1(file) {
        // 判断图片大小，确定是否压缩图片
        this.$compreImg(file.content).then(result => {
          this.$toast.loading({
            message: '上传中...',
            forbidClick: true,
            duration: 0,
          });
          if (result.size > file.file.size) { //压缩后比原来更大，则将原图上传
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
          if (result.size > file.file.size) { //压缩后比原来更大，则将原图上传
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
          if (result.size > file.file.size) { //压缩后比原来更大，则将原图上传
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
          if (result.size > file.file.size) { //压缩后比原来更大，则将原图上传
            this._uploadFile(file.file, file.file.name, 4);
          } else { //压缩后比原来小，上传压缩后的
            this._uploadFile(result, file.file.name, 4)
          }
        })
      },
      _uploadFile(file, filename, id) {
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
            if (id == 1) {
              this.tab1PicArray.push(res.data.data.url);
            } else if (id == 2) {
              this.tab2PicArray.push(res.data.data.url);
            } else if (id == 3) {
              this.tab3PicArray.push(res.data.data.url);
            } else if (id == 4) {
              this.tab4PicArray.push(res.data.data.url);
            }
            this.saveTab();
          } else {
            this.$toast(res.errmsg);
            if (id == 1) {
              this.tab1PicList[this.filesObj.index].status = 'failed'
              this.tab1PicList[this.filesObj.index].message = '上传失败'
            } else if (id == 2) {
              this.tab2PicList[this.filesObj.index].status = 'failed'
              this.tab2PicList[this.filesObj.index].message = '上传失败'
            } else if (id == 3) {
              this.tab3PicList[this.filesObj.index].status = 'failed'
              this.tab3PicList[this.filesObj.index].message = '上传失败'
            } else if (id == 4) {
              this.tab4PicList[this.filesObj.index].status = 'failed'
              this.tab4PicList[this.filesObj.index].message = '上传失败'
            }
          }
        }, err => {
          if (id == 1) {
            this.tab1PicList[this.filesObj.index].status = 'failed'
            this.tab1PicList[this.filesObj.index].message = '上传失败'
          } else if (id == 2) {
            this.tab2PicList[this.filesObj.index].status = 'failed'
            this.tab2PicList[this.filesObj.index].message = '上传失败'
          } else if (id == 3) {
            this.tab3PicList[this.filesObj.index].status = 'failed'
            this.tab3PicList[this.filesObj.index].message = '上传失败'
          } else if (id == 4) {
            this.tab4PicList[this.filesObj.index].status = 'failed'
            this.tab4PicList[this.filesObj.index].message = '上传失败'
          }
        });
      },
      // 删除门头
      beforeDelete1(file, detail) {
        let index = detail.index
        this.tab1PicArray.splice(index, 1);
        this.tab1PicList.splice(index, 1);
        this.saveTab();
      },
      // 删除店内环境
      beforeDelete2(file, detail) {
        let index = detail.index
        this.tab2PicArray.splice(index, 1);
        this.tab2PicList.splice(index, 1);
        this.saveTab();
      },
      // 删除营业执照
      beforeDelete3(file, detail) {
        let index = detail.index
        this.tab3PicArray.splice(index, 1);
        this.tab3PicList.splice(index, 1);
        this.saveTab();
      },
      // 删除建行收款码
      beforeDelete4(file, detail) {
        let index = detail.index
        this.tab4PicArray.splice(index, 1);
        this.tab4PicList.splice(index, 1);
        this.saveTab();
      },

      handleTime(value) {
        var d = new Date(value);
        var datetime =
          d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        this.dateBirth = datetime;
        this.isBirth = false;
        this.saveTab();
      },
      onSelectBusNumber(item) {
        // 经营规模
        this.tab3BusNumber = item.name;
        this.isBusNumber = false;
        this.saveTab();
      },
      // 保存站点信息
      saveTab() {
        // 签约手机号
        let reg = /^1[0-9]{10}$/;
        if (!reg.test(this.tab1Mobile) && this.tab1Mobile.trim().length > 0) {
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
        data.site_name = this.tab1Name;
        data.sex = this.tab1Sex;
        data.sign_phone = this.tab1Mobile;
        data.date_of_birth = this.dateBirth
        data.edu = this.tab1Educatione;
        data.business_address = this.siteDetail.business_address;
        data.business_type = this.tab3BusType;
        data.the_num = this.tab3BusNumber;
        data.work = this.bankWork;
        data.device = this.device;
        data.card_num = this.tab3BusCardNum;

        data.door_pic = this.door_pic;
        data.store_pic = this.store_pic;
        data.business_pic = this.business_pic;
        data.credit_card = this.tab3BusCcbRadio;
        data.collection_pic = this.collection_pic;
        data.site_VI = this.tab3BusVIRadio;
        data.risk = this.tab3BusRisk;

        data.site_id = this.site_id;
        data.user_id = localStorage.getItem("userId");

        data.user_type = 1; //1新增，2建行
        data.customer_id = this.stationId;
        this.$api.siteStatiseAdd(data).then(res => {
          if (res.errno === 0) {
            // this.$toast("添加成功");
            // 更新siteId
            this.site_id = res.data.site_id
            localStorage.setItem("siteId", res.data.site_id)
          } else {
            this.$toast(res.errmsg);
          }
        });
      },
      siteStatiseAdd(id, site_id) {
        this.$router.push({
          path: "/siteAdd",
          query: {
            id: id,
            site_id: site_id,
            cls: 1
          }
        });
      },
      closeType() {
        var type = this.type;
        var arr = type.filter(ele => {
          return ele.ischecked;
        });
        arr = JSON.parse(JSON.stringify(arr));
        var labelArray = []
        var customer_tag_id = "";
        arr.forEach(ele => {
          labelArray.push(ele.tag_name)
          customer_tag_id += ele.customer_tag_id + ","
        });
        this.isType = false;

        var data = {}
        data.type = 1 // 新增客户的标签
        data.user_id = this.stationId
        data.customer_tag_id = customer_tag_id
        this.$api.tagUserUpdate(data).then(res => {
          localStorage.setItem("tagupdate", "1") // 判断是否更新标签操作，到列表页面是否需要刷新
          if (res.errno === 0) {
            this.labelArray = labelArray
          } else {
            this.$toast(res.errmsg)
          }
        })
      },
      closePopup() {
        localStorage.removeItem("tagupdate")
      },
      tagList() { // 获取标签列表
        let that = this;
        that.isType = true
        this.$api.tagList({
          type: 2
        }).then(res => {
          if (res.errno === 0) {
            if (res.data) {
              that.type = []
              res.data.forEach(ele => {
                let tag_name = ele.tag_name
                if (that.labelArray.indexOf(tag_name) > -1) {
                  ele.ischecked = true
                } else {
                  ele.ischecked = false
                }
                that.type.push(ele)
              });
            }
          } else {
            this.$toast(res.errmsg)
          }
        })
      },
      clickPreview(file, detail) {
        this.downUrl = file.url
        this.startPosition = detail.index
        this.pageIn = detail.index + 1
        this.ifPreview = true
      },
      onChange(index) {
        this.downUrl = this.thumbList[index].url
        this.pageIn = index + 1
      },
      onClose(index, url) {
        this.downUrl = '';
        this.ifPreview = false
      },
      downLoadHandle() {
        // console.log(this.downUrl)
        if (typeof android != 'undefined') {
          android.saveToPhone(this.downUrl); // 调用Android方法保存图片到手机相册
          this.$toast({
            message: '保存成功',
            icon: 'success'
          })
        } else {
          var alink = document.createElement("a");
          var event = new MouseEvent('click')
          alink.href = this.downUrl;
          alink.download = "pic"; //图片名
          alink.dispatchEvent(event);
        }
      },
      // 关联客户列表
      getLinkList() {
        this.$api.linkStationList({
          linker_id: this.stationId,
          stype: 1
        }).then(res => {
          this.$toast.clear()
          if (res.errno === 0) {
            if (res.data) {
              this.linkList = res.data;
            }
            if (this.linkList) {
              this.linkList.forEach(ele => {
                if (ele.label) {
                  ele.labelArray = ele.label.substr(0, ele.label.length).split("#");
                } else {
                  ele.labelArray = [];
                }
              });
            }
          }
        }).catch(err=>{
          this.$toast.clear()
        });
      },
      editLink(linker_id) {
        this.$router.push({
          path: "/addGlCustomer",
          query: {
            id: this.stationId,
            savestation_id: linker_id
          }
        });
      },
      toGenjin(id, site_id) {
        this.$router.push({
          path: "/customerGenjin",
          query: {
            station_id: id,
            customer_id: 0,
            customerName: this.stationDetail.name,
            cls: 1,
            site_id: site_id,
          }
        });
      },
      dialNum() {
        // 统计打电话次数
        this.$api.dialNum().then(res => {})
      },
      addRel(id) {
        this.$router.push({
          path: "/addGlCustomer",
          query: {
            id: id
          }
        });
      },
      edit(id) {
        this.$router.push({
          path: "/addCustomer",
          query: {
            id: id
          }
        });
      },
      delLink(id) {
        this.$api.stationDel({
          station_id: id
        }).then(res => {
          this.$toast(res.errmsg);
          if (res.errno === 0) {
            // this.$router.go(-1);
            this.getLinkList();
          }
        });
      },
      del(id) {
        this.$api.stationDel({
          station_id: id
        }).then(res => {
          this.$toast(res.errmsg);
          if (res.errno === 0) {
            // 用于判断删除返回刷新页面数据
            localStorage.setItem('reIsBack', "false")
            this.$router.go(-1);
          }
        });
      },
      genjinDetail(follow_id) {
        this.$router.push({
          path: "/genjinDetail",
          query: {
            follow_id: follow_id
          }
        });
      }
    },
    destroyed: function() {
      // 离开页面时清空缓存状态
      localStorage.removeItem("stationActive")
      localStorage.removeItem("toCustomDetail")
      window.removeEventListener('scroll', this.scrollBottomCcbIndex); //监听页面滚动事件
    }
  };
</script>
<style lang="less">
  .customerDetail {
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;

    .top {
      position: relative;
      top: 0;
      left: 0;
      z-index: 1;
      background: url(../../images/topBg.jpg) no-repeat;
      width: 100%;
      height: 130px;
      background-size: 100% 130px;

      >p {
        height: 50px;
        line-height: 18px;
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
      }

      >div {
        display: flex;
        justify-content: space-around;

        p,
        .pHref {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 14px;
          margin-top: 10px;

          img {
            width: 10px;
            height: 15px;
            margin-bottom: 10px;
          }
        }

        p:first-child {
          img {
            width: 15px;
            height: 15px;
          }
        }
      }
    }

    .base-other-box {
      position: relative;
      width: 100%;
      height: calc(100vh - 224px);
      overflow-y: auto;
      box-sizing: border-box;
      padding: 8px;
    }

    .base-box {
      position: relative;
      width: 100%;
      height: calc(100vh - 224px);
      overflow-y: auto;
      display: flex;
      align-items: center;
      padding: 8px;
      box-sizing: border-box;

      .base-left-con {
        .base-left-item {
          writing-mode: horizontal-tb; //默认：水平方向，从上到下
          writing-mode: vertical-rl; //垂直方向，从右向左
          writing-mode: vertical-lr; //垂直方向，从左向右
          width: 22px;
          height: 70px;
          background: #1c5bd1;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          opacity: 0.5;
        }

        .opacity {
          opacity: 1;
        }
      }

      .base-right-con {
        height: 100%;
        border-radius: 10px;
        overflow-y: auto;
      }
    }

    .err-con {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .err-text {
        color: #666;
        font-size: 14px;
        margin-bottom: 15px;
      }
    }

    .dataTitle {
      padding: 0 15px;
      font-size: 12px;
      line-height: 28px;
      font-weight: bold;
      color: #1c5bd1;
      opacity: 0.7;
    }

    .tipList {
      padding: 10px;

      .keyword {
        background: #ffffff;
        padding: 5px 15px;
        line-height: 16px !important;
        border-radius: 30px;
        margin: 5px;
        display: inline-flex;

        &.active {
          background: #1989fa;
          color: #ffffff !important;
        }
      }
    }

    .listLi {
      font-size: 14px;
      display: flex;
      margin: 0 15px;
      padding: 10px 0;
      color: #444444;
      border-bottom: 1px solid #eeeeee;

      &.tagLi {
        padding-right: 14px;
        background: url(../../images/jiantou.png) no-repeat right;
        background-size: auto 16px;
      }

      .iconImg {
        width: 16px;
        text-align: center;
        flex: none;
        margin-right: 5px;

        img {
          max-width: 16px;
          max-height: 16px;
          margin-top: 2px;
        }
      }

      .title {
        flex: none;
        width: 90px;

        &.title7 {
          width: 110px;
        }

        &.title10 {
          width: 150px;
        }
      }

      .desc {
        width: 100%;
        text-align: right;

        .tips {
          color: #1c92ff;
          padding: 0 5px;
          display: inline-block;
          border-radius: 10px;
          margin: 2px;
          border: 1px solid #1c92ff;
        }
      }
    }

    .van-tabs__wrap--scrollable .van-tab {
      flex-basis: 35% !important;
      padding: 0 3px;
    }

    .van-tabs {
      width: 100%;
      flex: 1;

      // .van-tabs__wrap{
      //   position: fixed;
      //   left: 0;right: 0; z-index: 1;
      //   box-shadow: 5px 5px 10px rgb(193 188 188);
      // }
      // .van-tabs__content{
      //   padding-top: 48px;
      // }
      .genjinlCont {
        position: relative;

        &:last-child {
          margin-bottom: 10px;
        }

        .detailBtn {
          position: absolute;
          right: 15px;
          bottom: -10px;
          padding: 4px 20px;
          color: #ffffff;
          height: 18px;
          line-height: 18px;
          border-radius: 30px;
          background: linear-gradient(90deg, #0e6ef0 0%, #1c92ff 100%);
        }
      }

      .van-tab__pane {
        >div {
          p.fllow-title {
            margin-top: 10px;
            font-size: 12px;
            padding-left: 20px;
            height: 18px;
            line-height: 18px;
            color: #aaa;
          }

          ul:first-of-type {
            padding: 5px 10px;
            border-bottom: 1px solid #eeeeee;
            background: #fff;

            li {
              line-height: 20px;
              color: #aaa;
              font-size: 14px;
              position: relative;

              img {
                width: 15px;
                height: 15px;
                position: absolute;
                left: 0;
                top: 3px;
              }

              span {
                display: inline-block;
                line-height: 18px;
                padding-left: 25px;
              }

              &:nth-child(2) {
                span {
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  width: calc(100% - 20px);
                }
              }
            }

            li:first-child {
              margin-bottom: 5px;

              img {
                width: 20px;
                height: 20px;
                position: absolute;
                left: 0;
                top: 3px;
              }

              span:first-of-type {
                color: #000;
              }

              span.tip {
                font-size: 12px;
                border: 1px solid #1c92ff;
                color: #1c92ff;
                height: 20px;
                line-height: 20px;
                padding-left: 3px;
                padding-right: 3px;
                border-radius: 20px;
                margin-left: 10px;
              }

              span.num {
                background: #1989fa;
                color: #fff;
                font-size: 12px;
                transform: scale(0.9);
                padding: 2px 5px;
                border-radius: 10px;
              }
            }
          }
        }
      }
    }

    .tab-class {
      flex: none !important;
    }

    .marBottom {
      margin-bottom: 10px;
      background: #fff;
    }

    .van-tabs__line {
      background-color: #1c92ff;
    }

    .van-cell {
      color: #646566;
      padding: 10px;

      .van-field__label {
        margin-right: 0;
      }

      .van-radio__label,
      .van-checkbox__label {
        margin-left: 2px;
      }

      .van-radio__icon,
      .van-checkbox__icon {
        font-size: 14px;
      }

      .van-radio--horizontal,
      .van-checkbox--horizontal {
        margin-right: 6px;
      }

      &.labelRadioEdu {
        .van-field__label {
          width: 58px;
        }

        .van-radio--horizontal {
          margin-right: 2px;
        }
      }

      &.labelRadioEduMix {

        .van-field__label,
        .van-radio__icon,
        .van-radio__label {
          font-size: 12px;
        }

        .van-field__label {
          width: 50px;
        }
      }

      &.labelRadioBank {
        .van-field__label {
          width: 115px;
        }
      }

      &.labelRadioBankMix {

        .van-field__label,
        .van-radio__icon,
        .van-radio__label {
          font-size: 13px;
        }

        .van-field__label {
          width: 106px;
        }

        .van-radio--horizontal {
          margin-right: 3px;
        }
      }

      &.labelRadioEqu {
        .van-field__label {
          width: 70px;
        }

        .van-field__label,
        .van-checkbox__icon,
        .van-checkbox__label {
          font-size: 13px;
        }

        .van-checkbox--horizontal {
          margin-right: 2px;
        }
      }
    }

    .uploadCont {
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

    .van-image-preview__cover {
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
      background: #ffffff;
      padding: 10px;
      width: calc(100% - 20px);
    }

    .bottomTip {
      display: flex;
      justify-content: space-between;
      color: #aaaaaa;
      background: #f5f5f5;
      padding: 0 10px;
      font-size: 14px;
      line-height: 32px;
    }

    .bottom {
      width: 100%;
      height: 50px;
      background: #fff;
      display: flex;
      justify-content: flex-start;

      >li {
        width: 33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #bbb;

        img {
          width: 20px;
          height: 22px;
        }
      }
    }


    .van-popup.vanSheet {
      .van-action-sheet__header {
        text-align: left;
        padding-left: 20px;
      }

      ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 84px;

        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-left: 20px;

          img {
            width: 20px;
            height: 20px;
            margin-bottom: 5px;
          }
        }
      }

      p {
        border-bottom: 1px solid #eee;
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
      }
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

    .van-popup.tagPopup {
      width: 90%;
      border-radius: 10px;
      background: transparent;

      .content {
        position: relative;

        &::before {
          position: absolute;
          content: '';
          bottom: 0;
          height: calc(100% - 36px);
          width: 100%;
          background: #fff;
          z-index: -1;
        }

        .imgDiv {
          height: 36px;

          // background: rgba(0, 0, 0, 0.7);
          img {
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

    .van-loading {
      padding: 10px 0;
      text-align: center;
    }

    .van-collapse-title {
      font-size: 14px;
      padding: 0 16px;
      line-height: 32px;
    }

    .van-collapse-item {
      margin-bottom: 10px;
    }

    .van-collapse-item__content {
      padding: 5px 16px;
    }

    .van-collapse {
      .label-tip {
        border-radius: 10px;
        margin-right: 5px;
        padding: 0 5px;
        color: #1c92ff;
        font-size: 12px;
        line-height: 18px;
        display: inline-block;
        border: 1px solid #1c92ff;
      }

      .collapse-item {
        font-size: 14px;
        display: flex;
        margin-bottom: 5px;

        img {
          width: 15px;
          height: 15px;
          margin-top: 3px;
          margin-right: 5px;
        }
      }

      .editUl {
        display: flex;
        margin-top: 5px;
        border-top: 1px solid #eeeeee;

        img {
          width: 16px;
          margin-right: 5px;
        }

        .editLi {
          width: 50%;
          align-items: center;
          justify-content: center;
          display: flex;
          padding: 10px 0 5px 0;

          &:first-child {
            position: relative;

            &::after {
              position: absolute;
              content: '';
              top: 0;
              right: 0;
              bottom: -5px;
              width: 1px;
              background: #eeeeee;
            }
          }
        }
      }
    }
    .van-loading,
		.noMore {
			padding: 10px 0;
			text-align: center;
		}
  }
</style>
