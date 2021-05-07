import { setUserNameValue, setTokenValue, LoginType, setMemu } from '../type'
import { setToken, setUsername } from '../../utils/cookies'
import { Login } from '../../api/account'
import { getRole } from 'api/user'
import Router from '../../router'
export const setTokenData = (data) => {
    setToken(data)
    return {
        type: setTokenValue,
        data
    }
}
export const setUserNameData = (data) => {
    setUsername(data)
    return {
        type: setUserNameValue,
        data
    }
}
//设置选中的菜单权限(根据管理员选中的权限)
export const setMemuPermissions = (data) => {
    return {
        type: setMemu,
        data
    }
}
//存储用户菜单
export const setRole = (data) => {
    return {
        type: LoginType,
        data
    }
}
// //判断用户菜单权限
// export const hasPermission = (roleList, router) => {
//     if (router.role && router.role.length > 0) {
//         return roleList.some(elm => router.role.indexOf(elm) >= 0)
//     }
// }
//登录逻辑
export const accountLogin = (data) => dispatch => {
    return Login(data).then(res => {
        if (res.data.resCode === 0) {
            dispatch(setUserNameData(res.data.data.username))
            dispatch(setTokenData(res.data.data.token))
        }
    }).catch(err => {
        console.log(err)
    })

}
//根据用户菜单判断用户菜单权限
export const hasPermission = (menu, router) => {
    if (router.key && router.key.length > 0) {
        let menuData=menu.map(item=>`/index${item}`)
        return menuData.includes(router.key)
    }
}
//获取用户菜单权限
export const getRoleList = () => dispatch => {
    return getRole().then(res => {
        if (res.data.resCode === 0) {
            //获取用户权限列表
            const menu = res.data.data.menu&&res.data.data.menu.split(',')
            let router = []
        
            //判断是否是超级管理员
            if (!res.data.data.menu) {
          
                router = Router
            } else {
                //遍历菜单路由，过滤登录的用户拥有的菜单 
                router = Router.filter(item => {//第一层菜单判断
                    if (hasPermission(menu, item)) {
                        if (item.child && item.child.length > 0) {
                            item.child = item.child.filter(elem => {//第二层菜单判断
                                if (hasPermission(menu, elem)) {
                                    return elem
                                }
                            })
                            return item
                        }
                        return item
                    }
                })


            }
            dispatch(setRole(router))
        }
    }).catch(err => {
        console.log(err)
    })
}
// //获取用户角色
// export const getRoleList = () => dispatch => {
//     return getRole().then(res => {
//         if (res.data.resCode === 0) {
//             //获取用户权限列表
//             const roleList = res.data.data.role.split(',')
//             let router = []
//             //判断是否是超级管理员
//             if (roleList.indexOf('admin') >= 0) {
//                 router = Router
//             } else {
//                 //遍历菜单路由，过滤登录的用户拥有的菜单 
//                 router = Router.filter(item => {
//                     if (hasPermission(roleList, item)) {
//                         if (item.child && item.child.length > 0) {
//                             item.child = item.child.filter(elem => {
//                                 if (hasPermission(roleList, elem)) {
//                                     return elem
//                                 }
//                             })
//                             return item
//                         }
//                         return item
//                     }
//                 })


//             }
//             dispatch(setRole(router))
//         }
//     }).catch(err => {
//         console.log(err)
//     })
// }