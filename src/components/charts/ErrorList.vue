<template>
  <div class="error-list rangle" style="border-color: #795da3">
    <div class="title">预警展示</div>
    <div class="list">
      <div class="list-item" v-for="(paper,index) in list" :key="index" @click="handleClick(index)">
        <div class="status">
          <el-tag
            :type="paper.status === 'NotSatifyRoot'?'danger': 'warning' "
            size="mini"
            effect="dark"
            :style="{width:'100%'}"
          >{{paper.status}}</el-tag>
        </div>
        <div class="name overflow">{{paper.user}}</div>
        <div class="title overflow">{{paper.des_channel}}</div>
        <div class="file overflow">{{paper.dataid}}</div>
        <div class="date" style="color:#0E94DF">详情</div>
      </div>
    </div>
  </div>
</template>
 
<script>
// import { getErrorDetailData } from '@/service/api'
import { errorDetailData } from '@/components/mock.js'
import { evt } from '@/event'

export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    formatDate (date) {
      return date.toLocaleString().slice(0, 9)
    },

    handleClick (index) {
      let dataid = this.list[index].dataid
      this.$router.push({
        path: "error",
        query: { dataid: dataid }
      })
    },
    async getData () {
      // const res = await getErrorDetailData()
      const num = Math.floor(Math.random() * 5)
      const res = errorDetailData.slice(num, num + 6)
      this.list = res
    },


  },
  async mounted () {
    await this.getData()
    evt.on('main', async () => {
      await this.getData()
    })
    setInterval(async () => {
      await this.getData()
    }, 5000)
  }

  // mounted () {
  //   let count = 0;
  //   let length = transactionData.length
  //   this.timer = setInterval(() => {


  //     if (count >= 6) {
  //       this.list.unshift(errorDetailData[count])

  //       this.list = this.list.slice(0, 6)
  //     } else {
  //       this.list.push(errorDetailData[count])
  //     }
  //     this.paperId = this.list[0].id
  //     count++

  //     console.log('this.paperId', this.paperId);
  //     if (count >= length) {
  //       this.timer && clearInterval(this.timer)
  //     }
  //   }, 2000)
  // },
  // beforeDestroy () {
  //   this.timer && clearInterval(this.timer)
  // }
  /*  watch: {
     'listFrom2': {
       handler: function (newV) {
         console.log('newV', newV);
         this.list = newV
       },
       immediate: true
     }
   } */
}
</script>
 
<style lang="scss" scoped>
.error-list {
  overflow-y: hidden;
  background-color: #091629;

  margin-top: 20px;
  height: calc(50% - 30px);
  padding: 20px;
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
      .title,
      .date,
      .file,
      .status {
        color: #74fbf5;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 14px;
        width: 20%;
      }

      .status {
        width: 28%;
      }
      .date {
        width: 10%;
        text-align: right;
      }
      .file {
        width: 28%;
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