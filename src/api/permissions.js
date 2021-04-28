import serves from '../utils/request'
/*
 * 获取权限
 */
export function getRole(data = {}) {
    return serves.request({
        url: '/role/',
        method: 'post',
        data
    })
}

