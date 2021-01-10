import axios from 'axios'

//第一步创建实例
const serves = axios.create({
    baseURL: '/devApi',
    timeout: 10000,

});

//第二步请求拦截
// 添加请求拦截器
serves.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//第三步响应拦截
// 添加响应拦截器
serves.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default serves

