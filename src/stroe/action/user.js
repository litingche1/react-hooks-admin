import { setUserNameValue, setTokenValue } from '../type'
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