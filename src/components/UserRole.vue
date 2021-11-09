<template>
  <div class="inner-wrapper">
    <div class="error-status">
      <div class="content-wrapper">
        <div class="selects">
          <div class="input-wrapper">
            <el-select
              v-model="value"
              placeholder="请选择channel"
              :style="{marginLeft:'40px'}"
              size="small"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input v-model="dataId" size="small" placeholder="操作对象" clearable></el-input>
          </div>
          <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
        </div>
        <div class="list">
          <div class="list-item green">
            <div class="txId">操作对象</div>
            <div class="operation">访问策略</div>

            <div class="user">包含用户</div>
            <div class="channel">所在channel</div>
          </div>
          <div
            class="list-item"
            v-for="(item,index) in list"
            :key="index"
            @click="handleClick(index)"
          >
            <div class="txId">{{item.dataid}}</div>
            <div class="operation overflow">{{item.optype}}</div>
            <div class="user overflow">
              <el-tag
                size="mini"
                effect="dark"
                v-for="user in item.users.split(',')"
                :key="user"
                :style="{marginLeft:'5px'}"
              >{{user}}</el-tag>
            </div>
            <div class="channel overflow">
              <el-tag size="mini" type="danger" effect="dark">{{item.channel}}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>

// import { getUserRole } from '@/service/api'
import { roleData } from '@/components/mock'
export default {

  data () {
    return {
      options: [{
        value: 'channel1',
        label: 'channel1'
      }, {
        value: 'channel2',
        label: 'channel2'
      }, {
        value: 'channel3',
        label: 'channel3'
      }, {
        value: 'channel4',
        label: 'channel4'
      }],
      value: '',
      list: [],
      dataId: ''


    }
  },
  methods: {
    formateDate (date) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' })
    },
    async getData () {
      // const res = await getUserRole()
      this.list = roleData
    },
    search () {

      this.list = roleData.filter(item => {
        if (this.dataId === '') {
          return item
        } else {
          return item.dataid === this.dataId
        }
      }).filter(item => {
        console.log('this.value', this.value);
        if (this.value === '') {
          return item
        } else {
          return item.channel === this.value
        }
      })

    }
  },
  async mounted () {
    await this.getData()


  }


}
</script>
 
<style lang="scss" scoped>
.inner-wrapper {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  .error-status {
    width: 90%;
    margin-left: 40px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;

    /* background: #0f1c39; */
    height: calc(100% - 20px);
    /*  height: 100%; */
    .content-wrapper {
      padding-top: 20px;
      padding-left: 20px;
      .selects {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .input-wrapper {
          display: flex;
          align-items: center;
          .el-input {
            margin-left: 20px;
            width: 200px;
          }
        }
      }
      .list {
        /* background-color: #0f1c39; */
        padding-left: 10px;
        box-sizing: border-box;
        height: 80%;
        color: gray;
        margin-top: 20px;
        .list-item {
          display: flex;
          border-bottom: 1px solid gray;
          height: 10%;
          box-sizing: border-box;
          padding: 16px 20px 16px 0;
          align-items: center;
          .txId,
          .user,
          .channel,
          .operation {
            color: white;
            //flex: 1;
            // height: 12.5%;

            text-align: center;
            font-size: 14px;
            letter-spacing: 1px;
            width: 25%;
          }
          .status {
            width: 15%;
          }
          .user {
            width: 35%;
          }
          .overflow {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &:nth-child(odd) {
            background: #316197;
          }
          &:nth-child(even) {
            background: #233b57;
          }
          &.green div {
            color: #0be9f0 !important;
          }
        }
      }
    }
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
/deep/ .el-select {
  margin-left: 10px !important;
}
/deep/ .el-input__inner {
  color: white;
  /* width: 140px; */
}
</style>