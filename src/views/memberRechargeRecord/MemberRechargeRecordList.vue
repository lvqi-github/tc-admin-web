<template>
    <div class="app-container">

        <el-form :inline="true" :model="tableReqParams">
            <el-form-item label="充值记录号">
                <el-input v-model="tableReqParams.rechargeRecordNo"></el-input>
            </el-form-item>
            <el-form-item label="用户id">
                <el-input v-model="tableReqParams.userId"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" @click="search">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="rechargeRecordList" v-loading="listLoading" element-loading-text="Loading" border>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="rechargeRecordNo" label="充值记录号" width="200">
            </el-table-column>
            <el-table-column prop="rechargePackageId" label="充值套餐id" width="180" align="center">
            </el-table-column>
            <el-table-column prop="rechargePackageDesc" label="充值套餐描述" width="150" align="center">
            </el-table-column>
            <el-table-column prop="rechargeAmount" label="充值金额" width="100" align="center">
            </el-table-column>
            <el-table-column prop="daysOfValidity" label="有效期天数" width="100" align="center">
            </el-table-column>
            <el-table-column prop="validityStartDate" label="有效开始时间" width="180" align="center">
            </el-table-column>
            <el-table-column prop="validityEndDate" label="有效结束时间" width="180" align="center">
            </el-table-column>
            <el-table-column prop="userId" label="用户id" width="180" align="center">
            </el-table-column>
            <el-table-column prop="recordValidStatusName" label="记录有效状态" width="120" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.recordValidStatus === 1 ? 'success' : 'warning'">{{scope.row.recordValidStatusName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="orderNo" label="订单号" width="180" align="center">
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
                    rechargeRecordNo: '',
                    userId: '',
                    page: 1,
                    pageSize: 10
                }, //列表请求参数
                rechargeRecordList: [], // 列表数据
                totalElements: 0, //列表数据条数
                listLoading: false, //列表loading
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                let self = this;
                this.listLoading = true;
                this.$api.getMemberRechargeRecordList(self.tableReqParams).then(res => {
                    if(res.resultCode == "1000"){
                        this.totalElements = res.totalElements;
                        this.rechargeRecordList = res.values;
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