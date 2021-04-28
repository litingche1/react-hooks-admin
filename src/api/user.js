import serves from '../utils/request'
/*
 * 用户添加
 */
export function userAdd(data) {
    return serves.request({
        url: '/user/add/',
        method: 'post',
        data
    })
}
/*
 * 用户禁启用
 */
export function userstatus(data) {
    return serves.request({
        url: '/user/status/',
        method: 'post',
        data
    })
}
/*
 * 用户详情
 */
export function userDetailed(data) {
    return serves.request({
        url: '/user/detailed/',
        method: 'post',
        data
    })
}
/*
 * 用户编辑
 */
export function userEdit(data) {
    return serves.request({
        url: '/user/edit/',
        method: 'post',
        data
    })
}
