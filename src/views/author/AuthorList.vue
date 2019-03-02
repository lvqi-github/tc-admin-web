<template>
    <div class="app-container">
        <el-row :gutter="20" style="padding-bottom: 20px;">
            <el-col :span="6" :offset="18">
                <el-button type="primary" icon="el-icon-circle-plus-outline" style="float: right;" @click="dialogCreateVisible = true">添加</el-button>
            </el-col>
        </el-row>

        <el-table :data="authorList" v-loading="listLoading" element-loading-text="Loading" border fit>
            <el-table-column align="center" label='序号' width="95">
                <template slot-scope="scope">
                    {{scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column prop="authorName" label="作者昵称">
            </el-table-column>
            <el-table-column prop="platformSource" label="平台来源">
            </el-table-column>
            <el-table-column prop="modified" label="修改时间" width="180" align="center">
            </el-table-column>
            <el-table-column prop="created" label="创建时间" width="180" align="center">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
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

        <!-- 创建作者 begin-->
        <el-dialog title="创建作者" :visible.sync="dialogCreateVisible" :close-on-click-modal="false" :close-on-press-escape="false" @open="openCallBack" @close="resetCreateForm" >
            <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px">
                <el-form-item label="作者名称" prop="authorName">
                    <el-input v-model="createForm.authorName"></el-input>
                </el-form-item>
                <el-form-item label="平台来源" prop="platformSource">
                    <el-select v-model="createForm.platformSource" placeholder="请选择" :loading="platformSourceLoading">
                        <el-option v-for="item in platformSourceOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogCreateVisible = false">取 消</el-button>
                <el-button type="primary" :loading="createLoading" @click="createAuthor">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 修改作者信息 begin-->
        <el-dialog title="修改作者信息" :visible.sync="dialogUpdateVisible" :close-on-click-modal="false" :close-on-press-escape="false" @open="openCallBack" >
            <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="100px">
                <el-form-item label="作者名称" prop="authorName">
                    <el-input v-model="updateForm.authorName"></el-input>
                </el-form-item>
                <el-form-item label="平台来源" prop="platformSource">
                    <el-select v-model="updateForm.platformSource" placeholder="请选择" :loading="platformSourceLoading">
                        <el-option v-for="item in platformSourceOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogUpdateVisible = false">取 消</el-button>
                <el-button type="primary" :loading="updateLoading" @click="updateAuthor">确 定</el-button>
            </div>
        </el-dialog>
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
                authorList: [], // 列表数据
                totalElements: 0, //列表数据条数
                listLoading: false, //列表loading
                platformSourceLoading: false, //平台来源下来数据loading
                platformSourceOptions: [], //平台来源下拉数据
                dialogCreateVisible: false, //创建对话框的显示状态
                createLoading: false, //创建确定按钮loading
                createForm: {
                    authorName: '',
                    platformSource: ''
                }, // 创建表单
                dialogUpdateVisible: false, //修改对话框的显示状态
                updateLoading: false, //修改确定按钮loading
                updateForm: {
                    authorId: '',
                    authorName: '',
                    platformSource: ''
                },
                rules: {
                    authorName: [{
                        required: true,
                        message: '请输入作者名称',
                        trigger: 'blur'
                    }, {
                        min: 2,
                        max: 6,
                        message: '长度在 2 到 6 个字符'
                    }],
                    platformSource: [{
                        required: true,
                        message: '请选择平台来源',
                        trigger: 'change'
                    }]
                }
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                let self = this;
                this.listLoading = true;
                this.$api.getAuthorList(self.tableReqParams).then(res => {
                    if(res.resultCode == "1000"){
                        this.totalElements = res.totalElements;
                        this.authorList = res.values;
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
            openCallBack() {
                if (this.platformSourceOptions.length == 0) {
                    this.platformSourceLoading = true;
                    this.$api.getPlatformSourceList().then(res => {
                        if(res.resultCode == "1000"){
                            this.platformSourceOptions = res.values;
                        }
                        this.platformSourceLoading = false;
                    }).catch((res) => {
                        this.platformSourceLoading = false;
                    });
                }
            },
            resetCreateForm() {
                this.$refs.createForm.resetFields();
            },
            createAuthor() {
                this.$refs.createForm.validate((valid) => {
                    if (valid) {
                        this.createLoading = true;
                        this.$api.authorAdd(this.createForm).then(res => {
                            this.createLoading = false;
                            if(res.resultCode == "1000"){
                                this.$message.success('创建成功！');
                                this.dialogCreateVisible = false;
                                this.resetCreateForm();
                                this.fetchData();
                            }
                        }).catch((res) => {
                            this.createLoading = false;
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleEdit(index, row) {
                this.updateForm.authorId = row.authorId;
                this.updateForm.authorName = row.authorName;
                this.updateForm.platformSource = row.platformSource;
                this.dialogUpdateVisible = true;
            },
            updateAuthor() {
                this.$refs.updateForm.validate((valid) => {
                    if (valid) {
                        this.updateLoading = true;
                        this.$api.authorUpdate(this.updateForm).then(res => {
                            this.updateLoading = false;
                            if(res.resultCode == "1000"){
                                this.$message.success('修改成功！');
                                this.dialogUpdateVisible = false;
                                this.fetchData();
                            }
                        }).catch((res) => {
                            this.updateLoading = false;
                        });
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>