<template>
    <div class="app-container">
        <el-row :gutter="20" style="padding-bottom: 20px;">
            <el-col :span="6" :offset="18">
                <el-button type="primary" icon="el-icon-circle-plus-outline" style="float: right;" @click="dialogCreateVisible = true">添加</el-button>
            </el-col>
        </el-row>

        <el-table :data="memberRechargePackageList" v-loading="listLoading" element-loading-text="Loading" border fit>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="packageDesc" label="套餐描述">
            </el-table-column>
            <el-table-column prop="daysOfValidity" label="有效期天数">
            </el-table-column>
            <el-table-column prop="price" label="价格">
            </el-table-column>
            <el-table-column prop="enableStatusName" label="启用状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.enableStatus === 1 ? 'success' : 'warning'">{{scope.row.enableStatusName}}</el-tag>
                </template>
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

        <!-- 新增会员充值套餐 begin-->
        <el-dialog title="新增会员充值套餐" :visible.sync="dialogCreateVisible" :close-on-click-modal="false" :close-on-press-escape="false" @close="resetCreateForm" >
            <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px">
                <el-form-item label="套餐描述" prop="packageDesc">
                    <el-input v-model="createForm.packageDesc"></el-input>
                </el-form-item>
                <el-form-item label="有效期天数" prop="daysOfValidity">
                    <el-input-number v-model="createForm.daysOfValidity" :step="1" :min="1" :max="365"></el-input-number>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input-number v-model="createForm.price" :precision="2" :step="1" :min="1" :max="9999.99"></el-input-number>
                </el-form-item>
                <el-form-item label="是否启用" prop="enableStatus">
                    <el-switch v-model="createForm.enableStatus" :active-value="1" :inactive-value="2">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogCreateVisible = false">取 消</el-button>
                <el-button type="primary" :loading="createLoading" @click="createMemberRechargePackage">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 修改会员充值套餐信息 begin-->
        <el-dialog title="修改会员充值套餐信息" :visible.sync="dialogUpdateVisible" :close-on-click-modal="false" :close-on-press-escape="false" >
            <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="100px">
                <el-form-item label="套餐描述" prop="packageDesc">
                    <el-input v-model="updateForm.packageDesc"></el-input>
                </el-form-item>
                <el-form-item label="有效期天数" prop="daysOfValidity">
                    <el-input-number v-model="updateForm.daysOfValidity" :step="1" :min="1" :max="365"></el-input-number>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input-number v-model="updateForm.price" :precision="2" :step="1" :min="1" :max="99999.99"></el-input-number>
                </el-form-item>
                <el-form-item label="是否启用" prop="enableStatus">
                    <el-switch v-model="updateForm.enableStatus" :active-value="1" :inactive-value="2">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogUpdateVisible = false">取 消</el-button>
                <el-button type="primary" :loading="updateLoading" @click="updateMemberRechargePackage">确 定</el-button>
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
                memberRechargePackageList: [], // 列表数据
                totalElements: 0, //列表数据条数
                listLoading: false, //列表loading
                dialogCreateVisible: false, //创建对话框的显示状态
                createLoading: false, //创建确定按钮loading
                createForm: {
                    packageDesc: '',
                    daysOfValidity: '',
                    price: '',
                    enableStatus: ''
                }, // 创建表单
                dialogUpdateVisible: false, //修改对话框的显示状态
                updateLoading: false, //修改确定按钮loading
                updateForm: {
                    packageId: '',
                    packageDesc: '',
                    daysOfValidity: '',
                    price: '',
                    enableStatus: ''
                },
                rules: {
                    packageDesc: [{
                        required: true,
                        message: '请输入套餐描述',
                        trigger: 'blur'
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
                this.$api.getMemberRechargePackageList(self.tableReqParams).then(res => {
                    if(res.resultCode == "1000"){
                        this.totalElements = res.totalElements;
                        this.memberRechargePackageList = res.values;
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
            resetCreateForm() {
                this.$refs.createForm.resetFields();
            },
            createMemberRechargePackage() {
                this.$refs.createForm.validate((valid) => {
                    if (valid) {
                        this.createLoading = true;
                        this.$api.memberRechargePackageAdd(this.createForm).then(res => {
                            this.createLoading = false;
                            if(res.resultCode == "1000"){
                                this.$message.success('创建成功！');
                                this.dialogCreateVisible = false;
                                this.resetCreateForm();
                                this.fetchData();
                            }
                        }).catch(() => {
                            this.createLoading = false;
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleEdit(index, row) {
                this.updateForm.packageId = row.packageId;
                this.updateForm.packageDesc = row.packageDesc;
                this.updateForm.daysOfValidity = row.daysOfValidity;
                this.updateForm.price = row.price;
                this.updateForm.enableStatus = row.enableStatus;
                this.dialogUpdateVisible = true;
            },
            updateMemberRechargePackage() {
                this.$refs.updateForm.validate((valid) => {
                    if (valid) {
                        this.updateLoading = true;
                        this.$api.memberRechargePackageUpdate(this.updateForm).then(res => {
                            this.updateLoading = false;
                            if(res.resultCode == "1000"){
                                this.$message.success('修改成功！');
                                this.dialogUpdateVisible = false;
                                this.fetchData();
                            }
                        }).catch(() => {
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