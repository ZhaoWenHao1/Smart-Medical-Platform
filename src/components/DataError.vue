<template>
  <div class="inner-wrapper">
    <div class="error-status">
      <div class="content-wrapper">
        <div class="selects">
          <div class="input-wrapper">
            <el-input v-model="dataId" size="small" placeholder="文件名" clearable></el-input>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              @click="search"
              :style="{marginLeft:'10px'}"
            >搜索</el-button>
          </div>
          <el-button type="danger" size="small" @click="showChart = true" icon="el-icon-s-data">统计</el-button>
        </div>
        <div class="list">
          <div class="list-item gray">
            <div class="txId">交易号</div>
            <div class="date">交易文件</div>

            <div class="user">交易发起方</div>
            <div class="status">状态</div>
          </div>
          <div
            class="list-item"
            v-for="(item,index) in list"
            :key="index"
            @click="handleClick(item.id)"
          >
            <div class="txId overflow">{{item.txId}}</div>
            <div class="date overflow">{{item.dataid}}</div>
            <div class="user overflow">{{item.user}}</div>
            <div class="status overflow">
              <el-tag
                size="mini"
                :type="item.status === 'NotSatifyRoot'?'danger': 'warning'"
                effect="dark"
              >{{item.status}}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="paper-detail">
      <error-detail :paperId="paperId"></error-detail>
    </div>
    <el-dialog title="异常统计" :visible.sync="showChart" width="30%">
      <v-chart :options="chartOptions"></v-chart>
    </el-dialog>
  </div>
</template>
 
<script>
import ErrorDetail from './ErrorDetail.vue'

// import { getErrorDetailData } from '@/service/api'
import { errorDetailData } from '@/components/mock.js'
import { evt } from '@/event'
export default {
  components: {
    ErrorDetail
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '证书已失效'
      }, {
        value: '选项2',
        label: '信息不完整'
      }, {
        value: '选项3',
        label: '权限审计没过'
      }, {
        value: '选项4',
        label: '信息不一致'
      }],
      chartOptions: {},
      paperId: 0,
      value: '',
      list: [],
      dataId: '',
      canInterval: true,
      showChart: false
    }
  },
  methods: {
    formateDate (date) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' })
    },
    handleClick (id) {
      this.paperId = id
    },
    search () {
      if (this.dataId === '') {
        this.getData()
        return
      }
      this.list = errorDetailData.filter(item => {
        return item.dataid === this.dataId
      })
      this.paperId = this.list[0].id
    },
    async getData () {
      // const res = await getErrorDetailData()
      const num = Math.floor(Math.random() * 5)
      const res = errorDetailData.slice(num, num + 6)
      if (this.canInterval == false) this.canInterval = true

      this.list = res
      this.paperId = this.list[0].id
    }
  },
  // mounted () {
  //   let count = 0;
  //   let length = errorDetailData.length
  //   let timer = setInterval(() => {


  //     if (count >= 7) {
  //       this.list.unshift(errorDetailData[count])

  //       this.list = this.list.slice(0, 7)
  //     } else {
  //       this.list.push(errorDetailData[count])
  //     }
  //     if(count === 0) this.paperId = this.list[0].id
  //     count++

  //     console.log('this.paperId', this.paperId);
  //     if (count >= length) {
  //        clearInterval(timer)
  //     }
  //   }, 2000)
  // }
  async mounted () {
    const dataid = this.$route.query.dataid
    if (dataid == null) {
      await this.getData()

    } else {
      this.dataId = dataid
      this.search()
      this.canInterval = false
    }

    evt.on('main', async () => {
      await this.getData()

    })


    setInterval(async () => {
      if (this.canInterval) {
        await this.getData()

      }
    }, 5000)
    let NotSatifyRootData = []
    let NotFindPolicyData = []
    let len = errorDetailData.length
    errorDetailData.forEach(item => {
      if (item.status === 'NotSatifyRoot') {
        NotSatifyRootData.push(item)
      } else {
        NotFindPolicyData.push(item)
      }
    });
    this.chartOptions = {

      series: [{
        name: "category",
        type: 'pie',
        data: [
          {
            legondname: 'NotSatifyRoot',
            value: NotSatifyRootData.length,
            percent: `${(NotSatifyRootData.length / len).toFixed(2) * 100}%`,
            itemStyle: {
              color: '#8FC31F'
            },
            name: `NotSatifyRoot | ${(NotSatifyRootData.length / len).toFixed(2) * 100}%`
          },
          {
            legondname: 'NotFindPolicy',
            value: NotFindPolicyData.length,
            percent: `${(NotFindPolicyData.length / len).toFixed(2) * 100}%`,
            itemStyle: {
              color: '#F35833'
            },
            name: `NotFindPolicy | ${(NotFindPolicyData.length / len).toFixed(2) * 100}%`
          },
        ],

        animation: true,
        animationDuration: 1000,
        label: {
          normal: {
            show: true,
            position: 'inner',
            formatter: function (params) {
              return params.data.name
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
  },



}
</script>
 
<style lang="scss" scoped>
.inner-wrapper {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  .error-status {
    width: 50%;
    margin-left: 40px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;

    background: #0f1c39;
    height: calc(100% - 20px);
    /*  height: 100%; */
    .content-wrapper {
      padding-top: 50px;
      padding-left: 20px;
      .selects {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .input-wrapper {
          display: flex;
        }
      }
      .list {
        background-color: #0f1c39;
        padding-left: 10px;
        box-sizing: border-box;
        height: 80%;
        color: gray;
        margin-top: 10px;
        .list-item {
          display: flex;
          border-bottom: 1px solid gray;
          height: 10%;
          box-sizing: border-box;
          padding: 16px 20px 16px 0;
          align-items: center;
          .txId,
          .user,
          .date,
          .status {
            color: white;
            //flex: 1;
            // height: 12.5%;

            text-align: center;
            font-size: 14px;
            width: 25%;
          }
          .txId {
            width: 35%;
          }
          .status {
            width: 15%;
          }
          .user {
            width: 25%;
          }
          .overflow {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          /* &:nth-child(odd) {
        background: #f2f2f2;
      }
      &:nth-child(even) {
        background: white;
      } */
        }
      }
    }
  }
  .paper-detail {
    width: 50%;

    margin-left: 1%;
    padding-left: 20px;
    margin-right: 20px;
    padding-right: 20px;
    box-sizing: border-box;

    background: #0f1c39;
    height: calc(100% - 20px);
    /* height: 100%; */
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
.el-date-editor {
  background-color: #3e495d;
}
/deep/ .el-range-input {
  background-color: #3e495d !important;
  border: none;
}

/deep/ .el-range-separator {
  color: #c0c4cc;
}
/deep/ .el-input__inner {
  background-color: #3e495d;
  border: none;
}
/deep/ .el-radio-button__inner {
  background-color: #3e495d;
  border: none;
  color: #c0c4cc;
}
/deep/ .el-radio-button__inner {
  border-left: none !important;
}
/deep/ .el-input__inner {
  color: white;
  /* width: 140px; */
}
/deep/ .el-dialog__body {
  height: 400px;
}
</style>