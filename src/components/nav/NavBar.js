import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import './NavBar.css'
// import '../App.css'
class NavBar extends Component {

    render() {
        return (
            <>
            <header>
               <div className="top-header">
               <img src={require('../BikeIcon.svg')} className="icon" alt="Bike Stash icon" />
               <br></br>
               <h1 className="nav-title">Bike Stash
               </h1>
               </div>
               <nav>
             <ul className="nav-links">
                 <li><Link className="nav-link" to="/">Home</Link></li>
                 <li><Link className="nav-link" to="/myracks">My Racks</Link></li>
                 <li><Link className="nav-link" to="/add">Add Rack</Link></li>
                 <Link className="nav-link" to="/login">
                 <li>
                        <span onClick={this.props.clearUser}>Log Out</span>
                     </li>
                 </Link>
            </ul>       
            </nav> 
           
            </header>
            </>
        )
    }
}

export default withRouter(NavBar)