import React, { Component } from 'react'
import jwtDecode from 'jwt-decode';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setAxiosAuthToken from './components/utils/setAxiosAuthToken';
import MainRouter from './MainRouter';


export class App extends Component {
  state={
    user:null,
  }

  componentDidMount (){
    let getJwtToken = window.localStorage.getItem("jwtToken")
  // if there is a token we grab current time, decode token and grab expiration time
    if(getJwtToken){
      const currentTime = Date.now()/1000
      let decodedJwtToken = jwtDecode(getJwtToken)
      // if user token is still valid
      if(decodedJwtToken.exp>currentTime){
        // use handleUserLogin function that stores email
        this.handleUserLogin(decodedJwtToken)
      } else {
        // else handleUserLogout that sets user back to null
        this.handleUserLogout()
      }
    }
  }  
  
  handleUserLogout = ()=>{
    window.localStorage.removeItem("jwtToken")
    setAxiosAuthToken(null)
    this.setState({
      user:null
    })
  }

  handleUserLogin = (user)=>{
    this.setState({
      user:{
        username:user.username
      }
    })
  }


  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <MainRouter 
          handleUserLogout={this.handleUserLogout}
          user={this.state.user}
          handleUserLogin = {this.handleUserLogin}
          />
      </React.Fragment>
    )
  }
}

export default App

