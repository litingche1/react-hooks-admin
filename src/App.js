import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Login from './views/Login'
import Home from './views/Index'
import {Provider} from 'react-redux'
import store from 'stroe'
//私有组件
import PrivateRouter from './compoents/privateRouter/index'
import React from 'react'
function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route component={Login} exact path="/" />
                        <PrivateRouter component={Home} path="/index" />
                    </Switch>
                </BrowserRouter>
            </Provider>

        </div>
    );
}

export default App;
