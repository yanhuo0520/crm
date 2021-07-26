<template>
    <div class="ccbCustomer">
        <van-nav-bar
            left-text="建行客户"
            left-arrow
            @click-left="backLeft"
        />
        <img class="topSearch" src="../../images/search.png" alt="" @click="searchAll">
        
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
        <div v-else class="zanwu">
            <img src="../../images/zanwu.png" alt="">
            <span>暂无内容</span>
        </div>

        <van-loading v-if="loading" size="24px">加载中...</van-loading>
        
    </div>
</template>
<script>
export default {
  name: "ccbCustomer",
  data () {
    return {
        activeName1: '',
        loading: 0,
        lists: [],
        stationName: '',
        page: 1,
        pageSize: 15,
        totalPage: 1
    };
  },
  mounted(){

  },
  methods:{
    scrollBottom(e){
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
            that.getList();
        }
    },
    getList(){
        var that = this;
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
              
          }else{
              this.$toast(res.errmsg)
          }
      })

    },
    backLeft(){
        this.$router.push({
            path: '/'
        })
    },
    searchAll(){
        this.$router.push({
            path: '/ccbSearch'
        })
    },
    toDetail(id){
        this.$router.push({
            path: '/ccbCustomerDetail',
            query: {
                id: id
            }
        })
    },
  },
  created(){
      this.getList()
      window.addEventListener('scroll', this.scrollBottom)
  }
}
</script>
<style lang="less">
.ccbCustomer{
    min-height: 100%;
    background: #f5f5f5;
    .van-nav-bar{
        background: url(../../images/msgBg.jpg) no-repeat;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background-size: 100% 50px;
        .van-nav-bar__text{
            color: #fff;
        }
        .van-icon{
            color: #fff;
        }
    }
    .topSearch{
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
        width: 18px;
        padding: 16px;
    }
    .van-collapse-item__content{
        padding: 0;
    }
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
