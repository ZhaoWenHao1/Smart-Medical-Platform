<template>
  <div class="main">
    <div class="left">
      <div class="cards">
        <Card :number="blockNumber" word="区块" iconClass="icon-qukuai"></Card>
        <Card :number="transactionNumber" word="交易" iconClass="icon-jiaoyijilu"></Card>
        <Card :number="errorNumber" word="预警" iconClass="icon-yujing"></Card>
        <Card :number="100" word="用户" iconClass="icon-subscriber-fill"></Card>
        <Card :number="8" word="链码" iconClass="icon-groupsets_"></Card>
      </div>
      <div class="left-bottom">
        <div class="left2">
          <Block></Block>

          <transaction></transaction>
        </div>
        <div class="right2">
          <trans-list></trans-list>
        </div>
      </div>
    </div>
    <div class="right">
      <error-list></error-list>

      <category-user></category-user>
    </div>
  </div>
</template>
 
<script>
import Card from './charts/Card.vue'
import Block from './charts/Block.vue'
import Transaction from './charts/Transaction.vue'
import ErrorList from './charts/ErrorList.vue'
import TransList from './charts/TransList.vue'
import CategoryUser from './charts/CategoryUser.vue'
export default {
  components: { Card, Block, Transaction, ErrorList, TransList, CategoryUser },
  data () {
    return {
      blockNumber: 0,
      transactionNumber: 0,
      errorNumber: 0,
    }

  },
  mounted () {
    let count = 0
    let timer = setInterval(() => {
      this.transactionNumber = this.transactionNumber + 1
      count++

      if (count >= 200) {
        clearInterval(timer)
      }
    }, 2000)
    let timer2 = setInterval(() => {
      this.blockNumber = this.blockNumber + 1
      count++

      if (count >= 200) {
        clearInterval(timer2)
      }
    }, 5000)
    let timer3 = setInterval(() => {
      this.errorNumber = this.errorNumber + 1
      count++

      if (count >= 200) {
         clearInterval(timer3)
      }
    }, 3000)
  }
}
</script>
 
<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  height: calc(100% - 60px);
  .left {
    width: 70%;
    height: 100%;
    padding-bottom: 20px;
    box-sizing: border-box;
    .cards {
      height: 120px;
      display: flex;
      align-items: center;
      .el-card {
        margin-right: 20px;
        border: none !important;
      }
    }
    .left-bottom {
      height: calc(100% - 120px);
      display: flex;
      align-items: center;
      .left2 {
        width: 60%;
      }
      .right2 {
        width: 40%;
        height: 100%;
      }
    }
  }
  .right {
    width: 30%;
    height: 100%;
  }
}
</style>