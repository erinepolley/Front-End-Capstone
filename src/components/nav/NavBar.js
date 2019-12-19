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
               <div >
             <div className="nav-links">
                 <p><Link className="nav-link" to="/">Home</Link></p>
                 <p><Link className="nav-link" to="/myracks">My Racks</Link></p>
                 <p><Link className="nav-link" to="/add">Add Rack</Link></p>
                 <Link className="nav-link" to="/login">
                 <p>
                        <span onClick={this.props.clearUser}>Log Out</span>
                </p>
                 </Link>
            </div>
            </div>       
            </nav> 
           
            </header>
            </>
        )
    }
}

export default withRouter(NavBar)