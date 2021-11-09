<template>
  <div class="err-detail">
    <div class="detail-wrapper">
      <div class="detail">
        <div class="title">{{tx.txId}}</div>
        <div class="message">
          <div class="line">
            <span class="key bold">交易号</span>
            <span class="value">{{tx.txId}}</span>
          </div>
          <div class="line">
            <span class="key">时间</span>
            <span class="value">{{formateDate(new Date())}}</span>
          </div>
          <div class="line">
            <span class="key">操作类型</span>
            <span class="value">{{tx.optype}}</span>
          </div>

          <div class="line">
            <span class="key">源业务标识</span>
            <span class="value">{{tx.src_channel}}</span>
          </div>
          <div class="line">
            <span class="key">用户标识</span>
            <span class="value">{{tx.user}}</span>
          </div>
          <div class="line">
            <span class="key">目标业务域标识</span>
            <span class="value">{{tx.des_channel}}</span>
          </div>
          <div class="line">
            <span class="key">文件标识</span>
            <span class="value">{{tx.dataId}}</span>
          </div>
          <div class="line">
            <span class="key">密文哈希</span>
            <span class="value">{{tx.hashdata}}</span>
          </div>
          <div class="line">
            <span class="key">区块操作号</span>
            <span class="value"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
/* import { transactionData } from './mock' */
// import {getTransactionData} from '@/service/api'
import { transactionData } from '@/components/mock'

export default {
  props: {
    paperId: Number,
  },
  data () {
    return {
      tx: {},
      transactionData: []
    }
  },
  methods: {
    formateDate (date) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' })
    },
    async getData () {
      //const res = await getTransactionData()



      this.transactionData = transactionData
      // this.transactionData = res.data
    }
  },
  async mounted () {
    await this.getData()
    this.tx = this.transactionData.filter(item => item.id == this.paperId)[0]

    setInterval(async () => {
      await this.getData()
      this.tx = this.transactionData.filter(item => item.id == this.paperId)[0]

    }, 5000)
  },
  watch: {
    paperId: function (newV) {
      console.log('newV', newV);
      this.tx = this.transactionData.filter(item => item.id == newV)[0]
      console.log('this.tx', this.tx);
    },
  }
}



</script>
 
<style lang="scss" scoped>
.err-detail {
  overflow-y: auto;
  width: 100%;
  height: 100%;

  .detail-wrapper {
    padding: 5px 10px;
    padding-top: 20px;
    width: 100%;

    height: 100%;
    color: white;
    box-sizing: border-box;
    .detail {
      height: 100%;
      width: 100%;

      .title {
        font-weight: bold;
        width: 70%;
        height: 60px;

        word-wrap: break-word;
        word-break: break-all;
        font-size: 20px;
      }
      .message {
        width: 100%;
        height: calc(100% - 70px);
        margin-top: 10px;
        .line {
          display: flex;
          padding-top: 5px;
          padding-bottom: 5px;
          height: 9%;
          box-sizing: border-box;
          align-items: center;
          border-bottom: 1px solid #bcd0f9;
          justify-content: space-between;
          .key,
          .value {
            font-size: 14px;
            &.bold {
              font-weight: bold;
              font-size: 14px;
            }
          }
          .key {
            width: 100px;
            /* color: #c0c4cc; */
          }
          .value {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>