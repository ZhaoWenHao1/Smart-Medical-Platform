<template>
  <div class="block rangle">
    <div class="title">交易统计</div>
    <v-chart :options="options"></v-chart>
  </div>
</template>

<script>

export default {

  data () {
    return {
      options: {}
    }
  },

  methods: {
    renderOptions (data, axis) {
      return {
        xAxis: {
          type: 'category',
          data: axis,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: 'white',
            fontSize: 11
          }
        },
        title: {

          textStyle: {
            fontSize: 12,
            color: '#666'
          },
          left: 25,
          top: 20
        },

        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#333'
            },
            show: true
          },
          axisLabel: {
            color: 'white',
            fontSize: 11,
            show: true


          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {

            return params.name + '数据量为:' + params.data + 'GB'
          }
        },
        series: [{
          type: 'line',
          data,
          barWidth: "30%",
          animation: true,
          animationDuration: 2000,
          label: {
            show: true,
            position: 'top',
            distance: 5,
            fontSize: 11,
            color: "#D7A717"
          }
        }, {
          type: 'bar',
          data,
          barWidth: "30%",
          animation: true,
          animationDuration: 2000,

        }],
        color: ['#B23231', '#4A4DF0', '#74fbf5', '#A3D2F6', '#B2EAC0',],
        grid: {
          top: 20,
          left: 40,
          right: 40,
          bottom: 30
        }
      }
    }
  },
  mounted () {
    this.groupData = [4950, 5768, 3421, 5887, 4665, 5490, 2907, 3878, 5200]
    this.xAxis = [
      'channel1',
      'channel2',
      'channel3',
      'channel4',
      'channel5',
      'channel6',
      'channel7',
      'channel8',
      'channel9',


    ]
    this.options = this.renderOptions(this.groupData, this.xAxis)
  }




}
</script>

<style lang='scss' scoped>
.block {
  margin-top: 10px;
  height: 240px;
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