import React, { Component } from 'react'

export class Yes extends Component {
    handleSignup = ()=>{
        this.props.history.push("/sign-up")
    }
    render() {
        return (
            <React.Fragment>
                <h1>The invitation is accepted.</h1>
                <h3>Want to find more interesting bocures?</h3>
                <button onClick={this.handleSignup}>Check here!</button>
            </React.Fragment>
        )
    }
}

export default Yes
