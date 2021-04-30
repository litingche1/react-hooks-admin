import { Fragment, useState, useEffect } from "react"
import { Menu } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, withRouter, useLocation } from 'react-router-dom'
import { getRoleList } from 'stroe/action/user'
const { SubMenu } = Menu
const AsideMenu = props => {
    let location = useLocation();
    const [selectedKeys, setselectedKeys] = useState(['/index/user/list'])
    const [openKey, setopenKey] = useState(['/index/user'])
    useEffect(() => {
        setselectedKeys([location.pathname])
        const menuKey = location.pathname.split('/').slice(0, 3).join('/')
        setopenKey([menuKey])
    }, [location])
    useEffect(()=>{
      props.actions.getRoleList()
    },[])
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
    const { RouterList } = props
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
const mapStateToProps = (state) => {
    return {
        RouterList: state.userData.router
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({//多个action的处理
            getRoleList
        }, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AsideMenu))