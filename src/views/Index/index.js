import { Layout } from 'antd'
import './layout.scss'
import LayoutAside from './components/aside'
import LayoutHeader from './components/header'
const { Header, Sider, Content } = Layout;
const Home = props => {
    return (
        <Layout className="layout-wrap">
            <Header className="layout-header"><LayoutHeader></LayoutHeader></Header>
            <Layout>
                <Sider width="250px"><LayoutAside></LayoutAside></Sider>
                <Content className="layout-main">内容</Content>
            </Layout>
        </Layout>
    )
}

export default Home