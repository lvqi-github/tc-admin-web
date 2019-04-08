<template>
    <div class="app-container">

        <el-table :data="jobList" v-loading="listLoading" element-loading-text="Loading" border fit>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="description" label="名称">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="120" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'warning'">{{scope.row.status === 1 ? '运行中' : '停止'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="300">
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button v-show="scope.row.status == 1" size="small" type="danger" @click="handleStop(scope.$index, scope.row)">停止</el-button>
                    <el-button v-show="scope.row.status == 2" size="small" @click="handleStart(scope.$index, scope.row)">启动</el-button>
                    <el-button size="small" type="primary" @click="handleRunOnce(scope.$index, scope.row)">执行</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    let jobData = [
        {schedulerName: "refreshWeChatBaseAccessTokenJobScheduler", jobDetailName: "refreshWeChatBaseAccessTokenJobDetail", description: "刷新微信基础accessToken调度任务", status: 2, remark: "1小时一次"},
        {schedulerName: "syncWeChatPublicAccountFocusOpenIdJobScheduler", jobDetailName: "syncWeChatPublicAccountFocusOpenIdJobDetail", description: "同步微信公众号关注用户数据调度任务", status: 2, remark: "每日5点执行"},
        {schedulerName: "pushTemplateMessageJobScheduler", jobDetailName: "pushTemplateMessageJobDetail", description: "推送模板消息任务", status: 2, remark: "5分钟执行一次"},
        {schedulerName: "clearTemplateMessageDataJobScheduler", jobDetailName: "clearTemplateMessageDataJobDetail", description: "清除模板消息数据任务", status: 2, remark: "每日3-7点 1小时执行一次"},
        {schedulerName: "queryWeChatOrderPayStatusJobScheduler", jobDetailName: "queryWeChatOrderPayStatusJobDetail", description: "查询微信订单支付状态任务", status: 2, remark: "30分钟执行一次"}
    ];

    export default {
        data() {
            return {
                jobList: [], // 列表数据
                listLoading: false, //列表loading
                startAndStopJob:{
                    schedulerName: ''
                },
                runOnceJob:{
                    jobDetailName: ''
                }
            }
        },
        created() {
            this.initJobListData()
        },
        methods: {
            initJobListData() {
                this.listLoading = true;
                this.$api.getAllJobStatus().then(res => {
                    if(res.resultCode == "1000"){
                        for(let item in res.value){
                            for(let j in jobData) {
                                if(jobData[j].schedulerName == item){
                                    jobData[j].status = res.value[item];
                                }
                            }
                        }
                        this.jobList = jobData;
                    }
                    this.listLoading = false;
                })
            },
            handleStart:function (index, row) {
                let self = this;
                self.startAndStopJob.schedulerName = row.schedulerName;

                this.$api.jobStart(self.startAndStopJob).then(res => {
                    if(res.resultCode == "1000"){
                        this.$message.success('启动成功！');
                        self.initJobListData();
                    }
                })
            },
            handleStop:function (index, row) {
                let self = this;
                self.startAndStopJob.schedulerName = row.schedulerName;

                this.$api.jobStop(self.startAndStopJob).then(res => {
                    if(res.resultCode == "1000"){
                        this.$message.success('停止成功！');
                        self.initJobListData();
                    }
                })
            },
            handleRunOnce:function (index, row) {
                let self = this;
                self.runOnceJob.jobDetailName = row.jobDetailName;

                this.$api.jobRunOnce(self.runOnceJob).then(res => {
                    if(res.resultCode == "1000"){
                        this.$message.success('执行成功！');
                    }
                })
            }
        }
    }
</script>