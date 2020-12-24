<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body{
    width: 100%;
    height: 100%;
    font-family: "PingFangSC-Regular", "PingFang SC", "Microsoft YaHei",
    "WenQuanYi Micro Hei", sans-serif;
    font-size: 12px;
    background: #F5F5F5;
}

/* 单独拎出来#app为了配合回到首页的问题 */
#app {
    width: 100%;
    height: 100%;
    /* 这里给app一个滚动效果 */
    /* overflow-y: scroll; */
}
/* 修改elementui组件的样式 */
.el-select .el-input__inner:focus, .el-select .el-input.is-focus .el-input__inner, .el-input__inner:focus{
    border-color: #06609A;
}
.el-select-dropdown__item.selected{
    color: #06609A;
}
/* 分页样式 */
.el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #06609A;
}
/* 回到顶部 */
/* .el-backtop, .el-calendar-table td.is-today{
    color: #06609A;
} */
</style>
