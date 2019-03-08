<template>
    <div class="app-container">

        <el-form :inline="true" :model="tableReqParams">
            <el-form-item label="订单号">
                <el-input v-model="tableReqParams.orderNo"></el-input>
            </el-form-item>
            <el-form-item label="用户id">
                <el-input v-model="tableReqParams.userId"></el-input>
            </el-form-item>
            <el-form-item label="订单类型">
                <el-select v-model="tableReqParams.orderType" placeholder="请选择" clearable :loading="orderTypeSelectLoading">
                    <el-option v-for="item in orderTypeSelectOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单支付状态">
                <el-select v-model="tableReqParams.orderPayStatus" placeholder="请选择" clearable :loading="orderPayStatusSelectLoading">
                    <el-option v-for="item in orderPayStatusSelectOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" @click="search">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="orderList" v-loading="listLoading" element-loading-text="Loading" border>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="orderNo" label="订单号" width="200">
            </el-table-column>
            <el-table-column prop="orderTypeName" label="订单类型" width="120" align="center">
            </el-table-column>
            <el-table-column prop="orderPayStatusName" label="订单支付状态" width="150" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.orderPayStatus === 2 ? 'success' : (scope.row.orderPayStatus === 1 ? 'danger' : 'warning')">{{scope.row.orderPayStatusName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="orderAmount" label="订单金额" width="120" align="center">
            </el-table-column>
            <el-table-column prop="userId" label="用户id" width="180" align="center">
            </el-table-column>
            <el-table-column prop="payChannelTypeName" label="支付渠道类型" width="120" align="center">
            </el-table-column>
            <el-table-column prop="payFinishTime" label="支付完成时间" width="160" align="center">
            </el-table-column>
            <el-table-column prop="thirdPartyPayWaterNo" label="第三方支付流水号" width="180" align="center">
            </el-table-column>
            <el-table-column prop="businessNo" label="业务单号" width="180" align="center">
            </el-table-column>
            <el-table-column prop="modified" label="修改时间" width="160" align="center">
            </el-table-column>
            <el-table-column prop="created" label="创建时间" width="160" align="center">
            </el-table-column>
        </el-table>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                prev-text="上一页"
                next-text="下一页"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalElements"
                style="float: right; padding-top: 20px;">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableReqParams: {
                    orderNo: '',
                    userId: '',
                    orderType: '',
                    orderPayStatus: '',
                    page: 1,
                    pageSize: 10
                }, //列表请求参数
                orderList: [], // 列表数据
                totalElements: 0, //列表数据条数
                listLoading: false, //列表loading
                orderTypeSelectLoading: false, //订单类型下拉数据loading
                orderTypeSelectOptions: [], //订单类型下拉数据
                orderPayStatusSelectLoading: false, //订单支付状态下拉数据loading
                orderPayStatusSelectOptions: [], //订单支付状态下拉数据
            }
        },
        created() {
            this.initOrderTypeSelectOptions();
            this.initOrderPayStatusSelectOptions();
            this.fetchData()
        },
        methods: {
            initOrderTypeSelectOptions() {
                this.orderTypeSelectLoading = true;
                this.$api.getOrderTypeList().then(res => {
                    if(res.resultCode == "1000"){
                        this.orderTypeSelectOptions = res.values;
                    }
                    this.orderTypeSelectLoading = false;
                }).catch(() => {
                    this.orderTypeSelectLoading = false;
                });
            },
            initOrderPayStatusSelectOptions() {
                this.orderPayStatusSelectLoading = true;
                this.$api.getOrderPayStatusList().then(res => {
                    if(res.resultCode == "1000"){
                        this.orderPayStatusSelectOptions = res.values;
                    }
                    this.orderPayStatusSelectLoading = false;
                }).catch(() => {
                    this.orderPayStatusSelectLoading = false;
                });
            },
            fetchData() {
                let self = this;
                this.listLoading = true;
                this.$api.getOrderList(self.tableReqParams).then(res => {
                    if(res.resultCode == "1000"){
                        this.totalElements = res.totalElements;
                        this.orderList = res.values;
                    }
                    this.listLoading = false;
                })
            },
            handleSizeChange(val) {
                this.tableReqParams.pageSize = val;
                this.fetchData()
            },
            handleCurrentChange(val) {
                this.tableReqParams.page = val;
                this.fetchData()
            },
            search() {
                this.fetchData()
            }
        }
    }
</script>