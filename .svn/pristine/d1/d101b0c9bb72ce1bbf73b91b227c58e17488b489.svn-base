<template>
    <div class="ccbSearch">
        <div class="top">
            <img src="../../images/goback.png" alt="" @click="$router.go(-1)">
            <input type="text" placeholder="请输入搜索内容" v-model="value">
            <img src="../../images/search.png" alt="" @click="searchAll">
        </div>
        <p>历史搜索</p>

        <ul>
            <li v-for="(item,index) in historyList" :key="index" @click="searchItem(item)">{{item}}</li>
        </ul>
        <div class="searchCont">
            <van-collapse v-model="activeName1" accordion v-if="lists!=''">
                <van-collapse-item
                    :title="item.serverName"
                    :name="item.customer_id"
                    icon="http://sc.xfd365.com/crmImages/customerName.png"
                    v-for="(item, index) in lists"
                    :key="index"
                >
                <ul>
                    <li>
                        <span>{{item.deal_num}}</span>
                        <span>交易笔数</span>
                    </li>
                    <li>
                        <span>{{item.deal_money}}</span>
                        <span>交易金额</span>
                    </li>
                    <li>
                        <span>{{item.year_deal_num}}</span>
                        <span>当年交易笔数</span>
                    </li>
                    <li>
                        <span>{{item.year_deal_money}}</span>
                        <span>当年交易金额</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>{{item.sum_deal_num}}</span>
                        <span>累计交易笔数</span>
                    </li>
                    <li>
                        <span>{{item.sum_deal_money}}</span>
                        <span>累计交易金额</span>
                    </li>
                </ul>
                <div class="button" @click="toDetail(item.customer_id)">
                    <img src="../../images/ccbDetail.png" alt="">
                    <span>查看详情</span>
                </div>
                </van-collapse-item>
            </van-collapse>
            <!-- <div v-else class="zanwu">
                <img src="../../images/zanwu.png" alt="">
                <span>暂无内容</span>
            </div> -->

            <van-loading v-if="loading" size="24px">加载中...</van-loading>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ccbSearch',
    data(){
        return {
            value: '',
            loading: 0,
            activeName1: '',
            lists: [],
            historyList: [],
            page: 1,
            pageSize: 15,
            totalPage: 1
        }

    },
    methods: {
        scrollBottom(){
            let that = this;
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollTop = document.body.scrollTop;
            }

            let clientHeight = document.documentElement.clientHeight; /*当前可视高度*/
            let scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); /*文档完整的高度*/
            if ((scrollHeight - clientHeight - scrollTop) <= 0 && that.page < that.totalPage) {
                that.page +=1
                that.loading = 1
                that.searchAll();
            }
        },
        searchItem(item){
            let that = this;
            that.value = item;
            that.page = 1;
            that.searchAll()
        },
        searchAll: function(){
            var that = this;
            var val = that.value.trim();
            if(val != ''){
                let storage = window.localStorage;
                if (storage.getItem("ccbSearchWord") == null) {
                    that.historyList.unshift(val);
                    storage.setItem("ccbSearchWord", JSON.stringify(that.historyList));
                } else {
                    if (that.historyList.indexOf(val) != -1) {
                        that.historyList.splice(that.historyList.indexOf(val), 1);
                        that.historyList.unshift(val);
                    } else {
                        that.historyList.unshift(val);
                    }

                    if (that.historyList.length > 5) {
                        that.historyList.pop();
                    }
                    storage.setItem("ccbSearchWord", JSON.stringify(that.historyList));
                }

                this.$api.ccbCustomerLists({page: that.page, size: that.pageSize}).then(res=>{
                    that.totalPage = res.total_page
                    if(res.errno === 0){
                        if(that.page == 1){
                            that.loading = 0
                            that.lists = res.data;
                        }else if(res.data.length > 0){
                            that.lists.push(...res.data)
                            if(res.data.length < that.pageSize){
                                that.loading = 0
                            }
                        }else if(that.page == that.totalPage){
                            that.loading = 0
                        }
                            
                        if(that.lists){
                            that.lists.forEach(ele => {
                                if(ele.label){
                                    ele.labelArray = ele.label.substr(0, ele.label.length - 1).split("#");
                                }else{
                                    ele.labelArray = []
                                }
                            })
                        } 
                        
                    }
                })
            }else{
                this.$toast("请输入搜索内容")
            }
            
        }
    },
    created(){
        let that = this;
        window.addEventListener('scroll', this.scrollBottom)

      //获取localstorage
        let storage = window.localStorage;
        if (storage.getItem("ccbSearchWord") !== null) {
        that.historyList = JSON.parse(storage.getItem("ccbSearchWord"));
        }
  }
}
</script>
<style lang="less">
.ccbSearch{
  .top {
    background: url("../../images/msgBg.jpg") no-repeat;
    width: calc(100% - 32px);
    height: 50px;
    background-size: 100% 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    img:first-of-type {
      width: 10px;
      height: 16px;
      margin-right: 10px;
    }
    img:last-of-type {
      width: 20px;
      height: 20px;
    }
    input {
      height: 35px;
      border: none;
      width: 95%;
      border-bottom: 1px solid #6364bb;
      color: #fff;
      background: transparent;
    }
    input:-ms-input-placeholder {
      color: #fff;
    }
    ::-webkit-input-placeholder {
      color: #fff;
    }
  }
  > p {
    color: #aaa;
    font-size: 14px;
    padding: 10px 0 0 16px;
  }
  > ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      padding: 5px 10px;
      background: #eee;
      color: #444;
      margin-left: 16px;
      margin-top: 10px;
      border-radius: 20px;
      font-size: 14px;
    }
  }
  .searchCont{
      margin-top: 15px;
      ul{
        display: flex;
        border-bottom: 1px solid #EEEEEE;
        li{
           width: 25%;
           text-align: center;
           padding: 10px 0;
           float: left;
           border-right: 1px solid #eeeeee;
           span{
               display: block;
               line-height: 24px;
               &:first-child{
                   color: #444444;
                   font-size: 14px;
               }
           }
        }
    }
  }
  
    .button{
        text-align: center;
        padding: 10px 0;
        img{
            width: 16px;
            height: 16px;
            vertical-align: text-bottom;
        }
        span{
            font-size: 14px;
            color: #444444;
            padding-left: 3px;
        }
    }

    .van-loading{
        padding: 10px 0;
        text-align: center;
    }

  .zanwu{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 10%;
        img{
            width: 80%;
        }
    }


}
</style>