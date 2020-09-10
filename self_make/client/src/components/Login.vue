<template>
  <el-dialog
    title="账号登录"
    :visible.sync="visible"
    class="login_dialog"
    width="320px"
    :before-close="handleClose"
  >
    <div class="form_sub">
        <el-input class="ipt" v-model="username" placeholder="请输入账号"></el-input>
        <el-input class="pwd" placeholder="请输入密码" v-model="password" show-password></el-input>
    </div>
    <el-button 
        type="primary" 
        class="l_submit"
        @click.native="submitData"
    >登  录</el-button>
  </el-dialog>

</template>
<script>
import axios from 'axios'
import Cookies from 'js-cookie'
export default {
    props: ['visible'],
    data(){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        handleClose(){
            this.$emit('closeModal')
        },
        validate(){
            const {username, password} = this
            if(!username.trim()){
                this.$message('请输入账号')
                return false
            }
            if(!password.trim()){
                this.$message('请输入密码')
                return false
            }
            return true
        },
        async submitData(){
            if(this.validate()){
                try {
                    const params = {
                        username: this.username,
                        password: this.password
                    }
                    const res = await axios.post('/api/login', params)
                    console.log('res====', res)
                } catch (error) {
                    console.log('登录接口出现错误：' + error)
                }
                
            }
        }
    }
};
</script>
<style lang="less" scoped>
.login_dialog{
    /deep/ .el-dialog__body{
        .ipt{
            margin-bottom: 1rem;
        }
        .pwd{
            margin-bottom: 16px;
        }
        .l_submit{
            width: 100%;
            background: #007fff;
            font-size: 14px;
        }
    }
}
</style>