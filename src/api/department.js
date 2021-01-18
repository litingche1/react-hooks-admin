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