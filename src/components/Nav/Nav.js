import React, { Component } from 'react'
import { Link, NavLink} from 'react-router-dom'


export class Nav extends Component {
    render() {
        return (
            <nav>
                <div>
                    <h1>
                        <Link to ="/bocure">Cure your boredom. Bocure!</Link>
                    </h1>
                </div>
                <div>
                    <ul>
                        <li>
                            {this.props.user ? (
                                <NavLink activeClassName="selected" to="/bocure">
                                Bocure search
                                </NavLink>
                            ) : (
                                ""
              )}
                        </li>
                        <li>
                            {this.props.user ? (
                                <NavLink activeClassName="selected" to="/profile">
                                    Welcome back - {this.props.user.username}
                                </NavLink>
                            ):(
                                <NavLink activeClassName="selected" to="/sign-up">
                                    Sign up
                                </NavLink>
                            )}
                        </li>
                        <li>
                            {this.props.user ?(
                                <NavLink to="/bocure" activeStyle={{ borderBottom: "1px solid white" }} onClick={this.props.handleUserLogout}>
                                    Logout
                                </NavLink>
                            ):(
                                <NavLink to="/login" activeStyle={{ borderBottom: "1px solid white" }}>
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
