<template>
    <div>
        <Header />
        <div class="container">
            <Breadcrumb :backRoutes="backRoutes" :selfRoute="selfRoute"/>

            <div class="search_outter">
                <el-row :gutter="10">
                    <el-col class="mode" :xs="24" :sm="24" :md="13" :lg="13" :xl="13">
                        <div class="timer">
                            <el-date-picker
                                class="startTime"
                                v-model="startTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :editable="false"
                                time-arrow-control
                                placeholder="开始日期"
                            ></el-date-picker>
                            <span class="devide">至</span>
                            <el-date-picker
                                class="endTime"
                                v-model="endTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :editable="false"
                                time-arrow-control
                                placeholder="结束日期"
                            ></el-date-picker>
                        </div>
                    </el-col>
                    <el-col class="mode" :xs="24" :sm="24" :md="11" :lg="11" :xl="11">
                        <div class="dfjend search_query df dfaic">
                            <el-input class="code_name" v-model="keyword" placeholder="搜索电话号码/昵称/姓名"
                                @keyup.enter.native="queryData"></el-input>
                            <el-button class="search_btn" type="primary" icon="el-icon-search"
                                @click="queryData">搜索</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            

            <!-- 表格 -->
            <div class="code_table">
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    :row-class-name="tableRowClassName"
                    lazy
                    style="width: 100%"
                >
                    <el-table-column
                        label="课程名称"
                        width="180"
                    >
                        <template slot-scope="scope">
                            <span class="code_base">{{ scope.row.course_name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="支付时间"
                    >
                        <template slot-scope="scope">
                            <span class="code_base">{{ scope.row.order_time }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="头像"
                        width="100"
                    >
                        <template slot-scope="scope">
                            <img :src="scope.row.avatar" alt="" class="code_img" />
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="昵称"
                    >
                        <template slot-scope="scope">
                            <span class="code_base">{{ scope.row.nickname }}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        label="姓名"
                    >
                        <template slot-scope="scope">
                            <span class="code_base">{{ scope.row.real_name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="手机号"
                        width="130"
                    >
                        <template slot-scope="scope">
                            <span class="code_base">{{ scope.row.mobile }}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        label="优惠券金额"
                    >
                        <template slot-scope="scope">
                            <span class="code_base">{{ parseFloat(scope.row.coupon_price) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="现金支付"
                    >
                        <template slot-scope="scope">
                            <span class="code_base">{{ parseFloat(scope.row.price) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="余额支付"
                    >
                        <template slot-scope="scope">
                            <span class="code_base">{{ parseFloat(scope.row.preferential_amount) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="订单编号"
                    >
                        <template slot-scope="scope">
                            <span class="code_base">{{ scope.row.order_code }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="购买状态"
                        width="100"
                    >
                        <template slot-scope="scope">
                            <span 
                                :class="String(scope.row.is_refund)==='1'?'unbuy':''"
                            >{{ String(scope.row.is_refund)==='1'?'已退款':'已支付'}}</span>
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
    </div>
</template>

<script>
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import axios from '@/utils/fetch'
const ERR_OK = 200;
export default {
    name: 'Login',
    data(){
        return {
            startTime: '',
            endTime: '',

            keyword: '',
            loading: true,
            tableData: [],
            // 分页数据
            pageNum: 1, // 当前页数
            pageSize: 10, // 每页显示条目个数
            total: 0, // 总条目数
        }
    },
    created(){
        const that = this;
        const query = this.$route.query
        this.backRoutes = [{
            path:'/', name: '首页'
        }]
        this.selfRoute = {path: this.$route.path, name: `活码：${query.name}-订单信息`}
        
        this.query = query
        this.initPage()
    },
    methods:{
        validate(){
            const {startTime, endTime} = this;
            if(startTime > endTime){
                this.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'error'
                });
                return false
            }
            return true
        },
        initPage(){
            this.renderLiveTable();
        },
        queryData(){
            if(this.validate()){
                this.renderLiveTable();
            }
        },

        // 活码的订单列表
        renderLiveTable(url){
            const that = this;
            const { startTime, endTime,  keyword, pageNum, pageSize } = this;
            const {id } = this.$route.params;
            that.loading = true;
            axios.get('/v2/agent/live_code/orderList', {
                params:{
                    liveCodeId: id,
                    keyword: keyword.trim(),
                    orderStartTime: startTime,
                    orderEndTime: endTime,
                    page: pageNum,
                    limit: pageSize
                }
            }).then(function (res) {
                const data = res.data;
                if(res.status === ERR_OK){
                    that.loading = false
                    // if(data.code){
                    //     return that.$message({
                    //         message: data.msg,
                    //         type: 'error'
                    //     });
                    // }
                    if(!data.code){
                        const list = data.data
                        that.tableData = list;
                        that.total = data.count;
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        tableRowClassName({row, rowIndex}) {
            if (String(row.is_refund) === '1') {
                return 'unpayed';
            }
            return 'payed';
        },

        // 分页上一页
        handleCurrentChange(val){
            this.pageNum = val;
            this.renderLiveTable();
        }
    },
    components: {
        Header,
        Breadcrumb
    }
}
</script>

<style lang="scss" scoped>
.container{
    padding: 0 40px 40px;
    .code_breadcrumb{
        margin-top: 20px;
        & >>> .el-breadcrumb__inner{
            font-size: 15px;
            color: #666;
            &.is-link{
                font-weight: normal;
                &:hover{
                    color: #03578e;
                }
                
            }
        }
    }
    .search_outter{
        margin-bottom: 20px;
        .mode{
            margin-top: 20px;
            .devide{
                font-size: 16px;
                color: #333;
                margin: 0 6px;
            }

            >>> .code_name{
                margin: 0 10px 0 0;
                max-width: 220px;
            }
            >>> .search_btn{
                width: 90px;
                height: 40px;
                font-size: 16px;
                background: #06609A;
                border: none;
                &:hover{
                    background: #03578e;
                }
            }
        }
    }

    

    .code_table{
        background: #fff;
        padding: 20px;
        border: 1px solid #E9E9E9;
        border-radius: 4px;
        overflow: hidden;
        >>> .el-table {
            thead{
                tr{
                    th{
                        height: 56px;
                        padding: 0;
                        font-size: 16px;
                        color: #333;
                        text-align: center;
                        background: #F2F2F2;
                        box-sizing: border-box;
                    }
                }
            }
            tbody{
                tr{
                    td{
                        text-align: center;
                        .code_img{
                            width: 52px;
                            height: 52px;
                            vertical-align: middle;
                        }
                        .unbuy{
                            color: #E64427;
                        }
                        .btn_details{
                            width: 96px;
                            height: 36px;
                            background: #06609A;
                            border-color: #06609A;
                            font-size: 16px;
                            color: #fff;
                            padding: 0;
                            &:hover{
                                border-color: #03578e;
                                background: #03578e;
                            }
                        }
                        .btn_export{
                            margin-left: 12px;
                            width: 64px;
                            height: 36px;
                            background: #fff;
                            border-color: #06609A;
                            font-size: 16px;
                            color: #06609A;
                            padding: 0;
                        }
                    }
                    &:last-child{
                        td{
                            border: none;
                        }
                    }
                }
                .payed{
                    font-size: 16px;
                    color: #333;
                    line-height: 1.2;
                }
                .unpayed{
                    font-size: 16px;
                    color: #999;
                    line-height: 1.2;
                }
            }
            &::before{
                height: 0;
            }
        }
        .code_pagination{
            margin-top: 20px;
            >>> .el-pager li, >>> .btn-prev, >>> .btn-next{
                        width: 52px;
                        height: 42px;
                        line-height: 42px;
            }
            >>> span:not([class*=suffix]){
                font-size: 16px;
                color: #999;
                line-height: 42px;
            }
            >>> .el-pager li.active{
                background: #06609A;
                color: #fff;
            }
        }
    }
}

@media screen and (max-width: 992px){
    .search_query {
        justify-content: flex-start;
    }
}
</style>