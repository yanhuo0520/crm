<template>
  <div class="tagChild4"> 
    <van-nav-bar left-text="标签" left-arrow fixed @click-left="leftBack"/>
    <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
    <ul class="tagTitle">
        <li @click="indexTag">标签1 ></li>
        <li @click="indexTag">标签2 ></li>
        <li @click="indexTag3">标签3 ></li>
        <li>标签4</li>
    </ul>
    <div class="tagList" v-if="tagList != ''">
        <van-cell is-link @click="childTag">
            <template #title>
                <img src="../../images/tag2.png" />
                <span class="custom-title">标签</span>
                <van-tag round type="primary">4</van-tag>
            </template>
        </van-cell>
        <van-cell is-link @click="childTag">
            <template #title>
                <img src="../../images/tag2.png" />
                <span class="custom-title">标签</span>
                <van-tag round type="primary">4</van-tag>
            </template>
        </van-cell>
    </div>
    

    <button class="save" @click="addTag">添加标签</button>
    
  </div>
</template>
<script>
export default {
  name: "tagChild4",
  data() {
    return {
      value: '',
      tagList: ['1'],
    };
  },
  mounted(){
    window.leftBack = this.leftBack // Android原生返回按钮执行leftBack()方法
    
  },
  methods:{
    leftBack(){
      this.$router.go(-1)
    },
    indexTag(){
      this.$router.push({
        path: '/tagIndex'
      })
    },
    childTag(){
      this.$router.push({
        path: '/tagChildLast'
      })
    },
    indexTag3(){
      this.$router.push({
        path: '/tagChild3'
      })
    },
    addTag(){
        console.log("添加标签")
    }
  }
};
</script>
<style lang="less">
.tagChild4 {
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
  }
  .tagTitle{
    padding: 10px 16px;
    background-color: #ffffff;
    li{
        display: inline-block;
        &:last-child{
            color: #1C92FF;
        }
    }
  }
  .tagList{
    margin-top: 10px;
    img{
        width: 18px;
        vertical-align: middle;
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
}
</style>