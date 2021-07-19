import React, { Component } from 'react'
import{BrowserRouter as Router, Route} from "react-router-dom"
import Login from './components/Login/Login'
import Bocure from './components/Bocure/Bocure'
import Signup from './components/Signup/Signup'
import Nav from './components/Nav/Nav'

const MainRouter = (props) => {
        return (
            <Router>
                <Nav user={props.user} handleUserLogout={props.handleUserLogout}/>
                <React.Fragment >
                    <Route exact path="/login" render={(routerProps)=><Login {...routerProps} handleUserLogin={props.handleUserLogin}/>}/>
                    <Route exact path="/bocure" component={Bocure} />
                    <Route exact path="/sign-up" component={Signup} />
                </React.Fragment>
            </Router>
        )
}

export default MainRouter
