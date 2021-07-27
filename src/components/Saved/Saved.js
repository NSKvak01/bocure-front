import React, { Component } from 'react'
import Axios from '../utils/Axios'
import { toast } from 'react-toastify'
import SavedList from './MyBocure'
import "../Bocure/Bocure.css"

export class Saved extends Component {
    state={
        savedList:[]
    }

    async componentDidMount(){
        this.handleGetAllBocures()
    }

    handleGetAllBocures = async ()=>{
        try {
            let getAllBocures = await Axios.get("/api/bocure/get-all-bocures")
            this.setState({
                savedList:getAllBocures.data.bocures
            })
            console.log(getAllBocures)
        } catch (error) {
            toast.error(error.data)
        }
    }

    saveBocure = async(event)=>{
        event.preventDefault()
        try {
                let newBocure = {
                    activity:this.props.activity,
                    accessibility:this.props.accessibility,
                    type:this.props.type,
                    participants:+this.props.participants,
                    price:this.props.price,
                    link:this.props.link,
                }
                let save = await Axios.post("/api/bocure/add-bocure", newBocure)
                toast.success(`Bocure saved`);
                this.props.handleSavedList([...this.props.savedList, save.data])
                console.log(this.props.savedList)
        } catch (error) {
            toast.error(error)
            console.log(error)
        }
    }

    render() {
        return (
            <React.Fragment>
                    <button className="button" id="saveButton" onClick={this.saveBocure}>Save for later</button>
            </React.Fragment>
        )
    }
}

export default Saved
