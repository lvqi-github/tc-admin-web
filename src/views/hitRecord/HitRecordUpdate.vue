<template>
    <div class="app-container">
        <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="100px">
            <el-form-item label="战绩标题" prop="recordTitle">
                <el-input v-model="updateForm.recordTitle"></el-input>
            </el-form-item>
            <el-form-item label="战绩类型" prop="recordType">
                <el-radio-group v-model="updateForm.recordType">
                    <el-radio :label="1">按日期</el-radio>
                    <el-radio :label="2">按作者</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="战绩日期" prop="recordDate">
                <el-date-picker v-model="updateForm.recordDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="作者" prop="authorId">
                <el-select v-model="updateForm.authorId" placeholder="请选择" :loading="authorOptionsLoading">
                    <el-option-group v-for="group in authorOptions" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item label="战绩图片" prop="recordImgUrl">
                <el-upload :action="fileUploadAction" :headers="FileUploadHeaders"
                           accept="image/jpeg,image/png" :limit="1" list-type="picture-card"
                           :file-list="recordImgList"
                           :before-upload="beforeUpload"
                           :on-exceed="onExceed"
                           :on-remove="handleRemove"
                           :on-success="handleSuccess">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="updateLoading" @click="onSubmit">修改</el-button>
                <router-link to="/hitRecord/list">
                    <el-button style="margin-left: 10px">取消</el-button>
                </router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { setFileUploadUrl } from '../../api/config.js'
    let token =  localStorage.getItem('admin_token')
    export default {
        data() {
            const validateAuthorId = (rule, value, callback) => {
                if (this.updateForm.recordType == 2) {
                    if (!value){
                        callback(new Error("作者不能为空"));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                fileUploadAction: setFileUploadUrl(),
                FileUploadHeaders: {Authorization: token},
                recordImgList: [],
                authorOptionsLoading: false, //作者下拉数据loading
                authorOptions: [], //作者下拉数据
                updateLoading: false, //修改按钮loading
                updateForm: {
                    recordId: '',
                    recordTitle: '',
                    recordType: '',
                    recordDate: '',
                    authorId: '',
                    recordImgUrl: ''
                },
                rules: {
                    recordTitle: [{
                        required: true,
                        message: '请输入战绩标题',
                        trigger: 'blur'
                    }],
                    recordType: [{
                        required: true,
                        message: '请选择战绩类型',
                        trigger: 'change'
                    }],
                    authorId:[{
                        trigger: "change",
                        validator: validateAuthorId
                    }],
                    recordDate: [{
                        required: true,
                        message: '请选择战绩日期',
                        trigger: 'change'
                    }],
                    recordImgUrl: [{
                        required: true,
                        message: '请上传战绩图片',
                        trigger: 'change'
                    }]
                }
            }
        },
        created() {
            this.initAuthorSelectOptions();
            this.initUpdateFormData();
        },
        methods: {
            // 初始化表单数据
            initUpdateFormData() {
                let reqInfo={
                    recordId: this.$route.query.recordId
                }
                this.$api.getByRecordId(reqInfo).then(res => {
                    if(res.resultCode == "1000"){
                        this.updateForm.recordId = res.value.recordId;
                        this.updateForm.recordTitle = res.value.recordTitle;
                        this.updateForm.recordType = res.value.recordType;
                        this.updateForm.recordDate = res.value.recordDate;
                        this.updateForm.authorId = res.value.authorId;
                        this.updateForm.recordImgUrl = res.value.recordImgUrl;

                        if (res.value.recordImgUrl != ""){
                            let recordImgUrlArr = res.value.recordImgUrl.split('?')[0].split('/');
                            let recordImgItem = {
                                name: recordImgUrlArr[recordImgUrlArr.length - 1],
                                url: res.value.recordImgUrl
                            }
                            this.recordImgList.push(recordImgItem);
                        }
                    }
                });
            },
            //文件上传前的前的钩子函数，参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传图片必须是JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return (isJPG || isPNG) && isLt2M;
            },
            //上传的文件个数超出设定时触发的函数
            onExceed() {
                this.$message({
                    type: 'info',
                    message: '最多只能上传一个图片',
                    duration: 6000
                });
            },
            //删除文件之前的钩子函数
            handleRemove(file) {
                let reqInfo = {
                    fileName: file.name
                };
                this.$api.deleteFile(reqInfo).then(res => {
                    if(res.resultCode == "1000"){
                        this.recordImgList.splice(this.recordImgList.find( img => {
                            return img.name === file.name;
                        }), 1);
                        this.updateForm.recordImgUrl = '';
                        return true;
                    }
                });
                return false;
            },
            //文件上传成功的钩子函数
            handleSuccess(response) {
                if (response.resultCode == "1000"){
                    this.recordImgList.push(response.value);
                    this.updateForm.recordImgUrl = response.value.url;
                }
            },
            initAuthorSelectOptions() {
                this.authorOptionsLoading = true;
                this.$api.getAuthorSelectOptions().then(res => {
                    if(res.resultCode == "1000"){
                        this.authorOptions = res.values;
                    }
                    this.authorOptionsLoading = false;
                }).catch(() => {
                    this.authorOptionsLoading = false;
                });
            },
            onSubmit() {
                this.$refs.updateForm.validate((valid) => {
                    if (valid) {
                        this.updateLoading = true;
                        if (this.updateForm.recordType == 1) {
                            this.updateForm.authorId = '';
                        }
                        this.$api.hitRecordUpdate(this.updateForm).then(res => {
                            this.updateLoading = false;
                            if(res.resultCode == "1000"){
                                this.$message.success('创建成功！');
                                this.$router.push({ path: '/hitRecord/list'});
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