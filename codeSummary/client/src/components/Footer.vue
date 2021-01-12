<template>
<div class="app-footer">
    <p class="footer-main df dfc">ICP主体备案号: 京ICP备20015884号</p>
</div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
.app-footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: #fff;
    box-shadow: 0 0 18px rgba(0,0,0,.06);
    border-top: 1px solid hsla(210,8%,51%,.09);
    z-index: 10;
    .footer-main{
        height: 100%;
        margin: 0 auto;
        font-size: 14px;
        color: #1F2D3D;
    }
}

@media (min-width: 1500px){
    .app-footer{
        .footer-main{
            width: 1410px;
            min-width: 1410px;
        }
    }
}
@media (min-width: 1260px) and (max-width: 1500px){
    .app-footer{
        .footer-main{
            width: 1170px;
            min-width: 1170px;
        }
    }
}
@media (min-width: 992px) and (max-width: 1260px){
    .app-footer{
        .footer-main{
            width: 962px;
            min-width: 962px;
        }
    }
}
@media (min-width: 768px) and (max-width: 992px){
    .app-footer{
        .footer-main{
            width: 738px;
            min-width: 738px;
        }
    }
}
@media (max-width: 768px){
    .app-footer{
        width: 100%;
    }
}
</style>