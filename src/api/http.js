import axios from 'axios'
import qs from 'qs'
import router from '../router'
import { setBaseUrl } from './config.js'
import { Message } from 'element-ui'

axios.defaults.baseURL = setBaseUrl();
axios.defaults.timeout = 10000;

/**
 * 请求拦截器
 */
axios.interceptors.request.use(config => {
    // 从localStorage获取token
    let token = window.localStorage.getItem("admin_token");
    config.headers.common['Authorization'] = `${token}`;

    if (config.method.toLocaleLowerCase() === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config
}, error => {
    return Promise.reject(error);// 错误提示
})

/**
 * 响应拦截器
 */
axios.interceptors.response.use(response => {
    let res = response.data;
    if (res.resultCode != "1000") {
        switch (res.resultCode) {
            case '4502': // 重新授权
                localStorage.removeItem('admin_token');
                router.replace({ path: '/login'});
                break;
            default:
                Message({
                    message: res.resultCode + res.resultMsg,
                    type: 'error',
                    duration: 5 * 1000
                })
                break;
        }
    }
    return response.data;
}, error => {
    return Promise.reject(error)
})

export default axios