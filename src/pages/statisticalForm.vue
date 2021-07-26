<template>
    <div class="statisticalForm">
        <van-nav-bar
            left-text="统计报表"
            left-arrow
            @click-left="$router.go(-1)"
        />

        <div id="main" style="height:500px;"></div>
    </div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "statisticalForm",
  data() {
    return {};
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        // title: {
        //   text: "世界人口总量",
        //   subtext: "数据来自网络"
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["目标金额", "成交金额"]
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          minInterval:1
        },
        yAxis: {
          type: "category",
          data: ["2019-12","2019-11","2019-10","2019-09","2019-08","2019-07","2019-06", "2019-05", "2019-04", "2019-03", "2019-02", "2019-01"]
        },
        series: [
          {
            name: "目标金额",
            type: "bar",
            data: [18203, 23489, 29034, 104970, 131744, 630230,630230,458781,545698,226445,842365,412565]
          },
          {
            name: "成交金额",
            type: "bar",
            data: [19325, 23438, 31000, 121594, 134141, 681807,630230,254536,545433,354345,345323,445343]
          }
        ]
      });
    }
  }
};
</script>
<style lang="less">
.statisticalForm {
  min-height: 100%;
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
}
</style>