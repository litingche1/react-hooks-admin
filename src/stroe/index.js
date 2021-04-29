import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
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

// const rootReducer = combineReducers(allReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const rootReducer = combineReducers(allReducer)
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
export default store;
