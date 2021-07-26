<template>
  <div class="tagIndex">
    <van-nav-bar left-text="标签" left-arrow fixed @click-left="leftBack">
      <template #right v-if="ifHasAdd">
        <img src="../../images/edit2.png" @click="editTag" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" @click="onClickTab" title-active-color="#1c92ff" line-width="0" line-height="0">
      <van-tab title="个人标签">
        <van-collapse v-model="activeName" accordion v-if="personList != ''" class="personList">
          <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
          <van-collapse-item title="标题1" name="1">
            <template #title>
              <div><img src="../../images/tag.png" /> 一级标签1</div>
            </template>
            <van-steps direction="vertical" :active="-1">
              <van-step>
                <p @click="childTag">二级标签1</p>
              </van-step>
              <van-step>
                <p @click="childTag">二级标签2</p>
              </van-step>
              <van-step>
                <p @click="childTag">二级标签3</p>
              </van-step>
            </van-steps>
          </van-collapse-item>
          <van-collapse-item title="标题1" name="2">
            <template #title>
              <div><img src="../../images/tag.png" /> 一级标签2</div>
            </template>
            测试


          </van-collapse-item>
          <van-collapse-item title="标题1" name="3">
            <template #title>
              <div><img src="../../images/tag.png" /> 一级标签3</div>
            </template>
            测试


          </van-collapse-item>
        </van-collapse>

        <div class="zanwu" v-else>暂无个人标签</div>
      </van-tab>

      <van-tab title="企业标签">
        <ul class="companyList" v-if="companyList != ''">
          <li @click="comList">企业标签1</li>
          <li @click="comList">企业标签2</li>
        </ul>

        <div class="zanwu" v-else>暂无企业标签</div>
      </van-tab>
    </van-tabs>

    <button class="save" v-if="ifHasAdd" @click="addTag">添加标签</button>
    
  </div>
</template>
<script>
export default {
  name: "tagIndex",
  data() {
    return {
      active: 0,
      activeName: '1',
      personList: ['1'],
      companyList: ['2'],
      value: '',
      ifHasAdd: true
    };
  },
  mounted(){
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    
  },
  methods:{
    leftBack(){
      this.$router.push({
        path: "/"
      })
    },
    onClickTab(name, title){
      if(title == "企业标签"){
        this.ifHasAdd = false
      }else{
        this.ifHasAdd = true
      }
    },
    editTag(){
      // console.log("编辑标签")
      this.$router.push({
        path: '/tagEditList'
      })
    },
    childTag(){
      this.$router.push({
        path: '/tagChild3'
      })
    },
    addTag(){
      console.log("添加标签")
    },
    comList(){
      this.$router.push({
        path: '/tagComList'
      })
    }
  }
};
</script>
<style lang="less">
.tagIndex {
  min-height: calc(100% - 100px);
  padding-top: 50px;
  padding-bottom: 50px;
  background: #f5f5f5;
  .van-nav-bar {
    background: url(../../images/msgBg.jpg) no-repeat;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-size: 100% 50px;
    .van-nav-bar__title,
    .van-nav-bar__text,
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__title {
      font-size: 14px;
    }
    .van-nav-bar__right{
      img{
        width: 18px;
      }
    }
  }
  .personList{
    .van-collapse-item{
      margin-top: 10px;
    }
    img{
      width: 20px;
      vertical-align: middle;
      margin-right: 5px;
    }
    .van-collapse-item__content{
      padding: 10px 16px;
    }
    .van-step--vertical .van-step__line{
      top: 19px;
      left: -28px;
    }
    .van-step__circle{
      width: 6px;
      height: 6px;
      transform:rotate(45deg);
      border-radius: 0;
      background-color: #eeeeee;
    }
    .van-step--vertical .van-step__circle-container::after{
      position: absolute;
      content: ' ';
      left: -10px;
      top: 3px;
      width: 12px;
      height: 1px;
      background: #ebedf0;
    }
    .van-step--vertical:not(:last-child)::after{
      border-bottom-width: 0
    }
  }
  ul.companyList {
    margin-top: 10px;
    padding: 0 15px;
    li {
      font-size: 14px;
      display: inline-block;
      padding: 5px 10px;
      margin: 5px 10px 5px 0;
      background:rgba(28,146,255,0.1);
      border:1px solid rgba(28,146,255,1);
      border-radius:10px;

    }
  }
  .zanwu {
    text-align: center;
    padding: 20px 0;
    color: #666666;
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
}
</style>