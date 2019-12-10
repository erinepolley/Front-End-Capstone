import React, { Component } from "react"
import Data from '../../modules/Data'
export default class Login extends Component {
    state = {
        email: "",
        password: ""
    }
//TODO: Figure out how to get nav bar off this page.
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
            <fieldset>
                <h1>Bike Stash</h1>
                <h2>Welcome!</h2>
                <h3>Please sign in.</h3>
                <div className="formgrid">
                <label htmlFor="email">Email address:</label>
                <br></br>
                <input onChange={this.handleFieldChange} type="email"
                        id="email"
                        placeholder="helena@gmail.com"
                        required autoFocus="" />
                <br></br>
                <label htmlFor="inputPassword">Password</label>
                <br></br>
                <input onChange={this.handleFieldChange} type="password"
                        id="password"
                        placeholder="Password"
                        required />
                    
                </div>
                <button type="submit">
                    Sign in
                </button>
                <p>New to Bike Stash? Sign up here.</p>
            </fieldset>
          </form>
          </>
        )
      }
}

