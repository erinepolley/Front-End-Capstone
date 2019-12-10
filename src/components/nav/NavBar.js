import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import './NavBar.css'

export default class NavBar extends Component {

    render() {
        return (
            <>
            <header>
                <div className="top-header">
                <img src={require('./BikeIcon.svg')} alt="My Dog" />

                
               <h1 className="nav-title">Bike Stash
               </h1>
               </div>
               <nav>
             <ul className="nav-links">
                 <li><Link className="nav-link" to="/">Home</Link></li>
                 <li><Link className="nav-link" to="/myracks">My Racks</Link></li>
                 <li><Link className="nav-link" to="/add">Add Rack</Link></li>
                 <li><Link className="nav-link" to="/logout">Log Out</Link></li>
            </ul>       
            </nav> 
            </header>
            </>
        )
    }
}