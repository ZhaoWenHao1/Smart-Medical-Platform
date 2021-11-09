<template>
  <div class="trans-list rangle">
    <div class="title">实时交易</div>
    <div class="list">
      <div class="list-item">
        <div class="name">交易发起者</div>
        <div class="channel">所属</div>

        <div class="date">文件名</div>
      </div>
      <div class="list-item" v-for="(item,index) in list" :key="index" @click="handleClick(index)">
        <div class="name">{{item.user}}</div>
        <div class="channel overflow">{{item.src_channel}}</div>
        <div class="date overflow">{{item.dataId}}</div>
      </div>
    </div>
  </div>
</template>
 
<script>
//import { getTransactionData } from '@/service/api'
import { transactionData } from '@/components/mock.js'
import { evt } from '@/event'
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    formateDate (date) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' })
    },
    async getData () {
      //const res = await getTransactionData()
      const num = Math.random() * 10
      const res = transactionData.slice(num, num + 6)
      this.list = res
    },
    handleClick (index) {
      let dataId = this.list[index].dataId
      this.$router.push({
        path: "transaction",
        query: { dataId: dataId }
      })
    },
  },
  async mounted () {
    evt.on('main', async () => {
      await this.getData()
    })
    await this.getData()

    setInterval(async () => {
      await this.getData()
    }, 5000)

  },

}
</script>
 
<style lang="scss" scoped>
.trans-list {
  margin-left: 20px;
  margin-right: 20px;
  overflow-y: hidden;
  background-color: #091629;
  height: 100%;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  .title {
    color: #117fbe;
    font-size: 16px;
  }
  .list {
    background-color: #091629;
    padding-left: 10px;
    box-sizing: border-box;
    height: 80%;
    color: gray;
    margin-top: 10px;
    .list-item {
      display: flex;
      border-bottom: 1px solid gray;
      // height: 12.5%;
      padding: 6px 20px 6px 0;
      align-items: center;
      .name,
      .channel,
      .date {
        color: #74fbf5;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 14px;
        width: 33.3%;
      }

      .date {
        width: 50%;
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
      &.gray {
        color: gray;
      }
    }
  }
}
</style>