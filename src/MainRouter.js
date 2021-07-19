import React, { Component } from 'react'
import{BrowserRouter as Router, Route} from "react-router-dom"
import Login from './components/Login/Login'
import Bocure from './components/Bocure/Bocure'
import Signup from './components/Signup/Signup'

const MainRouter =(props)=> {
        return (
            <Router>
                <React.Fragment >
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/bocure" component={Bocure} />
                    <Route exact path="/sign-up" component={Signup} />
                </React.Fragment>
            </Router>
        )
}

export default MainRouter
