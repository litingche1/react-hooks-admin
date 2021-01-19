import axios from 'axios'
import { getToken, getUsername } from './cookies'
import { message } from 'antd'
//第一步创建实例
const serves = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 10000,

});

//第二步请求拦截
// 添加请求拦截器
serves.interceptors.request.use(function (config) {
    config.headers["Token"] = getToken()
    config.headers["Username"] = getUsername()
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//第三步响应拦截
// 添加响应拦截器
serves.interceptors.response.use(function (response) {
    let data = response.data
    if (data.resCode === 0) {
        return response
    } else {
        message.error(data.message)
        return Promise.reject(response);
    }
    // 对响应数据做点什么
}, function (error) {//http状态不为200的情况
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default serves

