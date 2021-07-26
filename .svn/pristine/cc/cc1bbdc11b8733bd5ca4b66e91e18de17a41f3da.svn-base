<template>
  <div class="reportSel">
    <van-nav-bar
      left-text="汇报对象"
      :right-text="rigthText"
      left-arrow
      fixed
      @click-left="leftBack"
      @click-right="sureSelect"
    />
    <div class="content" v-if="list != ''">
      <van-checkbox-group v-model="result" @change="changSel">
        <van-checkbox 
        :name="item.user_id + '-' + item.firstName"
        v-model ="item.is_lock"
        :disabled="item.is_lock == 1?true:false" 
        v-for="(item, index) in list" 
        :key="index">
        {{item.user_name}} 
          <span v-if="item.phone">({{item.phone}})</span>
        </van-checkbox>
      </van-checkbox-group>

    </div>
    <div v-else class="zanwu">
      <img src="../images/zanwu.png" alt />
      <span>暂无内容</span>
    </div>

  </div>
</template>
<script>
export default {
  name: "reportSel",
  data() {
    return {
      rigthText: "确定",
      list: [],
      result: [],
      selNum: 0
    };
  },
  mounted() {
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    document.documentElement.scrollTop = 0;
    this.getList();
    // 获取已选择汇报对象，默认已选择
    let selReport = localStorage.getItem("selReport")
      selReport = JSON.parse(selReport)
    if(selReport){
      this.result = selReport
      this.selNum = selReport.length
      this.rigthText = "确定(" + this.selNum + ")"
    }else{
      this.result = []
      this.selNum = 0
      this.rigthText = "确定"
    }
  },
  methods: {
    leftBack(){
      this.$router.go(-1)
    },
    changSel(){
      let that = this
      that.selNum = that.result.length;
      if(that.selNum > 0){
        that.rigthText = "确定(" + that.selNum + ")"
      }else{
        that.rigthText = "确定"
      }
    },
    sureSelect() {
      let that = this
      if(that.selNum === 0){
        this.$toast("请选择汇报对象")
        return
      }else{
        localStorage.setItem("selReport", JSON.stringify(that.result))
        this.$router.go(-1)
      }

    },
    getList(){
      this.$api.reportUserSel().then(res=>{
        if(res.errno === 0){
          this.list = res.data

          if(this.list){
            this.list.forEach(ele=>{
              ele.firstName = ele.user_name.substr(0, 1)
            })
          }
        }
      })
    }
  }
};
</script>
<style lang="less">
.reportSel {
  min-height: calc(100% - 50px);
  padding-top: 50px;
  background: #f5f5f5;
  .van-nav-bar {
    z-index: 2;
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
  .content{
    background: #ffffff;
    font-size: 14px;
    .van-checkbox{
      padding: 10px 15px;
      border-bottom: 1px solid #eeeeee;
    }
  }
  .zanwu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10%;
    img {
      width: 80%;
    }
  }
}
</style>