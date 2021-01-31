import { setUserNameValue, setTokenValue } from '../type'
import { getToken, getUsername } from '../../utils/cookies'
const userData = {
    username: '' || getToken(),
    token: '' || getUsername()
}
const userDataReducer = (state = userData, action) => {
    switch (action.type) {
        case setUserNameValue: {
            return {
                ...state,
                username: action.data
            }
        }
        case setTokenValue: {
            return {
                ...state,
                token: action.data
            }
        }
        default:
            return state
    }


    // return state
}
export default userDataReducer
