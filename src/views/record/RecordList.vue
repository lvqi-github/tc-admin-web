<template>
    <div class="app-container">

        <el-form :inline="true" :model="tableReqParams" label-width="80px">
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-form-item label="战绩类型">
                        <el-select v-model="tableReqParams.recordType" placeholder="请选择" :loading="hitRecordTypeLoading">
                            <el-option v-for="item in hitRecordTypeSelectOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item label="作者">
                        <el-select v-model="tableReqParams.authorId" placeholder="请选择" :loading="authorOptionsLoading">
                            <el-option-group v-for="group in authorSelectOptions" :key="group.label" :label="group.label">
                                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <div style="float: right">
                        <el-button icon="el-icon-search" @click="search">查询</el-button>
                        <router-link to="/record/add">
                            <el-button type="primary" icon="el-icon-circle-plus-outline" style="margin-left: 10px">添加</el-button>
                        </router-link>
                    </div>
                </el-col>
            </el-row>
        </el-form>

        <el-table :data="hitRecordList" v-loading="listLoading" element-loading-text="Loading" border fit>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="recordTitle" label="战绩标题">
            </el-table-column>
            <el-table-column prop="recordTypeName" label="战绩类型" width="120">
            </el-table-column>
            <el-table-column prop="recordDate" label="战绩日期" width="180" align="center">
            </el-table-column>
            <el-table-column prop="authorName" label="作者名称" width="120" align="center">
            </el-table-column>
            <el-table-column prop="modified" label="修改时间" width="180">
            </el-table-column>
            <el-table-column prop="created" label="创建时间" width="180">
            </el-table-column>
            <el-table-column label="操作" width="150">
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
                    recordType: '',
                    authorId: ''
                }, //列表请求参数
                hitRecordList: [], // 列表数据
                totalElements: 0, //列表数据条数
                listLoading: false, //列表loading
                hitRecordTypeLoading: false, //战绩类型下拉数据loading
                hitRecordTypeSelectOptions: [], //战绩类型下拉数据
                authorOptionsLoading: false, //作者下拉数据loading
                authorSelectOptions: [], //作者下拉数据
            }
        },
        created() {
            this.initHitRecordTypeSelectOptions();
            this.initAuthorSelectOptions();
            this.fetchData();
        },
        methods: {
            initHitRecordTypeSelectOptions() {
                this.hitRecordTypeLoading = true;
                this.$api.getHitRecordTypeList().then(res => {
                    if(res.resultCode == "1000"){
                        this.hitRecordTypeSelectOptions = res.values;
                    }
                    this.hitRecordTypeLoading = false;
                }).catch(() => {
                    this.hitRecordTypeLoading = false;
                });
            },
            initAuthorSelectOptions() {
                this.authorOptionsLoading = true;
                this.$api.getAuthorSelectOptions().then(res => {
                    if(res.resultCode == "1000"){
                        this.authorSelectOptions = res.values;
                    }
                    this.authorOptionsLoading = false;
                }).catch(() => {
                    this.authorOptionsLoading = false;
                });
            },
            fetchData() {
                let self = this;
                this.listLoading = true;
                this.$api.getHitRecordList(self.tableReqParams).then(res => {
                    if(res.resultCode == "1000"){
                        this.totalElements = res.totalElements;
                        this.hitRecordList = res.values;
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
                this.$router.push({path: '/record/update', query: {recordId: row.recordId}})
            }
        }
    }
</script>