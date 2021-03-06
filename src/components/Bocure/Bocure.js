import React, { Component } from 'react'
import Axios from '../utils/Axios'
import BocureItem from './BocureItem'
import "./Bocure.css"

export class Bocure extends Component {
    state={
        typeInput:"",
        participantsInput:"",
        maxPriceInput:"",
        activity:"",
        type:"",
        price:"",
        participants:"",
        accessibility:"",
        link:"",
        key:"",
        errorMessage:"",
    }
    renderBocures =(result)=>{
        this.setState({
            activity:result.data.activity,
            link:result.data.link,
            key:result.data.key,
            participants:result.data.participants,
        })
        if(result.data.price<0.2){
            this.setState({
                price:"π΅"
            })
        } else if (result.data.price<0.5){
            this.setState({
                price:"π΅π΅"
            })
        } else {
            this.setState({
                price:"π΅π΅π΅"
            })
        }
        if(result.data.accessibility < 0.5){
            this.setState({
                accessibility:"Easily accessible"
            })
        } else if(result.data.accessibility<1){
            this.setState({
                accessibility:"Accessible"
            })
        } else {
            this.setState({
                accessibility:"Medium accessibility"
            })
        }
        if(result.data.type === "education"){
            this.setState({
                type:"πEducation"
            })
        }
        if(result.data.type === "recreational"){
            this.setState({
                type:"π€ΈββοΈ Recreational"
            })
        }
        if(result.data.type === "social"){
            this.setState({
                type:"π£ Social"
            })
        }
        if(result.data.type === "diy"){
            this.setState({
                type:"βοΈ DIY"
            })
        }
        if(result.data.type === "charity"){
            this.setState({
                type:"π Charity"
            })
        }
        if(result.data.type === "cooking"){
            this.setState({
                type:"π€€ Cooking"
            })
        }
        if(result.data.type === "relaxation"){
            this.setState({
                type:"π Relaxation"
            })
        }
        if(result.data.type === "music"){
            this.setState({
                type:"πΆ Music"
            })
        }
        if(result.data.type === "busywork"){
            this.setState({
                type:"π‘ Busywork"
            })
        }
        console.log(result)
    }
    
    componentDidMount(){
        
        // let sessionStorageBocureItem = window.sessionStorage.getItem("bocureItem")
        try {
            this.getBocuresByKey()
            
        } catch (error) {
            console.log(error)
        }
    }
    
    getBocuresByKey = async()=>{
        if(window.sessionStorage.getItem("bocureKey")){
            let key = window.sessionStorage.getItem("bocureKey")
            let result = await Axios.get(`/api/bocure/get-bocure-by-key?key=${key}`)
            this.renderBocures(result)
        } else{
            let result = await Axios.get(`/api/bocure/get-bocures-from-api?maxprice=${this.state.maxPriceInput}&participants=${this.state.participantsInput}&type=${this.state.typeInput}`)
            this.renderBocures(result)
        }
    }
    
    componentDidUpdate(){
        console.log(this.state.bocureList)
        
    }

    handleOnSubmit = async(event)=>{
        event.preventDefault()
        try {
            this.setState({
                errorMessage:""
            })
            let result = await Axios.get(`/api/bocure/get-bocures-from-api?maxprice=${this.state.maxPriceInput}&participants=${this.state.participantsInput}&type=${this.state.typeInput}`)
            if(result.data.error===undefined){
                    this.renderBocures(result)
                    let bocureKey = result.data.key
                    window.sessionStorage.setItem("bocureKey", bocureKey)
                } else{
                this.setState({
                    errorMessage:result.data.error,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    handlePrice = (event)=>{
        if(event.target.value==="Free"){
            this.setState({
                errorMessage:"",
                maxPriceInput:"0"
            })
        } else if(event.target.value==="Paid"){
            this.setState({
                errorMessage:"",
                maxPriceInput:"1"
            })
        } else {
            this.setState({
                errorMessage:"",
                maxPriceInput:""
            })
        }
    }

    handleType = (event)=>{
        if(event.target.value !== "Type"){
            this.setState({
                errorMessage:"",
                typeInput:event.target.value.toLowerCase()
            }) 
        }else {
            this.setState({
                errorMessage:"",
                typeInput:""
            })
        }
    }

    handleParticipants = (event)=>{
        if(event.target.value !== "Participants"){
            this.setState({
                participantsInput:event.target.value[0],
                errorMessage:""
            })
        } else {
            this.setState({
                participantsInput:"",
                errorMessage:""
            })
        }
    }


    render() {
        const {activity, price, type, participants, accessibility, link, key} = this.state
        return (
            <div className="bocure">
                <div className="filtersSpan">
                <div className="filters">
                    <div className="dropdown">
                        <select className="select" onChange={this.handleType}>
                            <option>Type</option>
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
                    <div className="dropdown">
                        <select className="select" onChange={this.handlePrice}>
                            <option>Price</option>
                            <option>Free</option>
                            <option>Paid</option>
                        </select>
                    </div>
                    <div className="dropdown">
                        <select className="select" onChange={this.handleParticipants}>
                            <option>Participants</option>
                            <option>1 person</option>
                            <option>2 people</option>
                            <option>3 people</option>
                            <option>4 people</option>
                            <option>5 people</option>
                            <option>6 people</option>
                            <option>7 people</option>
                            <option>8 people</option>
                        </select>
                    </div>
                    <div>
                        <button className="select-filters" onClick={this.handleOnSubmit}>Find Bocure</button>
                    </div>
                </div>
                <div>
                    <span className="searchError">{this.state.errorMessage && this.state.errorMessage}</span>
                </div>
                </div>
                <div>
                    <BocureItem 
                    activity = {activity}
                    price={price}
                    type={type}
                    participants={participants}
                    accessibility={accessibility}
                    link={link}
                    key={key}
                    />
                </div>
            </div>
        )
    }
}


export default Bocure
