<template>
  <div class="ccbCustomerDetail">
    <!-- <van-nav-bar left-text="建行客户详情" left-arrow @click-left="$router.go(-1)" /> -->
    <div class="top">
      <p @click="$router.go(-1)">
        <img src="../../images/goback.png" alt />
        <span>{{stationDetail.serverName}}</span>
      </p>
      <div>
        <p>
          <span>{{stationDetail.deal_num}}</span>
          <span>交易笔数</span>
        </p>
        <p>
          <span>{{stationDetail.deal_money}}</span>
          <span>交易金额</span>
        </p>
      </div>
    </div>

    <div class="content">
      <div class="marBottom">
        <van-cell title="当年"></van-cell>
        <van-field
          placeholder="当年交易笔数"
          label="当年交易笔数"
          readonly
          input-align="right"
          v-model="stationDetail.year_deal_num"
        />
        <van-field
          placeholder="当年交易金额"
          label="当年交易金额"
          readonly
          input-align="right"
          v-model="stationDetail.year_deal_money"
        />
      </div>
      <div class="marBottom">
        <van-cell title="累计"></van-cell>
        <van-field
          placeholder="累计交易笔数"
          label="累计交易笔数"
          readonly
          input-align="right"
          v-model="stationDetail.sum_deal_num"
        />
        <van-field
          placeholder="累计交易金额"
          label="累计交易金额"
          readonly
          input-align="right"
          v-model="stationDetail.sum_deal_money"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ccbCustomerDetail",
  data() {
    return {
      stationDetail: {},
      customer_id: ""
    };
  },
  mounted() {
    this.customer_id = this.$route.query.id;
    this.$api.ccbCustomerDetail({ customer_id: this.customer_id }).then(res => {
      if (res.errno === 0) {
        if (res.data) {
          this.stationDetail = res.data;
        }
      }
    });
  },
  methods: {}
};
</script>
<style lang="less">
.ccbCustomerDetail {
  min-height: 100%;
  background: #f5f5f5;
  .top {
    background: url(../../images/topBg.jpg) no-repeat;
    width: 100%;
    height: 130px;
    background-size: 100% 130px;
    > p {
      height: 50px;
      line-height: 50px;
      color: #fff;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 16px;
      font-size: 14px;
      img {
        width: 10px;
        height: 16px;
        margin-right: 10px;
      }
    }
    > div {
      display: flex;
      justify-content: space-around;
      p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 14px;
        margin-top: 10px;
        img {
          width: 15px;
          height: 15px;
          margin-bottom: 10px;
        }
        span:first-child {
          font-size: 18px;
          font-weight: bold;
        }
      }
      p:first-child {
        img {
          width: 10px;
          height: 15px;
        }
      }
    }
  }
  .content {
    margin-top: -30px;
    padding: 15px;
  }
  .marBottom {
    margin-bottom: 10px;
    border-radius: 10px;
    .van-cell:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .van-cell:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    &:first-child {
      .van-cell:first-child {
        .van-cell__title {
          color: #e68b16;
          padding-left: 8px;
          position: relative;
          &::after {
            position: absolute;
            left: 0;
            top: 5px;
            bottom: 5px;
            content: " ";
            width: 2px;
            background: #e68b16;
          }
        }
      }
    }
    &:last-child {
      .van-cell:first-child {
        .van-cell__title {
          color: #1C92FF;
          padding-left: 8px;
          position: relative;
          &::after {
            position: absolute;
            left: 0;
            top: 5px;
            bottom: 5px;
            content: " ";
            width: 2px;
            background: #1C92FF;
          }
        }
      }
    }
  }
}
</style>
