import axios from 'axios'
import qs from 'qs'
import router from '../router'
import store from '../store'
import { setBaseUrl } from './config.js'
import { sign } from '@/util/signUtil'
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

    //封装请求参数
    let params = {
        appId: store.state.app.appId, //appId
        timestamp: new Date().getTime() //时间戳
    };

    if (config.method.toLocaleLowerCase() === 'post') {
        for (let key in config.data) {
            params[key] = config.data[key]; //添加进参数列表
        }
        // 添加签名参数
        params['sign'] = sign(params, store.state.app.appSecret);
        config.data = qs.stringify(params);
    }else if(config.method.toLocaleLowerCase() === 'get'){
        for (let key in config.params) {
            params[key] = config.params[key]; //添加进参数列表
        }
        // 添加签名参数
        params['sign'] = sign(params, store.state.app.appSecret);
        config.params = params;
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