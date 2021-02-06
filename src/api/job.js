import serves from '../utils/request'
/*
 * 职位列表
 */
export function GetJobAdd(data) {
    return serves.request({
        url: '/job/add/',
        method: 'post',
        data
    })
}
/*
 * 职位详情
 */
export function JobDetailed(data) {
    return serves.request({
        url: '/job/detailed/',
        method: 'post',
        data
    })
}
/*
 * 职位修改
 */
export function JobEdit(data) {
    return serves.request({
        url: '/job/edit/',
        method: 'post',
        data
    })
}
/*
 * 禁启用
 */
export function JobStatus(data) {
    return serves.request({
        url: '/job/status/',
        method: 'post',
        data
    })
}