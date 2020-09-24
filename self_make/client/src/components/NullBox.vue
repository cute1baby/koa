<template>
    <!-- 空状态 -->
    <div class="empty-box df dfdir dfaic">
        <i class="iconfont">&#xe631;</i>
        <p class="empty-text">这里什么都没有</p>
    </div>
</template>
<style lang="less" scoped>
.empty-box{
    padding: 4rem 0;
    font-size: 1.167rem;
    font-weight: 500;
    color: #b2bac2;
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #fff;
    .iconfont{
        font-size: 7rem;
        color: #b2bac2;
    }
    .empty-text{
        margin-top: 1.2rem;
    }
}    
</style>