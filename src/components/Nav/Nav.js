import React, { Component } from 'react'
import { Link, NavLink} from 'react-router-dom'
import "./Nav.css"


export class Nav extends Component {
    render() {
        return (
            <nav className="nav">
                <div className="logo">
                    <h1>
                        <Link  className="logolink" to ="/bocure">Cure your boredom. <p>Bocure!</p></Link>
                    </h1>
                </div>
                <div className="menu">
                    <ul>
                        <li>
                            {this.props.user ? (
                                <NavLink className="navlink" activeClassName="selected" to="/bocure">
                                Bocure search
                                </NavLink>
                            ) : (
                                ""
                            )}
                        </li>
                        <li>
                            {this.props.user ? (
                                <NavLink className="navlink" activeClassName="selected" to="/my-bocure">
                                My bocures
                                </NavLink>
                            ) : (
                                ""
              )}
                        </li>
                        <li>
                            {this.props.user ? (
                                <NavLink className="navlink" activeClassName="selected" to="/profile">
                                    Welcome back - {this.props.user.username}
                                </NavLink>
                            ):(
                                <NavLink className="navlink" activeClassName="selected" to="/sign-up">
                                    Sign up
                                </NavLink>
                            )}
                        </li>
                        <li>
                            {this.props.user ?(
                                <NavLink className="navlink" to="/bocure" onClick={this.props.handleUserLogout}>
                                    Logout
                                </NavLink>
                            ):(
                                <NavLink className="navlink" to="/login" activeStyle={{ borderBottom: "1px solid white" }}>
                                    Login
                                </NavLink>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Nav
