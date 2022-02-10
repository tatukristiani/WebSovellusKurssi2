import React, {useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'

import Add from './components/Add'
import Register from './components/Register'
import List from './components/List'
import Login from './components/Login'
import {UserContext} from "./components/UserContext";
import {SessionContext} from "./components/SessionContext";


const App = () => {
    const [savedUser, setSavedUser] = useState(localStorage.getItem("user"));
    const [savedToken, setSavedToken] = useState(localStorage.getItem("myToken"));

    const padding = {
        padding: 5
    }

    return (
        <div className="container">
            <UserContext.Provider value={{savedUser, setSavedUser}}>
                <SessionContext.Provider value={{savedToken, setSavedToken}}>
                    <Router>
                        <div>
                            <Link style={padding} to="/">register</Link>
                            <Link style={padding} to="/login">login</Link>
                            <Link style={padding} to="/add">add</Link>
                            <Link style={padding} to="/list">list</Link>
                            {savedUser && <Link style={padding}>{savedUser}</Link>}
                        </div>
                        <Switch>
                            <Route path="/add">
                                <Add/>
                            </Route>
                            <Route path="/list">
                                <List/>
                            </Route>
                            <Route path="/login">
                                <Login/>
                            </Route>
                            <Route path="/">
                                <Register/>
                            </Route>
                        </Switch>
                        <div>
                            <i>Esimerkkivalikko </i>
                            <i>perustuu HY:n fullstackopen-kurssimateriaaliin</i>
                        </div>

                    </Router>
                </SessionContext.Provider>
            </UserContext.Provider>
        </div>
    )
}

export default App
