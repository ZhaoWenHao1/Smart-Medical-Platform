<template>
  <div class="data-trace">
    <el-input
      size="medium"
      v-model="fileNo"
      placeholder="文件标识"
      prefix-icon="el-icon-search"
      @keyup.enter.native="search"
      clearable
    ></el-input>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      fileNo: ''
    }
  }
}
</script>
 
<style lang="scss" scoped>
/deep/ .el-input__inner {
  background-color: #3e495d;
  border: none;
  color: white;
  height: 48px !important;
  font-size: 18px;
  &::placeholder {
    letter-spacing: 1px;
    padding-left: 5px;
  }
}
/deep/ .el-input__icon {
  line-height: 48px;
  font-size: 18px;
}
.data-trace {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 60px);
  .el-input {
    width: 400px;
  }
}
</style>