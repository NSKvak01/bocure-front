import React from 'react'
import{BrowserRouter as Router, Route} from "react-router-dom"
import Login from './components/Login/Login'
import Bocure from './components/Bocure/Bocure'
import Signup from './components/Signup/Signup'
import Nav from './components/Nav/Nav'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

const MainRouter = (props) => {
        return (
            <Router>
                <Nav user={props.user} handleUserLogout={props.handleUserLogout}/>
                <React.Fragment >
                    <Route exact path="/login" render={(routerProps)=><Login {...routerProps} handleUserLogin={props.handleUserLogin}/>}/>
                    <Route exact path="/sign-up" component={Signup} />
                    <PrivateRoute exact path="/bocure" component={Bocure} />
                </React.Fragment>
            </Router>
        )
}

export default MainRouter
