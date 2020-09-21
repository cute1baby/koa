<template>
    <div id="app">
        <Header />
        <router-view/>
    </div>
</template>

<script>
import Header from '@/components/Header'
export default {
    name: 'App',
    components: {
        Header
    }
}
</script>

<style>
html,body{
    width: 100%;
    height: 100%;
    background: #ECF0F5;
}
#app {
    height: 100%;
    font-family: "PingFangSC-Regular", "PingFang SC", "Microsoft YaHei",
        "WenQuanYi Micro Hei", sans-serif;
    background: #ECF0F5;
}
</style>
