import React, { Component } from 'react'
import { isStrongPassword, isEmail, isAlpha, isAlphanumeric } from 'validator'
import Axios from '../utils/Axios'
import { toast } from 'react-toastify'
import checkUser from '../utils/checkUser'

export class Signup extends Component {
    state={
        firstName:"",
        lastName:"",
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        firstNameOnFocus:"",
        lastNameOnFocus:"",
        usernameOnFocus:"",
        emailOnFocus:"",
        passwordOnFocus:"",
        confirmPasswordOnFocus:"",
        firstError:"",
        lastNameError:"",
        usernameError:"",
        emailError:"",
        passwordError:"",
        confirmPasswordError:"",
        submitButtonDisabled:true

    }

    componentDidMount(){
        let check = checkUser()
        if(check){
            this.props.history.push("/bocure")
        }
    }

    handleFirstAndLastNameInput = (event)=>{
        if(this.state[event.target.name].length===0){
            this.setState({
                [`${event.target.name}Error`]:`Please type your ${event.target.placeholder.toLowerCase()}`,
                submitButtonDisabled:true
            })
        } else {
            if (!isAlpha(event.target.value)){
                this.setState({
                    [`${event.target.name}Error`]:`${event.target.placeholder} can only contain letters`,
                    submitButtonDisabled:true
                })
            } else{
                this.setState({
                    [`${event.target.name}Error`]:'',
                })
            }
        }
    }
    handleUsernameInput =(event)=>{
        if(this.state.username.length===0){
            this.setState({
                usernameError:"Please type username",
                submitButtonDisabled:true
            })
        } else {
            if(!isAlphanumeric(this.state.username)){
                this.setState({
                    usernameError:"Username can only contain letters and numbers",
                    submitButtonDisabled:true

                })
            } else {
                this.setState({
                    usernameError:""
                })
        } 
        }
    }
    handleEmailInput = (event)=>{
        if(this.state.email.length===0){
            this.setState({
                emailError:"Please type email",
                submitButtonDisabled:true
            })
        } else{
            if(!isEmail(this.state.email)){
                this.setState({
                submitButtonDisabled:true,
                emailError:"Please type in email format"
                })
            } else {
                this.setState({
                    emailError:""
                })
            }
        }
    }
    handlePasswordInput = (event)=>{
        if(this.state.password.length===0){
            this.setState({
                passwordError:"Please type your password",
                submitButtonDisabled:true
            })
        } else {
            if(!isStrongPassword(this.state.password)){
                this.setState({
                    passwordError:"Password must include 1 lowercase, 1 uppercase, 1 special character, 1 number, and a length of 8",
                    submitButtonDisabled:true
                })
            } else{
                this.setState({
                    passwordError:""
                })
            }
            if(this.state.confirmPasswordOnFocus){
                if(this.state.password !== this.state.confirmPassword){
                    this.setState({
                        confirmPasswordError:"Password doesn't match",
                        submitButtonDisabled:true
                    })
                } else {
                    this.setState({
                        confirmPasswordError:""
                    })
                }
            }
        }
    }
    handleConfirmPasswordInput = (event)=>{
        if(this.state.confirmPassword.length===0){
            this.setState({
                confirmPasswordError:"Please confirm password",
                submitButtonDisabled:true
            })
        } else {
            if(this.state.password !== event.target.value){
                this.setState({
                    confirmPasswordError:"Passwords don't match",
                    submitButtonDisabled:true
                })
            } else{
                this.setState({
                    confirmPasswordError:""
                })
            }
        }
    }

    handleOnChange = (event)=>{
        this.setState({
            [event.target.name]:event.target.value
        },()=>{
            if(event.target.name==="firstName" || event.target.name==="lastName"){
                this.handleFirstAndLastNameInput(event)
            }
            if(event.target.name==="username"){
                this.handleUsernameInput(event)
            }
            if(event.target.name==="email"){
                this.handleEmailInput()
            }

            if(event.target.name==="password"){
                this.handlePasswordInput()
            }
            if(event.target.name==="confirmPassword"){
                this.handleConfirmPasswordInput(event)
            }
        })
    }

    handleInputOnFocus = (event)=>{
        if(!this.state[`${event.target.name}OnFOcus`]){
            this.setState({
                [`${event.target.name}OnFocus`]:true
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.submitButtonDisabled ===true){
            if(
                this.state.firstName.length!==0 &&
                this.state.lastName.length!==0 &&
                this.state.username.length!==0 &&
                this.state.email.length!==0 &&
                this.state.password.length!==0 && 
                this.state.confirmPassword.length!==0){
                    if(
                        this.state.firstNameError.length===0 &&
                        this.state.lastNameError.length===0 &&
                        this.state.usernameError.length===0 &&
                        this.state.emailError.length===0 &&
                        this.state.passwordError.length===0 && 
                        this.state.confirmPasswordError.length===0){
                            this.setState({
                                submitButtonDisabled:false
                            })
                        }
            }
        }
    }

    handleOnBlur = (event)=>{
        // here we check if we focused on input but exited it and input value is still empty
        if(event.target.value.length===0 && event.target.name==="firstName"){
            this.setState({
                firstNameError:"Please type your first name"
            })
        }
        if(event.target.value.length===0 && event.target.name==="lastName"){
            this.setState({
                lastNameError:"Please type your last name"
            })
        }
        if(event.target.value.length===0 && event.target.name==="email"){
            this.setState({
                emailError:"Please type your email"
            })
        }
        if(event.target.value.length===0 && event.target.name==="username"){
            this.setState({
                usernameError:"Please create username"
            })
        }
        if(event.target.value.length===0 && event.target.name==="password"){
            this.setState({
                passwordError:"Please create password"
            })
        }
        if(event.target.value.length===0 && event.target.name==="confirmPassword"){
            this.setState({
                confirmPasswordError:"Please confirm password"
            })
        }
    }


    handleSubmitButton = async(event)=>{
        event.preventDefault()
        try {
            let newUser = {firstName:this.state.firstName, lastName:this.state.lastName, username:this.state.username, email:this.state.email, password:this.state.password}
            let success = await Axios.post ('/api/user/signup', newUser)
            this.props.history.push("/login")
            toast.success(`User created - Please login`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        } catch (error) {
            toast.error(`${error.response.data.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }


    render() {
        const {
            firstName,
            lastName,
            username,
            email,
            password,
            confirmPassword,
            firstNameError,
            lastNameError,
            usernameError,
            emailError,
            passwordError,
            confirmPasswordError,
            submitButtonDisabled,
        } = this.state
        return (
                <div>
                    <form onSubmit={this.handleSubmitButton}>
                        <div>
                            <div>
                                <label htmlFor="firstName">First name</label>
                                <input 
                                    id="firstName" 
                                    value={firstName} 
                                    name="firstName" 
                                    placeholder="First name"
                                    onChange={this.handleOnChange}
                                    onBlur = {this.handleOnBlur}
                                    onFocus = {this.handleInputOnFocus}
                                    />
                                <br />
                                <span>{firstNameError && firstNameError}</span>
                            </div>
                            <div>
                                <label htmlFor="lastName">Last name</label>
                                <input 
                                    id="lastName" 
                                    value={lastName} 
                                    name="lastName" 
                                    onBlur = {this.handleOnBlur}
                                    placeholder="Last name"
                                    onChange={this.handleOnChange}
                                    onFocus = {this.handleInputOnFocus}
                                    />
                                <br />
                                <span>{lastNameError && lastNameError}</span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input 
                                id="email" 
                                value={email} 
                                name="email" 
                                placeholder="Email"
                                onChange={this.handleOnChange}
                                onBlur = {this.handleOnBlur}
                                onFocus = {this.handleInputOnFocus}
                                />
                            <br />
                            <span>{emailError && emailError}</span>
                        </div>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input 
                                id="username" 
                                value={username} 
                                name="username" 
                                placeholder="Username"
                                onChange={this.handleOnChange}
                                onBlur = {this.handleOnBlur}
                                onFocus = {this.handleInputOnFocus}
                                />
                            <br />
                            <span>{usernameError && usernameError}</span>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input 
                                id="password" 
                                value={password} 
                                name="password" 
                                placeholder="Password"
                                onChange={this.handleOnChange}
                                onBlur = {this.handleOnBlur}
                                onFocus = {this.handleInputOnFocus}
                                />
                            <br />
                            <span>{passwordError && passwordError}</span>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input 
                                id="confirmPassword" 
                                value={confirmPassword} 
                                name="confirmPassword" 
                                placeholder="Confirm password"
                                onChange={this.handleOnChange}
                                onBlur = {this.handleOnBlur}
                                onFocus = {this.handleInputOnFocus}
                                />
                            <br />
                            <span>{confirmPasswordError && confirmPasswordError}</span>
                        </div>
                        <button type="submit" disabled={submitButtonDisabled}>Sign up</button>
                    </form>
                </div>
        )
    }
}

export default Signup
