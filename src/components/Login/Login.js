import React, { Component } from 'react'
import "./Login.css"
import {toast} from "react-toastify"
import Axios from "../utils/Axios"
import jwtDecode from "jwt-decode"
import checkUser from '../utils/checkUser'
import setAxiosAuthToken from '../utils/setAxiosAuthToken';


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
                [`${event.target.name}Error`]:`Please type ${event.target.placeholder}`,
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
            toast.success(`Success login`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        // this.props.history.push("/bocure")
        } catch (error) {
            toast.error(`Check email/username or password`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }
            );
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
            <div>
                <div>
                    <form onSubmit={this.handleSubmitButton}>
                        <div>
                        <label htmlFor="email">Email or username</label>
                        <input 
                        name="email" 
                        id="email" 
                        placeholder="Email or username"
                        onChange={this.handleOnChange} 
                        value={email} 
                        onBlur={this.handleInputs}
                        onFocus={this.handleInputOnFocus}/>
                        <br />
                        <span>{emailError&& emailError}</span>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input 
                            name="password" 
                            id="password" 
                            placeholder="password"
                            onChange={this.handleOnChange} 
                            onBlur = {this.handleInputs}
                            onFocus={this.handleInputOnFocus}
                            value={password} />
                            <br />
                            <span>{passwordError&&passwordError}</span>
                        </div>
                        <button type="Submit" disabled={submitButtonDisabled}>Login</button>

                    </form>
                </div>
            </div>
        )
    }
}

export default Login
