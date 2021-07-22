import React, { Component } from 'react'

export class No extends Component {
    handleSignup = ()=>{
        this.props.history.push("/sign-up")
    }
    render() {
        return (
            <div>
                <h1>Invitation is declined.</h1>
                <h3>Want to find more interesting bocures?</h3>
                <button onClick={this.handleSignup}>Check here!</button>
            </div>
        )
    }
}

export default No
