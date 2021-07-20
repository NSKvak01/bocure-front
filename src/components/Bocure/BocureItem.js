import React, { Component } from 'react'

export class BocureItem extends Component {
    render() {
        const {activity, price, type, participants, accessibility, link} = this.props

        return (
            <React.Fragment>
                {/* {activity &&(
                    <img src="https://pixy.org/download/4771681/"/>
                )} */}
                {activity && (
                    <h3>{`Activity: ${activity}`}</h3>
                    )}
                {type && (
                    <h3>{`Type: ${type}`}</h3>
                )}
                {price.toString() && (
                    <h3>{`Price: ${price}`}</h3>

                )}
                {accessibility.toString() && (
                    <h3>{`Accessibility: ${accessibility}`}</h3>

                )}
                {participants && (
                    <h3>{`Participants: ${participants}`}</h3>
                )}
                {link && (
                    <h3>{`Link: ${link}`}</h3>
                )}
            </React.Fragment>
        )
    }
}

export default BocureItem
