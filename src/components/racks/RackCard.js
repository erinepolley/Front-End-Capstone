import React, { Component } from 'react';
import { Link } from "react-router-dom"

export default class RackCard extends Component {
    render(){
        return(
            <>
            <div className="card">
            <img className="uploaded-image" src={this.props.rack.imageUrl} alt="" />
            
            <h3>Rack Location: {this.props.rack.establishmentName}</h3>
            <p>Type: {this.props.rack.establishmentType.establishmentType}</p>
            <p>Address: {this.props.rack.address}</p>
            <p>Capacity: {this.props.rack.capacity} bikes</p>
            <p>Comments: {this.props.rack.comments}</p>
            </div>
            <Link to={`/edit/${this.props.rack.id}`}><button>Edit</button></Link>
            <button type="button" onClick={() => this.props.deleteThisRack(this.props.rack.id)}>Delete</button>
            </>
        )
    }
}