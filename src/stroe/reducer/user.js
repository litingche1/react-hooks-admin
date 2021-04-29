import { setUserNameValue, setTokenValue,Logout,Login } from '../type'
import { getToken, getUsername } from '../../utils/cookies'
const userData = {
    username: '' || getToken(),
    token: '' || getUsername(),
    router:''
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
        case Logout:{
            return{
                ...state,
                token: action.data,
                username: action.data
            }
        }
        case Login:{
            return{
                ...state,
                router: action.data,
            }
        }
        default:
            return state
    }


    // return state
}
export default userDataReducer
