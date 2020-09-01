<template>
    <div class="test">
        <pre v-html='imgUrlStr' v-lazy-container='{ selector: "img" }'></pre>
    </div>
</template>
<script>
export default {
    data(){
        return {
            imgurls: [
                '<img src="//gravatar.com/avatar/e878ca28b8d577e9278e49723c06f5b0?size=48"/>',
                '<img src="https://avatars2.githubusercontent.com/u/26423749?v=4&s=120"/>',
                '<img src="https://avatars1.githubusercontent.com/u/31389080?v=4&s=120"/>',
                '<img src="https://avatars2.githubusercontent.com/u/15188309?v=4&s=120"/>',
                '<img src="//gravatar.com/avatar/e43c3648ba7049e521009b4b73126005?size=48"/>',
                '<img src="https://avatars2.githubusercontent.com/u/31213919?v=4&s=120"/>',
                '<img src="https://avatars0.githubusercontent.com/u/48469369?v=4&s=120"/><span>11</span>',
                '<img src="https://avatars2.githubusercontent.com/u/26917599?v=4&s=120"/>"/><span>22</span>',
                '<img src="https://avatars2.githubusercontent.com/u/38983466?v=4&s=120"/>',

            ],
            imgUrlStr: ''
        }
    },
    created(){
        let regex3 = new RegExp(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi);
        const imgUrlStr = this.imgurls.join('')
        let newUrl = imgUrlStr.replace(regex3, function (match, capture) {
            // console.log('====匹配的值', match, capture)
            return '<img data-src='+ capture +' />'
        })
        this.imgUrlStr = newUrl
        console.log('new==', newUrl)
    }
}
</script>

<style lang="scss" scoped>
.test{
    pre{
        overflow: hidden;
        >>> img{
            width: 100%;
            max-width: 100%;
            display: block;
            float: left;
        }
    }
}

</style>