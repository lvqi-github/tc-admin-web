<template>
    <div class="app-container">

        <el-form :inline="true" :model="tableReqParams">
            <el-form-item label="作者id">
                <el-input v-model="tableReqParams.authorId"></el-input>
            </el-form-item>
            <el-form-item label="用户id">
                <el-input v-model="tableReqParams.userId"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" @click="search">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="userAuthorSubscribeList" v-loading="listLoading" element-loading-text="Loading" border fit>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="authorId" label="作者id">
            </el-table-column>
            <el-table-column prop="userId" label="用户id">
            </el-table-column>
            <el-table-column prop="created" label="创建时间" width="200" align="center">
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
                    authorId: '',
                    userId: '',
                    page: 1,
                    pageSize: 10
                }, //列表请求参数
                userAuthorSubscribeList: [], // 列表数据
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
                this.$api.getUserAuthorSubscribeList(self.tableReqParams).then(res => {
                    if(res.resultCode == "1000"){
                        this.totalElements = res.totalElements;
                        this.userAuthorSubscribeList = res.values;
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