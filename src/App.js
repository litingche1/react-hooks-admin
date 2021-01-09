/*
 * @Author: Your name
 * @Date:   2021-01-07 00:55:07
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-09 16:38:23
 */

import { Route, HashRouter, Switch } from 'react-router-dom'
import Login from './views/Login'
// import Info from './views/Info'
// import Home from './views/Home'
import React from 'react'
function App() {
    return (
        <div className="App">
            <HashRouter>
                <Switch>
                    <Route component={Login} exact path="/" />
                    {/* <Route component={Login} path="/login" />
                    <Route component={Info} path="/info" /> */}
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
