<template>
    <div>
        <div class="py-5 text-center">
            <img class="d-block mx-auto mb-4" src="../assets/images/sequelize.jpg" />
            <p class="lead">
                爱就好比骑马和学法语，如果不趁年轻时学会，以后想学会就难了。
            </p>
            <p class="lead">
                Love is like riding or speaking French,if you don not learn it young, it's hard to get the trick of it
                later.
            </p>
            <!-- 人这一生，总要心碎一两次的。

                We must have our heart broken once or twice before we are done.
                世事无常，我们要随遇而安。

                It just happens, and we should live with it.

                人生就是不断收集回忆的过程，最终陪伴我们的也只有回忆了。

                The business of life is the acquisition of memories.In the end that's all there is.

                亲爱的，人生总是会遇到各种麻烦，我们得尽力去解决它。
                My dear, all life is a series of problems which we must try and solve.

                没有翻不了的山，没有沉不了的船。
                Every mountain is unclimbable until someone climbs it.Every ship is unsinkable until it sinks.

                世道变了，我们也得跟着变。

                The world moves on, and we must move with it.

                当坏事发生时，仍希望未发生过是毫无意义的，当务之急是减少损失。

                When something bad happens,there is no point in wishing it had not happened.The only option is to minimize the damage.
                每种生活都有它自己的规矩，如果你不愿意遵守，那么这种生活就不适合你。 -->
        </div>

        <div class="heading text-right mb">
            <div v-if="userInfo.username">
                <a href="">{{userInfo.username}}</a>
                <span> | </span>
                <a href="" @click.prevent="login">退出</a>
            </div>
            <div v-else>
                <a href="" @click.prevent="register">注册</a>
                <span> | </span>
                <a href="" @click.prevent="login">登录</a>
            </div>
        </div>

        <modal :show="modalName == 'register'" @close="modalClose" title="注册">
            <form>
                <div class="form-group row">
                    <label for="username" class="col-md-3 col-form-label">用户名</label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" id="username" placeholder="用户名" v-model="reg.username" />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password" class="col-md-3 col-form-label">密码</label>
                    <div class="col-md-9">
                        <input type="password" class="form-control" id="password" placeholder="密码" v-model="reg.password" />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="repassword" class="col-md-3 col-form-label">重复密码</label>
                    <div class="col-md-9">
                        <input type="password" class="form-control" id="repassword" placeholder="重复密码" v-model="reg.repassword" />
                    </div>
                </div>
            </form>

            <template slot="footer">
                <button type="button" class="btn btn-primary" @click="registerSubmit">注册</button>
                <button type="button" class="btn btn-secondary">取消</button>
                <a href="javascript:;">我有账号，立即登录</a>
            </template>
        </modal>


        <modal :show="modalName == 'login'" @close="modalClose" title="登录">
            <form>
                <div class="form-group row">
                    <label for="username" class="col-md-3 col-form-label">用户名</label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" id="username" placeholder="用户名" v-model="log.username" />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password" class="col-md-3 col-form-label">密码</label>
                    <div class="col-md-9">
                        <input type="password" class="form-control" id="password" placeholder="密码" v-model="log.password" />
                    </div>
                </div>
            </form>

            <template slot="footer">
                <button type="button" class="btn btn-primary" @click="loginSubmit">登录</button>
                <button type="button" class="btn btn-secondary">取消</button>
                <a href="">我有账号，立即登录</a>
            </template>
        </modal>

    </div>
</template>

<script>
import axios from 'axios'
import Modal from './modal/Modal'
import { userInfo } from 'os';
import { log } from 'async';

export default {
    data() {
        return {
            userInfo: {
                uid: 0,
                username: ''
            },
            modalName: '',
            reg: {
                username: '',
                password: '',
                repassword: ''
            },
            log: {
                username: '',
                password: ''
            }
        }
    },

    created() {
        // console.log(document.cookie)

        // 从cookie中获取用户信息
        console.log('cookie===', document.cookie);

        if(document.cookie){
            let arr1 = document.cookie.split('; ');
            arr1 = arr1.map( item => {
                let arr2 = item.split('='); //['uid', 1]
                return {
                    [arr2[0]]: arr2[1]
                }
            });
            let cookie = Object.assign({}, ...arr1);
            console.log(cookie)

            this.userInfo.username = decodeURIComponent(cookie.username);
        }

    },

    components: {
        Modal
    },

    methods: {
        register() {
            this.modalName = 'register';
        },

        login() {
            this.modalName = 'login';
        },

        modalClose() {
            this.modalName = '';
        },

        registerSubmit() {
            // console.log(this.reg);

            axios({
                method: 'post',
                url: '/api/register',
                data: this.reg
            }).then( res => {
                if (res.data.code) {
                    alert(res.data.msg)
                } else {
                    alert(res.data.msg)
                    this.modalName = 'login'
                }
            } );
        },

        loginSubmit() {
            axios({
                method: 'post',
                url: '/api/login',
                data: this.log
            }).then( res => {
                console.log(res)
                if (res.data.code) {
                    alert(res.data.msg)
                } else {
                    this.modalName = ''
                    this.userInfo.uid = res.data.data.id;
                    this.userInfo.username = res.data.data.username;
                }
            } );
        }
    }

}
</script>
