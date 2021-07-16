import React, { Component } from 'react'
import{BrowserRouter as Router, Route} from "react-router-dom"
import Login from './src/components/Login/Login'
import Bocure from './src/components/Bocure/Bocure'

const MainRouter =(props)=> {
        return (
            <Router>
                <Route exact path="/login" component={Login} />
                <Route exact path="/bocure" component={Bocure}
            </Router>
        )
}

export default MainRouter
