<template>
    <div class="app-container">
        <el-button type="primary" :loading="buttonLoading" @click="initWeChatMenu">初始化微信菜单</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                buttonLoading: false, //按钮loading
            }
        },
        methods: {
            initWeChatMenu() {
                this.buttonLoading = true;
                this.$api.initWeChatMenu(null).then(res => {
                    this.buttonLoading = false;
                    if(res.resultCode == "1000" && res.value){
                        this.$message.success('初始化成功！');
                    }
                }).catch((res) => {
                    this.buttonLoading = false;
                });
            }
        }
    }
</script>