import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Map from './map/Map'
import MyRacks from './racks/MyRacks'
import EditRack from './racks/EditRack'
import AddRack from './racks/AddRack'

export default class ApplicationViews extends Component {
    render() {
        return (
            <>
 <Route path="/" render={(props) => {
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
     return <LogOut/>
 }} />
            </>
        )
    }
}