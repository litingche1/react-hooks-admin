import { Route, HashRouter, Switch } from 'react-router-dom'
import Login from './views/Login'
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
