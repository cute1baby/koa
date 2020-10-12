<template>
<div>
    <div class="home">
        <div class="home_fixed">
            <div class="taglist df dfaic">
                <p class="back df dfaic" @click="routerPath('/my')">
                    <i class="iconfont">&#xe611;</i>
                    返回个人主页
                </p>
                <ul class="navlist df dfaic df1">
                    <li class="active df dfaic">个人资料</li>
                </ul>
                <!-- <span 
                    class="tagmanager"
                    @click="routerPath('/tagManage')"
                >标签管理</span> -->
            </div>
        </div>
    </div>

    <div class="container df">
        <div class="left df1">
            <div class="sub-view-box">
                <h3>个人资料</h3>
                <ul class="setting-list">
                    <li class="item df dfaic">
                        <span class="title">头像</span>
                        <div class="avatar-uploader df">
                            <input 
                                type="file"
                                id="avatarInputUp"
                                style="display: none;"
                                @change="avatarFileChange"
                            >
                            <img 
                                class="avatar" 
                                :src="userInfo.avatar" 
                                alt="" />
                            <div class="action-box">
                                <span class="hint">支持 jpg、png、jpeg 格式大小 5M 以内的图片</span>
                                <button 
                                    class="upload-btn"
                                    @click="uploadAvatar"
                                >点击上传</button>
                            </div>
                        </div>
                    </li>
                    <li class="item df dfaic">
                        <span class="title">用户名</span>
                        <div class="input-box df1 df">
                            <input 
                                type="text" 
                                v-model="userInfo.username" 
                                class="input df1" 
                                placeholder="填写你的用户名"
                                @focus="isEditIndex=1"
                            >
                            <div class="action-box">
                                <div v-if="isEditIndex===1">
                                   <span 
                                        class="confirm-btn"
                                        @click="saveUser('username', userInfo.username)"      
                                    >保存</span> 
                                   <span class="cancel-btn" @click="isEditIndex=0">取消</span> 
                                </div>
                                <p 
                                    v-else
                                    class="edit-btn" 
                                    @click="isEditIndex=1"
                                >
                                    <i class="iconfont">&#xe6e5;</i>修改
                                </p>
                            </div>
                        </div>
                    </li>
                    <li class="item df dfaic">
                        <span class="title">职位</span>
                        <div class="input-box df1 df">
                            <input 
                                type="text" 
                                v-model="userInfo.position" 
                                class="input df1" 
                                placeholder="填写你的职位"
                                @focus="isEditIndex=2"
                            >
                            <div class="action-box">
                                <div v-if="isEditIndex===2">
                                   <span 
                                        class="confirm-btn"
                                        @click="saveUser('position', userInfo.position)"     
                                    >保存</span> 
                                   <span class="cancel-btn" @click="isEditIndex=0">取消</span> 
                                </div>
                                <p 
                                    v-else
                                    class="edit-btn" 
                                    @click="isEditIndex=2"
                                >
                                    <i class="iconfont">&#xe6e5;</i>修改
                                </p>
                            </div>
                        </div>
                    </li>
                    <li class="item df dfaic">
                        <span class="title">公司</span>
                        <div class="input-box df1 df">
                            <input 
                                type="text" 
                                v-model="userInfo.company" 
                                class="input df1" 
                                placeholder="填写你的公司"
                                @focus="isEditIndex=3"
                            >
                            <div class="action-box">
                                <div v-if="isEditIndex===3">
                                   <span 
                                        class="confirm-btn"
                                        @click="saveUser('company', userInfo.company)"     
                                    >保存</span> 
                                   <span class="cancel-btn" @click="isEditIndex=0">取消</span> 
                                </div>
                                <p 
                                    v-else
                                    class="edit-btn" 
                                    @click="isEditIndex=3"
                                >
                                    <i class="iconfont">&#xe6e5;</i>修改
                                </p>
                            </div>
                        </div>
                    </li>
                    <li class="item df dfaic">
                        <span class="title">个人介绍</span>
                        <div class="input-box df1 df">
                            <input 
                                type="text" 
                                v-model="userInfo.selfIntroduction" 
                                class="input df1" 
                                placeholder="填写职业技能、擅长的事情、喜欢的事情等"
                                @focus="isEditIndex=4"
                            >
                            <div class="action-box">
                                <div v-if="isEditIndex===4">
                                   <span 
                                        class="confirm-btn"
                                        @click="saveUser('selfIntroduction', userInfo.selfIntroduction)"     
                                    >保存</span> 
                                   <span class="cancel-btn" @click="isEditIndex=0">取消</span> 
                                </div>
                                <p 
                                    v-else
                                    class="edit-btn" 
                                    @click="isEditIndex=4"
                                >
                                    <i class="iconfont">&#xe6e5;</i>修改
                                </p>
                            </div>
                        </div>
                    </li>
                    <li class="item df dfaic">
                        <span class="title">个人主页</span>
                        <div class="input-box df1 df">
                            <input 
                                type="text" 
                                v-model="userInfo.homepage" 
                                class="input df1" 
                                placeholder="填写你的个人主页"
                                @focus="isEditIndex=5"
                            >
                            <div class="action-box">
                                <div v-if="isEditIndex===5">
                                   <span 
                                        class="confirm-btn"
                                        @click="saveUser('homepage', userInfo.homepage)"    
                                    >保存</span> 
                                   <span class="cancel-btn" @click="isEditIndex=0">取消</span> 
                                </div>
                                <p 
                                    v-else
                                    class="edit-btn" 
                                    @click="isEditIndex=5"
                                >
                                    <i class="iconfont">&#xe6e5;</i>修改
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="right">
        </div>
    </div>
</div>

</template>
<script>
import {mapState} from 'vuex'
import {responseStatus} from '@/config' 
import axios from '@/utils/fetch'
export default {
    data(){
        return {
            isEditIndex: 0,

        }
    },
    computed:{
        ...mapState(['userInfo'])
    },
    methods:{
        routerPath(path, query){
            this.$router.push({path, query})
        },
        // handleBlur(e){
        //     console.log('e====', e)
        //     this.isEditIndex = 0
        // },
        uploadAvatar(){
            const avatarInputUp = document.getElementById('avatarInputUp')
            avatarInputUp.click()
        },
        avatarFileChange(file){
            console.log(file.target.files)
        },
        // 保存个人信息
        saveUser(key, value){
            const { userId } = this.userInfo
            const val = this.userInfo[key]
            // if(val === value){
            //     return
            // }
            axios.post('/juejin/saveBaseUserInfo', {
                userId,
                label: key,
                value
            }).then(res => {
                const {status} = res.data
                if(status === responseStatus){
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                    
                }
            }).catch(err => {
                console.log('修改个人信息接口出现问题：' + err)
            })
        }
    }
}
</script>
<style lang="less" scoped>
@active: #007fff;
.home {
  height: 3.833rem;
  margin-bottom: 2rem;
  .home_fixed {
    position: fixed;
    left: 0;
    top: 5rem;
    z-index: 4;
    width: 100%;
    height: 3.833rem;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    color: #909090;
    .taglist {
      max-width: 960px;
      height: 100%;
      margin: auto;
      .back{
            height: 100%;
            padding-right: 1rem;
            font-size: 1.16rem;
            color: #71777c;
            cursor: pointer;
            vertical-align: middle;
            .iconfont{
                margin-top: 2px;
                vertical-align: middle;
            }
            &:hover{
                color: @active;
            }
      }
      .navlist {
          height: 100%;
          li{
            height: 100%;
            padding: 0 1rem;
            font-size: 1.16rem;
            color: #71777c;
            cursor: pointer;
          }
          .active{
                color: @active;
            }
      }
      .tagmanager{
        font-size: 1.16rem;
        color: #71777c;
        cursor: pointer;
        &:hover{
            color: @active;
        }
      }
    }
  }
}

.container{
    margin: 1.767rem auto;
    height: 100%;
    max-width: 960px;
    // width: 960px;
    .left{
        .sub-view-box{
            position: relative;
            padding: 2.7rem 4rem 7rem;
            background-color: #fff;
            border-radius: 2px;
            h3{
                font-size: 2em;
                margin: .67em 0;
            }
            .setting-list{
                li{
                    padding: 2rem 0;
                    border-top: 1px solid #f1f1f1;
                    .title{
                        font-size: 1.2rem;
                        color: #333;
                        width: 10rem;
                    }
                    .avatar-uploader{
                        .avatar{
                            width: 6rem;
                            height: 6rem;
                            margin-right: 1rem;
                        }
                        .action-box{
                            margin-left: 1rem;
                            .hint{
                                display: block;
                                color: #909090;
                                font-size: 1rem;
                                margin-bottom: 1.5rem;
                            }
                            .upload-btn{
                                appearance: none;
                                background-color: #007fff;
                                color: #fff;
                                border-radius: 2px;
                                border: none;
                                padding: .5rem 1.3rem;
                                outline: none;
                                transition: background-color .3s,color .3s;
                                cursor: pointer;
                            }
                        }
                    }

                    .input{
                        display: inline-block;
                        border: none;
                        outline: none;
                        color: #909090;
                        font-size: 1.3rem;
                    }
                    .action-box{
                        margin-left: 1rem;
                        .edit-btn{
                            color: #007fff;
                            font-size: 1.2rem;
                            padding: 0;
                            white-space: nowrap;
                            cursor: pointer;
                            .iconfont{
                                margin-right: 0.2rem;
                            }
                        }
                        .confirm-btn{
                            font-size: 1.2rem;
                            color: #007fff;
                            margin-right: 10px;
                            cursor: pointer;
                        }
                        .cancel-btn{
                            font-size: 1.2rem;
                            color: #666;
                            margin-left: 10px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
    .right{
        flex-basis: 20rem;
        margin-left: 2rem;   
    }
}

.input-box .input::-webkit-input-placeholder {
  color: #D4D4D4;
}
.input-box .input:-moz-placeholder {/* Firefox 18- */
  color: #D4D4D4;
}
.input-box .input::-moz-placeholder{/* Firefox 19+ */
 color: #D4D4D4;
}
.input-box .input:-ms-input-placeholder {
  color: #D4D4D4;
}
</style>