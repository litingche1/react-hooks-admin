import { Layout } from 'antd'
import './layout.scss'
import LayoutAside from './components/aside'
import LayoutHeader from './components/header'
import Main from '../../compoents/containerMain'
import { useState, useEffect } from 'react'
const { Header, Sider, Content } = Layout;
const Home = props => {
    const [collapsed, setcollapsed] = useState(true)
    useEffect(() => {
        setcollapsed(sessionStorage.getItem('collapsed'))
    }, [])
    //改变菜单收缩的状态
    const changeCollapsed = value => {
        setcollapsed(value)
        sessionStorage.setItem('collapsed', value)
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