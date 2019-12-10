import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import './NavBar.css'

export default class NavBar extends Component {

handleLogout () {
    localStorage.removeItem("credentials")
    // this.props.history.push("/login")
   

}

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
                 <Link className="nav-link" to="/login">
                 <li onClick={this.handleLogout}>
                         Log Out
                     </li>
                     </Link>
            </ul>       
            </nav> 
            </header>
            </>
        )
    }
}