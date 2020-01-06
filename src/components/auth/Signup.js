import React, { Component } from "react"
import Data from '../../modules/Data'
import '../App.css'

export default class Signup extends Component {
    state = {
        email: "",
        password: "",
        confirmPassword: ""
    }
    //TODO: Figure out how to get nav bar off this page.

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
        console.log(this.state)
    }

    handleSignup = (event) => {
        event.preventDefault()
        //getting all users and doing quality control
        Data.getAllUsers()
            .then(users => {
                if (users.find(user => user.email.toLowerCase() === this.state.email.toLowerCase())) {
                    alert("It looks like this email already has an account.")
                } else if (this.state.password !== this.state.confirmPassword) {
                    alert("Passwords don't match. Please try again.")
                } else if (this.state.email === "" || this.state.password === "" || this.state.confirmPassword === "") {
                    alert("Please fill out all fields.")
                } else {
                    const newUser = {
                        email: this.state.email,
                        password: this.state.password
                    }
                    Data.addNewUser(newUser)
                        .then(results => {
                            {this.props.setUser(results)}
                            // localStorage.setItem("credentials", results.id)
                        })
                    this.props.history.push("/home")
                //    return <Redirect to="/" />
                }
            })
    }

    //TODO: Need to do a POST somewhere to post person's info to JSON. Then, grab the id from the receipt.

    render() {
        return (
            <>
                <form onSubmit={this.handleSignup}>
                    <fieldset className="login-form">
                    <img className="welcome-image" src={require('../BikeIcon.svg')} alt="Bike Stash icon" />
                        <h1 className="login-header">Bike Stash</h1>
                        <h2>Welcome!</h2> 
                        <h2>Please create an account.</h2>
                        <div className="formgrid">
                            <label htmlFor="email">Email Address:</label>
                            <br></br>
                            <input onChange={this.handleFieldChange} type="email"
                                className="login-input"
                                id="email"
                                placeholder="todd@gmail.com"
                                required autoFocus="" />
                            <br></br>
                            <label htmlFor="password">Password:</label>
                            <br></br>
                            <input onChange={this.handleFieldChange} type="password"
                                className="login-input"
                                id="password"
                                placeholder="Password"
                                required />
                            <br></br>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <br></br>
                            <input onChange={this.handleFieldChange} type="password"
                                id="confirmPassword"
                                className="login-input"
                                placeholder="Confirm Password"
                                required />

                        </div>
                        <button className="button" type="submit">
                            Register
                </button>
                    </fieldset>
                </form>
            </>
        )
    }
}

