<template>
  <div class="category-user rangle">
    <div class="title">用户构成</div>
    <v-chart :options="options"></v-chart>
  </div>
</template>
 
<script>
let mockData = [
  {
    legondname: "channel2:24",
    value: 67,
    percent: "12%",
    itemStyle: {
      color: '#8FC31F'
    },
    name: "channel2:24 | 12%"
  },
  {
    legondname: "channel3:26",
    value: 97,
    percent: "13%",
    itemStyle: {
      color: '#F35833'
    },
    name: "channel3:26 | 13%",

  },
  {
    legondname: "channel4:30",
    value: 92,
    percent: "15%",
    itemStyle: {
      color: '#00CCFF'
    },
    name: "channel4:30 | 15%"

  },
  {
    legondname: "channel5:28",
    value: 87,
    percent: "14%",
    itemStyle: {
      color: '#FFCC00'
    },
    name: "channel5:28 | 14%"

  },
  {
    legondname: "channel6:50",
    value: 204,
    percent: "25%",
    itemStyle: {
      color: '#A74FAF'
    },
    name: "channel6:50 | 25%"

  },
  {
    legondname: "channel1:38",
    value: 107,
    percent: "19%",
    itemStyle: {
      color: '#FF9668'
    },
    name: "channel1:38 | 19%"

  },
]
export default {
  data () {
    return {
      options: {}
    }
  },
  mounted () {
    this.options = {

      series: [{
        name: "category",
        type: 'pie',
        data: mockData,
        animation: true,
        animationDuration: 1000,
        label: {
          normal: {
            show: true,
            position: 'inner',
            formatter: function (params) {
              return params.data.percent
            }
          }
        },

        labelLine: {
          normal: {
            length: 5,
            length2: 3,
            smooth: true
          }
        },
        /* itemStyle: {
          borderWidth:4px
        }, */
        clockwise: true
      }],
      /* legend: {
        type: 'scroll',
        orient: "vertical",
        height: 250,
        left: '60%',
        top: 'middle',
        textStyle: {
          color: "white"
        }
      }, */
      /* tooltip: {
        trigger: 'item',
        formatter: function (params) {
          const str = params.seriesName + '</br>' + params.marker + params.data.legondname + '</br>' + "数量: " + params.data.value + "</br>" + "占比:" + params.data.percent
          return str
        }
      } */
    }
  }
}
</script>
 
<style lang="scss" scoped>
.category-user {
  height: calc(50% - 30px);
  margin-top: 20px;

  background-color: #091629;
  padding: 20px;
  box-sizing: border-box;
  .title {
    color: #117fbe;
    font-size: 13px;
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>