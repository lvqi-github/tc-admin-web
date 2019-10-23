<template>
    <div class="app-container">
        <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px">
            <el-form-item label="文章标题" prop="articleTitle">
                <el-input v-model="createForm.articleTitle"></el-input>
            </el-form-item>
            <el-form-item label="文章描述" prop="articleDesc">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="createForm.articleDesc">
                </el-input>
            </el-form-item>
            <el-form-item label="文章类型" prop="articleType">
                <el-radio-group v-model="createForm.articleType">
                    <el-radio :label="1">足球</el-radio>
                    <el-radio :label="2">篮球</el-radio>
                    <el-radio :label="3">足篮混合</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="作者" prop="authorId">
                <el-select v-model="createForm.authorId" placeholder="请选择" :loading="authorOptionsLoading">
                    <el-option-group v-for="group in authorOptions" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item label="预览图片" prop="articlePreviewImg">
                <el-upload :action="fileUploadAction" :headers="FileUploadHeaders"
                           accept="image/jpeg,image/png" :limit="1" list-type="picture-card"
                           :file-list="previewImgList"
                           :before-upload="beforeUpload"
                           :data="fileUploadData"
                           :on-exceed="onExceed"
                           :before-remove="previewImgHandleRemove"
                           :on-success="previewImgHandleSuccess">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="预览文字" prop="articlePreviewText">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="createForm.articlePreviewText">
                </el-input>
            </el-form-item>
            <el-form-item label="内容图片" prop="articleContentImg">
                <el-upload :action="fileUploadAction" :headers="FileUploadHeaders"
                           accept="image/jpeg,image/png" :limit="1" list-type="picture-card"
                           :file-list="contentImgList"
                           :before-upload="beforeUpload"
                           :data="fileUploadData"
                           :on-exceed="onExceed"
                           :before-remove="contentImgHandleRemove"
                           :on-success="contentImgHandleSuccess">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="内容文字" prop="articleContentText">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="createForm.articleContentText">
                </el-input>
            </el-form-item>
            <el-form-item label="是否收费" prop="chargeType">
                <el-switch v-model="createForm.chargeType" :active-value="1" :inactive-value="2" @change="switchChargeType">
                </el-switch>
            </el-form-item>
            <el-form-item label="金额" prop="price">
                <el-input-number v-model="createForm.price" :disabled="createForm.chargeType == 2" :precision="2" :step="1" :max="9999.99"></el-input-number>
            </el-form-item>
            <el-form-item label="文章状态" prop="articleStatus">
                <el-radio-group v-model="createForm.articleStatus">
                    <el-radio :label="1">未开始</el-radio>
                    <el-radio :label="2">进行中</el-radio>
                    <el-radio :label="3">已结束</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否发布" prop="releaseStatus">
                <el-switch v-model="createForm.releaseStatus" :active-value="1" :inactive-value="2">
                </el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="createLoading" @click="onSubmit">立即创建</el-button>
                <router-link to="/article/list">
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
            return {
                fileUploadAction: setFileUploadUrl(),
                FileUploadHeaders: {Authorization: token},
                fileUploadData:{
                    fileType:'article'
                },
                previewImgList: [],
                contentImgList: [],
                authorOptionsLoading: false, //作者下拉数据loading
                authorOptions: [], //作者下拉数据
                createLoading: false, //创建确定按钮loading
                createForm: {
                    articleTitle: '',
                    articleDesc: '',
                    articleType: '',
                    authorId: '',
                    articlePreviewImg: '',
                    articlePreviewText: '',
                    articleContentImg: '',
                    articleContentText: '',
                    chargeType: 1,
                    price: '',
                    articleStatus: '',
                    releaseStatus: 2
                },
                rules: {
                    articleTitle: [{
                        required: true,
                        message: '请输入文章标题',
                        trigger: 'blur'
                    }],
                    articleDesc: [{
                        required: true,
                        message: '请输入文章描述',
                        trigger: 'blur'
                    }],
                    articleType: [{
                        required: true,
                        message: '请选择文章类型',
                        trigger: 'change'
                    }],
                    authorId: [{
                        required: true,
                        message: '请选择作者',
                        trigger: 'change'
                    }],
                    articleStatus: [{
                        required: true,
                        message: '请选择文章状态',
                        trigger: 'change'
                    }]
                }
            }
        },
        created() {
            this.initAuthorSelectOptions();
        },
        methods: {
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
            previewImgHandleRemove(file) {
                let reqInfo = {
                    fileName: file.name
                };
                this.$api.deleteFile(reqInfo).then(res => {
                    if(res.resultCode == "1000"){
                        this.previewImgList.splice(this.previewImgList.find( img => {
                            return img.name === file.name;
                        }), 1);
                        this.createForm.articlePreviewImg = '';
                        return true;
                    }
                });
                return false;
            },
            //文件上传成功的钩子函数
            previewImgHandleSuccess(response) {
                if (response.resultCode == "1000"){
                    this.previewImgList.push(response.value);
                    this.createForm.articlePreviewImg = response.value.url;
                }
            },
            //删除文件之前的钩子函数
            contentImgHandleRemove(file) {
                let reqInfo = {
                    fileName: file.name
                };
                this.$api.deleteFile(reqInfo).then(res => {
                    if(res.resultCode == "1000"){
                        this.contentImgList.splice(this.contentImgList.find( img => {
                            return img.name === file.name;
                        }), 1);
                        this.createForm.articleContentImg = '';
                        return true;
                    }
                });
                return false;
            },
            //文件上传成功的钩子函数
            contentImgHandleSuccess(response) {
                if (response.resultCode == "1000"){
                    this.contentImgList.push(response.value);
                    this.createForm.articleContentImg = response.value.url;
                }
            },
            initAuthorSelectOptions() {
                this.authorOptionsLoading = true;
                this.$api.getAuthorSelectOptions().then(res => {
                    if(res.resultCode == "1000"){
                        this.authorOptions = res.values;
                    }
                    this.authorOptionsLoading = false;
                }).catch((res) => {
                    this.authorOptionsLoading = false;
                });
            },
            switchChargeType(val) {
                if (val == 2){
                    this.createForm.price = 0;
                }
            },
            onSubmit() {
                this.$refs.createForm.validate((valid) => {
                    if (valid) {
                        this.createLoading = true;
                        this.$api.articleAdd(this.createForm).then(res => {
                            this.createLoading = false;
                            if(res.resultCode == "1000"){
                                this.$message.success('创建成功！');
                                this.$router.push({ path: '/article/list'});
                            }
                        }).catch((res) => {
                            this.createLoading = false;
                        });
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>