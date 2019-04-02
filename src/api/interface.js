import axios from './http'

// -------------------------- 登陆 -------------------------------------
export const adminUserLogin = params => {
    return axios({
        url: '/login/adminUserLogin',
        method: 'post',
        data: params
    })
}

export const getAdminUserInfo = params => {
    return axios({
        url: '/login/getAdminUserInfo',
        method: 'get',
        params: params
    })
}

// -------------------------- 文件 -------------------------------------
export const deleteFile = params => {
    return axios({
        url: '/upload/deleteFile',
        method: 'post',
        data: params
    })
}

// -------------------------- 系统 -------------------------------------
export const jobStart = params => {
    return axios({
        url: '/jobManager/start',
        method: 'post',
        data: params
    })
}

export const jobStop = params => {
    return axios({
        url: '/jobManager/stop',
        method: 'post',
        data: params
    })
}

export const getAllJobStatus = params => {
    return axios({
        url: '/jobManager/getAllJobStatus',
        method: 'get',
        params: params
    })
}

export const jobRunOnce = params => {
    return axios({
        url: '/jobManager/runOnce',
        method: 'post',
        data: params
    })
}

// -------------------------- 用户 -------------------------------------
export const getUserList = params => {
    return axios({
        url: '/user/getUserList',
        method: 'get',
        params: params
    })
}

// -------------------------- 会员 -------------------------------------
export const getMemberList = params => {
    return axios({
        url: '/member/getMemberList',
        method: 'get',
        params: params
    })
}

// -------------------------- 会员充值套餐 -------------------------------------
export const getMemberRechargePackageList = params => {
    return axios({
        url: '/memberRechargePackage/getMemberRechargePackageList',
        method: 'get',
        params: params
    })
}

export const memberRechargePackageAdd = params => {
    return axios({
        url: '/memberRechargePackage/memberRechargePackageAdd',
        method: 'post',
        data: params
    })
}

export const memberRechargePackageUpdate = params => {
    return axios({
        url: '/memberRechargePackage/memberRechargePackageUpdate',
        method: 'post',
        data: params
    })
}

// -------------------------- 订单 ------------------------------------
export const getOrderTypeList = params => {
    return axios({
        url: '/order/getOrderTypeList',
        method: 'get',
        params: params
    })
}

export const getOrderPayStatusList = params => {
    return axios({
        url: '/order/getOrderPayStatusList',
        method: 'get',
        params: params
    })
}

export const getOrderList = params => {
    return axios({
        url: '/order/getOrderList',
        method: 'get',
        params: params
    })
}

// -------------------------- 会员充值记录 ------------------------------------
export const getMemberRechargeRecordList = params => {
    return axios({
        url: '/memberRechargeRecord/getMemberRechargeRecordList',
        method: 'get',
        params: params
    })
}

// -------------------------- 文章购买记录 ------------------------------------
export const getArticlePurchaseRecordList = params => {
    return axios({
        url: '/articlePurchaseRecord/getArticlePurchaseRecordList',
        method: 'get',
        params: params
    })
}

// -------------------------- 作者 ------------------------------------
export const getAuthorList = params => {
    return axios({
        url: '/author/getAuthorList',
        method: 'get',
        params: params
    })
}

export const getPlatformSourceList = params => {
    return axios({
        url: '/author/getPlatformSourceList',
        method: 'get',
        params: params
    })
}

export const getAuthorSelectOptions = params => {
    return axios({
        url: '/author/getAuthorSelectOptions',
        method: 'get',
        params: params
    })
}

export const authorAdd = params => {
    return axios({
        url: '/author/authorAdd',
        method: 'post',
        data: params
    })
}

export const authorUpdate = params => {
    return axios({
        url: '/author/authorUpdate',
        method: 'post',
        data: params
    })
}

// -------------------------- 文章 ------------------------------------
export const getArticleList = params => {
    return axios({
        url: '/article/getArticleList',
        method: 'get',
        params: params
    })
}

export const articleAdd = params => {
    return axios({
        url: '/article/articleAdd',
        method: 'post',
        data: params
    })
}

export const getByArticleId = params => {
    return axios({
        url: '/article/getByArticleId',
        method: 'get',
        params: params
    })
}

export const articleUpdate = params => {
    return axios({
        url: '/article/articleUpdate',
        method: 'post',
        data: params
    })
}

export const articleGeneratePushJob = params => {
    return axios({
        url: '/article/articleGeneratePushJob',
        method: 'post',
        data: params
    })
}

// -------------------------- 战绩 ------------------------------------
export const getHitRecordTypeList = params => {
    return axios({
        url: '/hitRecord/getHitRecordTypeList',
        method: 'get',
        params: params
    })
}

export const getHitRecordList = params => {
    return axios({
        url: '/hitRecord/getHitRecordList',
        method: 'get',
        params: params
    })
}

export const hitRecordAdd = params => {
    return axios({
        url: '/hitRecord/hitRecordAdd',
        method: 'post',
        data: params
    })
}

export const getByRecordId = params => {
    return axios({
        url: '/hitRecord/getByRecordId',
        method: 'get',
        params: params
    })
}

export const hitRecordUpdate = params => {
    return axios({
        url: '/hitRecord/hitRecordUpdate',
        method: 'post',
        data: params
    })
}

// -------------------------- 作者订阅 ------------------------------------
export const getUserAuthorSubscribeList = params => {
    return axios({
        url: '/userAuthorSubscribe/getUserAuthorSubscribeList',
        method: 'get',
        params: params
    })
}

// -------------------------- 模板消息推送 ------------------------------------
export const getTemplateMessagePushStatusList = params => {
    return axios({
        url: '/templateMessagePush/getTemplateMessagePushStatusList',
        method: 'get',
        params: params
    })
}

export const getTemplateMessagePushList = params => {
    return axios({
        url: '/templateMessagePush/getTemplateMessagePushList',
        method: 'get',
        params: params
    })
}


export default {
    adminUserLogin,
    getAdminUserInfo,
    deleteFile,
    jobStart,
    jobStop,
    getAllJobStatus,
    jobRunOnce,
    getUserList,
    getMemberList,
    getMemberRechargePackageList,
    memberRechargePackageAdd,
    memberRechargePackageUpdate,
    getOrderTypeList,
    getOrderPayStatusList,
    getOrderList,
    getMemberRechargeRecordList,
    getArticlePurchaseRecordList,
    getAuthorList,
    getPlatformSourceList,
    getAuthorSelectOptions,
    authorAdd,
    authorUpdate,
    getArticleList,
    articleAdd,
    getByArticleId,
    articleUpdate,
    articleGeneratePushJob,
    getHitRecordTypeList,
    getHitRecordList,
    hitRecordAdd,
    getByRecordId,
    hitRecordUpdate,
    getUserAuthorSubscribeList,
    getTemplateMessagePushStatusList,
    getTemplateMessagePushList
}