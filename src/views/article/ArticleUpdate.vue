<template>
    <div class="app-container">
        <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="100px">
            <el-form-item label="文章标题" prop="articleTitle">
                <el-input v-model="updateForm.articleTitle"></el-input>
            </el-form-item>
            <el-form-item label="文章描述" prop="articleDesc">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="updateForm.articleDesc">
                </el-input>
            </el-form-item>
            <el-form-item label="文章类型" prop="articleType">
                <el-radio-group v-model="updateForm.articleType">
                    <el-radio :label="1">足球</el-radio>
                    <el-radio :label="2">篮球</el-radio>
                    <el-radio :label="3">足篮混合</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="作者" prop="authorId">
                <el-select v-model="updateForm.authorId" placeholder="请选择" :loading="authorOptionsLoading">
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
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="updateForm.articlePreviewText">
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
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="updateForm.articleContentText">
                </el-input>
            </el-form-item>
            <el-form-item label="是否收费" prop="chargeType">
                <el-switch v-model="updateForm.chargeType" :active-value="1" :inactive-value="2" @change="switchChargeType">
                </el-switch>
            </el-form-item>
            <el-form-item label="金额" prop="price">
                <el-input-number v-model="updateForm.price" :disabled="updateForm.chargeType == 2" :precision="2" :step="1" :max="9999.99"></el-input-number>
            </el-form-item>
            <el-form-item label="文章状态" prop="articleStatus">
                <el-radio-group v-model="updateForm.articleStatus">
                    <el-radio :label="1">未开始</el-radio>
                    <el-radio :label="2">进行中</el-radio>
                    <el-radio :label="3">已结束</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否发布" prop="releaseStatus">
                <el-switch v-model="updateForm.releaseStatus" :active-value="1" :inactive-value="2">
                </el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="updateLoading" @click="onSubmit">修改</el-button>
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
                updateLoading: false, //修改按钮loading
                updateForm: {
                    articleId: '',
                    articleTitle: '',
                    articleDesc: '',
                    articleType: '',
                    authorId: '',
                    articlePreviewImg: '',
                    articlePreviewText: '',
                    articleContentImg: '',
                    articleContentText: '',
                    chargeType: '',
                    price: '',
                    articleStatus: '',
                    releaseStatus: ''
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
            this.initUpdateFormData();
        },
        methods: {
            // 初始化表单数据
            initUpdateFormData() {
                let reqInfo={
                    articleId: this.$route.query.articleId
                }
                this.$api.getByArticleId(reqInfo).then(res => {
                    if(res.resultCode == "1000"){
                        this.updateForm.articleId = res.value.articleId;
                        this.updateForm.articleTitle = res.value.articleTitle;
                        this.updateForm.articleDesc = res.value.articleDesc;
                        this.updateForm.articleType = res.value.articleType;
                        this.updateForm.authorId = res.value.authorId;
                        this.updateForm.articlePreviewImg = res.value.articlePreviewImg;
                        this.updateForm.articlePreviewText = res.value.articlePreviewText;
                        this.updateForm.articleContentImg = res.value.articleContentImg;
                        this.updateForm.articleContentText = res.value.articleContentText;
                        this.updateForm.chargeType = res.value.chargeType;
                        this.updateForm.price = res.value.price;
                        this.updateForm.articleStatus = res.value.articleStatus;
                        this.updateForm.releaseStatus = res.value.releaseStatus;

                        if (res.value.articlePreviewImg != ""){
                            let noHttpArticlePreviewImgUrl = res.value.articlePreviewImg.split('?')[0].split('//')[1];
                            let start = noHttpArticlePreviewImgUrl.indexOf("/");
                            let previewImgItem = {
                                name: noHttpArticlePreviewImgUrl.substring(start + 1),
                                url: res.value.articlePreviewImg
                            }
                            this.previewImgList.push(previewImgItem);
                        }

                        if (res.value.articleContentImg != ""){
                            let noHttpContentImgUrlArr = res.value.articleContentImg.split('?')[0].split('//')[1];
                            let start = noHttpContentImgUrlArr.indexOf("/");
                            let contentImgItem = {
                                name: noHttpContentImgUrlArr.substring(start + 1),
                                url: res.value.articleContentImg
                            }
                            this.contentImgList.push(contentImgItem);
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
            previewImgHandleRemove(file) {
                let reqInfo = {
                    fileName: file.name
                };
                this.$api.deleteFile(reqInfo).then(res => {
                    if(res.resultCode == "1000"){
                        this.previewImgList.splice(this.previewImgList.find( img => {
                            return img.name === file.name;
                        }), 1);
                        this.updateForm.articlePreviewImg = '';
                        return true;
                    }
                });
                return false;
            },
            //文件上传成功的钩子函数
            previewImgHandleSuccess(response) {
                if (response.resultCode == "1000"){
                    this.previewImgList.push(response.value);
                    this.updateForm.articlePreviewImg = response.value.url;
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
                        this.updateForm.articlePreviewImg = '';
                        return true;
                    }
                });
                return false;
            },
            //文件上传成功的钩子函数
            contentImgHandleSuccess(response) {
                if (response.resultCode == "1000"){
                    this.contentImgList.push(response.value);
                    this.updateForm.articleContentImg = response.value.url;
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
                    this.updateForm.price = 0;
                }
            },
            onSubmit() {
                this.$refs.updateForm.validate((valid) => {
                    if (valid) {
                        this.updateLoading = true;
                        this.$api.articleUpdate(this.updateForm).then(res => {
                            this.updateLoading = false;
                            if(res.resultCode == "1000"){
                                this.$message.success('修改成功！');
                                this.$router.push({ path: '/article/list'});
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