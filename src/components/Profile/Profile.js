import React, { Component } from 'react'
import Axios from '../utils/Axios';
import { toast } from 'react-toastify';
import "./Profile.css"

export class Profile extends Component {
    state ={
        userFirstNameInput:"",
        userLastNameInput:"",
        usernameInput:"",
        passwordInput:"",
        userEmailInput:""
    }

    componentDidMount() {
        this.handleFetchUserInfo();
    }
    
    handleOnChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
    
        })
        // console.log(event.target.name, event.target.value)
    }
    handleFetchUserInfo= async()=>{
        try {
            let fetchedUserInfo = await Axios.get("/api/user/get-user-info")
            console.log(fetchedUserInfo)
                this.setState({
                    userFirstNameInput: fetchedUserInfo.data.payload.firstName,
                    userLastNameInput: fetchedUserInfo.data.payload.lastName,
                    usernameInput:fetchedUserInfo.data.payload.username,
                    userEmailInput:fetchedUserInfo.data.payload.email,
                    passwordInput:fetchedUserInfo.data.payload.password,
            })
        } catch (error) {
            
        }
    }
    
    handleDeleteProfile= async(event)=>{
        event.preventDefault()
        try {
            let deleteUser= await Axios.delete("/api/user/delete-user")
            this.props.handleUserLogout()
            this.props.history.push("/sign-up")
        } catch (error) {
            
        }
    }

    handleUserUpdateSubmit = async(event)=>{
        event.preventDefault()
        try {
            let updatedUserProfile = await Axios.put("/api/user/update-user-profile",
            {
                fistName:this.state.userFirstNameInput,
                lastName:this.state.userLastNameInput,
                username:this.state.usernameInput,
                password:this.state.passwordInput
            })
        if (updatedUserProfile.status===202){
            this.props.handleUserLogout()
            this.props.history.push("/login")
        } else{
            this.setState({
                userFirstNameInput:updatedUserProfile.data.payload.firstName,
                userLastNameInput:updatedUserProfile.data.payload.lastName,
                usernameInput:updatedUserProfile.data.payload.username,
                // passwordInput:updatedUserProfile.data.payload.password
            })
        }
    
            toast.success("Profile Updated")
        } catch (error) {
            toast.error(error)
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="maindiv">
                    <div className="div">
                        <h2 className="section-title">Change profile</h2>
                        <form className="user" onSubmit={this.handleUserUpdateSubmit}>
                            <div className="noButton">
                            <div>
                            <label htmlFor="firstname">First name</label>
                            <br />
                            <input if="firstname" name="userFirstNameInput" value={this.state.userFirstNameInput} onChange={this.handleOnChange} placeholder="First name"/>
                            </div>
                            <div>
                            <label htmlFor="lastname">Last name</label>
                            <br />
                            <input id="lastname" name="userLastNameInput" value={this.state.userLastNameInput} onChange={this.handleOnChange}  placeholder="Last name"/>
                            </div>
                            <div>
                            <label htmlFor="username">Username</label>
                            <br />
                            <input  id="username" name= "usernameInput" value={this.state.usernameInput} onChange={this.handleOnChange}  placeholder="Username"/>
                            </div>
                            <div>
                            <label htmlFor="email">Email</label>
                            <br />
                            <input  id="email" defaultValue={this.state.userEmailInput} disabled={true} placeholder="Email"/>
                            </div>
                            <div>
                            <label htmlFor="password">Password</label>
                            <br />
                            <input id="password" name= "passwordInput" value={this.state.passwordInput} onChange={this.handleOnChange}  placeholder="Password"/>
                            </div>
                            </div>
                            <div>
                            <button className="buttonSubmit" type="submit">Submit</button>
                            </div>
                        </form>
                        <div onClick= {this.handleDeleteProfile} className="deleteProfile">Delete profile</div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default Profile
