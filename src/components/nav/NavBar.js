import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import './NavBar.css'
// import '../App.css'
class NavBar extends Component {

    render() {
        return (
            <>
            
            {/* <header>  */}
               <div className="whole-header">
               <div className="top-header">
               <img src={require('../BikeIcon.svg')} className="icon" alt="Bike Stash icon" />
               <br></br>
               <h1 className="nav-title">Bike Stash
               </h1>
            </div>
           
            {/* <div> */}
               {/* <nav> */}
             <div className="nav-links">
                 <p><Link className="nav-link" to="/">Map</Link></p>
                 <p><Link className="nav-link" to="/myracks">My Racks</Link></p>
                 <p><Link className="nav-link" to="/add">Add Rack</Link></p>
                 <p>
                 <Link className="nav-link" to="/login">
                        <span onClick={this.props.clearUser}>Log Out</span>
                 </Link>
                </p>
           </div>
            {/* </nav>  */}
           {/* </div>       */}
           </div>
            {/* </header> */}
            
            </>
        )
    }
}

export default withRouter(NavBar)