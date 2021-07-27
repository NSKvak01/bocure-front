import React, { Component } from 'react'
import "./Login.css"
import {toast} from "react-toastify"
import Axios from "../utils/Axios"
import jwtDecode from "jwt-decode"
import checkUser from '../utils/checkUser'
import setAxiosAuthToken from '../utils/setAxiosAuthToken';
import "./Login.css"

export class Login extends Component {
    state = {
        email:"",
        password:"",
        emailError:"",
        passwordError:"",
        submitButtonDisabled:true,
        emailOnFocus:false,
        passwordOnFocus:false
    }

    componentDidMount(){
        let check = checkUser()
        if(check){
            this.props.history.push("/bocure")
        }
    }

    handleInputs = (event)=>{
        if(this.state[event.target.name].length===0){
            this.setState({
                [`${event.target.name}Error`]:`Please type ${event.target.placeholder.toLowerCase()}`,
                submitButtonDisabled:true
            })
        } else {
            this.setState({
                [`${event.target.name}Error`]:""
        })
        } 
    }

    handleInputOnFocus = (event)=>{
        if(!this.state[`${event.target.name}OnFocus`]){
            this.setState({
                [`${event.target.name}OnFocus`]:true
            })
        }
    }

    handleOnChange = (event)=>{
        this.setState({
            [event.target.name]:event.target.value
        },()=>{
            this.handleInputs(event)
        })
    }

    handleSubmitButton = async(event)=>{
        event.preventDefault()
        try {
            let currentUser = {
                emailUsername:this.state.email,
                password:this.state.password
            }
            let login = await Axios.post("/api/user/login", currentUser)
            console.log(login.data.payload)
            let jwtToken = login.data.payload
            setAxiosAuthToken(jwtToken)
            let decodedToken = jwtDecode(jwtToken)
            window.localStorage.setItem("jwtToken", jwtToken)
            this.props.handleUserLogin(decodedToken)
            this.props.history.push("/bocure")
            toast.success(`Success login`);
        // this.props.history.push("/bocure")
        } catch (error) {
            toast.error(`Check email/username or password`);
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.submitButtonDisabled ===true){
            if(this.state.email.length !==0 && this.state.password.length !==0){
                if (this.state.emailError.length===0 && this.state.passwordError.length===0){
                    this.setState({
                        submitButtonDisabled:false
                    })
                }
            }
        }
    }

    render() {
        const {
            email,
            password,
            emailError,
            passwordError,
            submitButtonDisabled,
        } = this.state
        return (
            <div className="main">
                <div className="formMain">
                    <form className="form" onSubmit={this.handleSubmitButton}>
                        <h2 className="section-title">Login</h2>
                        <div className="label">
                        <div className="input">
                        <label htmlFor="email">Email or username</label>
                        <input 
                        name="email" 
                        id="email" 
                        placeholder="Email or username"
                        onChange={this.handleOnChange} 
                        value={email} 
                        onBlur={this.handleInputs}
                        onFocus={this.handleInputOnFocus}/>
                        </div>
                        <span>{emailError&& emailError}</span>
                        </div>
                        <div className="label">
                            <div className="input">
                                <label htmlFor="password">Password</label>
                                <input 
                                name="password" 
                                id="password" 
                                placeholder="password"
                                onChange={this.handleOnChange}
                                onBlur = {this.handleInputs}
                                onFocus={this.handleInputOnFocus}
                                value={password} />
                            </div>
                                <span>{passwordError&&passwordError}</span>
                        </div>
                        <button className="login" type="Submit" disabled={submitButtonDisabled}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login
