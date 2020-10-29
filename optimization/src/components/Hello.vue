<template>
    <div>
        hello
        <van-button type="default">默认按钮</van-button>
        <van-button type="primary">主要按钮</van-button>
    </div>
</template>
<script>
import { Button } from 'vant';
export default {
    components: {
        'van-button': Button
    }
}
</script>