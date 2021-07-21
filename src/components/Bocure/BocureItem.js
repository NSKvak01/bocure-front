import React, { Component } from 'react'
import Axios from '../utils/Axios'
import {CalendarComponent}  from '@syncfusion/ej2-react-calendars'
import '../../App.css'
import CalendarScheduler from './Email'

export class BocureItem extends Component {
    state={
        date:"",
        isSchedule:false,
    }
    
    componentDidMount(){
        var now = new Date().toString().slice(0,15)
        this.setState({
            date:now
        })
        console.log(now)
    }

    saveBocure = async()=>{
        try {
            let save = await Axios.post()
        } catch (error) {
            console.log(error)
        }
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
                <div>
                <button onClick={this.saveBocure}>Save for later</button>
                <button onClick={this.openCalendar}>Schedule activity</button>
                </div>
                {this.state.isSchedule&& (
                    <CalendarComponent value={this.state.date} onChange={this.calendarOnChange}><h3>{this.state.date}</h3></CalendarComponent>
                )}
                {this.state.isSchedule&& (
                    <CalendarScheduler 
                    activity={this.props.activity}
                    date={this.state.date}/>
                )}
            </React.Fragment>
        )
    }
}

export default BocureItem
