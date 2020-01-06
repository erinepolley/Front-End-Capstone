import React, { Component } from "react"
import { Link } from "react-router-dom"
import Data from '../../modules/Data'
import '../App.css'

export default class Login extends Component {
    state = {
        email: "",
        password: ""
    }

    handleFieldChange = (event) => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }
//When the user submits the form, 
// do a fetch call to see if any user in 
// API matches. If so, logs user in. 
// If not, alert.

  handleLogin = (event) => {
    event.preventDefault()
    Data.checkUser(this.state.email, this.state.password)
        .then(userArrObj =>{
            console.log("RESULT FRESH FROM API", userArrObj)
            if(userArrObj.length>0) {
                this.props.setUser(userArrObj[0])
                
                this.props.history.push("/")
            } else {
                alert("Incorrect information. Please try again.")
            }
        })
  }

    render() {
        return (
            <>
          <form onSubmit={this.handleLogin}>
            <fieldset className="login-form">
              
                <img className="welcome-image" src={require('../BikeIcon.svg')} alt="Bike Stash icon" />
                <h1 className="login-header">Bike Stash</h1>
                <h2>Welcome! Please sign in.</h2>
                
                <div className="formgrid">
                <label htmlFor="email">Email address:</label>
                <br></br>
                <input onChange={this.handleFieldChange} type="email"
                        id="email"
                        className="login-input"
                        placeholder="helena@gmail.com"
                        required autoFocus="" />
                <br></br>
                <label htmlFor="inputPassword">Password:</label>
                <br></br>
                <input onChange={this.handleFieldChange} type="password"
                        id="password"
                        className="login-input"
                        placeholder="Password"
                        required />
                    
                </div>
                <button className="button" type="submit">
                    Sign in
                </button>
               <Link className="register-link" to="/signup"> <p className="register-link">New to Bike Stash? Sign up here.</p></Link>
            </fieldset>
          </form>
          </>
        )
      }
}

