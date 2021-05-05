import { setUserNameValue, setTokenValue, Logout, LoginType, setMemu } from '../type'
import { getToken, getUsername } from '../../utils/cookies'
const userData = {
    username: '' || getToken(),
    token: '' || getUsername(),
    router: [],
    selectedPermissions: {}
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
        case Logout: {
            return {
                ...state,
                token: action.data,
                username: action.data
            }
        }
        case LoginType: {
            return {
                ...state,
                router: action.data,
            }
        }
        case setMemu: {
            return {
                ...state,
                selectedPermissions: action.data,
            }
        }
        default:
            return state
    }


    // return state
}
export default userDataReducer
