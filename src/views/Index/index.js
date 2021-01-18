import { Layout } from 'antd'
import './layout.scss'
import LayoutAside from './components/aside'
import LayoutHeader from './components/header'
import Main from '../../compoents/containerMain'
import { useState, useEffect } from 'react'
const { Header, Sider, Content } = Layout;
const collapsedes = JSON.parse(sessionStorage.getItem('collapsed'))
const Home = props => {
    const [collapsed, setcollapsed] = useState(false)
    useEffect(() => {
        setcollapsed(collapsedes ? collapsedes : false)
    }, [])
    //改变菜单收缩的状态
    const changeCollapsed = value => {
        sessionStorage.setItem('collapsed', JSON.stringify(value))
        setcollapsed(value)
    }
    return (
        <Layout className="layout-wrap">
            <Header className="layout-header"><LayoutHeader collapsed={collapsed} setcollapsed={changeCollapsed}></LayoutHeader></Header>
            <Layout>
                <Sider width="250px" collapsed={collapsed}><LayoutAside collapsed={collapsed}></LayoutAside></Sider>
                <Content className="layout-main">
                    <Main></Main>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Home