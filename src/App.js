/*import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */

import React, {useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'

import Add from './components/Add'
import Home from './components/Home'
import List from './components/List'
import axios from 'axios'


/*const Notes = () => {

    return(
        <div>
            <p>Valinta 1.</p>
        </div>
    )
} */

/*const Users = () => {

    return(
        <div>
            <p>Valinta 2.</p>
        </div>
    )
}*/

/*const Home = () => {
    return(
        <div>
            <p>Koti</p>
        </div>
    )
}*/

const App = () => {
    const padding = {
        padding: 5
    }

    const [nodes, setNodes] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/nodes')
        .then(response => {
            setNodes(response.data)
        })
    }, [])

    return (
        <div className="container">
            <Router>
                <div>
                    <Link style={padding} to="/">home</Link>
                    <Link style={padding} to="/add">add</Link>
                    <Link style={padding} to="/list">list</Link>
                </div>

                <Switch>
                    <Route path="/add">
                        <Add/> 
                    </Route>
                    <Route path="/list">
                        <List nodes={nodes}/>
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>

                <div>
                    <i>Esimerkkivalikko </i>
                    <i>perustuu HY:n fullstackopen-kurssimateriaaliin</i>
                </div>
            </Router>
        </div>
    )
}

export default App
