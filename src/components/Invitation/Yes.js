import React, { Component } from 'react'
import "./Invitation.css"

export class Yes extends Component {
    handleSignup = ()=>{
        this.props.history.push("/sign-up")
    }
    render() {
        return (
            <React.Fragment>
                <div className="group">
                <h1 className="invitation">The invitation is accepted.</h1>
                <h3>Want to find more interesting bocures?</h3>
                <button onClick={this.handleSignup}>Check here!</button>
                </div>
            </React.Fragment>
        )
    }
}

export default Yes
