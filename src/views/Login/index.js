import { useState } from 'react'
import LoginFrom from './LoginFrom'
import RetisterFrom from './RegisterFrom'
import './index.scss'
const Login = (props) => {
    const [fromType, setfromType] = useState('login')
    return (
        <div className="form-warp">
            <div>
                {fromType === 'login' ? <LoginFrom showFromType={setfromType}></LoginFrom> : <RetisterFrom showFromType={setfromType}></RetisterFrom>}
            </div>
        </div>
    )
}

export default Login
