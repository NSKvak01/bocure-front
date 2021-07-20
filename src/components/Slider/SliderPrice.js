import React, { Component } from 'react'


export class Slider extends Component {
    state = {
        value:100,
    }

handleOnChange = (event)=>{this.setState({ value:event.target.value})}

    render() {
        return (
            <div>
                <input type="range" style={{width:300}} min={0} max={300} className="slider" value = {this.state.value} onChange={this.handleOnChange} />
                <div className="value">{this.state.value}</div>
            </div>
        )
    }
}

export default Slider
