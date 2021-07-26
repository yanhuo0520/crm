<template>
  <div class="kehu">
    <van-nav-bar left-text="我的客户" left-arrow fixed @click-left="leftBack" />
    <div class="topRight">
      <img class="transferBtn" v-if="!ifbatchTrans" src="../../images/transfer_t.png" alt  @click="ifbatchTrans=true"/>
      <p class="transferSure" v-if="ifbatchTrans && totalNum > 0" src="../../images/transfer_t.png"  @click="selectShow = true">确认({{totalNum}})</p>
      <p class="transferSure" v-if="ifbatchTrans && totalNum == 0" @click="cancelSel()" src="../../images/transfer_t.png">取消</p>
      <img class="addBtn" src="../../images/addcom.png" alt @click="addCustomerBtn"/>
    </div>
    <van-sticky :offset-top="50">
      <div class="search-con" @click="showSearchPopup">
        <div class="search-input-con">
          <div class="icon-con">
            <van-icon name="search" size="16" />
          </div>
          <div class="input-con">
            <template v-if="selectArr && selectArr.length > 0">
              <van-tag style="margin-right: 10px" round color="rgba(0,0,0,0.6)" v-for="(item, index) in selectArr" :key="index">{{item}}</van-tag>
            </template>
            <template v-else>
              <span class="text">请输入要搜索的关键字</span>
            </template>
          </div>
        </div>
      </div>
    </van-sticky>

    <div class="kehuCont">
      <van-index-bar
        highlight-color="#1c92ff"
        :index-list="indexList"
        :sticky-offset-top="stickyOffsetTop"
      >
        <div v-for="(item, index) in userData" :key="index">
          <van-index-anchor :index="index">{{ index }}</van-index-anchor>
          <div class="content" v-for="(item1, index1) in item" :key="index1">
            <div class="top" v-if="!ifbatchTrans" @click="toDetail(item1)">
              <p class="name">{{item1.name}}</p>
              <div>
                <img class="transfer" v-if="item1.type == 1" @click.stop="onlySelect(item1.name, item1.id)" src="../../images/transfer.png" alt />
                <a :href="'tel:' + item1.mobile" class="phone" @click.stop>
                  <img src="../../images/tel.png" alt />
                </a>
              </div>
            </div>

            <van-checkbox
              v-if="ifbatchTrans"
              :name="item1.id"
              v-model="item1.tag"
              :disabled="item1.type===2"
              @click="checkSel(item1.type, item1.id, item1.name)"
            >
            <p class="name">{{item1.name}}</p>
            </van-checkbox>
          </div>
        </div>
      </van-index-bar>
      <div class="no-data-con" v-if="(!userData || userData.length === 0) && !isLoading">
        <div class="no-data-box">
          <span class="no-data-tit">{{isErr ? '加载失败' : (selectArr && selectArr.length > 0 ? '暂无搜索结果,请换个关键字' : '暂无数据')}}</span>
          <span class="no-data-desc" >{{isErr ? '服务异常,请尝试重新加载' : ''}}</span>
          <div class="no-btn-con" v-if="isErr">
            <div class="btn-item">
              <van-button type="info" round block>重新加载</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup class="search-popup" v-model="isShowSearch" position="right" >
      <div class="search-box">
         <div class="search-type-con">
        <div class="search-tit-con">
          <div class="tit">客户姓名</div>
        </div>
        <div class="search-val-con">
          <van-field v-model="searchName" clearable  placeholder="请输入客户名称 例:张三" />
        </div>
      </div>
      <div class="search-type-con">
        <div class="search-tit-con">
          <div class="tit">客户类型</div>
        </div>
        <div class="search-val-con clearfix">
          <div class="search-tag-item" :class="{'customer-active':customerType == item.type}" v-for="(item,index) in customerOptions" :key="index" @click="customerType = item.type">{{item.value}}</div>
        </div>
      </div>
      <div class="search-type-con">
        <div class="search-tit-con">
          <div class="tit">地区筛选</div>
        </div>
        <div class="search-val-con">
          <van-field v-model="searchAddr"  clearable placeholder="请输入地区位置 例:信息产业大厦" />
        </div>
      </div>
      <div class="search-type-con">
        <div class="search-tit-con">
          <div class="tit">标签筛选</div>
        </div>
        <div class="search-val-con clearfix">
          <div class="tag-all">
            <div class="tag-tit">是否筛选全部标签</div>
            <div class="icon-con">
              <van-switch v-model="isAllTag" size="16" />
            </div>
          </div>
          <template v-if="!isAllTag">
            <div class="search-tag-item" :class="{'tag-active':item.isSelect}" v-for="(item, index) in tagData" :key="index" @click="item.isSelect = !item.isSelect">{{item.tag_name}}</div>
          </template>
        </div>
      </div>
      </div>
      <div class="search-btn-con">
        <div class="btn-item">
          <van-button type="default" round block @click="searchReset">重置</van-button>
        </div>
        <div class="btn-item">
          <van-button color="#1989fa" round block @click="searchConfirm">确定</van-button>
        </div>
      </div>
    </van-popup>

    <div class="loading-con" v-if="isLoading">
      <div class="loading-box">
        <van-loading color="#1989fa" />
        <span class="tit">正在加载...</span>
      </div>
    </div>


    <!-- 选择人员 -->
    <van-action-sheet v-model="selectShow" title="选择移交人">
        <ul class="actionCont">
            <li v-for="(item, index) in userListArray" :key="index" @click="selectPop(item.user_id, item.user_name)">{{item.user_name}}
              <img v-if="item.user_id == user_id && user_id != 0" class="selectImg" src="../../images/select.png" alt /></li>
        </ul>
    </van-action-sheet>
  </div>
</template>
<script>
export default {
  name: "kehu",
  data() {
    return {
      stickyOffsetTop: 100,
      indexList: [],
      userData: [],
      selectArr: [],
      lastSelectArr: [],
      initSelectArr: [],
      customerOptions: [{
        type: 3,
        value: '全部'
      },{
        type: 1,
        value: '新增客户(可移交)'
      },{
        type: 2,
        value: '建行客户'
      }],
      isShowSearch: false,
      searchName: '',
      searchAddr: '',
      customerType: 3, // 3-全部 1-新增客户 2-建行客户
      isAllTag: true,
      tagData: [],
      isLoading: true,
      selectShow: false,
      ifbatchTrans: false, // 是否批量移交
      selectIdArray: [], // 选择客户ID数组
      selectNameArray: [], // 选择客户名称数组
      tipName: '',
      totalNum: 0,
      user_id: localStorage.getItem("userId"), // 当前用户
      userListArray: '', // 选择移交人员列表
    };
  },
  mounted() {
    window.leftBack = this.leftBack; // Android原生返回按钮执行leftBack()方法
    this.getTagList();
    this.getUserList();
  },
  created() {
     window.leftBack = this.leftBack;
  },
  methods: {
    leftBack() {
      // this.$router.go(-1)
      if(this.customerType != 3 || this.searchName.length > 0 || this.searchAddr.length > 0 || !this.isAllTag){
        this.customerType = 3;
        this.searchName = '';
        this.searchAddr = ''
        this.isAllTag = true
        this.getList('reset')
      }else{
        this.$router.push({
          path: "/",
        });
      }
    },
    showSearchPopup () {
      let tmpArr = JSON.parse(JSON.stringify(this.initSelectArr))
      let tmpSelectTagArr = []
      tmpArr.forEach(item =>{
        if(item.tit == 'searchName') {
          this.searchName = item.val
        }
        if(item.tit == 'searchAddr') {
          this.searchAddr = item.val
        }
        if(item.tit == 'customerType') {
          this.customerType = item.val
        }
        if(item.tit == 'tag') {
          tmpSelectTagArr.push(item)
        }
      })

      if(tmpSelectTagArr && tmpSelectTagArr.length == 1 && tmpSelectTagArr[0].id == 0) {
        this.isAllTag = true
        this.tagData.forEach(item =>{
          item.isSelect = false
        })
      } else {
        if(tmpSelectTagArr && tmpSelectTagArr.length > 0) {
          this.tagData.forEach(item =>{
            item.isSelect = false
            tmpSelectTagArr.forEach(subItem =>{
              if(item.customer_tag_id == subItem.id) {
                item.isSelect = true
              }
            })
          })
        }
      }
      this.isShowSearch = true
    },
    searchReset () {
      this.selectIdArray = []
      this.selectNameArray = []
      this.totalNum = 0
      this.tipName = ''

      this.searchName = ''
      this.searchAddr = ''
      this.customerType = 3
      this.tagData.forEach(item =>{
        item.isSelect = false
      })
      this.isAllTag = true
      if (this.lastSelectArr.length === 0) {
        this.selectArr = []
        this.initSelectArr = []
        return
      } else {
        this.getList('reset')
      }
      this.isShowSearch = false
    },
    searchConfirm () {
      this.selectIdArray = []
      this.selectNameArray = []
      this.totalNum = 0
      this.tipName = ''

      let tmpSelectArr = [] // 保存搜索成功后的值 仅仅用来模拟搜索框中显示
      let tmpInitSelectArr = [] // 保存搜索成功后每一项的key与val
      if(this.searchName) {
        tmpSelectArr.push(this.searchName)
        let tmpObj = {
          tit: 'searchName',
          val: this.searchName
        }
        tmpInitSelectArr.push(tmpObj)
      }
      if(this.searchAddr) {
        tmpSelectArr.push(this.searchAddr)
        let tmpObj = {
          tit: 'searchAddr',
          val: this.searchAddr
        }
        tmpInitSelectArr.push(tmpObj)
      }
      if(this.customerType == 3) {
        tmpSelectArr.push('所有客户类型')
        let tmpObj = {
          tit: 'customerType',
          val: 3
        }
        tmpInitSelectArr.push(tmpObj)
      } else if (this.customerType == 1) {
        tmpSelectArr.push('新增客户')
        let tmpObj = {
          tit: 'customerType',
          val: 1
        }
        tmpInitSelectArr.push(tmpObj)
      } else if (this.customerType == 2) {
        tmpSelectArr.push('建行客户')
        let tmpObj = {
          tit: 'customerType',
          val: 2
        }
        tmpInitSelectArr.push(tmpObj)
      }
      if(this.isAllTag) {
        tmpSelectArr.push('所有客户标签')
        let tmpObj = {
          tit: 'tag',
          val: '所有客户标签',
          id: 0,
        }
        tmpInitSelectArr.push(tmpObj)
      } else {
        this.tagData.forEach(item =>{
          if(item.isSelect) {
            tmpSelectArr.push(item.tag_name)
            let tmpObj = {
              tit: 'tag',
              val: item.tag_name,
              id: item.customer_tag_id,
            }
            tmpInitSelectArr.push(tmpObj)
          }
        })
      }
      this.selectArr = tmpSelectArr
      this.initSelectArr = tmpInitSelectArr
      if (this.quiteArr(this.lastSelectArr, this.selectArr)) {
        this.isShowSearch = false
        return
      }
      this.getList('confirm')
      this.isShowSearch = false
    },
     // 对比两个数组内容是否一致
    quiteArr (arr1, arr2) {
      let flag = true
      if (arr1.length !== arr2.length) {
        flag = false
      } else {
        arr1.forEach(item => {
          if (arr2.indexOf(item) === -1) {
            flag = false
          }
        })
      }
      return flag
    },
    toDetail(item) {
      localStorage.removeItem("siteId")
      localStorage.removeItem("tagupdate")
      localStorage.removeItem("editGlustomer")
      let path;
      if(item.type == 2){ // 建行客户
        path = "/ccbCustomerDetail"
      }else{ // 新增客户
        path = "/customerDetail"
      }
      this.$router.push({
        path: path,
        query: {
          id: item.id,
          site_id: item.site_id
        }
      });
    },
    getTagList(){ // 获取标签列表
      let that = this;
      this.isLoading = true
      this.tagData = []
      this.isErr = false
      this.userData = []
      this.indexList = []
      this.$api.tagList({type: 0}).then(res=>{
        if(res.errno === 0){
          that.getList();
          if(res.data && res.data.length > 0){
            res.data.forEach(item =>{
              item.isSelect = false
            })
            that.tagData = res.data
          } else {
            that.tagData = []
          }
        }else{
          that.tagData = []
          that.isLoading = false
          that.isErr = true
          that.userData = []
          that.indexList = []
        }
      })
    },
    // 新增客户--增加客户
    addCustomerBtn() {
      localStorage.setItem("station_id", "");
      this.$router.push({
        path: "/addCustomer",
        query: {
          cls: this.cls,
        },
      });
    },
    getList(type) {
      let that = this;
      this.isLoading = true
      this.isErr = false
      this.userData = []
      this.indexList = []
      let tmpTagIdArr = []
      that.tagData.forEach((item,index) =>{
        if(item.isSelect) {
          tmpTagIdArr.push(item.customer_tag_id)
        }
      })
      this.$api.listsAll({
        type: that.customerType,
        name: that.searchName,
        address: that.searchAddr,
        customer_tag_id: that.isAllTag ? '' : tmpTagIdArr.join(',')
      }).then((res) => {
        if (res.errno === 0) {
          if (type === 'confirm') {
            that.lastSelectArr = that.selectArr
          } else if (type === 'reset') {
            that.selectArr = []
            that.lastSelectArr = []
            that.initSelectArr = []
          }
          that.isLoading = false
          that.isErr = false
          if (res.data) {
            that.indexList = Object.keys(res.data);
            that.userData = res.data;
          }
        } else {
          that.selectArr = []
          that.lastSelectArr = []
          that.isLoading = false
          that.initSelectArr = []
          that.isErr = true
          that.$toast(res.errmsg ? res.errmsg : '获取客户列表失败')
        }
      }).catch(err =>{
        this.isLoading = false
        this.isErr = false
        this.userData = []
        this.indexList = []
        this.selectArr = []
        this.lastSelectArr = []
        this.initSelectArr = []
      });
    },

  // 员工列表
    getUserList() {
      this.$api.userList({keyword: ''}).then(res => {
        if (res.errno === 0) {
          this.userListArray = res.data;
        }
      });
    },
    // 批量选择
    checkSel(type, id, name){
      if(type != 2){ // 只有新增客户可移交
        let index = this.selectIdArray.indexOf(id);
        let nameIndex = this.selectNameArray.indexOf(name);
        if(index == -1){
          this.selectIdArray.push(id)
        }else{
          this.selectIdArray.splice(index, 1);
        }

        if(nameIndex == -1){
          this.selectNameArray.push(name)
        }else{
          this.selectNameArray.splice(nameIndex, 1);
        }
      }

      this.totalNum = this.selectIdArray.length;
    },
    // 单个移交客户
    onlySelect(name, id){
      this.selectShow = true;
      this.selectIdArray = []
      this.selectNameArray = []
      this.tipName = ''

      this.selectIdArray.push(id);
      this.selectNameArray.push(name);
    },
    // 选择员工
    selectPop(user_id, user_name){
      let selectIdString = '';
      this.selectIdArray.forEach(ele=>{  // 转换成字符串传给后台
        selectIdString += ele + ','
      })
      if(selectIdString.lastIndexOf(',') > -1){ // 去掉最后一个逗号
        selectIdString = selectIdString.substr(0,selectIdString.length-1)
      }

      let selectNameString = '';
      if(this.selectNameArray.length > 3){ // 只取前三个人的名字传给后台
        for(let i=0; i<3; i++){
          selectNameString += this.selectNameArray[i] + ','
          this.tipName = selectNameString.substr(0,selectNameString.length-1) + '…'
        }
      }else{
        this.selectNameArray.forEach(ele=>{  // 转换成字符串传给后台
          selectNameString += ele + ','
          this.tipName = selectNameString.substr(0,selectNameString.length-1)
        })
      }
      if(selectNameString.lastIndexOf(',') > -1){ // 去掉最后一个逗号
        selectNameString = selectNameString.substr(0,selectNameString.length-1)
      }

      if(localStorage.getItem("userId") == user_id){
        this.$toast("已是我的客户！")
      }else{
        this.$dialog.confirm({
          title: '标题',
          message: '确定把客户-【' + this.tipName + '】移交给【' + user_name + '】'
        }).then(()=>{
          this.$api.transfer({station_id: selectIdString, name: selectNameString, user_id: user_id}).then(res => {
            this.selectShow = false
            if (res.errno === 0) {
              this.$toast("移交成功");
              this.getList('reset');
              this.selectIdArray = []
              this.selectNameArray = []
              this.totalNum = 0
              this.tipName = ''

            }else{
              this.$toast(res.data.msg)
            }
          });
        }).catch(()=>{
          // on cancel
        })
      }
    },
    // 取消选择
    cancelSel(){
      this.ifbatchTrans=false
      this.selectIdArray = []
      this.selectNameArray = []
      this.tipName = ''
      this.totalNum = 0
    },
  },
  beforeRouteEnter(to, from, next){
    if(from.path == "/ccbCustomerDetail" || from.path == "/customerDetail"){
      to.meta.isBack = true;
    }else{
      to.meta.isBack = false;
    }
    next()
  },
};
</script>
<style lang="less">
.kehu {
  min-height: calc(100% - 50px);
  background: #f5f5f5;
  padding-top: 50px;
  .van-nav-bar {
    z-index: 2;
    background: url(../../images/msgBg.jpg) no-repeat;
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
  .search-con {
    padding: 8px 10px;
    background: #fff;
    box-shadow: 0 0 10px #ccc;
    .search-input-con {
      display: flex;
      align-items: center;
      height: 30px;
      padding: 0 10px;
      background: #f1f1f1;
      border-radius: 1000px;
      .icon-con {
        width: 22px;
        height: 100%;
        display: flex;
        align-items: center;

      }
      .input-con {
        display: flex;
        align-items: center;
        width: calc(100% - 22px);
        white-space:nowrap;
        overflow-x: auto;
        height: 100%;
        .text {
          color: #999;
        }
      }
    }
  }
  .topRight {
    position: fixed;
    right: 5px;
    top: 0;
    z-index: 999;
    .transferBtn{
      width: 28px;
      padding: 10px;
    }
    .addBtn {
      width: 18px;
      padding: 15px 10px;
    }
    .transferSure{
      position: absolute;
          color: #fff;
          font-size: 14px;
          right: 47px;
          top: 0;
          width: 80px;
          text-align: right;
          padding: 15px 0;
    }
  }
  .kehuCont {
    .no-data-con {
      position: relative;
      width: 100%;
      height: 60vh;
      .no-data-box {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 80%;
        transform: translate(-50%,-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .no-data-tit {
          font-size: 0.38rem;
          font-weight: bold;
        }
        .no-data-desc {
          font-size: 0.34rem;
          color: #969799;
          padding: 10px;
        }
        .no-btn-con {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .btn-item {
            width: 30%;
            height: 0.9rem;
            .van-button {
              width: 100%;
              height: 100%;
              line-height: 0.9rem;
              padding: 0;
              margin: 0;
              font-size: 0.34rem;
            }
          }
        }
      }
    }
    .content {
      padding: 6px 25px 6px 10px;
      background: #fff;
      font-size: 14px;
      border-bottom: 1px solid #eee;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 5px;
        .transfer{
          width: 20px;
          height: 20px;
          padding: 0 10px;
        }
        .phone {
          padding: 5px 0 0 10px;
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
      .van-checkbox__icon .van-icon{
        font-size: 0.68em;
        margin-top: 0.1em;
        margin-left: 3px;
      }
      .van-checkbox__label{
        line-height: 24px;
      }

    }
  }
  .actionCont{
    padding: 0 15px;
    line-height: 40px;
    font-size: 14px;
    .selectImg{
      width: 20px;
      float: right;
      margin-top: 8px;
    }
  }
  .search-popup {
    width: 85%;
    height: 100%;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    background: #f1f1f1;
    display: flex;
    flex-direction: column;
    .search-box {
      height: calc(100% - 90px);
      overflow-y: auto;
    }
    .search-type-con {
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      padding: 8px 12px;
      margin-bottom: 10px;
      .search-tit-con {
        margin-bottom: 10px;
        margin-top: 10px;
        .tit {
          font-size: 0.38rem;
          font-weight: bold;
        }
      }
      .search-val-con {
        .van-field {
          background: #f1f1f1;
          border-radius: 1000px;
          font-size: 0.35rem;
          padding: 5px 10px;
          margin-bottom: 10px;
        }
        .search-tag-item {
          background: #f1f1f1;
          float: left;
          min-width: 20%;
          border-radius: 1000px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 10px;
          margin-right: 10px;
          margin-bottom: 10px;
        }
        .tag-active {
          background: #1989fa;
          color: #fff;
        }
        .customer-active {
          background: #1989fa;
          color: #fff;
        }
        .tag-all {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        // .search-tag-item:nth-child(3n+3) {
        //   margin-right: 0;
        // }
      }

    }
    .search-type-con:first-of-type {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    .placeholder-row {
      width: 100%;
      height: 20px;
      background: #f1f1f1;
    }
  }
  .clearfix {
    clear: both;
  }
  .search-btn-con {
    // position: absolute;
    // bottom: 0;
    // left: 0;
    width: 100%;
    height: 90px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    box-sizing: border-box;
    .btn-item {
      width: 30%;
      height: 0.9rem;
      .van-button {
        width: 100%;
        height: 100%;
        line-height: 0.9rem;
        padding: 0;
        margin: 0;
        font-size: 0.38rem;
      }
    }
    .btn-item:nth-child(2) {
      margin-left: 20px;
    }

  }
  .loading-con {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    z-index: 99999;
    .loading-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 80%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .tit {
        margin-top: 20px;
        color: #969799;
      }
    }
  }
}
</style>
