import React, { Component } from 'react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainRouter from './MainRouter';


export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <MainRouter />
      </React.Fragment>
    )
  }
}

export default App

