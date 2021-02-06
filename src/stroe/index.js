import {createStore,combineReducers} from 'redux'
import job from './reducer/job'
import department from './reducer/department'
import config from './reducer/config'
import userData from './reducer/user'
const allReducer={
    department,
    job,
    config,
    userData,
}

const rootReducer = combineReducers(allReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const store = createStore(rootReducer);
export default store;
