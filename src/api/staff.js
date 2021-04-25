import serves from '../utils/request'
/*
 * 职位列表
 */
export function staffAdd(data) {
    return serves.request({
        url: '/staff/add/',
        method: 'post',
        data
    })
}
