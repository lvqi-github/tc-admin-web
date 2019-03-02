import axios from './http'

// -------------------------- 用户 -------------------------------------
export const userLogin = params => {
    return axios({
        url: '/login/userLogin',
        method: 'post',
        params
    })
}

export const getUserInfo = params => {
    return axios({
        url: '/login/getUserInfo',
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
        url: '/record/getHitRecordTypeList',
        method: 'get',
        params
    })
}

export const getHitRecordList = params => {
    return axios({
        url: '/record/getHitRecordList',
        method: 'get',
        params
    })
}

export const hitRecordAdd = params => {
    return axios({
        url: '/record/hitRecordAdd',
        method: 'post',
        params
    })
}

export const getByRecordId = params => {
    return axios({
        url: '/record/getByRecordId',
        method: 'get',
        params
    })
}

export const hitRecordUpdate = params => {
    return axios({
        url: '/record/hitRecordUpdate',
        method: 'post',
        params
    })
}


export default {
    userLogin,
    getUserInfo,
    deleteFile,
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