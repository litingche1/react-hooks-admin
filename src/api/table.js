import serves from '../utils/request'
/*
 * 部门列表
 */
export function TableList(data) {
    return serves.request({
        url: data.url,
        method: data.method || 'post',
        data: data.params
    })
}
/*
 * 部门列表删除
 */
export function DeleteList(data) {
    return serves.request({
        url: data.url,
        method: data.method || 'post',
        data: data.params
    })
}