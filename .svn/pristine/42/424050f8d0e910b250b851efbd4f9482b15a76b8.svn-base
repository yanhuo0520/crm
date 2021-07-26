<template>
  <div class="tagAdd">
    <van-nav-bar
      left-arrow
      left-text="设置标签名字"
      right-text="确定"
      fixed
      @click-left="leftBack"
      @click-right="addTag"
    />
    <!-- <p class="title">标签名称</p> -->
    <van-field v-model="tagValue" placeholder="请输入标签名称" />

  </div>
</template>
<script>
export default {
  name: "tagAdd",
  data() {
    return {
      customer_type: '',
      tag_id: '',
      tagValue: '', // 输入框内容
      tag: '' // 页面传来标签值
    };
  },
  mounted() {
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    document.documentElement.scrollTop = 0;
    var customer_type = this.$route.query.customer_type; //  1 其他新增客户  2 建行客户   0 全部
    this.customer_type = customer_type

    var tag_id = this.$route.query.tag_id;
    var tag = this.$route.query.tag;
    if(tag_id){ // 编辑
      this.tag_id = tag_id
      this.tag = tag
      this.tagValue = tag
    }else{
      // console.log("新增")
    }
  },
  methods: {
    leftBack(){
      this.$router.go(-1)
    },
    // 添加或编辑标签保存
    addTag() {
      let that = this
      if(!that.tagValue){
        this.$toast("请设置标签名字");
        return
      }else if(that.tagValue == that.tag){
        this.$toast("标签名称未修改");
        return
      }
      if(this.tag_id){ // 编辑标签
        this.$router.push({
        path: '/tagEdit',
          query: {
            customer_type: that.customer_type,
            tag: that.tagValue,
            tag_id: that.tag_id,
            tagOld: that.tag // 编辑标签
          }
        })
      }else{ // 新增标签
        var data = {}
        data.tag_name = that.tagValue
        data.type = 1 // 	1个人标签 2企业标签
        this.$api.tagAdd(data).then(res=>{
          if(res.errno == 0){
            this.$router.push({
              path: '/tagEdit',
              query: {
                customer_type: that.customer_type,
                tag: that.tagValue,
                tag_id: res.customer_tag_id,
                ifNewAdd: 1, // 是新增加的标签
              }
            })
          }else{
            this.$toast(res.errmsg)
          }
        })
      }
      
      
    }
  },
};
</script>
<style lang="less">
.tagAdd {
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
    .van-nav-bar__title,
    .van-nav-bar__text,
    .van-icon{
      color: #fff;
    }
    .van-nav-bar__title{
      font-size: 14px;
    }
  }
  p.title{
    padding: 0 15px;
    font-size: 14px;
    line-height: 32px;
    &:last-of-type{
      margin-top: 10px;
    }
  }
}
</style>