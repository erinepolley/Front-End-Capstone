import React, { Component } from 'react';
import Data from '../../modules/Data'

export default class AddRack extends Component {
    state = {
        userId: "",
        capacity: "",
        address: "",
        establishmentName: "",
        establishmentTypeId: "",
        comments: "",
        loadingStatus: false
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id]=event.target.value
        this.setState(stateToChange)
    }

    addNewRack = event => {
        event.preventDefault()
        this.setState({ loadingStatus: true })
        const rack = {
            userId: parseInt(localStorage.getItem("credentials")),
            capacity: this.state.capacity,
            address: this.state.address,
            establishmentName: this.state.establishmentName,
            establishmentTypeId: this.state.establishmentTypeId,
            comments: this.state.comments,
            imageUrl: null,
            longitude: null,
            latitude: null

        }
        // console.log("USERID IN POST", rack.userId)
        Data.postRack(rack)
        .then(() => this.props.history.push("/"))
    }


render(){
    return(
        <>
        <form>
            <fieldset>
                <div className="formgrid">

                <label htmlFor="animalName">Name of Establishment:</label>
                <br></br>
                    <input type="text" required onChange={this.handleFieldChange}
                        id="establishmentName" placeholder="Rosepepper"/>
                <br></br>

                <label htmlFor="address">Address:</label>
                <br></br>
                        <input type="text" required onChange={this.handleFieldChange}
                        id="address" placeholder="1907 Eastland Ave"/>
                <br></br>

                <label htmlFor="establishmentTypeId">Type of Establishment:</label>
                <br></br>
                        <input type="text" required onChange={this.handleFieldChange}
                        id="establishmentTypeId" placeholder="ex. restaurant"/>
                <br></br>

                <label htmlFor="capacity">Capacity:</label>
                <br></br>
                        <input type="text" required onChange={this.handleFieldChange}
                        id="capacity" placeholder="6"/>
                <br></br>

                <label htmlFor="comments">Comments:</label>
                <br></br>
                        <input type="textfield" required onChange={this.handleFieldChange}
                        id="comments" placeholder="near side patio"/>
                <br></br>
                </div>   
                        <button type="button" disabled={this.state.loadingStatus}
                        onClick={this.addNewRack}>Add Rack</button>
            </fieldset>
        </form>
        </>
    )
}
}