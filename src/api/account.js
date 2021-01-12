import serves from '../utils/request'
// `params` 是即将与请求一起发送的 URL 参数,意思就是get请求的时候使用params作为传递参数
// 必须是一个无格式对象(plain object)或 URLSearchParams 对象
//   params: {
//     ID: 12345
//   },
// `data` 是作为请求主体被发送的数据
// 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
// 在没有设置 `transformRequest` 时，必须是以下类型之一：
// - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
// - 浏览器专属：FormData, File, Blob
// - Node 专属： Stream
//   data: {
//     firstName: 'Fred'
//   },
/*
 * 登录接口
 */
export function Login(data) {
    serves.request({
        url: '/login/',
        method: 'post',
        data
    })
}
/*
 * 登录获取验证码
 */
export function Getsms(data) {
    serves.request({
        url: '/getSms/',
        method: 'post',
        data
    })
}