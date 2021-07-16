import React, { Component } from 'react'
import Login from './components/Login/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Login />
      </React.Fragment>
    )
  }
}

export default App

