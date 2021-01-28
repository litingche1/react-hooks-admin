import {createStore,combineReducers} from 'redux'
import job from './reducer/job'
import department from './reducer/department'
import config from './reducer/config'

const allReducer={
    department,
    job,
    config
}

const rootReducer = combineReducers(allReducer)

const store = createStore(rootReducer);
export default store;
