<template>
    <div>
        <Header />
        <div class="container">
            <Breadcrumb :backRoutes="backRoutes" :selfRoute="selfRoute"/>

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
                                :time-arrow-control="true"
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
                            <el-input class="code_name" v-model="codeName" placeholder="搜索群名称"
                                @keyup.enter.native="queryData"></el-input>
                            <el-button class="search_btn" type="primary" icon="el-icon-search" 
                                @click="queryData">搜索</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            
            <!-- 图表 -->
            <div class="chart_box" v-if="chartIsShow">
                <div class="top df dfaic dfjbw">
                    <span class="title">订单趋势</span>
                    <ul class="tabs df dfaic">
                        <li :class="currentType===i+1?'active':''" 
                            v-for="(tab,i) in tabList" 
                            :key="i"
                            @click="handleTabChange(i+1)"
                        >{{tab}}</li>
                    </ul>
                </div>
                <div class="code_Chart" ref="code_Chart"></div>
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
                        label="群码名称"
                    >
                        <template slot-scope="scope">
                            <span class="code_base">{{ scope.row.qr_code_name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="群码"
                    >
                        <template slot-scope="scope">
                            <el-image 
                                class="code_img"
                                style="width: 100px; height: 100px"
                                :src="scope.row.qr_code_img"
                                :preview-src-list="[scope.row.qr_code_img]"
                            >
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="状态"
                    >
                        <template slot-scope="scope">
                            <div class="df dfc dfdir">
                                <span class="code_base">{{ judgeCodeStatus(scope.row.state) }}</span>
                                <span class="code_base c_desc">{{scope.row.current_number}}/{{scope.row.max_number}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="过期时间"
                    >
                        <template slot-scope="scope">
                            <span class="code_base">{{ scope.row.expiration_time_view }}</span>
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
                                    @click="handleDetails(scope.$index, scope.row)"    
                                >订单数量{{ scope.row.order_cnt }}</span>
                                <span class="code_base refund">{{scope.row.refund_cnt > 0 ?`退款${scope.row.refund_cnt}个`: ''}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="200"
                    >
                        <template slot-scope="scope">
                            <div class="df dfc">
                                <el-button
                                    class="btn_details"
                                    @click="handleDetails(scope.$index, scope.row)"
                                >订单详情</el-button>
                                <el-button
                                    class="btn_export"
                                    @click="handleExport(scope.$index, scope.row)"
                                >导出</el-button>
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
    </div>
</template>

<script>
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import axios from '@/utils/fetch'
import qs from 'qs'
const ERR_OK = 200;
export default {
    name: 'Login',
    data(){
        return {
            currentType: 1,
            tabList: ['今日', '昨日', '近7日', '近30日'],
            myChart: {},
            chartIsShow: true,  //是否显示图表

            startTime: '',
            endTime: '',
            optionVal: '0',
            codeName: '',

            options: [{
                value: '0',
                label: '全部状态'
            }, {
                value: '1',
                label: '正在使用'
            }, {
                value: '2',
                label: '已扫满'
            }, {
                value: '3',
                label: '已过期'
            }, {
                value: '4',
                label: '已关闭'
            }],

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
        this.query = query
        const val = query.code ? `${query.name} ${query.code}`: `${query.name}`
        this.backRoutes = [{
            path:'/', name: '首页'
        }]
        this.selfRoute = {path: this.$route.path, name: val}
        // 初始化页面
        this.$nextTick(() => {
            this.initPage()
        })
        window.addEventListener('resize', function(){
            that.$nextTick(() => {
                const code_Chart = that.$refs.code_Chart;
                const doc_width = document.body.clientWidth;
                if(code_Chart){
                    code_Chart.style.width = (doc_width - 80) + 'px'
                    that.myChart.resize()
                }
            })
        })
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
            this.initChart();
            this.renderTable();
        },
        queryData(){
            if(this.validate()){
                this.initChart();
                this.renderTable();
            }
        },
        /**
         * 查询数据
         */
        initChart() {
            const that = this;
            const { startTime, endTime, optionVal, codeName } = this;
            const {id } = this.$route.params;
            axios.get('/v2/agent/live_qr_code/trendInfo', {
                params:{
                    liveCodeId: id,
                    orderStartTime: startTime,
                    orderEndTime: endTime,
                    state: optionVal,
                    qrCodeName: codeName.trim()
                }
            }).then(function (res) {
                const data = res.data;
                if(res.status === ERR_OK){
                    if(!data.code){
                        const chartInfo = data.data
                        that.chartIsShow = Boolean(chartInfo.is_show)
                        // 数据存在时，则渲染
                        if(that.chartIsShow){
                            that.currentType = chartInfo.type
                            that.$nextTick(() => {
                                that.renderChart({
                                    series_data: chartInfo.series_data,
                                    x_axis_data: chartInfo.x_axis_data
                                })
                            })
                        }
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        renderChart(chartData) {
            const code_Chart = this.$refs.code_Chart;
            this.myChart = echarts.init(code_Chart);

            const option = {
                grid:{
                    left: 80,
                    top: 40,
                    right: 40,
                    bottom: 40
                },
                xAxis: {
                    type: 'category',
                    data: chartData.x_axis_data,
                    // boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(151,151,151, 0.5)'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#999',
                        fontSize: 14
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#333',
                        fontSize: 14
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['rgba(151,151,151, 0.15)'] ,
                            width: 1 ,
                            type: 'dotted' 
                        }
                    }
                },
                series: [{
                    type: 'line',
                    data: chartData.series_data,
                    // symbol: 'none',
                    smooth: true,
                    itemStyle:{
                        color: '#06609A'
                    },
                    lineStyle:{
                        color: '#06609A'
                    },
                    areaStyle: {
                        color: 'rgba(6,96,154, 0.05)'
                    }
                }],
                
                tooltip: {
                    show: true,
                    formatter: function(params){
                        // console.log('params====', params)
                        return `【${params.name}】<br /><span style="margin-left: 5px;">订单：${params.value}</span>`
                    }
                }
            };

            this.myChart.setOption(option);
        },
        renderTable(){
            const that = this;
            const { startTime, endTime, optionVal, codeName, pageNum, pageSize } = this;
            const {id } = this.$route.params;
            that.loading = true;
            axios.get('/v2/agent/live_qr_code/list', {
                params:{
                    liveCodeId: id,
                    orderStartTime: startTime,
                    orderEndTime: endTime,
                    state: optionVal,
                    qrCodeName: codeName.trim(),
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
        judgeCodeStatus(state){
            let stateName = ''
            switch (state) {
                case 1:
                    stateName = '正在使用'
                    break;
                case 2:
                    stateName = '已扫满'
                    break;
                case 3:
                    stateName = '已过期'
                    break;
                case 4:
                    stateName = '已关闭'
                    break;
                default:
                    break;
            }
            return stateName;
        },
        // 整行的样式
        tableRowClassName({row, rowIndex}) {
            if (String(row.state) === '1' || String(row.state) === '2') {
                return '';
            }
            return 'isEnded';
        },
        // 切换tab，选择时间
        handleTabChange(type){
            this.currentType = type;
            this.endTime = moment().format('YYYY-MM-DD 23:59:59');
            switch (type) {
                case 1:
                    this.startTime = moment().format('YYYY-MM-DD 00:00:00');
                    break;
                case 2:
                    this.startTime = moment().subtract(1, "days").format("YYYY-MM-DD 00:00:00");
                    this.endTime = moment().subtract(1, "days").format("YYYY-MM-DD 23:59:59");
                    break;
                case 3:
                    this.startTime = moment().subtract(6, "days").format("YYYY-MM-DD 00:00:00");
                    break;
                case 4:
                    this.startTime = moment().subtract(29, "days").format("YYYY-MM-DD 00:00:00");
                    break;
                default:
                    break;
            }
            this.initChart()
            this.renderTable();
        },

        /**
         * 获取特定时间段的集合
         * day: 几天前的时间
         */
        getDateList(day){
            return moment().subtract(day, 'days').format('YYYY-MM-DD HH:mm:ss')
        },

        // 订单详情（点击详情跟点击订单数相同）
        handleDetails(index, row) {
            const id = this.$router.params;
            const backRoutes = JSON.stringify([...this.backRoutes, this.selfRoute])
            this.pathRouter('/qrorder/'+ row.id, {
                name: `${row.qr_code_name}-订单信息`,
                backRoutes
            })
        },
        // 订单导出
        handleExport(index, row){
            const {startTime, endTime} = this;
            const url = '/v2/agent/live_qr_code/orderExport';
            const params = {
                qrCodeId: row.id,
                orderStartTime: startTime,
                orderEndTime: endTime
            }
            const name = row.qr_code_name;
            // 导出数据
            this.postDownloadFile(url, params, name);
        },

        // 下载流文件
        postDownloadFile(url, params, name) {
            axios({
                method: 'get',
                url: url,
                params: params,
                responseType: 'blob'
            }).then(function (res) {
                if(res.status === ERR_OK){
                    const blob = res.data;
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = (e) => {
                        const a = document.createElement('a');
                        a.download = `${name}.xlsx`;
                        // 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
                        a.href = e.target.result;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        pathRouter(path, query) {
            this.$router.push({ path, query });
        },
        // 分页上一页
        handleCurrentChange(val){
            this.pageNum = val;
            this.renderTable()
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

    .chart_box{
        margin-bottom: 20px;
        background: #fff;
        border-radius: 4px;
        .top{
            padding: 20px 40px 0 20px;
            .title{
                font-size: 16px;
                color: #333;
            }
            .tabs{
                margin-right: -10px;
                li{
                    margin-right: 10px;
                    padding: 8px 16px;
                    border: 1px solid rgba(0,0,0,0.15);
                    border-radius: 4px;
                    font-size: 16px;
                    color: #666;
                    cursor: pointer;
                    &.active{
                        color: #fff;
                        background: #06609A;
                        border-color: #06609A;
                    }
                }
            }
        }
        .code_Chart{
            height: 350px;
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
                        .c_desc{
                            margin-top: 6px;
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
                // 已过期和已关闭
                .isEnded td .cell span{color: #999;}
                .isEnded td .cell .btn_details span{color: #fff;}
                .isEnded td .cell .btn_export span{color: #06609A;}

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