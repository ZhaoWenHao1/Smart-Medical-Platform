<template>
  <div class="err-detail">
    <div class="detail-wrapper">
      <div class="detail">
        <div class="title">{{tx.txId}}</div>
        <div class="message">
          <div class="line">
            <span class="key bold">基本情况</span>
            <span class="value"></span>
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
            <span class="key">状态</span>
            <span class="value">{{tx.status}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="status-wrapper">
      <div class="status-detail">
        <div class="message" v-if="type === 'danger'">
          <div class="line">
            <span class="key bold">状态详情</span>
            <span class="value">{{tx.status}}</span>
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
            <span class="key">文件标识标识</span>
            <span class="value">{{tx.dataid}}</span>
          </div>
        </div>
        <div class="message" v-else-if="type === 'warning'">
          <div class="line">
            <span class="key bold">状态详情</span>
            <span class="value"></span>
          </div>
          <div class="line">
            <span class="key">原始数据</span>
            <span class="value">{{originData}}</span>
          </div>
          <div class="line">
            <span class="key">上链数据</span>
            <span class="value">{{chainData}}</span>
          </div>
        </div>
        <div class="message" v-else>
          <div class="line">
            <span class="key bold">状态详情</span>
            <span class="value"></span>
          </div>
          <div class="list">
            <div class="list-item gray">
              <div class="updater">修改者</div>
              <div class="txId">交易号</div>
              <div class="updateDate">修改时间</div>
            </div>
            <div class="list-item" v-for="(updateItem,index) in updateHistorys" :key="index">
              <div class="updater">{{updateItem.updater}}</div>
              <div class="txId">{{updateItem.txId}}</div>
              <div class="updateDate">{{formatDate(updateItem.updateDate)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
// import { getErrorDetailData } from '@/service/api'
import { errorDetailData } from '@/components/mock'
/* import { errorDetailData } from './mock'; */
export default {
  props: {
    paperId: Number
  },
  data () {
    return {
      type: "danger",
      tx: '',
      errorDetailData: []
    }
  },
  async mounted () {
    await this.getData()
    this.tx = this.errorDetailData.filter(item => item.id == this.paperId)[0]

    setInterval(async () => {
      await this.getData()
      this.tx = this.errorDetailData.filter(item => item.id == this.paperId)[0]

    }, 5000)
  },
  methods: {
    formateDate (date) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' })
    },
    async getData () {
      this.errorDetailData = errorDetailData

    }
  },
  watch: {
    paperId: function (newV) {
      console.log('newV', newV);
      this.tx = this.errorDetailData.filter(item => item.id == newV)[0]
      console.log('this.tx', this.tx);
    },
  }
}
</script>
 
<style lang="scss" scoped>
.err-detail {
  width: 100%;
  height: 100%;
  .detail-wrapper,
  .status-wrapper {
    padding: 5px 10px;
    padding-top: 20px;
    height: 50%;

    box-sizing: border-box;
    .detail,
    .status-detail {
      height: 100%;

      .title {
        font-weight: bold;
        width: 70%;
        height: 60px;
        word-wrap: break-word;
        word-break: break-all;
        color: white;
        font-size: 18px;
      }
      .message {
        width: 100%;
        height: calc(100% - 70px);

        margin-top: 10px;
        .line {
          height: 20%;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #bcd0f9;
          justify-content: space-between;
          .key,
          .value {
            font-size: 14px;
            color: white;

            &.bold {
              font-weight: bold;
              font-size: 14px;
              color: white;
            }
          }
          .key {
            color: white;
          }
        }
        .list {
          color: gray;
          margin-top: 10px;
          .list-item {
            display: flex;
            border-bottom: 1px solid #bcd0f9;
            /* border-bottom: 1px solid gray; */
            height: 20px;
            padding: 6px 20px 6px 0;
            align-items: center;
            .updater,
            .txId,
            .updateDate {
              height: 20px;
              /* padding: 5px 0; */
              text-align: center;
              font-size: 14px;
            }
            .updater {
              width: 80px;
            }
            .updateDate {
              width: 80px;
            }
            .txId {
              flex: 1;
            }

            /* &:nth-child(odd) {
        background: #f2f2f2;
      }
      &:nth-child(even) {
        background: white;
      } */
            &.gray {
              color: white;
            }
          }
        }
      }
    }
    .operation {
      font-size: 12px;
      margin-top: 20px;
      .op {
        .bold {
          font-weight: bold;
        }
      }
      .op-detail {
        display: flex;
        justify-content: space-around;

        .con {
          width: 40px;
          position: relative;
          margin-top: 25px;
          margin-left: 40px;
          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
            position: absolute;

            background: #1b60ec;
          }
          .bar {
            height: 60px;
            width: 1px;
            left: 4px;
            background: #87abf5;
            position: absolute;
          }
        }
        .time {
          position: relative;
          width: 150px;
          margin-left: 40px;
          .time-item {
            position: absolute;
            align-items: center;
          }
        }
        .tags {
          position: relative;
          width: 400px;
          margin-top: 22px;
          .tag-item {
            position: absolute;
            width: 70px;
            text-align: center;
          }
          .tag-item2 {
            position: absolute;
            width: 70px;
            left: 70px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>