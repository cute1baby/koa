<template>
<div>
    <h3 class="title df dfaic dfjbw">
        个人资源管理
        <span class="newAdd" @click="newCrerate">新增数据</span>
    </h3>
    <!-- 表格 -->
    <div class="code_table">
        <el-table
            :data="tableData"
            lazy
            style="width: 100%"
        >
            <el-table-column
                label="资源标题"
            >
                <template slot-scope="scope">
                    <span class="code_base">{{ scope.row.resourceTitle}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="资源描述"
            >
                <template slot-scope="scope">
                    <span class="code_base">{{ scope.row.resourceDesc || '-'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="链接地址"
                width="180"
            >
                <template slot-scope="scope">
                    <span class="code_base">{{ scope.row.address || '-'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="所属类型"
                width="100"
            >
                <template slot-scope="scope">
                    <span class="code_base">{{ scope.row.belongType}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="资源图片"
                width="140"
            >
                <template slot-scope="scope">
                    <el-image 
                        class="code_img"
                        style="width: 100px; height: 100px"
                        :src="scope.row.resourceImg"
                        :preview-src-list="[scope.row.resourceImg]"
                    >
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                width="80"
            >
                <template slot-scope="scope">
                    <div class="df dfc">
                        <el-button
                            class="btn_details"
                            @click="handleDetails(scope.row)"
                        >编辑</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="code_pagination df dfjend">
            <el-pagination
                background
                layout="total, prev, pager, next"
                :current-page.sync="pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                :total="total"
                :pager-count="5"
                @current-change="handleCurrentChange"  
            >
            </el-pagination>
        </div>
        
    </div>
</div>

</template>

<script>
import {hostAddress} from '@/config/index.js'
import axios from '@/utils/fetch'
export default {
    data(){
        return {
            loading: false,
            tableData: [
                {
                    id: 1,
                    resourceTitle: '资源标题',
                    resourceDesc: '随便写点东西描述，随便写点东西描述',
                    address: 'http://www.baidu.com',
                    belongType: 1,
                    resourceImg: ''
                }
            ],
            pageNum: 1, // 当前页数
            pageSize: 20, // 每页显示条目个数
            total: 0, // 总条目数
        }
    },
    created(){
        this.initData()
    },
    methods: {
        initData(){
            console.log('初始化数据')
            // const {pageNum, pageSize } = this
            // this.loading = true
            // axios.get(hostAddress + '/wechat/wechat.info/list', {
            //     params: {
            //         id: '',
            //         wechatName: '',
            //         page: pageNum,
            //         limit: pageSize
            //     }
            // })
            // .then((res) => {
            //     const data = res.data;
            //     if(res.status === 200){
            //         if(!data.code){
            //             this.loading = false
            //             this.wechatList = data.data
            //         }
            //     }
            // })
            // .catch((error) => {
            //     console.log('获取公众号列表出错：' + error);
            // })
        },
        // 新增
        newCrerate(){
            // 跳转到公众号新增
            this.routerPath('/home/wechat/new')
        },
        // 点击其中的某一个公众号
        selectWechat(w){
            const query = {
                wechatName: w.wechat_name || '',
                wechatNameActor: w.wechat_name_actor || '',
                appId: w.app_id || '',
                appSecret: w.app_secret || '',
                encodingAesKey: w.encoding_aes_key || '',
                qrcodeImg: w.qrcode_img || ''
            }
            // 跳转到公众号的编辑
            this.routerPath(`/home/wechat/${w.id}`, query)
        },
        routerPath(path, query){
            this.$router.push({path, query})
        },
        handleDetails(item){
            console.log('编辑>>>>')
        },
        // 分页切换
        handleCurrentChange(){
            console.log('分页切换')
        }
    }
}
</script>

<style lang="less" scoped>
.title{
    font-size: 20px;
    font-weight: bold;
    color: #111C2A;
    margin: 10px 0 20px;
    .newAdd{
        font-size: 14px;
        color: #fff;
        padding: 6px 10px;
        border-radius: 4px;
        background: #06609A;
        cursor: pointer;
    }
}
// 列表
.code_table{
    margin-top: 26px;
    overflow: hidden;
    padding: 24px;
    background: #fff;
    /deep/ .el-table {
        thead{
            tr{
                th{
                    height: 80px;
                    padding: 0;
                    font-size: 14px;
                    text-align: center;
                    background: #ECF0F5;
                    box-sizing: border-box;
                    .cell{
                        color: #333;
                        font-weight: 600;
                    }
                }
            }
        }
        tbody{
            tr{
                td{
                    text-align: center;
                    .cell{
                        padding: 0 3px;
                        height: 60px !important;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .code_base{
                            font-size: 14px;
                            color: #111C2A;
                            line-height: 1.2;
                        }
                        .inputNum{
                            .el-input__inner{
                                height: 30px;
                                line-height: 30px;
                            }
                        }
                        .label{
                            margin-top: 3px;
                            font-size: 12px;
                            color: #6B747C;
                            label{
                                color: #000;
                            }
                        }
                        .clue{
                            font-size: 14px;
                            color: #06609A;
                        }
                        .link_btn{
                            margin-top: 3px;
                            padding: 0 6px;
                            height: 24px;
                            border: 0;
                            outline: 0;
                            border-radius: 24px;
                            color: #fff;
                            font-size: 12px;
                            background: #DAA487;
                            cursor: pointer;
                        }
                        .going{
                            font-size: 14px;
                            color: #DAA487;
                        }
                        .ended{
                            font-size: 14px;
                            color: #6D767E;
                        }
                        .shopcart{
                            font-size: 24px;
                            color: #06609A;
                            position: relative;
                            margin-right: 18px;
                            cursor: pointer;
                            span{
                                position: absolute;
                                top: -6px;
                                right: -6px;
                                font-size: 12px;
                                color: #fff;
                                width: 16px;
                                height: 16px;
                                background: #E15E5D;
                                border-radius: 50%;
                            }
                        }
                        .btn_details{
                            width: 52px;
                            height: 36px;
                            background: #06609A;
                            border-color: #06609A;
                            font-size: 14px;
                            color: #fff;
                            padding: 0;
                            &:hover{
                                border-color: #03578e;
                                background: #03578e;
                            }
                        }
                        .user_details{
                            width: 40px;
                            height: 36px;
                            background: #E2AD87;
                            border-color: #E2AD87;
                            font-size: 14px;
                            color: #fff;
                            padding: 0;
                            &:hover{
                                border-color: #f5b485;
                                background: #f5b485;
                            }
                        }
                    }
                }
                &:last-child{
                    td{
                        border: none;
                    }
                }
            }
            // 已过期和已关闭
            .isEnded td .cell span{color: #999;}
            .isEnded td .cell .btn_details span{color: #fff;}
        }
        &::before{
            height: 0;
        }
    }
}
</style>