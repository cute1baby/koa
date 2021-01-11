<template>
<div>
    <h3 class="title df dfaic dfjbw">
        前端文章（视频）管理
        <div class="df dfaic">
            <span class="typeList" @click="routerPath('/home/addArtType')">查看类型列表</span>
            <span class="newAdd add-btn" @click="routerPath('/home/wechat/new')">新增数据</span>
        </div>
    </h3>
    <!-- 查询 -->
    <div class="searchDiv df dfjend">
        <el-input class="searchIpt" v-model="articleName" maxlength='12' placeholder="输入文章标题"></el-input>
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
                label="资源标题"
            >
                <template slot-scope="scope">
                    <span class="code_base">{{ scope.row.title}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="资源描述"
            >
                <template slot-scope="scope">
                    <span class="code_base">{{ scope.row.desc || '-'}}</span>
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
            >
                <template slot-scope="scope">
                    <span class="typeTag">{{ scope.row.typeIdName}}</span>
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
                        :src="scope.row.picLink"
                        :preview-src-list="[scope.row.picLink]"
                    >
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
                label="链接类型"
            >
                <template slot-scope="scope">
                    <span class="typeTag typeTagWater" v-if="scope.row.linkType===1">{{ formatLinkType(scope.row.linkType)}}</span>
                    <span class="typeTag typeTagGreen" v-else>{{ formatLinkType(scope.row.linkType)}}</span>
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
                width="100"
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
import moment from 'moment'
export default {
    data(){
        return {
            loading: false,
            tableData: [],
            articleName: '',  //文章名称
            pageNum: 1, // 当前页数
            pageSize: 20, // 每页显示条目个数
            total: 0, // 总条目数
        }
    },
    created(){
        this.initTable()
    },
    methods: {
        formatLinkType(type){
            switch (type) {
                case 1:
                    return '视频'
                    break;
                case 2:
                    return '文章'
                    break;
                default:
                    break;
            }
        },
        routerPath(path, query){
            this.$router.push({path, query})
        },
        formatTimer(time){
            return moment(time).format("YYYY年MM月DD日 HH:mm:ss")
        },
        searchData(){
            this.pageNum = 1;
            this.initTable()
        },
        handleDetails(item){
            // 跳转到编辑
            const query = {
                resourceTitle: item.title || '',
                resourceDesc: item.desc || '',
                address: item.address || '',
                linkType: item.linkType || 1,
                belongTypeId: item.typeId || '',
                resourceImg: item.picLink || ''
            }
            this.routerPath(`/home/wechat/${item.articleId}`, query)
        },
        initTable(){
            const {pageNum, pageSize, articleName} = this
            this.loading = true
            axios.get('/qianduan/getArticleList', {
                params: {
                    pageNum, 
                    pageSize, 
                    articleName
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
            console.log('分页切换')
            this.pageNum = val
            this.initTable()
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
    .typeList{
        font-size: 14px;
        color: #06609A;
        padding: 6px 10px;
        border-radius: 4px;
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
                        .typeTag{
                            background: #FF9759;
                            font-size: 14px;
                            padding: 2px 8px;
                            border-radius: 4px;
                            color: #fff;
                        }
                        .typeTagWater{
                            background: #a268ce;
                        }
                        .typeTagGreen{
                            background: #32a08c;
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
</style>