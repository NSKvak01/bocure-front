import React, { Component } from 'react'
import Axios from '../utils/Axios'
import {CalendarComponent}  from '@syncfusion/ej2-react-calendars'
import '../../App.css'
import CalendarScheduler from './Email'
import {toast} from "react-toastify"
import Saved from '../Saved/Saved'
import "./Bocure.css"


export class BocureItem extends Component {
    state={
        date:"",
        isSchedule:false,
        
    }
    
    async componentDidMount(){
        var now = new Date().toString().slice(0,15)
        this.setState({
            date:now
        })
        console.log(now)
    }

    calendarOnChange = (event)=>{
        this.setState({
            date:event.target.changedArgs.value.toString().slice(0,15)
        })
        console.log(this.state.date)
    }

    openCalendar = ()=>{
        this.setState({
            isSchedule:!this.state.isSchedule
        })
    }

    render() {
        const {activity, price, type, participants, accessibility, link} = this.props
        return (
            <React.Fragment>
                <div className="infomain">
                    <div className="info">
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
                    </div>
                    <div>
                        <Saved 
                        activity={activity}
                        price={price}
                        type={type}
                        accessibility={accessibility}
                        participants={participants}
                        link={link}
                        />
                        <button className="button" onClick={this.openCalendar}>Schedule activity</button>
                    </div>
                    </div>
                    <div className="calendar" >
                    {this.state.isSchedule&& (
                        <CalendarComponent value={this.state.date} onChange={this.calendarOnChange}><h3>{this.state.date}</h3></CalendarComponent>
                    )}
                    </div>
                    {this.state.isSchedule&& (
                        <CalendarScheduler 
                        activity={activity}
                        date={this.state.date}
                        price={price}
                        participants={participants}
                        link={link}/>
                    )}
            </React.Fragment>
        )
    }
}

export default BocureItem
