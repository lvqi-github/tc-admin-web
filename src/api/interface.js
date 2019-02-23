import axios from './http'

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

export default {
    userLogin,
    getUserInfo
}