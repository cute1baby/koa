<template>
<div>
    <h3 class="title df dfjbw">
        前端文章（视频）类型管理
        <div class="df dfaic">
            <span class="back" @click="$router.back()">返回上一步</span>
            <span class="newAdd add-btn" @click="handleModalChange">新增类型</span>
        </div>
    </h3>
    <div class="searchDiv df dfjend">
        <el-input class="searchIpt" v-model="typeName" maxlength='12' placeholder="输入类型标题"></el-input>
        <el-button type="primary" class="submit-btn" @click="searchData">搜索</el-button>
    </div>
    <!-- 表格 -->
    <div class="code_table">
        <el-table
            :data="tableData"
            v-loading="loading"
            lazy
            style="width: 100%"
        >
            <el-table-column
                label="序号"
                width="80"
            >
                <template slot-scope="scope">
                    <span class="code_base">{{ Number((pageNum-1)*pageSize + scope.row.index) + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="标题"
            >
                <template slot-scope="scope">
                    <span class="code_base">{{ scope.row.title || '-'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="创建时间"
                width="200"
            >
                <template slot-scope="scope">
                    <span class="code_base">{{ formatTimer(scope.row.createTime) || '-'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                width="120"
            >
                <template slot-scope="scope">
                    <div class="df dfc">
                        <el-button
                            class="delete-btn"
                            @click="handleDelete(scope.row)"
                        >删除</el-button>
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

    <!-- 浮窗 新增类型 -->
    <el-dialog 
        class="typeDialog"
        title="添加类型" 
        :visible.sync="typeVisible"
        top="4vh"
        width="400px" 
        append-to-body >
            <el-input v-model="addTypeTitle" maxlength='12' placeholder="添加类型"></el-input>
            <p class="df dfjend">
                <el-button type="primary" class="submit-btn" @click="saveType">提交</el-button>
            </p>
    </el-dialog>
</div>

</template>

<script>
import {hostAddress} from '@/config/index.js'
import axios from '@/utils/fetch'
import moment from 'moment'
export default {
    data(){
        return {
            loading: false,
            typeVisible: false,
            addTypeTitle: '',  // 添加类型标题
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
            typeName: '',  // 类型名称
            pageNum: 1, // 当前页数
            pageSize: 20, // 每页显示条目个数
            total: 0, // 总条目数
        }
    },
    created(){
        this.initTable()
    },
    methods: {
        handleModalChange(){
            this.typeVisible = !this.typeVisible
        },
        formatTimer(time){
            return moment(time).format("YYYY年MM月DD日 HH:mm:ss")
        },
        
        handleDelete(){
            console.log('删除》》》')
        },
        searchData(){
            this.pageNum = 1;
            this.initTable()
        },
        // 添加类型
        saveType(){
            const { addTypeTitle } = this
            if(!addTypeTitle){
                return this.$message('请输入类型标题')
            }
            axios.post('/qianduan/addArticleTypes', {
                title: addTypeTitle
            }).then(res => {
                const {status} = res.data
                if(!status){
                    this.addTypeTitle = ''
                    this.handleModalChange()
                    this.initTable()
                    this.$message({
                        type: 'success',
                        message: '类型添加成功'
                    })
                }
            }).catch(err => {
                console.log('新增文件（视频）类型接口出现问题：' + err)
            })
        },
        initTable(){
            const {pageNum, pageSize, typeName} = this
            this.loading = true
            axios.get('/qianduan/getArticleTypeList', {
                params: {
                    pageNum, 
                    pageSize, 
                    typeName
                }
            }).then(res => {
                const {status, data} = res.data
                this.loading = false
                if(!status){
                    const {counts, list} = data
                    this.total = counts
                    this.tableData = list.map((item, index) => {
                        return {
                            index,
                            ...item
                        }
                    })
                }
            }).catch(err => {
                console.log('获取类型列表接口出现问题：' + err)
            })
        },
        // 分页切换
        handleCurrentChange(val){
            this.pageNum = val;
            this.initTable();
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
    .back{
        font-size: 14px;
        color: #06609A;
        cursor: pointer;
    }
    .newAdd{
        margin-left: 20px;
        font-size: 14px;
        color: #fff;
        padding: 6px 10px;
        border-radius: 4px;
        cursor: pointer;
    }
}
.searchDiv{
    margin: 20px 0;
    .searchIpt{
        width: 200px;
        margin-right: 10px;
    }
    .submit-btn{
        height: 38px;
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
                    }
                }
                &:last-child{
                    td{
                        border: none;
                    }
                }
            }
        }
        &::before{
            height: 0;
        }
    }
}

.typeDialog{
    .submit-btn{
        margin-top: 24px;
    }
}

</style>