import { setUserNameValue, setTokenValue,Login } from '../type'
import { setToken, setUsername } from '../../utils/cookies'
export const setTokenData = (data) => {
    setToken(data)
    return {
        type: setTokenValue,
        data
    }
}
export const setUserNameData = (data) => {
    setUsername(data)
    return {
        type: setUserNameValue,
        data
    }
}

export const updata=(data)=>{
    return {
        type:Login,
        data
    }
}
export const accountLogin=(data)=>dispatch=>{
    console.log(data)
    dispatch(updata(1111))
}