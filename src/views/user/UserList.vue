<template>
    <div class="app-container">
        <el-table :data="userList" v-loading="listLoading" element-loading-text="Loading" border fit>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="userId" label="用户id">
            </el-table-column>
            <el-table-column prop="nickName" label="微信昵称" width="180">
            </el-table-column>
            <el-table-column prop="sexName" label="性别" width="80" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.sex === 1 ? 'success' : (scope.row.sex === 2 ? 'danger' : 'warning')">{{scope.row.sexName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="province" label="省份" width="80" align="center">
            </el-table-column>
            <el-table-column prop="city" label="城市" width="80" align="center">
            </el-table-column>
            <el-table-column prop="country" label="国家" width="80" align="center">
            </el-table-column>
            <el-table-column prop="openId" label="openId">
            </el-table-column>
            <el-table-column prop="unionId" label="unionId">
            </el-table-column>
            <el-table-column prop="modified" label="修改时间" width="160" align="center">
            </el-table-column>
            <el-table-column prop="created" label="创建时间" width="160" align="center">
            </el-table-column>
        </el-table>
        <!--
            size-change pageSize改变时会触发，回调参数：每页条数
            current-change currentPage改变时会触发，回调参数：当前页
            current-page 当前页数 默认值1
            page-sizes 每页显示个数选择器的选项设置 默认值[10, 20, 30, 40, 50, 100]
            page-size 每页显示条目个数 默认值10
            prev-text 替代图标显示的上一页文字
            next-text 替代图标显示的下一页文字
            layout prev表示上一页，next为下一页，pager表示页码列表，jumper表示跳页元素，total表示总条目数，sizes用于设置每页显示的页码数量
            total 总条目数
        -->
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
                    pageSize: 10
                }, //列表请求参数
                userList: [], // 列表数据
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
                this.$api.getUserList(self.tableReqParams).then(res => {
                    if(res.resultCode == "1000"){
                        this.totalElements = res.totalElements;
                        this.userList = res.values;
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
            }
        }
    }
</script>