<template>
  <div class="siteAdd">
    <van-nav-bar left-text="站点统计" left-arrow fixed @click-left="leftBack" />
    <van-tabs v-model="active" title-active-color="#1C92FF" @click="onClick">
      <van-tab title="基本情况" class="nav-tab1">
        <div class="marBottom">
          <van-field
            placeholder="请输入站长姓名"
            label="站长姓名"
            left-icon="http://sc.xfd365.com/crmImages/name.png"
            input-align="right"
            v-model="tab1Name"
            @input="changeInput"
          />
          <van-field
            placeholder="请输入签约手机号"
            type="tel"
            label="签约手机号"
            left-icon="http://sc.xfd365.com/crmImages/phone.png"
            input-align="right"
            v-model="tab1Mobile"
            maxlength="11"
            @blur="blurInput"
          />
          <van-field
            placeholder="请输入身份证号"
            type="tel"
            label="身份证号"
            left-icon="http://sc.xfd365.com/crmImages/card.png"
            input-align="right"
            v-model="tab1Card"
            maxlength="18"
            @blur="blurInput"
          />
        </div>
        <div class="marBottom">
          <van-field
            placeholder="请输入民族"
            label="民族"
            left-icon="http://sc.xfd365.com/crmImages/nation.png"
            input-align="right"
            v-model="tab1Nation"
            @input="changeInput"
          />
          <van-field
            placeholder="请选择性别"
            label="性别"
            is-link
            readonly
            left-icon="http://sc.xfd365.com/crmImages/sex.png"
            input-align="right"
            v-model="tab1Sex"
            @click="isSex=true"
          />
          <van-field
            placeholder="请选择出生年月"
            label="出生年月"
            is-link
            readonly
            left-icon="http://sc.xfd365.com/crmImages/birthday.png"
            input-align="right"
            v-model="tab1Birthday"
            @click="isBirth=true"
          />
          <van-field
            placeholder="请选择教育程度"
            label="教育程度"
            is-link
            readonly
            left-icon="http://sc.xfd365.com/crmImages/education.png"
            input-align="right"
            v-model="tab1Educatione"
            @click="isEducate=true"
          />
        </div>
        <div class="marBottom">
          <van-field
            placeholder="请输入微信号"
            label="微信号"
            left-icon="http://sc.xfd365.com/crmImages/wechat.png"
            input-align="right"
            v-model="tab1Wechat"
            @input="changeInput"
          />
          <van-field
            placeholder="请输入住宅电话"
            type="tel"
            label="住宅电话"
            left-icon="http://sc.xfd365.com/crmImages/zuoji.png"
            input-align="right"
            v-model="tab1Telphone"
            maxlength="11"
            @blur="blurInput"
          />
          <van-field
            placeholder="请输入邮政编码"
            type="tel"
            label="邮政编码"
            left-icon="http://sc.xfd365.com/crmImages/youbian.png"
            input-align="right"
            v-model="tab1Youbian"
            maxlength="6"
            @blur="blurInput"
          />
          <van-field
            placeholder="请选择邮寄地址"
            label="邮寄地址"
            is-link
            readonly
            left-icon="http://sc.xfd365.com/crmImages/dingwei.png"
            input-align="right"
            v-model="tab1Region"
            @click="isRegion1=true"
          />
          <van-field
            placeholder="请输入详细邮寄地址"
            input-align="right"
            v-model="tab1Addtail"
            @input="changeInput"
          />
        </div>
        <div class="marBottom">
          <van-field
            placeholder="请选择婚姻状况"
            label="婚姻状况"
            is-link
            readonly
            left-icon="http://sc.xfd365.com/crmImages/marriage.png"
            input-align="right"
            v-model="tab1Marriage"
            @click="isMarriage=true"
          />
          <div v-if="tab1Marriage == '已婚'">
            <van-field
              placeholder="请输入配偶姓名"
              label="配偶姓名"
              left-icon="http://sc.xfd365.com/crmImages/name.png"
              input-align="right"
              v-model="tab1SpouseName"
              @input="changeInput"
            />
            <van-field
              placeholder="请输入配偶联系方式"
              type="tel"
              label="配偶联系方式"
              left-icon="http://sc.xfd365.com/crmImages/phone.png"
              input-align="right"
              v-model="tab1SpousMobile"
              maxlength="11"
              @blur="blurInput"
            />
            <van-field
              placeholder="请输入配偶身份证号"
              type="tel"
              label="配偶身份证号"
              left-icon="http://sc.xfd365.com/crmImages/card.png"
              input-align="right"
              v-model="tab1SpousCard"
              maxlength="18"
              @blur="blurInput"
            />
          </div>

          <div class="bottomTip">
            <p>填写人:{{userName}}</p>
            <p>填写日期:{{currentDateNow}}</p>
          </div>
          <!-- <button class="save" @click="saveTab1">保存并转至下一步</button> -->
        </div>
      </van-tab>
      <van-tab title="站点资料" class="nav-tab2">
        <div class="marBottom">
          <van-field
            placeholder="请输入营业执照名称"
            label="营业执照名称"
            left-icon="http://sc.xfd365.com/crmImages/business.png"
            input-align="right"
            v-model="tab2BusName"
            @input="changeInput"
          />
          <van-cell title="上传营业执照" icon="http://sc.xfd365.com/crmImages/pic.png" is-link></van-cell>
          <van-uploader v-model="tab2BusPicList" :after-read="afterRead1" :before-delete="beforeDelete1" />
        </div>
        <div class="marBottom">
          <van-cell title="上传门头" icon="http://sc.xfd365.com/crmImages/door.png" is-link></van-cell>
          <van-uploader v-model="tab2BusDoorPicList" :after-read="afterRead2" :before-delete="beforeDelete2" />

          <van-cell title="上传店内环境" icon="http://sc.xfd365.com/crmImages/shopin.png" is-link></van-cell>
          <van-uploader v-model="tab2BusInPicList" :after-read="afterRead3" :before-delete="beforeDelete3" />
        </div>



        <div class="bottomTip">
          <p>填写人:{{userName}}</p>
          <p>填写日期:{{currentDateNow}}</p>
        </div>
      </van-tab>
      <van-tab title="站点详情" class="nav-tab3">
        <div class="marBottom">
          <van-field
            placeholder="请选择经营主体"
            label="经营主体"
            is-link
            readonly
            left-icon="http://sc.xfd365.com/crmImages/busentity.png"
            input-align="right"
            v-model="tab3Busentity"
            @click="isBusentity=true"
          />
          <van-field
            placeholder="请输入经营场所名称"
            label="经营场所名称"
            left-icon="http://sc.xfd365.com/crmImages/busname.png"
            input-align="right"
            v-model="tab3BusName"
            @input="changeInput"
          />
          <van-field
            placeholder="请输入经营类型"
            label="经营类型"
            left-icon="http://sc.xfd365.com/crmImages/type.png"
            input-align="right"
            v-model="tab3BusType"
            @input="changeInput"
          />
          <van-field
            placeholder="请选择裕农通设备"
            label="裕农通设备"
            is-link
            readonly
            left-icon="http://sc.xfd365.com/crmImages/shebei.png"
            input-align="right"
            v-model="tab3BusEquipment"
            @click="isBusEquipment=true"
          />
          <van-field
            placeholder="请输入办卡数量"
            label="办卡数量"
            left-icon="http://sc.xfd365.com/crmImages/carnum.png"
            input-align="right"
            v-model="tab3BusCardNum"
            @blur="blurInput"
          />
        </div>
        <div class="marBottom">
          <van-field name="radio" label="建行信用卡" class="ifCcb" left-icon="http://sc.xfd365.com/crmImages/ccb.png">
            <template #input>
              <van-radio-group v-model="tab3BusCcbRadio" direction="horizontal" @change="tab3BusCcbRadioChange">
                <van-radio name="1">有</van-radio>
                <van-radio name="0">无</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-cell title="上传建行收款码" icon="http://sc.xfd365.com/crmImages/moneycode.png" is-link></van-cell>
          <van-uploader v-model="tab3BusCcbPicList" :after-read="afterRead4" :before-delete="beforeDelete4" />

        </div>
        <div class="marBottom">
          <van-field name="radio" label="站点VI标识" class="ifCcb" left-icon="http://sc.xfd365.com/crmImages/vi.png">
            <template #input>
              <van-radio-group v-model="tab3BusVIRadio" direction="horizontal" @change="tab3BusVIRadioChage">
                <van-radio name="有">有</van-radio>
                <van-radio name="无">无</van-radio>
                <van-radio name="缺失">缺失</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            placeholder="请选择风险情况"
            label="风险情况"
            is-link
            readonly
            left-icon="http://sc.xfd365.com/crmImages/fengxian.png"
            input-align="right"
            v-model="tab3BusRisk"
            @click="isBusRisk=true"
          />
        </div>

        <van-field
          placeholder="请输入经营面积"
          label="经营面积"
          left-icon="http://sc.xfd365.com/crmImages/busarea.png"
          input-align="right"
          v-model="tab3BusArea"
          @input="changeInput"
        />
        <van-field
          placeholder="请选择年交易额"
          label="年交易额"
          is-link
          readonly
          left-icon="http://sc.xfd365.com/crmImages/busmoney.png"
          input-align="right"
          v-model="tab3BusMoney"
          @click="isBusMoney=true"
        />
        <van-field
          placeholder="请选择从业人数"
          label="从业人数"
          is-link
          readonly
          left-icon="http://sc.xfd365.com/crmImages/busnumber.png"
          input-align="right"
          v-model="tab3BusNumber"
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
        <van-field placeholder="请输入经营详细地址" input-align="right" v-model="tab3BusRegDetail" @input="changeInput" />
        <div class="bottomTip">
          <p>填写人:{{userName}}</p>
          <p>填写日期:{{currentDateNow}}</p>
        </div>
      </van-tab>
      <van-tab title="使用情况" class="nav-tab4">
        <van-field
          placeholder="请选择持有数量"
          label="持有信用卡数量"
          class="label7"
          is-link
          readonly
          left-icon="http://sc.xfd365.com/crmImages/cardnumber.png"
          input-align="right"
          v-model="tab4CardNumber"
          @click="isCardNumber=true"
        />
        <van-field
          placeholder="请选择贷款情况"
          label="贷款情况"
          is-link
          readonly
          left-icon="http://sc.xfd365.com/crmImages/loan.png"
          input-align="right"
          v-model="tab4Loan"
          @click="isLoan=true"
        />
        <van-field
          placeholder="请选择常用收款方式"
          label="常用收款方式"
          is-link
          readonly
          left-icon="http://sc.xfd365.com/crmImages/payment.png"
          input-align="right"
          v-model="tab4Payment"
          @click="isPayment=true"
        />
        <van-field
          placeholder="请选择银行数量"
          label="站点合作银行数量"
          class="label8"
          is-link
          readonly
          left-icon="http://sc.xfd365.com/crmImages/hebanknum.png"
          input-align="right"
          v-model="tab4BankNum"
          @click="isBankNum=true"
        />
        <van-field
          placeholder="请选择银行名称"
          label="合作银行名称"
          is-link
          readonly
          left-icon="http://sc.xfd365.com/crmImages/firstBank.png"
          input-align="right"
          v-model="tab4BankName"
          @click="isBankName=true"
        />
        <van-field
          placeholder="请选择网点数量"
          label="1公里内银行网点数量"
          class="label9"
          is-link
          readonly
          left-icon="http://sc.xfd365.com/crmImages/nearybank.png"
          input-align="right"
          v-model="tab4NearNum"
          @click="isNearNum=true"
        />
        <div class="bottomTip">
          <p>填写人:{{userName}}</p>
          <p>填写日期:{{currentDateNow}}</p>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 选择性别 -->
    <van-action-sheet class="sexSheet" v-model="isSex" title="请选择性别" :round="isRound">
      <ul>
        <li v-for="(item,index) in sexs" :key="index" @click="selectSex(index)">
          <img :src="item" alt />
        </li>
      </ul>
    </van-action-sheet>

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

    <!-- 教育程度 -->
    <van-action-sheet
      class="listSheet"
      v-model="isEducate"
      title="教育程度"
      :actions="educateType"
      @select="onSelectEducate"
      :round="isRound"
    ></van-action-sheet>

    <!-- 邮寄地址 -->
    <div class="provin" v-show="isRegion1">
      <van-area :area-list="areaList" @cancel="hideProv" @confirm="confirmRegion1" />
      <van-overlay :show="isRegion1" @click="isRegion1 = false" />
    </div>

    <!-- 婚姻状况 -->
    <van-action-sheet
      class="listSheet"
      v-model="isMarriage"
      title="婚姻状况"
      :actions="marriageType"
      @select="onSelectMarriage"
      :round="isRound"
    ></van-action-sheet>

    <!-- 经营主体 -->
    <van-action-sheet
      class="listSheet"
      v-model="isBusentity"
      title="经营主体"
      :actions="busentityType"
      @select="onSelectBusentity"
      :round="isRound"
    ></van-action-sheet>

    <!-- 裕农通设备 -->
    <van-action-sheet
      class="listSheet"
      v-model="isBusEquipment"
      title="经营主体"
      :actions="busEquipmentType"
      @select="onSelectBusEquipment"
      :round="isRound"
    ></van-action-sheet>

    <!-- 风险情况 -->
    <van-action-sheet
      class="listSheet"
      v-model="isBusRisk"
      title="经营主体"
      :actions="busRiskType"
      @select="onSelectBusRisk"
      :round="isRound"
    ></van-action-sheet>

    <!-- 年交易额 -->
    <van-action-sheet
      class="listSheet"
      v-model="isBusMoney"
      title="年交易额"
      :actions="busMoneyType"
      @select="onSelectBusMoney"
      :round="isRound"
    ></van-action-sheet>

    <!-- 从业人数 -->
    <van-action-sheet
      class="listSheet"
      v-model="isBusNumber"
      title="从业人数"
      :actions="busNumberType"
      @select="onSelectBusNumber"
      :round="isRound"
    ></van-action-sheet>

    <!-- 经营地址 -->
    <div class="provin" v-show="isRegion3">
      <van-area :area-list="areaList" @cancel="hideProv" @confirm="confirmRegion3" />
      <van-overlay :show="isRegion3" @click="isRegion3 = false" />
    </div>

    <!-- 持有信用卡数量 -->
    <van-action-sheet
      class="listSheet"
      v-model="isCardNumber"
      title="持有信用卡数量"
      :actions="cardNumberType"
      @select="onSelectCardNumber"
      :round="isRound"
    ></van-action-sheet>

    <!-- 贷款情况 -->
    <van-action-sheet
      class="listSheet"
      v-model="isLoan"
      title="贷款情况"
      :actions="loanType"
      @select="onSelectLoan"
      :round="isRound"
    ></van-action-sheet>

    <!-- 常用收款方式 -->
    <van-action-sheet
      class="listSheet"
      v-model="isPayment"
      title="常用收款方式"
      :actions="paymentType"
      @select="onSelectPayment"
      :round="isRound"
    ></van-action-sheet>

    <!-- 站点合作银行数量 -->
    <van-action-sheet
      class="listSheet"
      v-model="isBankNum"
      title="站点合作银行数量"
      :actions="bankNumType"
      @select="onSelectBankNum"
      :round="isRound"
    ></van-action-sheet>

    <!-- 合作银行名称 -->
    <van-action-sheet
      class="listSheet"
      v-model="isBankName"
      title="合作银行名称"
      :actions="bankNameType"
      @select="onSelectBankName"
      :round="isRound"
    ></van-action-sheet>

    <!-- 1公里内银行网点数量 -->
    <van-action-sheet
      class="listSheet"
      v-model="isNearNum"
      title="1公里内银行网点数量"
      :actions="nearNumType"
      @select="onSelectNearNum"
      :round="isRound"
    ></van-action-sheet>
  </div>
</template>
<script>
import AreaList from "../styles/area";
import Exif from "exif-js";
export default {
  name: "siteAdd",
  data() {
    return {
      active: 0,
      tab1Name: "",
      tab1Mobile: "",
      tab1Card: "",
      tab1Nation: "",
      isRound: false,
      isSex: false,
      sexs: [require("../images/male.png"), require("../images/female.png")],
      tab1Sex: "",
      currentDate: new Date(),
      minDate: new Date(1900, 1, 1),
      isBirth: false,
      tab1Birthday: "",
      isEducate: false,
      educateType: [
        { name: "本科及以上" },
        { name: "大专" },
        { name: "中专或高中" },
        { name: "初中及以下" }
      ],
      tab1Educatione: "",
      tab1Wechat: "",
      tab1Telphone: "",
      tab1Youbian: "",
      isRegion1: false,
      areaList: AreaList,
      tab1Region: "",
      tab1Addtail: "",
      tab1Address: "",
      isMarriage: false,
      marriageType: [{ name: "已婚" }, { name: "未婚" }, { name: "其他" }],
      tab1Marriage: "",
      tab1SpouseName: "",
      tab1SpousMobile: "",
      tab1SpousCard: "",

      tab2BusName: "",
      tab2BusPicList: [],
      tab2BusPics: "",
      tab2BusPicsArray: [],

      tab2BusDoorPicList: [],
      tab2BusDoorPics: "",
      tab2BusDoorPicsArray: [],

      tab2BusInPicList: [],
      tab2BusInPics: "",
      tab2BusInPicsArray: [],

      isBusentity: false,
      busentityType: [
        { name: "商超" },
        { name: "农资店" },
        { name: "种植养殖户" },
        { name: "村委会" },
        { name: "其他 门诊" }
      ],
      tab3Busentity: "",
      tab3BusName: "",
      tab3BusType: '',
      isBusEquipment: false,
      busEquipmentType: [
        { name: "APP" },
        { name: "POS" },
        { name: "互动触摸屏" }
      ],
      tab3BusEquipment: "",
      tab3BusCardNum: '',
      tab3BusCcbRadio: '1',
      tab3BusVIRadio: '有',
      tab3BusCcbPicList: [],
      tab3BusCcbPics: "",
      tab3BusCcbPicsArray: [],
      tab3BusVIRadio: '有',
      isBusRisk: false,
      busRiskType: [
        { name: "低风险" },
        { name: "中风险" },
        { name: "高风险" }
      ],
      tab3BusRisk: "",
      tab3BusArea: "",
      isBusMoney: false,
      busMoneyType: [
        { name: "100万以上" },
        { name: "50-100万" },
        { name: "30-50万" },
        { name: "30万以下" }
      ],
      tab3BusMoney: "",
      isBusNumber: false,
      busNumberType: [
        { name: "10人及以上" },
        { name: "6-9人" },
        { name: "3-5人" },
        { name: "1-2人" },
        { name: "兼职" }
      ],
      tab3BusNumber: "",
      isRegion3: false,
      tab3BusRegion: "",
      tab3BusRegDetail: "",
      tab3BusAddress: "",

      isCardNumber: false,
      cardNumberType: [
        { name: "5张以上" },
        { name: "5张" },
        { name: "4张" },
        { name: "3张" },
        { name: "2张" },
        { name: "1张" },
        { name: "无" }
      ],
      tab4CardNumber: "",
      isLoan: false,
      loanType: [
        { name: "生产经营贷款" },
        { name: "住房按揭贷款" },
        { name: "车贷" },
        { name: "其他" }
      ],
      tab4Loan: "",
      isPayment: false,
      paymentType: [
        { name: "微信" },
        { name: "支付宝" },
        { name: "云闪付" },
        { name: "银行" }
      ],
      tab4Payment: "",
      isBankNum: false,
      bankNumType: [
        { name: "1家" },
        { name: "2家" },
        { name: "3家" },
        { name: "4家及以上" }
      ],
      tab4BankNum: "",
      isBankName: false,
      bankNameType: [
        { name: "中原银行" },
        { name: "农商行" },
        { name: "中国银行" },
        { name: "农业银行" },
        { name: "邮储银行" },
        { name: "其他" }
      ],
      tab4BankName: "",
      isNearNum: false,
      nearNumType: [
        { name: "1家" },
        { name: "2家" },
        { name: "3家" },
        { name: "4家及以上" }
      ],
      tab4NearNum: "",

      site_id: "",
      user_id: "",
      userName: "",
      currentDateNow: "",

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
            this.tab1Name = res.data.site_name;
            this.tab1Mobile = res.data.sign_phone;
            this.tab1Card = res.data.idcard;
            this.tab1Nation = res.data.nation;
            this.tab1Sex = res.data.sex;
            this.tab1Birthday = res.data.date_of_birth;
            this.tab1Educatione = res.data.edu;
            this.tab1Wechat = res.data.wx_mobile;
            this.tab1Telphone = res.data.address_phone;
            this.tab1Youbian = res.data.postal_code;
            // 邮寄地址
            let you_address = res.data.you_address;
            if (you_address) {
              if (you_address.indexOf("/") == -1) {
                // 不包含/
                this.tab1Addtail = you_address;
              } else {
                let addArr = you_address
                  .substr(0, you_address.length)
                  .split("/");
                this.tab1Addtail = addArr[addArr.length - 1];
                this.tab1Region = you_address.substr(
                  0,
                  you_address.length - this.tab1Addtail.length
                );
              }
            }
            this.tab1Marriage = res.data.marital;
            this.tab1SpouseName = res.data.spouse_name;
            this.tab1SpousMobile = res.data.spouse_phone;
            this.tab1SpousCard = res.data.spouse_idcard;
            this.tab2BusName = res.data.business_name;
            // 营业执照
            this.tab2BusPics = res.data.business_pic;
            if (this.tab2BusPics) {
              var pics = this.tab2BusPics;
              pics = pics.split("#");
              var r = pics.filter(function(s) {
                return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
              });
              this.tab2BusPicsArray = r;
              r = r.map(item => ({ url: item }));
              this.tab2BusPicList = JSON.parse(JSON.stringify(r));
            } else {
              this.tab2BusPics = "";
              this.tab2BusPicsArray = [];
              this.tab2BusPicList = [];
            }
            // 门头
            this.tab2BusDoorPics = res.data.door_pic;
            if (this.tab2BusDoorPics) {
              var pics = this.tab2BusDoorPics;
              pics = pics.split("#");
              var r = pics.filter(function(s) {
                return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
              });
              this.tab2BusDoorPicsArray = r;
              r = r.map(item => ({ url: item }));
              this.tab2BusDoorPicList = JSON.parse(JSON.stringify(r));
            } else {
              this.tab2BusDoorPics = "";
              this.tab2BusDoorPicsArray = [];
              this.tab2BusDoorPicList = [];
            }
            // 店内环境
            this.tab2BusInPics = res.data.store_pic;
            if (this.tab2BusInPics) {
              var pics = this.tab2BusInPics;
              pics = pics.split("#");
              var r = pics.filter(function(s) {
                return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
              });
              this.tab2BusInPicsArray = r;
              r = r.map(item => ({ url: item }));
              this.tab2BusInPicList = JSON.parse(JSON.stringify(r));
            } else {
              this.tab2BusInPics = "";
              this.tab2BusInPicsArray = [];
              this.tab2BusInPicList = [];
            }


            this.tab3Busentity = res.data.business;
            this.tab3BusName = res.data.business_site_name;
            this.tab3BusType = res.data.business_type;
            this.tab3BusEquipment = res.data.device;
            this.tab3BusCardNum = res.data.card_num ? res.data.card_num : '';
            this.tab3BusCcbRadio = String(res.data.credit_card)
            // 建行收款码
            this.tab3BusCcbPics = res.data.collection_pic;
            if (this.tab3BusCcbPics) {
              var pics = this.tab3BusCcbPics;
              pics = pics.split("#");
              var r = pics.filter(function(s) {
                return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
              });
              this.tab3BusCcbPicsArray = r;
              r = r.map(item => ({ url: item }));
              this.tab3BusCcbPicList = JSON.parse(JSON.stringify(r));
            } else {
              this.tab3BusCcbPics = "";
              this.tab3BusCcbPicsArray = [];
              this.tab3BusCcbPicList = [];
            }
            this.tab3BusVIRadio = res.data.site_VI;
            this.tab3BusRisk = res.data.risk;

            this.tab3BusArea = res.data.business_size;
            this.tab3BusMoney = res.data.year_amount;
            this.tab3BusNumber = res.data.the_num;
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

            this.tab4CardNumber = res.data.hold_card;
            this.tab4Loan = res.data.loans;
            this.tab4Payment = res.data.payment_term;
            this.tab4BankNum = res.data.site_he_bank;
            this.tab4BankName = res.data.site_he_bankname;
            this.tab4NearNum = res.data.one_bane;
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
    selectSex(index) {
      this.isSex = false;
      if (index == 0) {
        this.tab1Sex = "男";
      } else if (index == 1) {
        this.tab1Sex = "女";
      }
      this.saveTab();
    },
    handleTime(value) {
      var d = new Date(value);
      var datetime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.tab1Birthday = datetime;
      this.isBirth = false;
      this.saveTab();
    },
    onSelectEducate(item) {
      // 教育程度
      this.tab1Educatione = item.name;
      this.isEducate = false;
      this.saveTab();
    },
    onSelectMarriage(item) {
      // 婚姻状况
      this.tab1Marriage = item.name;
      this.isMarriage = false;
      this.saveTab();
    },
    onSelectBusentity(item) {
      // 经营主体
      this.tab3Busentity = item.name;
      this.isBusentity = false;
      this.saveTab();
    },
    onSelectBusEquipment(item) {
      // 裕农通设备
      this.tab3BusEquipment = item.name;
      this.isBusEquipment = false;
      this.saveTab();
    },
    tab3BusCcbRadioChange(){
      // 是否有建行信用卡
      this.saveTab();
    },
    tab3BusVIRadioChage(){
      // 站点VI标识
      this.saveTab()
    },
    onSelectBusRisk(item) {
      // 风险情况
      this.tab3BusRisk = item.name;
      this.isBusRisk = false;
      this.saveTab();
    },
    onSelectBusMoney(item) {
      // 年交易额
      this.tab3BusMoney = item.name;
      this.isBusMoney = false;
      this.saveTab();
    },
    onSelectBusNumber(item) {
      // 从业人数
      this.tab3BusNumber = item.name;
      this.isBusNumber = false;
      this.saveTab();
    },
    onSelectCardNumber(item) {
      // 持有信用卡数量
      this.tab4CardNumber = item.name;
      this.isCardNumber = false;
      this.saveTab();
    },
    onSelectLoan(item) {
      // 贷款情况
      this.tab4Loan = item.name;
      this.isLoan = false;
      this.saveTab();
    },
    onSelectPayment(item) {
      // 常用收款方式
      this.tab4Payment = item.name;
      this.isPayment = false;
      this.saveTab();
    },
    onSelectBankNum(item) {
      // 站点合作银行数量
      this.tab4BankNum = item.name;
      this.isBankNum = false;
      this.saveTab();
    },
    onSelectBankName(item) {
      // 合作银行名称
      this.tab4BankName = item.name;
      this.isBankName = false;
      this.saveTab();
    },
    onSelectNearNum(item) {
      // 1公里内银行网点数量
      this.tab4NearNum = item.name;
      this.isNearNum = false;
      this.saveTab();
    },
    hideProv: function() {
      this.isRegion1 = false;
      this.isRegion3 = false;
    },
    // 邮寄地址
    confirmRegion1: function(val) {
      this.isRegion1 = false;
      this.tab1Addtail = "";
      let value = JSON.stringify(val);
      value = JSON.parse(value);
      this.tab1Region = "";
      value.forEach(element => {
        if (element.name == null) {
          return;
        } else {
          this.tab1Region += element.name + "/";
        }
      });
      this.saveTab();
      // this.tab1Region = this.tab1Region.substring(0,this.tab1Region.lastIndexOf("/"));
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
    // 上传营业执照
    afterRead1(file, detail) {
      let that = this;
      that.filesObj.name = file.file.name; // 获取文件名
      that.filesObj.type = file.file.type; // 获取类型
      that.filesObj.index = detail.index
      that.tab2BusPicList[that.filesObj.index].content = ''
      that.tab2BusPicList[that.filesObj.index].status = 'uploading'
      that.tab2BusPicList[that.filesObj.index].message = '上传中...'
      that.picValue = file.file; // 文件流
      that.imgPreview(this.picValue, 1);
    },
    // 上传门头
    afterRead2(file, detail) {
      let that = this;
      that.filesObj.name = file.file.name; // 获取文件名
      that.filesObj.type = file.file.type; // 获取类型
      that.filesObj.index = detail.index
      that.tab2BusDoorPicList[that.filesObj.index].content = ''
      that.tab2BusDoorPicList[that.filesObj.index].status = 'uploading'
      that.tab2BusDoorPicList[that.filesObj.index].message = '上传中...'
      that.picValue = file.file; // 文件流
      that.imgPreview(this.picValue, 2);
    },
    // 上传店内环境
    afterRead3(file, detail) {
      let that = this;
      that.filesObj.name = file.file.name; // 获取文件名
      that.filesObj.type = file.file.type; // 获取类型
      that.filesObj.index = detail.index
      that.tab2BusInPicList[that.filesObj.index].content = ''
      that.tab2BusInPicList[that.filesObj.index].status = 'uploading'
      that.tab2BusInPicList[that.filesObj.index].message = '上传中...'
      that.picValue = file.file; // 文件流
      that.imgPreview(this.picValue, 3);
    },
    // 上传建行收款码
    afterRead4(file, detail) {
      let that = this;
      that.filesObj.name = file.file.name; // 获取文件名
      that.filesObj.type = file.file.type; // 获取类型
      that.filesObj.index = detail.index
      that.tab3BusCcbPicList[that.filesObj.index].content = ''
      that.tab3BusCcbPicList[that.filesObj.index].status = 'uploading'
      that.tab3BusCcbPicList[that.filesObj.index].message = '上传中...'
      that.picValue = file.file; // 文件流
      that.imgPreview(this.picValue, 4);
    },
    // 处理图片
    imgPreview(file, num) {
      let that = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        let reader = new FileReader(); // 创建一个reader
        reader.readAsDataURL(file); // 将图片2将转成 base64 格式
        reader.onloadend = function() {
          // 读取成功后的回调
          // console.log(this.result)
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于500K,是就直接上传，反之压缩图片
          if (this.result.length <= 500 * 1024) {
            that.headerImage = this.result;
            that.postImg(num);
          } else {
            img.onload = function() {
              let data = that.compress(img, Orientation);
              that.headerImage = data;
              that.postImg(num);
            };
          }
        };
      }
    },
    // 压缩图片
    compress(img, Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");

      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        // console.log("大于400万像素");
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height; //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height); //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        // console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片 //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
       if (Orientation != "" && Orientation != 1) {
          switch (Orientation) {
              case 6: //需要顺时针（向左）90度旋转
                  this.rotateImg(img, "left", canvas);
                  break;
               case 8: //需要逆时针（向右）90度旋转
                   this.rotateImg(img, "right", canvas);
                   break;
               case 3: //需要180度旋转
                   this.rotateImg(img, "right", canvas); //转两次
                   this.rotateImg(img, "right", canvas);
                   break;
           }
        }
            //进行最小压缩
            let ndata = canvas.toDataURL("image/jpeg", 0.1);
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
            return ndata;
    },
    // 旋转图片
        rotateImg(img, direction, canvas) {
            //最小与最大旋转方向，图片旋转4次后回到原方向
            const min_step = 0;
            const max_step = 3;
            if (img == null) return;
            //img的高度和宽度不能在img元素隐藏后获取，否则会出错
            let height = img.height;
            let width = img.width;
            let step = 2;
            if (step == null) {
                step = min_step;
            }
            if (direction == "right") {
                step++;
                //旋转到原位置，即超过最大值
                step > max_step && (step = min_step);
            } else {
                step--;
                step < min_step && (step = max_step);
            }
            //旋转角度以弧度值为参数
            let degree = (step * 90 * Math.PI) / 180;
            let ctx = canvas.getContext("2d");
            switch (step) {
                case 0:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0);
                    break;
                case 1:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, 0, -height);
                    break;
                case 2:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, -height);
                    break;
                case 3:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, 0);
                    break;
            }
        },
        //将base64转换为文件
        dataURLtoFile(dataurl) {
            var arr = dataurl.split(","),
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], this.filesObj.name, {
                type: this.filesObj.type
            });
        },
         //接口上传图片
        postImg(num){
          let file = this.dataURLtoFile(this.headerImage);
          let token = localStorage.getItem("token");
          var formdata = new FormData();
          formdata.append("token", token);
          formdata.append("file", file)
          const instance = this.$axios.create({
            //withCredentials:true
          });
          instance.post("http://crm.xfd365.com/user/base/uploadImg", formdata).then(res => {
            if (res.data.errno === 0) {
              this.$toast("上传成功");
              if(num == 1){
                this.tab2BusPicList[this.filesObj.index].content = res.data.data.url
                this.tab2BusPicList[this.filesObj.index].status = 'done'
                this.tab2BusPicList[this.filesObj.index].message = ''
                this.tab2BusPicsArray.push(res.data.data.url);
              }else if(num == 2){
                this.tab2BusDoorPicList[this.filesObj.index].content = res.data.data.url
                this.tab2BusDoorPicList[this.filesObj.index].status = 'done'
                this.tab2BusDoorPicList[this.filesObj.index].message = ''
                this.tab2BusDoorPicsArray.push(res.data.data.url);
              }else if(num == 3){
                this.tab2BusInPicList[this.filesObj.index].content = res.data.data.url
                this.tab2BusInPicList[this.filesObj.index].status = 'done'
                this.tab2BusInPicList[this.filesObj.index].message = ''
                this.tab2BusInPicsArray.push(res.data.data.url);
              }else if(num == 4){
                this.tab3BusCcbPicList[this.filesObj.index].content = res.data.data.url
                this.tab3BusCcbPicList[this.filesObj.index].status = 'done'
                this.tab3BusCcbPicList[this.filesObj.index].message = ''
                this.tab3BusCcbPicsArray.push(res.data.data.url);
              }
              this.saveTab();
            } else {
              this.$toast(res.errmsg);
              if(num == 1){
                this.tab2BusPicList[this.filesObj.index].status = 'failed'
                this.tab2BusPicList[this.filesObj.index].message = '上传失败'
              }else if(num == 2){
                this.tab2BusDoorPicList[this.filesObj.index].status = 'failed'
                this.tab2BusDoorPicList[this.filesObj.index].message = '上传失败'
              }else if(num == 3){
                this.tab2BusInPicList[this.filesObj.index].status = 'failed'
                this.tab2BusInPicList[this.filesObj.index].message = '上传失败'
              }else if(num == 4){
                this.tab3BusCcbPicList[this.filesObj.index].status = 'failed'
                this.tab3BusCcbPicList[this.filesObj.index].message = '上传失败'
              }

            }
          }, err=>{
            // console.log(err)
            if(num == 1){
              this.tab2BusPicList[this.filesObj.index].status = 'failed'
              this.tab2BusPicList[this.filesObj.index].message = '上传失败'
            }else if(num == 2){
              this.tab2BusDoorPicList[this.filesObj.index].status = 'failed'
              this.tab2BusDoorPicList[this.filesObj.index].message = '上传失败'
            }else if(num == 3){
              this.tab2BusInPicList[this.filesObj.index].status = 'failed'
              this.tab2BusInPicList[this.filesObj.index].message = '上传失败'
            }else if(num == 4){
              this.tab3BusCcbPicList[this.filesObj.index].status = 'failed'
              this.tab3BusCcbPicList[this.filesObj.index].message = '上传失败'
            }

          });

        },
        // 删除营业执照
    beforeDelete1(file ,detail){
      let index = detail.index
      this.tab2BusPicsArray.splice(index, 1);
      this.tab2BusPicList.splice(index, 1);
      this.saveTab();
    },
    // 删除门头
    beforeDelete2(file ,detail){
      let index = detail.index
      this.tab2BusDoorPicsArray.splice(index, 1);
      this.tab2BusDoorPicList.splice(index, 1);
      this.saveTab();
    },
    // 删除店内环境
    beforeDelete3(file ,detail){
      let index = detail.index
      this.tab2BusInPicsArray.splice(index, 1);
      this.tab2BusInPicList.splice(index, 1);
      this.saveTab();
    },
    // 删除建行收款码
    beforeDelete4(file ,detail){
      let index = detail.index
      this.tab3BusCcbPicsArray.splice(index, 1);
      this.tab3BusCcbPicList.splice(index, 1);
      this.saveTab();
    },
    // 修改为实时保存
    changeInput() {
      this.saveTab();
    },
    blurInput() {
      this.saveTab();
    },
    saveTab() {
      // if (this.tab1Name.trim().length == 0) {
      //   this.$toast("请输入站长姓名！");
      //   return;
      // }
      let reg = /^1[0-9]{10}$/;
      // 签约手机号
      if (!reg.test(this.tab1Mobile) && this.tab1Mobile.trim().length > 0) {
        this.$toast("请输入正确手机号！");
        return;
      }
      // 住宅电话
      if (!reg.test(this.tab1Telphone) && this.tab1Telphone.trim().length > 0) {
        this.$toast("请输入正确手机号！");
        return;
      }
      // 配偶电话
      if (!reg.test(this.tab1SpousMobile) && this.tab1SpousMobile.trim().length > 0) {
        this.$toast("请输入配偶正确联系方式！");
        return;
      }
      let regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      // 身份证号
      if (!regIdCard.test(this.tab1Card) && this.tab1Card.trim().length > 0) {
        this.$toast("请输入正确身份证号！");
        return;
      }
      // 配偶身份证
      if (!regIdCard.test(this.tab1SpousCard) &&this.tab1SpousCard.trim().length > 0) {
        this.$toast("请输入配偶正确身份证号！");
        return;
      }
      let pattern = /^[0-9]{6}$/;
      if (!pattern.test(this.tab1Youbian) && this.tab1Youbian.trim().length > 0) {
        this.$toast("请输入正确邮政编码！");
        return;
      }
      // 营业执照
      this.tab2BusPics = "";
      if (this.tab2BusPicsArray != "") {
        this.tab2BusPicsArray.forEach(ele => {
          this.tab2BusPics += ele + "#";
        });
      }
      // 门头
      this.tab2BusDoorPics = "";
      if (this.tab2BusDoorPicsArray != "") {
        this.tab2BusDoorPicsArray.forEach(ele => {
          this.tab2BusDoorPics += ele + "#";
        });
      }
      // 店内环境
      this.tab2BusInPics = "";
      if (this.tab2BusInPicsArray != "") {
        this.tab2BusInPicsArray.forEach(ele => {
          this.tab2BusInPics += ele + "#";
        });
      }
      // 建行收款码
      this.tab3BusCcbPics = "";
      if (this.tab3BusCcbPicsArray != "") {
        this.tab3BusCcbPicsArray.forEach(ele => {
          this.tab3BusCcbPics += ele + "#";
        });
      }

      var data = {};
      data.site_name = this.tab1Name;
      data.sign_phone = this.tab1Mobile;
      data.idcard = this.tab1Card;

      data.nation = this.tab1Nation;
      data.sex = this.tab1Sex;
      data.date_of_birth = this.tab1Birthday;
      data.edu = this.tab1Educatione;

      data.wx_mobile = this.tab1Wechat;
      data.address_phone = this.tab1Telphone;
      data.postal_code = this.tab1Youbian;
      data.you_address = this.tab1Region + this.tab1Addtail;

      data.marital = this.tab1Marriage;
      data.spouse_name = this.tab1SpouseName;
      data.spouse_phone = this.tab1SpousMobile;
      data.spouse_idcard = this.tab1SpousCard;

      data.business_name = this.tab2BusName;
      data.business_pic = this.tab2BusPics;
      data.door_pic = this.tab2BusDoorPics;
      data.store_pic = this.tab2BusInPics;

      data.business = this.tab3Busentity;
      data.business_site_name = this.tab3BusName;
      data.business_type = this.tab3BusType;
      data.device = this.tab3BusEquipment;
      data.card_num = this.tab3BusCardNum;
      data.credit_card = this.tab3BusCcbRadio;
      data.collection_pic = this.tab3BusCcbPics;
      data.site_VI = this.tab3BusVIRadio;
      data.risk = this.tab3BusRisk;


      data.business_size = this.tab3BusArea;
      data.year_amount = this.tab3BusMoney;
      data.the_num = this.tab3BusNumber;
      data.business_address = this.tab3BusRegion + this.tab3BusRegDetail;

      data.hold_card = this.tab4CardNumber;
      data.loans = this.tab4Loan;
      data.payment_term = this.tab4Payment;
      data.site_he_bank = this.tab4BankNum;
      data.site_he_bankname = this.tab4BankName;
      data.one_bane = this.tab4NearNum;

      data.site_id = this.site_id;
      data.user_id = this.user_id;

      data.user_type = this.user_type;
      data.customer_id = this.id;

      // console.log(data);
      // return
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
    &.nav-tab4 {
      .label7 .van-field__label {
        width: 100px;
      }
      .label8 .van-field__label {
        width: 116px;
      }
      .label9 .van-field__label {
        width: 136px;
      }
    }
    .marBottom {
      margin-bottom: 10px;
      background: #fff;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .van-cell{
      color: #646566;
    }
    .ifCcb{
      .van-cell__title{
        width: 72px;
      }
      .van-radio-group--horizontal{
        justify-content: flex-end;
        width: 100%;
      }
      .van-radio__icon .van-icon{
        font-size: 0.6em;
        margin-top: 2px;
      }
      .van-radio__label{
        margin-left: 5px;
      }
    }

    .van-uploader{
      padding: 10px 15px 0 15px;
    }
    .van-uploader__preview{
      margin-right: 15px;
      margin-bottom: 15px;
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
  .van-action-sheet.sexSheet {
    ul {
      display: flex;
      justify-content: space-around;
      padding: 20px 0;
      img {
        width: 28px;
        height: 30px;
      }
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
