import React, { Component } from 'react'
import Data from '../../modules/Data'


const userId = parseInt(localStorage.getItem("credentials"))
export default class RackEditForm extends Component {

    state = {
        userId: "",
        capacity: "",
        address: "",
        establishmentName: "",
        establishmentType: "",
        comments: "",
        loadingStatus: false
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    updateMyRack = event => {
        event.preventDefault()
        this.setState({ loadingStatus: true})
        const editedRack = {
            id: this.props.match.params.rackId,
            userId: userId,
            capacity: this.state.capacity,
            address: this.state.address,
            establishmentName: this.state.establishmentName,
            establishmentTypeId: this.state.establishmentType,
            comments: this.state.comments,
            imageUrl: null,
            longitude: null,
            latitude: null
        }
        console.log("EDITED RACK", editedRack)
        Data.updateRack(editedRack)
        .then(() => this.props.history.push("/myracks"))
    
    }

    componentDidMount() {
        Data.getRackToEdit(this.props.match.params.rackId)
        .then(rack => {
            this.setState({
                userId: userId,
                capacity: rack.capacity,
                address: rack.address,
                establishmentName: rack.establishmentName,
                establishmentType: rack.establishmentType.establishmentType,
                comments: rack.comments,
                loadingStatus: false
            })

            console.log("RACK EST TYPE", rack.establishmentType.establishmentType)
        })
    }

    render() {
        return(
            <>
        <form>
          <fieldset>
            <div className="formgrid">

            <label htmlFor="establishmentName">Name of Establishment:</label>
            <input
                type="text"
                required
                className="form-field"
                onChange={this.handleFieldChange}
                id="establishmentName"
                value={this.state.establishmentName}
              />
        <br></br>
            <label htmlFor="address">Address:</label>
        <br></br>    
            <input
                type="text"
                required
                className="form-field"
                onChange={this.handleFieldChange}
                id="address"
                value={this.state.address}
              />
        <br></br>
            <label htmlFor="establishmentTypeId">Type of Establishment:</label>
        <br></br>    
            <input
                type="text"
                required
                className="form-field"
                onChange={this.handleFieldChange}
                id="establishmentTypeId"
                value={this.state.establishmentType}
              />
        <br></br>
            <label htmlFor="capacity">Capacity:</label>
        <br></br>    
            <input
                type="text"
                required
                className="form-field"
                onChange={this.handleFieldChange}
                id="capacity"
                value={this.state.capacity}
              />
        <br></br>
            <label htmlFor="comments">Comments:</label>
        <br></br>    
            <input
                type="text"
                required
                className="form-field"
                onChange={this.handleFieldChange}
                id="comments"
                value={this.state.comments}
              />
        <br></br>
                <button
                type="button" disabled={this.state.loadingStatus}
                onClick={this.updateMyRack}
                className="button"
              >Update</button>

            </div>
          </fieldset>
        </form>
            </>
        )
    }

}