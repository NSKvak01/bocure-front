import React, { Component } from 'react'
import { toast } from 'react-toastify'
import SavedList from './SavedList'
import Axios from '../utils/Axios'
import "./MyBocures.css"

export class MyBocure extends Component {
    state={
        savedList:[],
        noBocures:false
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
            if(this.state.savedList.length===0){
                this.setState({
                    noBocures:true
                })
            } else{
                this.setState({
                    noBocures:false
                })
            }
            console.log(getAllBocures)
        } catch (error) {
            toast.error(error.data)
        }
    }

    deleteBocure = async(_id)=>{
        try{
            let deleteBocure = await Axios.delete(`/api/bocure/delete-bocure/${_id}`)
            let filteredArray = this.state.savedList.filter((item)=>
                item._id!==deleteBocure.data._id
            )
            this.setState({
                savedList:filteredArray
            }, ()=>{
                if(this.state.savedList.length===0){
                    this.setState({
                        noBocures:true
                    })
                } else {
                    this.setState({
                        noBocures:false
                    })
                }
            })
            
        } catch(e){
            console.log(e)
        }
    }



    render() {
        console.log(this.state.savedList)
        return (
            <div>
                {this.state.noBocures ? (
                    <div className="group">
                        <h3>Want to find more interesting bocures?</h3>
                        <button onClick={this.handleSignup}>Check here!</button>
                    </div>
                ):""}
                <ul className="list">
                    {this.state.savedList.map((item)=>{
                        return <SavedList 
                        key={item._id}
                        item={item}
                        savedList={this.props.savedList}
                        handleSavedList={this.props.handleSavedList}
                        deleteBocure = {this.deleteBocure}
                        /> 
                    })}
                </ul>

                
            </div>
        )
    }
}

export default MyBocure
