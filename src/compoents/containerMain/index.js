import { Switch } from 'react-router-dom'
import AddUsers from '../../views/user/Add'
import Users from '../../views/user/Index'
//私有组件
import PrivateRouter from '../privateRouter/index'
const Main = (props) => {
    return (
        <Switch>
            <PrivateRouter exact path="/index/" component={Users}></PrivateRouter>
            <PrivateRouter exact path="/index/user/list" component={Users}></PrivateRouter>
            <PrivateRouter exact path="/index/user/add" component={AddUsers}></PrivateRouter>
        </Switch>
    )

}

export default Main