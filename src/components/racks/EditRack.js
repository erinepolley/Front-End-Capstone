import React, { Component } from 'react'
import Data from '../../modules/Data'
import ExternalApi from '../../modules/ExternalApi'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import Tooltip from '@material-ui/core/Tooltip'
// import '../App.css'
import './RackForms.css'
const userId = parseInt(localStorage.getItem("credentials"))

export default class RackEditForm extends Component {
    // classes = useStyles();

    state = {
        userId: "",
        capacity: "",
        address: "",
        establishmentName: "",
        establishmentType: "",
        establishmentTypeId: "",
        comments: "",
        establishmentTypes: [],
        imageUrl: "",
        longitude: "",
        latitude: "",
        loadingStatus: false
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
// This method goes with the trash can delete icon and sets the imageUrl in state to an empty string
    deleteImage = event => {
        event.preventDefault()
        if(window.confirm("Are you sure you want to delete this photo?")) {
        this.setState({ imageUrl: "" })
        // console.log("STATE AFTER DELETE RACK IN EDIT FORM", this.state)
    }
}
// Sending the updated rack to JSON.
    updateMyRack = event => {
        event.preventDefault()
        this.setState({ loadingStatus: true })
        ExternalApi.getLocationIQData(this.state.address)
        .then(response => {
        const editedRack = {
            id: this.props.match.params.rackId,
            userId: parseInt(localStorage.getItem("credentials")),
            capacity: parseInt(this.state.capacity),
            address: this.state.address,
            establishmentName: this.state.establishmentName,
            establishmentTypeId: parseInt(this.state.establishmentTypeId),
            comments: this.state.comments,
            imageUrl: this.state.imageUrl,
            longitude: response[0].lon,
            latitude: response[0].lat
        }

        // console.log("EDITED RACK", editedRack)
        return editedRack
    })
       .then(rackObj => Data.updateRack(rackObj))
            .then(() => this.props.history.push("/myracks"))
    }

    uploadWidget = () => {
        window.cloudinary.openUploadWidget({ cloud_name: 'dbclxrl30', upload_preset: 'bwfzylp7', tags: ['atag'] },
            (error, result) => {
                // See what cloudinary returns
                console.log("RESULT FROM CLOUDINARY", result)
                console.log("IMAGE URL FROM CLOUDINARY", "https://res.cloudinary.com/dbclxrl30/image/upload/v1576090193/Bike_Stash/" + result[0].public_id)
                this.setState({ imageUrl: `https://res.cloudinary.com/dbclxrl30/image/upload/v1576090193/${result[0].public_id}` })
            })
    }

    // Getting the id from Application Views, passed as props
    componentDidMount() {
        Data.getRackToEdit(this.props.match.params.rackId)
            .then(rack => {
                this.setState({
                    userId: userId,
                    capacity: rack.capacity,
                    address: rack.address,
                    establishmentName: rack.establishmentName,
                    establishmentType: rack.establishmentType.establishmentType,
                    establishmentTypeId: rack.establishmentTypeId,
                    comments: rack.comments,
                    imageUrl: rack.imageUrl,
                    longitude: rack.longitude,
                    latitude: rack.latitude,
                    loadingStatus: false
                })
                console.log("RACK EST TYPE", rack.establishmentType.establishmentType)
            })
        Data.getEstablishmentTypes()
            .then(types => this.setState({ establishmentTypes: types }))
    }

    render(){
        return(
            <React.Fragment>
                <h2 className="form-header">Edit Bike Rack</h2>
                            {this.state.imageUrl !== "" ?
                            <>
                            <div className="edit-box">
                            <img className="uploaded-image-edit" src={this.state.imageUrl} alt="" />
                            <div className="pic-delete-icon">
                            <Tooltip title="Delete Photo" label="Delete Photo" >
                            <button className="delete-button" type="button" onClick={this.deleteImage}>
                            <DeleteOutlineIcon />
                            </button>
                            </Tooltip>
                            </div>
                            </div>
                            </> : 
                            <>
                            <img className="uploaded-image" src={this.state.imageUrl} alt="" />
                            <br></br>
                            <div className="edit-box-upload-button">
                            <button onClick={this.uploadWidget.bind(this)} className="button">
                            Upload Photo
                            </button> 
                            </div>
                            <br></br>
                            </>}
                <form>
                    <fieldset>
                        <div className="formgrid">

                            <label htmlFor="establishmentName">Name of Establishment:</label>
                            <br></br>
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
                            <select
                                required
                                className="form-field"
                                onChange={this.handleFieldChange}
                                id="establishmentTypeId"
                                value={this.state.establishmentTypeId}
                            >
                                {this.state.establishmentTypes.map(establishmentType =>
                                    <option key={establishmentType.id} value={establishmentType.id}>
                                        {establishmentType.establishmentType}
                                    </option>
                                )}
                            </select>
                            <br></br>
                            <label htmlFor="capacity">Capacity:</label>
                            <br></br>
                            <input
                                type="number"
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
                                type="textarea"
                                required
                                className="form-field"
                                onChange={this.handleFieldChange}
                                id="comments"
                                value={this.state.comments}
                            />
                            <br></br>
                            </div>
                            </fieldset>
                        </form>
                            

                            {/* <button type="button" onClick={this.addPhoto} */}
                                <div className="form-buttons">
                                <button type="button" disabled={this.state.loadingStatus}
                                onClick={this.updateMyRack}
                                className="button"
                            >Update Rack</button>
                            </div>

            </React.Fragment>
        )
                                
    }
}