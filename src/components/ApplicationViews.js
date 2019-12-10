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
     return <Login setUser={this.props.setUser} {...props} />
 }} />

<Route path="/signup" render={(props) => {
     return <Signup setUser={this.props.setUser} {...props} />
 }} />

 <Route exact path="/" render={(props) => {
     return <Map />
 }} />

<Route path="/myracks" render={(props) => {
     return <MyRacks />
 }} />

<Route path="/add" render={(props) => {
     return <AddRack />
 }} />

<Route path="/edit" render={(props) => {
     return <EditRack />
 }} />

<Route path="/logout" render={(props) => {
     return <Login />
 }} />
            </>
        )
    }
}