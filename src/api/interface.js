import axios from './http'

// -------------------------- 登陆 -------------------------------------
export const adminUserLogin = params => {
    return axios({
        url: '/login/adminUserLogin',
        method: 'post',
        params
    })
}

export const getAdminUserInfo = params => {
    return axios({
        url: '/login/getAdminUserInfo',
        method: 'get',
        params
    })
}

// -------------------------- 文件 -------------------------------------
export const deleteFile = params => {
    return axios({
        url: '/upload/deleteFile',
        method: 'post',
        params
    })
}

// -------------------------- 用户 -------------------------------------
export const getUserList = params => {
    return axios({
        url: '/user/getUserList',
        method: 'get',
        params
    })
}

// -------------------------- 会员 -------------------------------------
export const getMemberList = params => {
    return axios({
        url: '/member/getMemberList',
        method: 'get',
        params
    })
}

// -------------------------- 会员充值套餐 -------------------------------------
export const getMemberRechargePackageList = params => {
    return axios({
        url: '/memberRechargePackage/getMemberRechargePackageList',
        method: 'get',
        params
    })
}

export const memberRechargePackageAdd = params => {
    return axios({
        url: '/memberRechargePackage/memberRechargePackageAdd',
        method: 'post',
        params
    })
}

export const memberRechargePackageUpdate = params => {
    return axios({
        url: '/memberRechargePackage/memberRechargePackageUpdate',
        method: 'post',
        params
    })
}

// -------------------------- 订单 ------------------------------------
export const getOrderTypeList = params => {
    return axios({
        url: '/order/getOrderTypeList',
        method: 'get',
        params
    })
}

export const getOrderPayStatusList = params => {
    return axios({
        url: '/order/getOrderPayStatusList',
        method: 'get',
        params
    })
}

export const getOrderList = params => {
    return axios({
        url: '/order/getOrderList',
        method: 'get',
        params
    })
}

// -------------------------- 会员充值记录 ------------------------------------
export const getMemberRechargeRecordList = params => {
    return axios({
        url: '/memberRechargeRecord/getMemberRechargeRecordList',
        method: 'get',
        params
    })
}

// -------------------------- 文章购买记录 ------------------------------------
export const getArticlePurchaseRecordList = params => {
    return axios({
        url: '/articlePurchaseRecord/getArticlePurchaseRecordList',
        method: 'get',
        params
    })
}

// -------------------------- 作者 ------------------------------------
export const getAuthorList = params => {
    return axios({
        url: '/author/getAuthorList',
        method: 'get',
        params
    })
}

export const getPlatformSourceList = params => {
    return axios({
        url: '/author/getPlatformSourceList',
        method: 'get',
        params
    })
}

export const getAuthorSelectOptions = params => {
    return axios({
        url: '/author/getAuthorSelectOptions',
        method: 'get',
        params
    })
}

export const authorAdd = params => {
    return axios({
        url: '/author/authorAdd',
        method: 'post',
        params
    })
}

export const authorUpdate = params => {
    return axios({
        url: '/author/authorUpdate',
        method: 'post',
        params
    })
}

// -------------------------- 文章 ------------------------------------
export const getArticleList = params => {
    return axios({
        url: '/article/getArticleList',
        method: 'get',
        params
    })
}

export const articleAdd = params => {
    return axios({
        url: '/article/articleAdd',
        method: 'post',
        params
    })
}

export const getByArticleId = params => {
    return axios({
        url: '/article/getByArticleId',
        method: 'get',
        params
    })
}

export const articleUpdate = params => {
    return axios({
        url: '/article/articleUpdate',
        method: 'post',
        params
    })
}

// -------------------------- 战绩 ------------------------------------
export const getHitRecordTypeList = params => {
    return axios({
        url: '/hitRecord/getHitRecordTypeList',
        method: 'get',
        params
    })
}

export const getHitRecordList = params => {
    return axios({
        url: '/hitRecord/getHitRecordList',
        method: 'get',
        params
    })
}

export const hitRecordAdd = params => {
    return axios({
        url: '/hitRecord/hitRecordAdd',
        method: 'post',
        params
    })
}

export const getByRecordId = params => {
    return axios({
        url: '/hitRecord/getByRecordId',
        method: 'get',
        params
    })
}

export const hitRecordUpdate = params => {
    return axios({
        url: '/hitRecord/hitRecordUpdate',
        method: 'post',
        params
    })
}


export default {
    adminUserLogin,
    getAdminUserInfo,
    deleteFile,
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
    getHitRecordTypeList,
    getHitRecordList,
    hitRecordAdd,
    getByRecordId,
    hitRecordUpdate
}