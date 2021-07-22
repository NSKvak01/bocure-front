import React, { Component } from 'react'

export class Maybe extends Component {
    handleSignup = ()=>{
        this.props.history.push("/sign-up")
    }
    render() {
        return (
            <React.Fragment>
                <h1>Contact your friend to get more details.</h1>
                <h3>Want to find more interesting bocures?</h3>
                <button onClick={this.handleSignup}>Check here!</button>
            </React.Fragment>
        )
    }
}

export default Maybe
