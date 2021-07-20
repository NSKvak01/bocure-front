import React, { Component } from 'react'
import SliderPrice from "../Slider/SliderPrice"
import BocureList from './BocureList'

export class Bocure extends Component {

    render() {
        return (
            <div>
                <div>

                    <div className="dropdown">
                        <select className="select">
                            <option>Type of activity</option>
                            <option>Education</option>
                            <option>Recreational</option>
                            <option>Social</option>
                            <option>DIY</option>
                            <option>Charity</option>
                            <option>Cooking</option>
                            <option>Relaxation</option>
                            <option>Music</option>
                            <option>Busywork</option>
                        </select>
                    </div>
                    <div>
                        <SliderPrice />
                    </div>
                    <div className="dropdown">
                        <select className="select">
                            <option>Number of participants</option>
                            <option>1 person</option>
                            <option>2 ppl</option>
                            <option>3 ppl</option>
                            <option>4 ppl</option>
                            <option>5 ppl</option>
                            <option>6 ppl</option>
                            <option>7 ppl</option>
                            <option>8 ppl</option>
                            <option>9 ppl</option>
                            <option>10 ppl</option>
                        </select>
                    </div>
                    <div>
                    <select className="select">
                            <option>Accessibility</option>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Difficult</option>
                        </select>
                    </div>
                    <button>Find Bocure</button>
                </div>
                <div>
                    <ul>
                    <BocureList />
                    </ul>
                </div>
            </div>
        )
    }
}

export default Bocure
