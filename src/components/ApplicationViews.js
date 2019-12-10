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
<Route path="/login" render={(props) => {
     return <Login setUser={this.props.setUser} {...props} {...this.props} />
 }} />

<Route path="/signup" render={(props) => {
     return <Signup setUser={this.props.setUser} {...props} {...this.props} />
 }} />


 <Route exact path="/" render={(props) => {
     if (this.props.user) {
     return <Map {...props} {...this.props} />
     } else {
        return <Redirect to="login" />  
     }
 }} />

<Route path="/myracks" render={(props) => {
     if (this.props.user) {
     return <MyRacks {...props} {...this.props}/> 
    } else {
        return <Redirect to="login" />
    }
 }} />

<Route path="/add" render={(props) => {
      if (this.props.user) {
        return <AddRack {...props} {...this.props}/> 
     } else {
        return <Redirect to="login" />
    }
 }} />

<Route path="/edit" render={(props) => {
      if (this.props.user) {
        return <EditRack {...props} {...this.props}/> 
      } else {
        return <Redirect to="login" />
     }
 }} />

<Route path="/logout" render={(props) => {
     return <Login />
 }} />
            </>
        )
    }
}