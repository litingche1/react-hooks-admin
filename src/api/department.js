import serves from '../utils/request'
/*
 * 部门新增
 */
export function DepartmentAddApi(data) {
    return serves.request({
        url: '/department/add/',
        method: 'post',
        data
    })
}

/*
 * 部门列表
 */
export function DepartmentGetList(data) {
    return serves.request({
        url: '/department/list/',
        method: 'post',
        data
    })
}
/*
 * 部门列表删除
 */
export function DepartmentDelete(data) {
    return serves.request({
        url: '/department/delete/',
        method: 'post',
        data
    })
}
/*
 * 部门禁启用
 */
export function DepartmentStatus(data) {
    return serves.request({
        url: '/department/status/',
        method: 'post',
        data
    })
}
/*
 * 部门详情
 */
export function DepartmentDetailed(data) {
    return serves.request({
        url: '/department/detailed/',
        method: 'post',
        data
    })
}
/*
 * 部门修改
 */
export function DepartmentEdit(data) {
    return serves.request({
        url: '/department/edit/',
        method: 'post',
        data
    })
}