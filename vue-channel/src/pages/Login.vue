<template>
    <div class="container">
        <Header />
        <div class="login">
            <img src="https://sslfile.ichazuo.cn/1594111250391247.png" alt="" class="big_pic" />
            <div class="box">
                <h3 class="title">登录</h3>
                <el-form 
                    class="home_form"
                    :model="ruleForm" 
                    :rules="rules" 
                    ref="ruleForm"
                >
                    <el-col>
                        <el-form-item prop="userName">
                            <!-- autocomplete="new-password" -->
                            <el-input
                                autocomplete="on"
                                v-model="ruleForm.userName"
                                placeholder="输入账号/手机号"
                                clearable
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="pass">
                            <el-input
                                autocomplete="on"
                                type="password"
                                v-model="ruleForm.pass"
                                placeholder="输入密码"
                                clearable
                            ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form>
            </div>

        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import { regMobile } from '@/utils/global';
import axios from '@/utils/fetch'
import Cookies from 'js-cookie'
import {mapMutations} from 'vuex'
const ERR_OK = 200;
export default {
    name: 'Login',
    data () {
        const validateUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号/手机号'));
            } else {
               callback(); 
            }
        }
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        }
        return {
            ruleForm: {
                userName: '',
                pass: ''
            },
            rules: {
                userName: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        
    },
    methods: {
        ...mapMutations(['SET_USERINFO']),
        submitForm(formName) {
            const that = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    that.login()
                } else {
                    console.log('提交参数错误');
                    return false;
                }
            });
        },
        login() {
            const {userName, pass} = this.ruleForm;
            const that = this
            const resetForm = {
                userName: '',
                pass: ''
            }
            axios.post('/v2/agent/auth/login', {
                user_name: userName.trim(),
                password: pass.trim()
            })
            .then(function (res) {
                const data = res.data;
                if(res.status === ERR_OK){
                    that.ruleForm = resetForm
                    // if(data.code === 1001 || data.code === 1003){
                    //     return that.$message({
                    //         message: data.msg,
                    //         type: 'error'
                    //     });
                    // }

                    if(!data.code){
                        const token = data.data.token;
                        const name = data.data.name;
                        that.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        that.SET_USERINFO({name})
                        // 存储七天
                        Cookies.set('LOGINKEY', token, { expires: 7 })
                        Cookies.set('userName', name, { expires: 7 })
                        that.$router.push('/home');
                    }
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
            
        }
    },
    components: {
        Header
    }
}
</script>


<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100%;
    .login{
        margin: 64px auto 24px;
        width: 520px;
        .big_pic{
            width: 484px;
            display: block;
            margin: 0 auto 30px;
        }
        .box{
            width: 520px;
            background: #fff;
            padding: 60px 40px;
            border-radius: 6px;
            box-sizing: border-box;
            .title{
                font-size: 28px;
                font-weight: 600;
                color: #1F2D3D;
                text-align: center;
                margin-bottom: 60px;
            }
        }
        >>> .el-form-item{
            margin-bottom: 40px;
            label{
                color: #333;
            }
            input {
                font-size: 18px;
                color: #333;
                padding: 0;
                border: none;
                border-bottom: 1px solid #E9E9E9;
                border-radius: 0;
                background: transparent;
            }
        }
        
        >>> button{
            margin-top: 50px;
            width: 100%;
            height: 52px;
            font-size: 24px;
            background: #06609A;
            border-color: #06609A;
            &:active,
            &:hover{
                background: #03578e;
                border-color: #03578e;
            }
        }
    }
}

input::-webkit-input-placeholder{
    color: #8F98A6;
}
input::placeholder{
    color: #8F98A6;
}
</style>
