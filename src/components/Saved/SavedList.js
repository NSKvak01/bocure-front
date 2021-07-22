import React, { Component } from 'react'
import "./MyBocures.css"

export class SavedList extends Component {
    handleSignup = ()=>{
        this.props.history.push("/sign-up")
    }
    render() {
        return (
            <div className="oneItem">
                <li className="item">
                    <div className="withButton">
                        <div className="noButtonMain">
                        <div className="noButton">
                            <p>{`Activity: ${this.props.item.activity}`}</p>
                            <p>{`Type: ${this.props.item.type}`}</p>
                            <p>{`Price: ${this.props.item.price}`}</p>
                            <p>{`Accessibility: ${this.props.item.accessibility}`}</p>
                            <p>{`Participants: ${this.props.item.participants}`}</p>
                            {this.props.item.link && (
                                <p>{`Link: ${this.props.item.link}`}</p>
                            )}
                        </div>
                        </div>
                        <div >
                            <button className="delete" onClick = {()=>this.props.deleteBocure(this.props.item._id)}>Delete</button>
                        </div>
                    </div>
                </li>
            </div>
        )
    }
}

export default SavedList
