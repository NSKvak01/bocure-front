import React, { Component } from 'react'
import Axios from '../utils/Axios'
import BocureList from './BocureList'
import BocureItem from './BocureItem'

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
        bocureList:[]

    }
    handleOnSubmit = async(event)=>{
        event.preventDefault()
        try {
            let result = await Axios.get(`/api/bocure/get-bocures-from-api?maxprice=${this.state.maxPriceInput}&participants=${this.state.participantsInput}&type=${this.state.typeInput}`)
            if(result !== undefined){
                this.setState({
                    activity:result.data.activity,
                    link:result.data.link,
                    key:result.data.key,
                    participants:result.data.participants
                })
                if(result.data.price<0.2){
                    this.setState({
                        price:"💵"
                    })
                } else if (result.data.price<0.5){
                    this.setState({
                        price:"💵💵"
                    })
                } else {
                    this.setState({
                        price:"💵💵💵"
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
                        type:"🎓Education"
                    })
                }
                if(result.data.type === "recreational"){
                    this.setState({
                        type:"🤸‍♀️ Recreational"
                    })
                }
                if(result.data.type === "social"){
                    this.setState({
                        type:"🗣 Social"
                    })
                }
                if(result.data.type === "diy"){
                    this.setState({
                        type:"✂️ DIY"
                    })
                }
                if(result.data.type === "charity"){
                    this.setState({
                        type:"🙌 Charity"
                    })
                }
                if(result.data.type === "cooking"){
                    this.setState({
                        type:"🤤 Cooking"
                    })
                }
                if(result.data.type === "relaxation"){
                    this.setState({
                        type:"🛀 Relaxation"
                    })
                }
                if(result.data.type === "music"){
                    this.setState({
                        type:"🎶 Music"
                    })
                }
                if(result.data.type === "busywork"){
                    this.setState({
                        type:"💡 Busywork"
                    })
                }
            }
            let searchedBocure={
                activity:this.state.activity,
                accessibility:this.state.accessibility,
                link:result.data.link,
                key:this.state.key,
                type:this.state.type,
                price:this.state.price,
                participants:this.state.participants
                
            }
            this.state.bocureList.push(searchedBocure)
            console.log(this.state.bocureList)
        } catch (error) {
            console.log(error)
        }
    }
    
    handlePrice = (event)=>{
        if(event.target.value==="Free"){
            this.setState({
                maxPriceInput:"0"
            })
        } else if(event.target.value==="Paid"){
            this.setState({
                maxPriceInput:"1"
            })
        } else {
            this.setState({
                maxPriceInput:""
            })
        }
    }

    handleType = (event)=>{
        if(event.target.value !== "Type"){
            this.setState({
                typeInput:event.target.value.toLowerCase()
            }) 
        }else {
            this.setState({
                typeInput:""
            })
        }
    }

    handleParticipants = (event)=>{
        if(event.target.value !== "Participants"){
            this.setState({
                participantsInput:event.target.value[0]
            })
        } else {
            this.setState({
                participantsInput:""
            })
        }
    }

    render() {
        const {activity, price, type, participants, accessibility, link, bocureList, key} = this.state
        return (
            <div>
                <div>
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
                    <div>
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
                        <button onClick={this.handleOnSubmit}>Find Bocure</button>
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
                <div>
                    <ul>
                    <BocureList 
                    bocureList={bocureList}
                    />
                    </ul>
                </div>
            </div>
        )
    }
}


export default Bocure
