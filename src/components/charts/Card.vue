<template>
  <el-card shadow="never">
    <div class="wrapper">
      <div class="icon">
        <i :class="['iconfont',iconClass]"></i>
      </div>

      <div class="info">
        <div class="word">{{number}}</div>
        <div class="word">{{word}}</div>
      </div>
    </div>
  </el-card>
</template>
 
<script>
export default {
  props: ['iconClass', 'number', 'word'],


  data () {
    return {
    }
  }
}
</script>
 
<style lang="scss" scoped>
.el-card {
  background: rgb(28, 46, 90);
  width: 20%;
  .wrapper {
    display: flex;
    align-items: center;

    font-size: 14px;
    .iconfont {
      color: #339c9c;
      font-size: 36px;
    }
    .info {
      margin-left: 20px;
      color: rgb(26, 154, 223);
      font-size: 18px;
      div:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
}
</style>