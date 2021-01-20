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