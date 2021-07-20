import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import checkUser from '../utils/checkUser'

const PrivateRoute = ({component:Component, handleUserLogout, ...rest})=>{
    return (
        <Route {...rest}
        render={(routerProps)=>
            checkUser() ? <Component {...routerProps} handleUserLogout={handleUserLogout} />
            : <Redirect to="/login"/>}
            />
    )
}

export default PrivateRoute
