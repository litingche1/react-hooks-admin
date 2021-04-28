
import { MenuFoldOutlined ,CloseSquareTwoTone} from '@ant-design/icons';
import './header.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter, useHistory } from 'react-router-dom';
import{removeToken,removeUsername} from 'utils/cookies'
const Header = props => {
    const { collapsed, setcollapsed } = props
    const history = useHistory()
    //用户退出登录
    const LogOut=()=>{
      console.log(9999)
      removeToken()
      removeUsername()
      history.push('/')
    }
    return (
        <div className={collapsed? "collapsed-close" : ""}>
            <h1 className="logo"><span>Logo</span></h1>
            <div className="header-wrap">
                <span className="collapsed-icon"><MenuFoldOutlined onClick={e => { setcollapsed(!collapsed) }} /> </span>
                <span className="pull-right collapsed-icon-close"><CloseSquareTwoTone onClick={e=>{LogOut()}}/></span>   
            
            </div>
        </div>
    )

}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({//多个action的处理
            // setTokenData,
            // setUserNameData,
        }, dispatch)
    }
}
export default connect(
    null,
    mapDispatchToProps
)(withRouter(Header))
// export default Header