<template>
    <div class="app-container">

        <el-form :inline="true" :model="tableReqParams" label-width="80px">
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-form-item label="发布时间">
                        <el-date-picker v-model="tableReqParams.releaseTimeStart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始时间"></el-date-picker>
                        <span style="margin: 0 10px">至</span>
                        <el-date-picker v-model="tableReqParams.releaseTimeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <div style="float: right">
                        <el-button icon="el-icon-search" @click="search">查询</el-button>
                        <router-link to="/article/add">
                            <el-button type="primary" icon="el-icon-circle-plus-outline" style="margin-left: 10px">添加</el-button>
                        </router-link>
                    </div>
                </el-col>
            </el-row>
        </el-form>

        <el-table :data="articleList" v-loading="listLoading" element-loading-text="Loading" border>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="articleTitle" label="文章标题" width="250">
            </el-table-column>
            <el-table-column prop="articleDesc" label="文章描述" width="400">
            </el-table-column>
            <el-table-column prop="articleTypeName" label="文章类型" width="80" align="center">
            </el-table-column>
            <el-table-column prop="authorName" label="作者名称" width="100" align="center">
            </el-table-column>
            <el-table-column prop="chargeTypeName" label="公开/收费" width="100" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.chargeType === 1 ? 'danger' : ''">{{scope.row.chargeTypeName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="价格" width="80" align="center">
            </el-table-column>
            <el-table-column prop="releaseStatusName" label="发布状态" width="80" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.releaseStatus === 1 ? 'success' : 'danger'">{{scope.row.releaseStatusName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="articleStatusName" label="文章状态" width="80" align="center">
                <template slot-scope="scope">
                    <el-tag :type="articleStatusTag(scope.row.articleStatus)">{{scope.row.articleStatusName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="160">
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="160">
            </el-table-column>
            <el-table-column prop="created" label="创建时间" width="160">
            </el-table-column>
            <el-table-column label="操作" width="120" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
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
                    page: 1,
                    pageSize: 10,
                    releaseTimeStart: '',
                    releaseTimeEnd: ''
                }, //列表请求参数
                articleList: [], // 列表数据
                totalElements: 0, //列表数据条数
                listLoading: false, //列表loading
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            articleStatusTag(articleStatus) {
                if (articleStatus == 1){
                    return 'info';
                }else if (articleStatus == 2) {
                    return 'warning';
                }else {
                    return 'success';
                }
            },
            fetchData() {
                let self = this;
                this.listLoading = true;
                this.$api.getArticleList(self.tableReqParams).then(res => {
                    if(res.resultCode == "1000"){
                        this.totalElements = res.totalElements;
                        this.articleList = res.values;
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
            },
            handleEdit(index, row) {
                this.$router.push({path: '/article/update', query: {articleId: row.articleId}})
            }
        }
    }
</script>