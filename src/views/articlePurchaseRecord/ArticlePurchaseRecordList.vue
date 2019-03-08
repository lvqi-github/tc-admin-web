<template>
    <div class="app-container">

        <el-form :inline="true" :model="tableReqParams">
            <el-form-item label="购买记录号">
                <el-input v-model="tableReqParams.purchaseRecordNo"></el-input>
            </el-form-item>
            <el-form-item label="用户id">
                <el-input v-model="tableReqParams.userId"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" @click="search">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="articlePurchaseRecordList" v-loading="listLoading" element-loading-text="Loading" border>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="purchaseRecordNo" label="购买记录号" width="200">
            </el-table-column>
            <el-table-column prop="articleId" label="文章id" width="180" align="center">
            </el-table-column>
            <el-table-column prop="articleTitle" label="文章标题" width="150" align="center">
            </el-table-column>
            <el-table-column prop="articleDesc" label="文章描述" width="200" align="center">
            </el-table-column>
            <el-table-column prop="articleReleaseTime" label="文章发布时间" width="160" align="center">
            </el-table-column>
            <el-table-column prop="amount" label="金额" width="120" align="center">
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
                    purchaseRecordNo: '',
                    userId: '',
                    page: 1,
                    pageSize: 10
                }, //列表请求参数
                articlePurchaseRecordList: [], // 列表数据
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
                this.$api.getArticlePurchaseRecordList(self.tableReqParams).then(res => {
                    if(res.resultCode == "1000"){
                        this.totalElements = res.totalElements;
                        this.articlePurchaseRecordList = res.values;
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