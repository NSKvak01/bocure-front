import React, { Component } from 'react';
import { Form, Button, FormCheck,  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from '../utils/Axios';
import {isEmpty, isEmail} from "validator"
import "./Bocure.css"
import { toast } from 'react-toastify';


export class CalendarScheduler extends Component {
state={
    name: '',
    email: '',
    subject: '',
    message:'',
    date:"",
    nameOnFocus: '',
    emailOnFocus: '',
    subjectOnFocus: '',
    messageOnFocus:'',
    dateOnFocus:"",
    nameError: '',
    emailError: '',
    subjectError: '',
    messageError:'',
    dateError:"",
    result:null,
    isButtonDisabled:true
};

componentDidMount(){
    this.setState({
        subject:this.props.activity,
        date:this.props.date,
        message:`I want to ${this.props.activity.toLowerCase()}. Join me!`
    })
}

componentDidUpdate(prevProps, prevState){
    if(prevProps.date!==this.props.date){
        this.setState({
            date:this.props.date
        })
    }
    if(prevState.isButtonDisabled ===true){
        if(
            this.state.name.length!==0 &&
            this.state.email.length!==0 &&
            this.state.subject.length!==0 &&
            this.state.date.length!==0 &&
            this.state.message.length!==0){
                if(
                    this.state.nameError.length===0 &&
                    this.state.emailError.length===0 &&
                    this.state.subjectError.length===0 &&
                    this.state.dateError.length===0 &&
                    this.state.messageError.length===0){
                        this.setState({
                            isButtonDisabled:false
                        })
                    }
        }
    }
}

handleInputs = (event)=>{
    if(isEmpty(this.state[event.target.name])){
        this.setState({
            [`${event.target.name}Error`]:`Please type ${event.target.name}`,
            isButtonDisabled:true
        })
    }else{
            this.setState({
                [`${event.target.name}Error`]:'',
            })
        }
}

handleEmailInput = (event)=>{
    if(isEmpty(this.state.email)){
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

handleOnChange = (event)=>{
    this.setState({
        [event.target.name]:event.target.value
    },()=>{
        this.handleInputs(event)
        if(event.target.name==="email"){
            this.handleEmailInput(event)
        }
    })
}

handleInputOnFocus = (event)=>{
    if(!this.state[`${event.target.name}OnFocus`]){
        this.setState({
            [`${event.target.name}OnFocus`]:true
        })
    }
}

handleOnBlur = (event)=>{
    if(isEmpty(event.target.value)){
        this.setState({
            [`${event.target.name}Error`]:`Please type ${event.target.name}`
        })
    }
}

sendEmail = async event => {
    event.preventDefault();
    try {
        let email = {
            name:this.state.name,
            email:this.state.email,
            subject:this.state.subject,
            date:this.state.date,
            message:this.state.message
        }
        let result = await Axios.post('/api/email/send', email)
        console.log(result.data)
        this.setState({ 
            result:result.data,
            name: '', 
            email: '', 
        });
        toast.success(this.state.result.message)

        console.log("success")

    } catch (error) {
        console.log(error)
        toast.error(this.state.result.message)
    }
};

render() {
return (
    <React.Fragment>
        <form className="emailform" onSubmit={this.sendEmail}>
            <div className="inputWithButton">
                <div className="inputNoButton">
                    <div className="inputGroup">
                    <Form.Group controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={this.state.name}
                        placeholder="Enter your name"
                        onChange={this.handleOnChange}
                        onBlur={this.handleOnBlur}
                        onFocus={this.handleOnFocus}
                        className="formInput"
                    />
                    </Form.Group>
                    <span className="formError">
                    {this.state.nameError && this.state.nameError}
                    </span>
                    </div>
                    <div className="inputGroup">
                    <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={this.state.email}
                        placeholder="Enter your email"
                        onChange={this.handleOnChange}
                        onBlur={this.handleOnBlur}
                        onFocus={this.handleOnFocus}
                        className="formInput"

                    />
                    </Form.Group>
                    <span className="formError">
                    {this.state.emailError && this.state.emailError}
                    </span>
                    </div>
                    <div className="inputGroup">
                    <Form.Group controlId="subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        type="text"
                        name="subject"
                        value={this.state.subject}
                        placeholder="Enter subject"
                        onChange={this.handleOnChange}
                        onBlur={this.handleOnBlur}
                        onFocus={this.handleOnFocus}
                        className="formInput"

                    />
                    </Form.Group>
                    <span className="formError">
                    {this.state.subjectError && this.state.subjectError}
                    </span>
                    </div>
                    <div className="inputGroup">
                    <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="text"
                        name="date"
                        value={this.state.date}
                        rows="3"
                        placeholder="Date"
                        onChange={this.handleOnChange}
                        onBlur={this.handleOnBlur}
                        onFocus={this.handleOnFocus}
                        className="formInput"

                    />
                    </Form.Group>
                    <span className="formError">
                    {this.state.dateError && this.state.dateError}
                    </span>
                    </div>
                    <div className="inputGroup">
                    <Form.Group controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="message"
                        value={this.state.message}
                        rows="3"
                        placeholder="Enter your message"
                        onChange={this.handleOnChange}
                        onBlur={this.handleOnBlur}
                        onFocus={this.handleOnFocus}
                        className="formInput"

                    />
                    </Form.Group>
                    <span className="formError">
                    {this.state.messageError && this.state.messageError}
                    </span>
                    </div>
                </div>
                <div className="buttonemail">
                <Button variant="primary" type="submit" disabled={this.state.isButtonDisabled}>
                Submit
                </Button>
                </div>
            </div>
        </form>
    </React.Fragment>
    );
    };
}

export default CalendarScheduler;
