<template>
  <div class="header">
    <div class="wrapper">
      <div class="title">
        <div class="point"></div>
        <div class="text">数据流动检测系统</div>
      </div>
      <div class="nav-list" @click="navJump">
        <div class="nav-item" :class="['nav-item',navIndex === 0?'green':'']" data-item="0">首页</div>
        <div class="nav-item" :class="['nav-item',navIndex === 1?'green':'']" data-item="1">数据交换</div>
        <div class="nav-item" :class="['nav-item',navIndex === 2?'green':'']" data-item="2">数据预警</div>
        <div class="nav-item" :class="['nav-item',navIndex === 3?'green':'']" data-item="3">数据追踪</div>
        <div class="nav-item" :class="['nav-item',navIndex === 4?'green':'']" data-item="4">用户权限</div>
      </div>
    </div>

    <div class="btn">
      <el-button type="danger" size="mini" @click="refresh">刷新</el-button>
    </div>
  </div>
</template>
 
<script>
import {evt } from '@/event'
export default {
  data () {
    return {
      navIndex: 0
    }
  },
  methods: {
    navJump (e) {
      if (e.target.dataset.item === '0') {

        this.$router.push('/')
      } else if (e.target.dataset.item === '1') {
        this.$router.push('/transaction')
      } else if (e.target.dataset.item === '2') {
        this.$router.push('/error')
      }
      else if (e.target.dataset.item === '3') {
        this.$router.push('/trace')
      }
      else if (e.target.dataset.item === '4') {
        this.$router.push('/userrole')

      }
    },
    refresh () {
      evt.emit('main')
    }


  },
  watch: {
    $route: {
      handler: function (newV) {
        if (newV.name === 'main') {
          this.navIndex = 0
        } else if (newV.name === 'error') {
          this.navIndex = 2

        } else if (newV.name === 'trace') {
          this.navIndex = 3

        } else if (newV.name === 'transaction') {
          this.navIndex = 1

        } else if (newV.name === 'userrole') {
          this.navIndex = 4

        }

      }



    },
    immediate: true
  }

}

</script>
 
<style lang="scss" scoped>
.header {
  height: 60px;
  display: flex;
  align-items: center;
  color: white;
  width: 100%;
  justify-content: space-between;
  .wrapper {
    height: 60px;
    display: flex;
    align-items: center;
    .title {
      display: flex;
      align-items: center;
      .point {
        margin-left: 20px;

        width: 6px;
        border-radius: 50%;
        height: 6px;
        background: white;
      }
      .text {
        margin-left: 20px;
      }
      font-size: 18px;
      letter-spacing: 1px;
    }
    .nav-list {
      margin-left: 30px;
      display: flex;
      font-size: 14px;

      align-items: center;
      .nav-item {
        margin-right: 20px;
        cursor: pointer;
        &.green {
          color: #0be9f0;
        }
      }
    }
  }
  .btn {
    margin-right: 20px;
  }
}
</style>