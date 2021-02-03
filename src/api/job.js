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