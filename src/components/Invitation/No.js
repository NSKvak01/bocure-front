import React, { Component } from 'react'
import "./Invitation.css"


export class No extends Component {
    handleSignup = ()=>{
        this.props.history.push("/sign-up")
    }
    render() {
        return (
            <div className="group">
                <h1 className="invitation">Invitation is declined.</h1>
                <h3>Want to find more interesting bocures?</h3>
                <button onClick={this.handleSignup}>Check here!</button>
            </div>
        )
    }
}

export default No
