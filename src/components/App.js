import React, { Component } from 'react';
import ApplicationViews from './ApplicationViews'
import NavBar from './nav/NavBar'
import './App.css';
// import Data from '../modules/data'

export default class App extends Component {

    // user doesn't exist by default
    state = {
      user: false
    }
  
    // isAuthenticated checks if credentials are in local storage
    // returns true/false
    isAuthenticated = () => localStorage.getItem("credentials") !== null
  
    //passing this as props to app views and nav bar
    setUser = (result) => {
      console.log("RESULT IN SET USER", result)
      localStorage.setItem("credentials", result.id)
      this.setState({
        user: this.isAuthenticated()
      });
    }

    clearUser = () =>  {
      localStorage.removeItem("credentials")
      this.setState({
        user: this.isAuthenticated()
      })
    }
  
    componentDidMount(){
      this.setState({
        user: this.isAuthenticated()
      })
    }
  
    render() {
      // console.log("APP RENDER IS AUTHENTICATED??", this.isAuthenticated())
      return (
        <React.Fragment>
         {this.isAuthenticated() ? 
         <>
          <NavBar           {...this.props}
          // {...props}
                            user={this.state.user}
                            setUser={this.setUser} 
                            handleLogin={this.handleLogin}
                            clearUser={this.clearUser}/>
          <ApplicationViews user={this.state.user}
                            setUser={this.setUser} 
                            handleLogin={this.handleLogin}
                            isAuthenticated={this.isAuthenticated} /> 
          </> :
          <>
          <ApplicationViews user={this.state.user}
          setUser={this.setUser} 
          handleLogin={this.handleLogin}/> </>}
        </React.Fragment>
      );
    }
  }

