/*
 * @Author: Your name
 * @Date:   2021-01-07 00:55:07
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-01-08 00:40:09
 */

import {  Route, HashRouter, Switch } from 'react-router-dom'
import Login from './views/Login'
import Info from './views/Info'
import Home from './views/Home'
import React from 'react'
function App() {
    return (
        <div className="App">
            <HashRouter>
                <Switch>
                    <Route component={Home} exact path="/" />
                    <Route component={Login} path="/login" />
                    <Route component={Info} path="/info" />
                </Switch>
            </HashRouter>
            {/*<h1>4444</h1>*/}
            {/*<header className="App-header">*/}
            {/*  <img src={logo} className="App-logo" alt="logo" />*/}
            {/*  <p>*/}
            {/*    Edit <code>src/App.js</code> and save to reload.*/}
            {/*  </p>*/}
            {/*  <a*/}
            {/*    className="App-link"*/}
            {/*    href="https://reactjs.org"*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*  >*/}
            {/*    Learn React*/}
            {/*  </a>*/}
            {/*</header>*/}
        </div>
    );
}

export default App;
