import { Fragment, useState, useEffect } from "react"
import { Menu } from "antd"
import { UserOutlined } from '@ant-design/icons';
import Router from '../../router'
import { Link, withRouter, useLocation } from 'react-router-dom'
const { SubMenu } = Menu
const AsideMenu = props => {
    let location = useLocation();
    const [selectedKeys, setselectedKeys] = useState(['/index/user/list'])
    const [openKey, setopenKey] = useState(['/index/user'])
    const [RouterList, setRouterList] = useState([Router])
    useEffect(() => {
        setselectedKeys([location.pathname])
        const menuKey = location.pathname.split('/').slice(0, 3).join('/')
        setopenKey([menuKey])
    }, [location])
    useEffect(() => {
        //获取用户权限列表
        const roleList = sessionStorage.getItem('role').split(',')
        let router = []
        console.log(roleList)
        console.log(roleList.indexOf('admin')>= 0)
        //判断是否是超级管理员
        if (roleList.indexOf('admin') >= 0) {
            router = Router
            console.log('admin',router)
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
             console.log('其他',router)

        }

        setRouterList(router)
       
    }, [])
    const hasPermission = (roleList, router) => {
        if (router.role && router.role.length > 0) {
            return roleList.some(elm => router.role.indexOf(elm) >= 0)
        }
    }
    const MenuList = ({ key, title }) => {
        return (<Menu.Item key={key}>
            <Link to={key}>{title}</Link>
        </Menu.Item>)
    }
    const SubMenuList = ({ key, title, child }) => {
        return (

            <SubMenu key={key} icon={<UserOutlined />} title={title}>
                {
                    child && child.map(item => {
                        return item.child && item.child.length > 0 ? SubMenuList(item) : MenuList(item)
                    })

                }
            </SubMenu>
        )
    }
    //SubMenu 展开/关闭的回调
    const onOpenChange = (value) => {
        setopenKey(value.splice(-1, 1))
    }
    //点击 MenuItem 调用此函数
    const menuClick = ({ item, key, keyPath, domEvent }) => {
        setopenKey([key])
        setselectedKeys([keyPath[keyPath.length - 1]])
    }
    return (
        <Fragment>
            <Menu
                theme="dark"
                mode="inline"
                onClick={menuClick}
                selectedKeys={selectedKeys}
                openKeys={openKey}
                onOpenChange={onOpenChange}
                style={{ height: '100%', borderRight: 0 }}
            >
                {
                    RouterList && RouterList.map(item => {
                        return item.child && item.child.length > 0 ? SubMenuList(item) : MenuList(item)
                    })

                }
            </Menu>
        </Fragment>
    )

}

export default withRouter(AsideMenu)