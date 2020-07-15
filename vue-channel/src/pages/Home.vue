<template>
    <div>
        <Header />
        <div class="container">
            <!-- 搜索条件 -->
            <div class="search_outter">
                <el-row :gutter="10">
                    <el-col class="mode" :xs="24" :sm="24" :md="24" :lg="11" :xl="11">
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
                    <el-col class="mode" :xs="24" :sm="24" :md="24" :lg="13" :xl="13">
                        <div class="dfjend search_query df dfaic">
                            <el-select class="query_select" v-model="optionVal" placeholder="全部状态">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                            <el-input class="code_name" v-model="codeName" placeholder="搜索活码名称"
                                @keyup.enter.native="queryData"></el-input>
                            <el-button class="search_btn" type="primary" icon="el-icon-search"
                                @click="queryData">搜索</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            
            <!-- 基础数据 -->
            <div class="statistics">
                <el-row :gutter="10">
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <div class="df dfdir dfc cistern">
                            <p class="result" v-html="saleInfo.today_order_price"></p>
                            <span class="title">今日销售额</span>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <div class="df dfdir dfc cistern">
                            <p class="result" v-html="saleInfo.total_order_price"></p>
                            <span class="title">累计销售额</span>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <div class="df dfdir dfc cistern">
                            <p class="result" v-html="saleInfo.today_new_user"></p>
                            <span class="title">今日新增流量（扫码数）</span>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <div class="df dfdir dfc cistern">
                            <p class="result" v-html="saleInfo.total_new_user"></p>
                            <span class="title">累计流量（扫码数）</span>
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
                        label="活码名称"
                        width="220"
                    >
                        <template slot-scope="scope">
                            <div class="df dfc dfdir">
                                <span class="code_base">{{ scope.row.name }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="活码"
                    >
                        <template slot-scope="scope">
                            <el-image 
                                class="code_img"
                                style="width: 100px; height: 100px"
                                :src="scope.row.img_url"
                                :preview-src-list="[scope.row.img_url]"
                            >
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="状态"
                    >
                        <template slot-scope="scope">
                            <span class="code_base">{{ Number(scope.row.is_enabled) === 1 ? '进行中': '已停用' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="收入金额"
                    >
                        <template slot-scope="scope">
                            <span class="code_base">{{ parseFloat(scope.row.price) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="订单量"
                    >
                        <template slot-scope="scope">
                            <div class="df dfc dfdir">
                                <span 
                                    class="code_base order_num"
                                    @click="handleOrder(scope.$index, scope.row)"    
                                >订单数量{{ scope.row.order_cnt }}</span>
                                <span class="code_base refund">{{scope.row.refund_cnt > 0 ?`退款${scope.row.refund_cnt}个`: ''}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="群码数量"
                        width="160"
                    >
                        <template slot-scope="scope">
                            <div class="df dfc dfdir">
                                <span class="code_base qrcode_num">群码数量{{ scope.row.code_cnt }}</span>
                                <span class="code_base">累计扫码{{ scope.row.click_cnt }}人</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="140"
                    >
                        <template slot-scope="scope">
                            <el-button
                                class="btn_details"
                                @click="handleDetails(scope.$index, scope.row)"
                            >订单详情</el-button>
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
// import {pagination, Table, TableColumn, Image, Row, Col, Select, Option, Input, Button, DatePicker } from 'element-ui'
import Header from '@/components/Header'
import axios from '@/utils/fetch'
const ERR_OK = 200;
export default {
    name: 'Login',
    data(){
        return {
            // 销售数据
            saleInfo: {},
            startTime: '',
            endTime: '',
            optionVal: '0',
            codeName: '',

            options: [{
                value: '0',
                label: '全部状态'
            }, {
                value: '1',
                label: '进行中'
            }, {
                value: '2',
                label: '已停用'
            }],
            
            loading: true,
            tableData: [],
            // 分页数据
            pageNum: 1, // 当前页数
            pageSize: 20, // 每页显示条目个数
            total: 0, // 总条目数
        }
    },
    created(){
        // 初始化页面
        this.init();
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
        init(){
            this.initPage()
            this.renderTable()
        },    
        /**
         * 查询数据
         */
        queryData() {
            // 验证并查找数据
            if(this.validate()){
                this.initPage()
                this.renderTable()
            }
        },

        // 列表渲染
        renderTable() {
            const that = this;
            const { startTime, endTime, optionVal, codeName, pageNum, pageSize } = this;
            that.loading = true;
            axios.get('/v2/agent/live_code/list', {
                params:{
                    orderStartTime: startTime,
                    orderEndTime: endTime,
                    name: codeName.trim(),
                    isEnabled: optionVal,
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

        /**
         * 计算价格，大于1万显示单位万，否则显示元
         * price：显示人数或者价格
         * desc：数组，存两个值（万元和元，万人和人）
         */
        calculatePrice (price, desc) {
            const version = 10000
            if (price / version >= 1) {
                const val = price % version ? (price / version).toFixed(1) : parseInt(price / version)
                return `<span>${val}</span>${desc[0]}`
            }
            return `<span>${parseInt(price)}</span>${desc[1]}`
        },
        initPage(){
            const that = this;
            const {startTime, endTime} = this;
            axios.get('/v2/agent/live_code/calculate', {
                params:{
                    orderStartTime: startTime,
                    orderEndTime: endTime
                }
            }).then(function (res) {
                const data = res.data;
                if(res.status === ERR_OK){
                    // if(data.code){
                    //     return that.$message({
                    //         message: data.msg,
                    //         type: 'error'
                    //     });
                    // }
                    if(!data.code){
                        const info = data.data;
                        info.today_order_price = that.calculatePrice(info.today_order_price, ['万元', '元']);
                        info.today_new_user = that.calculatePrice(info.today_new_user, ['万人', '人']);
                        info.total_order_price = that.calculatePrice(info.total_order_price, ['万元', '元']);
                        info.total_new_user = that.calculatePrice(info.total_new_user, ['万人', '人']);
                        that.saleInfo = info
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        // 整行的样式
        tableRowClassName({row, rowIndex}) {
            if (String(row.is_enabled) === '1') {
                return '';
            }
            return 'isEnded';
        },
        // 订单详情
        handleDetails(index, row) {
            this.pathRouter('/qrcode/'+ row.id, {
                name: `查看${row.name}`,
                code: row.code
            })
        },
        // 点击订单数量的跳转
        handleOrder(index, row){
            this.pathRouter('/order/'+ row.id, {
                name: row.name
            })
        },
        pathRouter(path, query) {
            this.$router.push({ path, query });
        },
        // 分页上一页
        handleCurrentChange(val){
            this.pageNum = val;
            this.renderTable();
        }
    },
    components: {
        Header
    }
}
</script>

<style lang="scss" scoped>
.container{
    padding: 0 40px 40px;
    .search_outter{
        margin-bottom: 20px;
        .mode{
            margin-top: 20px;
            .devide{
                font-size: 16px;
                color: #333;
                margin: 0 6px;
            }

            >>> .query_select{
                max-width: 224px;
            }
            >>> .code_name{
                margin: 0 10px 0 20px;
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

    .statistics{
        margin-bottom: 20px;
        background: #fff;
        border: 1px solid #E9E9E9;
        border-radius: 4px;
        .cistern{
            height: 142px;
            .result{
                font-size: 34px;
                color: #06609A;
                line-height: 1.12;
                span{
                    font-size: 34px;
                    font-weight: 600;
                }
            }
            .title{
                margin-top: 16px;
                font-size: 15px;
                line-height: 1.12;
                color: #333;
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
                        .code_base{
                            font-size: 16px;
                            color: #333;
                            line-height: 1.2;
                        }
                        .code_img{
                            width: 52px !important;
                            height: 52px !important;
                            vertical-align: middle;
                        }
                        .el-image-viewer__actions{
                            display: none;
                        }
                        .el-image-viewer__close{
                            top: 0;
                            right: 0;
                            width: 100%;
                            height: 100%;
                            font-size: 0px;
                            z-index: 100;
                        }
                        .order_num{
                            color: #06609A;
                            cursor: pointer;
                        }
                        .refund{
                            margin-top: 6px;
                            color: #E64427;
                        }
                        .qrcode_num{
                            color: #06609A;
                            margin-bottom: 6px;
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

@media screen and (max-width: 1200px){
    .search_query {
        justify-content: flex-start;
    }
}
</style>