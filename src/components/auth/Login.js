import React, { Component } from "react"

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

  handleSignup = (event) => {
    event.preventDefault()
    this.props.setUser({
      email: this.state.email,
      password: this.state.password
    })
    this.props.history.push("/")
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

