import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Login from './views/Login'
import Home from './views/Index'
//私有组件
import PrivateRouter from './compoents/privateRouter/index'
import React from 'react'
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route component={Login} exact path="/" />
                    <PrivateRouter component={Home} path="/index" />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
