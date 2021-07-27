import React, { Component } from 'react'
import "./Invitation.css"


export class Maybe extends Component {
    handleSignup = ()=>{
        this.props.history.push("/sign-up")
    }
    render() {
        return (
            <React.Fragment>
                <div className="group">
                <h1 className="invitation">Contact your friend to get more details.</h1>
                <h3>Want to find more interesting bocures?</h3>
                <button onClick={this.handleSignup}>Check here!</button>
                </div>
            </React.Fragment>
        )
    }
}

export default Maybe
