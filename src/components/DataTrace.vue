<template>
  <div class="data-trace">
    <div class="title">
      <el-input
        size="mini"
        v-model="fileNo"
        placeholder="文件标识"
        prefix-icon="el-icon-search"
        @keyup.enter.native="search"
        clearable
      ></el-input>
    </div>
    <div class="chart">
      <!-- <div class="block" v-for="(item,index) in list" :key="index" :style="blockStyle(index)">
        <template v-if="((index%5)===4)">
          <div class="rect">
            <div class="txId">Tx18732456</div>
            <div class="originChain word">源链</div>
            <div class="user word">用户</div>
            <div class="destChain word">目标链</div>
            <div class="hash word">数据哈希</div>
            <div class="operation word">操作类型</div>
          </div>
          <div class="icon">
            <i class="iconfont icon-xiajiantou-"></i>
          </div>
        </template>
        <template v-else-if="(Math.floor(index/5))%2===0">
          <div class="rect">
            <div class="txId">Tx18732456</div>
            <div class="originChain word">源链</div>
            <div class="user word">用户</div>
            <div class="destChain word">目标链</div>
            <div class="hash word">数据哈希</div>
            <div class="operation word">操作类型</div>
          </div>
          <div class="icon">
            <i class="iconfont icon-arrowRight"></i>
          </div>
        </template>

        <template v-else>
          <div class="icon">
            <i class="iconfont icon-arrowLeft-fill"></i>
          </div>
          <div class="rect">
            <div class="txId">Tx18732456</div>
            <div class="originChain word">源链</div>
            <div class="user word">用户</div>
            <div class="destChain word">目标链</div>
            <div class="hash word">数据哈希</div>
            <div class="operation word">操作类型</div>
          </div>
        </template>
      </div>-->
      <div class="block" v-for="(item,index) in list" :key="index" :style="blockStyle(index)">
        <div class="rect">
          <div class="txId">{{item.txId.slice(0,15)+'...'}}</div>
          <div class="originChain word">源链: {{item.src_channel}}</div>
          <div class="user word">用户: {{item.user}}</div>
          <div class="destChain word">目标链: {{item.des_channel}}</div>
          <div class="hash word">数据哈希: {{item.hashdata.slice(0,15)+'...'}}</div>
          <div class="operation word">操作类型: {{item.optype}}</div>
        </div>
        <div class="icon">
          <i class="iconfont icon-arrowRight" v-if="(index%5!==4) && index!==list.length-1"></i>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
/* import { transactionData } from './mock' */
import {getTransactionData} from '@/service/api'

export default {
  data () {
    return {
      fileNo: "",
      list: [

      ],
      transactionData:[]
    }
  },
  methods: {
    blockStyle (index) {




      let style = {
        left: (index % 5 * 240) + 'px',
        top: (Math.floor(index / 5) * 180) + 'px'

      }
      return style
    },
    search (e) {
      let str = e.target.value
      console.log('str', str);
      this.list = this.transactionData.filter(item => item.dataId == str)
    },
    async getData(){
      const res = await getTransactionData()
    this.transactionData = res.data
    }

  },
  async mounted(){
    await this.getData()

   setInterval(async ()=>{
    await this.getData()
    },5000)
  }
}
</script>
<style lang="scss" scoped>
.data-trace {
  padding-left: 60px;
  padding-right: 60px;
  box-sizing: border-box;
  margin-top: 20px;
  .title {
    .el-input {
      width: 140px;
    }
  }
  .chart {
    margin-top: 20px;
    position: relative;
    .block {
      position: absolute;
      display: flex;
      align-items: center;
      width: 240px;
      height: 140px;
      .rect {
        padding: 10px;
        box-sizing: border-box;
        width: 200px;
        height: 140px;
        background-color: #213566;
        color: #c0c4cc;
        font-size: 12px;
        .txId {
          color: #18a1df;
          height: 30px;
          font-size: 16px;
        }
        .word {
          height: 18px;
        }
      }
      .icon {
        height: 40px;
        width: 40px;
        .icon-arrowRight {
          font-size: 40px;
          color: #327088;
        }
        .icon-arrowLeft-fill {
          font-size: 40px;
          color: #327088;
        }
        .icon-xiajiantou- {
          font-size: 40px;
          color: #327088;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
/deep/ .el-input__inner {
  background-color: #3e495d;
  border: none;
  color: white;
}
</style>