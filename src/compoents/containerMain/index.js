import { Switch } from 'react-router-dom'
//私有组件
import PrivateRouter from '../privateRouter/index'
import components from './components'
const Main = (props) => {
    return (
        <Switch>
            {
                components.map(item => {
                    return <PrivateRouter exact key={item.path} path={item.path} component={item.component}></PrivateRouter>
                })
            }
        </Switch>
    )

}

export default Main