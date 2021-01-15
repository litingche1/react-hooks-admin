import { Route, HashRouter, Switch } from 'react-router-dom'
import Login from './views/Login'
import Home from './views/Index'
import React from 'react'
function App() {
    return (
        <div className="App">
            <HashRouter>
                <Switch>
                    <Route component={Login} exact path="/" />
                    <Route component={Home} path="/index" /> 
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
