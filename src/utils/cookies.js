import cookies from 'react-cookies';
const token = 'adminToken'
const username = 'username'
//存储token
export function setToken(value) {
    return cookies.save(token, value)
}
//获取token
export function getToken() {
    return cookies.load(token)
}
//存储用户名
export function setUsername(value) {
    return cookies.save(username, value)
}
//获取用户名
export function getUsername(value) {
    return cookies.load(username)
}