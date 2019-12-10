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
  
//TODO: Need to do a POST somewhere to post person's info to JSON. Then, grab the id from the receipt.

    render() {
        return (
            <>
          <form onSubmit={this.handleSignup}>
            <fieldset>
                <h1>Bike Stash</h1>
                <h2>Welcome!</h2>
                <h3>Sign up here.</h3>
                <div className="formgrid">
                <label htmlFor="email">Email Address:</label>
                <br></br>
                <input onChange={this.handleFieldChange} type="email"
                        id="email"
                        placeholder="todd@gmail.com"
                        required autoFocus="" />
                <br></br>
                <label htmlFor="inputPassword">Password:</label>
                <br></br>
                <input onChange={this.handleFieldChange} type="password"
                        className="password"
                        placeholder="Password"
                        required />
                        <br></br>
                <label htmlFor="inputPassword">Confirm Password:</label>
                <br></br>
                <input onChange={this.handleFieldChange} type="password"
                        className="password"
                        placeholder="Password"
                        required />    

                </div>
                <button type="submit">
                    Register
                </button>
            </fieldset>
          </form>
          </>
        )
      }
}

