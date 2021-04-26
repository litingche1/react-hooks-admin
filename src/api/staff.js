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
/*
 * 禁启用
 */
export function staffStatus(data) {
    return serves.request({
        url: '/staff/status/',
        method: 'post',
        data
    })
}
/*
 * 职员详情
 */
export function staffDetailed(data) {
    return serves.request({
        url: '/staff/detailed/',
        method: 'post',
        data
    })
}

/*
 * 职员修改
 */
export function staffEdit(data) {
    return serves.request({
        url: '/staff/edit/',
        method: 'post',
        data
    })
}

