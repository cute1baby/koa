<template>
    <div class="outter df">
        <div class="inner">
            <div class="con df dfjbw dfaic">
                <router-link to='/home'>
                    <img src="../assets/img/logo.png" alt="" class="logo">
                </router-link>
                <div class="user" v-if="userName">
                    <span class="name">{{userName}}</span>
                    <span class="logout" @click="logout">退出</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import axios from '@/utils/fetch'
import Cookies from 'js-cookie'
const ERR_OK = 200;
export default {
    name: 'Header',
    data(){
        return {
            userName: ''
        }
    },
    created(){
        const userName = Cookies.get('userName') || '';
        this.userName = userName
        this.SET_USERINFO({name: userName})
    },
    methods: {
        ...mapMutations(['SET_USERINFO']),
        logout(){
            const that = this;
            const token = Cookies.get('LOGINKEY');
            axios.post('/v2/agent/auth/logout', {
                token
            })
            .then(function (res) {
                const data = res.data;
                if(res.status === ERR_OK){
                    if(!data.code){
                        that.$message({
                            message: '退出成功',
                            type: 'success'
                        });
                        Cookies.remove('LOGINKEY');
                        Cookies.remove('userName');
                        that.SET_USERINFO({})
                        that.$router.push('/login');
                    }
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.outter{
    width: 100%;
    height: 72px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    .inner{
        width: 100%;
        height: 72px;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        .con{
            // max-width: 1190px;
            height: 100%;
            background: #f8f8f8;
            margin: 0 auto;
            padding: 0 50px 0 42px;
            box-sizing: border-box;
            .logo{
                width: 150px;
                height: 40px;
                vertical-align: middle;
            }
            .user{
                font-size: 16px;
                .name{
                    color: #333;
                    margin-right: 16px;
                }
                .logout{
                    color: #999;
                    cursor: pointer;
                }
            }
        }
    }
    
}
</style>