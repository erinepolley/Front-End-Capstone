import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Map from './maps/Map'
import MyRacks from './racks/MyRacks'
import EditRack from './racks/EditRack'
import AddRack from './racks/AddRack'
import Login from './auth/Login'
import Signup from './auth/Signup'

export default class ApplicationViews extends Component {
    render() {
        return (
            <>
                <Route exact path="/login" render={(props) => {
                    // const storageId = localStorage.getItem("credentials")
                    // console.log(storageId)
                    if(this.props.user===true) {
                    // if (this.props.userLoggedIn()) {
                        return <Redirect to="/" />
                    } else {
                        return <Login setUser={this.props.setUser} {...props} {...this.props} />
                    }
                }} />

                <Route path="/signup" render={(props) => {
                    return <Signup setUser={this.props.setUser} {...props} {...this.props} />
                }} />


                <Route exact path="/" render={(props) => {
                    // const storageId = localStorage.getItem("credentials")
                    // console.log(storageId)
                    if (this.props.user===true) {
                        return <Map {...props} {...this.props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route path="/home" render={(props) => {
                    return <Map {...props} {...this.props} />
                }} />

                <Route path="/myracks" render={(props) => {
                    if (this.props.user===true) {
                        return <MyRacks {...props} {...this.props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route path="/add" render={(props) => {
                    if (this.props.user===true) {
                        return <AddRack {...props} {...this.props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route exact path="/edit/:rackId(\d+)" render={(props) => {
                    if (this.props.user===true) {
                        return <EditRack {...props} {...this.props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                {/* <Route path="/logout" render={(props) => {
                    return <Login /> */}
                {/* }} /> */}
            </>
        )
    }
}