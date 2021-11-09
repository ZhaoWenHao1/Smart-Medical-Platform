<template>
  <div class="inner-wrapper">
    <div class="error-status">
      <div class="content-wrapper">
        <div class="selects">
          <div class="input-wrapper">
            <el-date-picker
              v-model="time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              size="small"
            ></el-date-picker>
            <el-input v-model="dataId" size="small" placeholder="文件名" clearable></el-input>
          </div>
          <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
          <!-- <div class="button-wrapper">
            <el-radio-group v-model="radio1" size="mini">
              <el-radio-button label="跨域交易"></el-radio-button>
              <el-radio-button label="域内交易"></el-radio-button>
            </el-radio-group>
          </div>-->
        </div>
        <div class="list">
          <div class="list-item gray">
            <div class="txId">交易号</div>
            <div class="date">文件名</div>

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
            <div class="date overflow">{{item.dataId}}</div>
            <div class="user overflow">{{item.user}}</div>
            <div class="status overflow">
              <el-tag size="mini" type="info" effect="dark">{{item.status}}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="paper-detail">
      <tx-detail :paperId="paperId"></tx-detail>
    </div>
  </div>
</template>
 
<script>
import TxDetail from './TxDetail.vue'

/* import { transactionData } from './mock' */
/* console.log('tra', transactionData); */
// import { getTransactionData } from '@/service/api'
import { transactionData } from '@/components/mock'
import { evt } from '@/event'
export default {
  /*  inject: ['listFrom'], */
  components: {
    TxDetail
  },
  data () {
    return {
      paperId: 0,
      time: '',
      dataId: '',
      radio1: "跨域交易",
      list: [],
      canInterval: true

    }
  },
  methods: {
    formateDate (date) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' })
    },
    handleClick (id) {
      this.paperId = id
    },
    async getData () {
      const num = Math.random() * 10

      // const res = await getTransactionData()
      const res = transactionData.slice(num, num + 6)
      if (this.canInterval == false) this.canInterval = true
      this.list = res
      this.paperId = this.list[0].id
    },
    search () {
      if (this.dataId === '') {
        this.getData()
        return
      }
      this.list = transactionData.filter(item => {
        return item.dataId === this.dataId
      })
      this.paperId = this.list[0].id
    }
  },
  async mounted () {

    const dataId = this.$route.query.dataId
    if (dataId == null) {
      await this.getData()

    } else {
      this.dataId = dataId
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
  },

  /*   watch: {
      'listFrom': {
        handler: function (newV) {
          console.log('newV', newV);
          
          this.list = newV
        },
        immediate: true
      }
    } */
  // mounted () {
  //   // setInterval(() => {
  //   //   this.list = localStorage.getItem('transactionData')
  //   //   console.log('this.list', this.list);
  //   // }, 2000)
  //   let count = 0;
  //   let length = transactionData.length

  //   let timer = setInterval(() => {

  //     if (count >= 7) {
  //       this.list = this.list.slice(0, 7)
  //       this.list.unshift(transactionData[count])

  //     } else {
  //       this.list.push(transactionData[count])

  //     }
  //     if (count === 0) this.paperId = this.list[0].id


  //     count++

  //     console.log('this.paperId', this.paperId);
  //     if (count >= length) {
  //       clearInterval(timer)
  //     }
  //   }, 2000)
  // }


}
</script>
 
<style lang="scss" scoped>
.inner-wrapper {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;

  .error-status {
    width: 46%;
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
        justify-content: space-between;
        align-items: center;
        .input-wrapper {
          display: flex;
          align-items: center;
          .el-date-editor {
            width: 200px;
          }
          .el-input {
            margin-left: 20px;
            width: 200px;
          }
        }
        .button-wrapper {
          .el-tag {
            margin-right: 10px;
            font-size: 12px;
            cursor: pointer;
          }
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
          .status {
            width: 10%;
          }
          .txId {
            width: 40%;
          }
          .status {
            width: 10%;
          }
          .user {
            width: 40%;
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
}
</style>
<style lang="scss" scoped>
.el-tag--dark {
  background: #327088;
}
/deep/ .el-date-editor {
  background-color: #3e495d;
  width: 260px !important;
}
/deep/ .el-range-input {
  background-color: #3e495d !important;
  color: white;
  width: 100px !important;

  border: none;
}
/deep/ .el-input__inner {
  color: white;
  /* width: 140px; */
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
</style>