import React from 'react'
import{BrowserRouter as Router, Route} from "react-router-dom"
import Login from './components/Login/Login'
import Bocure from './components/Bocure/Bocure'
import Signup from './components/Signup/Signup'
import Nav from './components/Nav/Nav'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import MyBocure from './components/Saved/MyBocure'
import Profile from './components/Profile/Profile'
import Yes from './components/Invitation/Yes'
import No from './components/Invitation/No'
import Maybe from './components/Invitation/Maybe'

const MainRouter = (props) => {
    
        return (
            <Router>
                <Nav user={props.user} handleUserLogout={props.handleUserLogout}/>
                <React.Fragment >
                    <Route exact path="/login" render={(routerProps)=><Login {...routerProps} handleUserLogin={props.handleUserLogin}/>}/>
                    <Route exact path="/sign-up" component={Signup} />
                    <Route exact path="/yes" component={Yes} />
                    <Route exact path="/maybe" component={Maybe} />
                    <Route exact path="/no" component={No} />
                    <PrivateRoute exact path="/bocure" component={Bocure} />
                    <PrivateRoute exact path="/my-bocure" component={MyBocure} />
                    <PrivateRoute exact path="/profile" handleUserLogout={props.handleUserLogout} component={Profile} />
                </React.Fragment>
            </Router>
        )
}

export default MainRouter
