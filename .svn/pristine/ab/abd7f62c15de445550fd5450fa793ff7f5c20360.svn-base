<template>
  <div class="tagEditList"> 
    <van-nav-bar left-text="编辑标签" left-arrow fixed @click-left="leftBack"/>
    <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
    <div class="tagList" v-if="tagList != ''">
      <!-- 侧滑进行编辑和删除 -->
      <van-swipe-cell :before-close="beforeClose">
        <van-cell is-link>
          <template #title>
            <img src="../../images/tag2.png" />
            <span class="custom-title">标签</span>
            <van-tag round type="primary">4</van-tag>
          </template>
        </van-cell>
        <template #right>
          <van-button square type="danger" text="删除" @click="deleteTag" />
          <van-button square type="primary" text="编辑" @click="editTag" />
        </template>
      </van-swipe-cell>
      <van-swipe-cell :before-close="beforeClose">
        <van-cell is-link>
          <template #title>
            <img src="../../images/tag2.png" />
            <span class="custom-title">标签</span>
            <van-tag round type="primary">4</van-tag>
          </template>
        </van-cell>
        <template #right>
          <van-button square type="danger" text="删除" @click="deleteTag" />
          <van-button square type="primary" text="编辑" @click="editTag" />
        </template>
      </van-swipe-cell>
      
    </div>
    

    
  </div>
</template>
<script>
import { Dialog } from 'vant';
export default {
  name: "tagEditList",
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
    deleteTag(){
      // console.log("删除标签")
      Dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        instance.close();
      }).catch(() => {
        // on cancel
      });
    },
    editTag(){
      // console.log("编辑标签")
      this.$router.push({
        path: '/tagIndexEdit'
      })
    },
    beforeClose({position, instance }) {
      switch (position) {
        case 'cell':
        case 'outside':
          instance.close();
          break;
      }
    }
  }
};
</script>
<style lang="less">
.tagEditList {
  min-height: calc(100% - 50px);
  padding-top: 50px;
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
  .tagList{
    margin-top: 10px;
    img{
        width: 18px;
        vertical-align: middle;
    }
  }
}
</style>