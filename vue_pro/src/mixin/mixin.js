export const mixin={
    data(){
        return {
            number:1,
            pageLimit: 20
        }
    },
    created(){
        console.log('在mixin中数据已经加载结束了')
    },
    methods:{
        demo1(){
            console.log("mixin混入对象")
        },
        getData(){
            console.log('获取mixin数据')
        }
    }
}