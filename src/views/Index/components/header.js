
import { MenuFoldOutlined } from '@ant-design/icons';
import './header.scss'
const Header = props => {
    const { collapsed, setcollapsed } = props
    return (
        <div className={collapsed? "collapsed-close" : ""}>
            <h1 className="logo"><span>Logo</span></h1>
            <div className="header-wrap">
                <span className="collapsed-icon"><MenuFoldOutlined onClick={e => { setcollapsed(!collapsed) }} /> </span>
            </div>
        </div>
    )

}
export default Header