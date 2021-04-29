import { setUserNameValue, setTokenValue, LoginType } from '../type'
import { setToken, setUsername } from '../../utils/cookies'
import { Login } from '../../api/account'
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
//存储用户菜单
export const setRole = (data) => {
    return {
        type: LoginType,
        data
    }
}
//判断用户菜单权限
export const hasPermission = (roleList, router) => {
    if (router.role && router.role.length > 0) {
        return roleList.some(elm => router.role.indexOf(elm) >= 0)
    }
}
export const accountLogin = (data) => dispatch => {
    return Login(data).then(res => {
        if (res.data.resCode === 0) {
            //获取用户权限列表
            const roleList = res.data.data.role.split(',')
            let router = []
            //判断是否是超级管理员
            if (roleList.indexOf('admin') >= 0) {
                router = Router
            } else {
                //遍历菜单路由，过滤登录的用户拥有的菜单 
                router = Router.filter(item => {
                    if (hasPermission(roleList, item)) {
                        if (item.child && item.child.length > 0) {
                            item.child = item.child.filter(elem => {
                                if (hasPermission(roleList, elem)) {
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
            dispatch(setUserNameData(res.data.data.username))
            dispatch(setTokenData(res.data.data.token))
        }
    }).catch(err => {
        console.log(err)
    })


}