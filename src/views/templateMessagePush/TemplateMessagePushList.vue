<template>
    <div class="app-container">

        <el-form :inline="true" :model="tableReqParams">
            <el-form-item label="推送状态">
                <el-select v-model="tableReqParams.pushStatus" placeholder="请选择" clearable :loading="pushStatusSelectLoading">
                    <el-option v-for="item in pushStatusSelectOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" @click="search">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="templateMessagePushList" v-loading="listLoading" element-loading-text="Loading" border>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="pushId" label="推送id" width="180" align="center">
            </el-table-column>
            <el-table-column prop="pushTypeName" label="推送类型" width="180" align="center">
            </el-table-column>
            <el-table-column prop="businessId" label="业务id" width="180" align="center">
            </el-table-column>
            <el-table-column prop="userId" label="用户id" width="180" align="center">
            </el-table-column>
            <el-table-column prop="openId" label="openId" width="180" align="center">
            </el-table-column>
            <el-table-column prop="pushStatusName" label="推送状态" width="180" align="center">
            </el-table-column>
            <el-table-column prop="failedRetryNumber" label="推送失败重试次数" width="180" align="center">
            </el-table-column>
            <el-table-column prop="uuid" label="防重uuid" width="180" align="center">
            </el-table-column>
            <el-table-column prop="msgId" label="微信消息id" width="180" align="center">
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
                    pushStatus: '',
                    page: 1,
                    pageSize: 10
                }, //列表请求参数
                templateMessagePushList: [], // 列表数据
                totalElements: 0, //列表数据条数
                listLoading: false, //列表loading
                pushStatusSelectLoading: false, //推送状态下拉数据loading
                pushStatusSelectOptions: [], //推送状态下拉数据
            }
        },
        created() {
            this.initPushStatusSelectOptions();
            this.fetchData()
        },
        methods: {
            initPushStatusSelectOptions() {
                this.pushStatusSelectLoading = true;
                this.$api.getTemplateMessagePushStatusList().then(res => {
                    if(res.resultCode == "1000"){
                        this.pushStatusSelectOptions = res.values;
                    }
                    this.pushStatusSelectLoading = false;
                }).catch(() => {
                    this.pushStatusSelectLoading = false;
                });
            },
            fetchData() {
                let self = this;
                this.listLoading = true;
                this.$api.getTemplateMessagePushList(self.tableReqParams).then(res => {
                    if(res.resultCode == "1000"){
                        this.totalElements = res.totalElements;
                        this.templateMessagePushList = res.values;
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