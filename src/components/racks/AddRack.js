import React, { Component } from 'react';
import Data from '../../modules/Data'
import ExternalApi from '../../modules/ExternalApi'
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Tooltip from '@material-ui/core/Tooltip'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import './RackForms.css'
// import '../App.css'

export default class AddRack extends Component {
    state = {
        userId: "",
        capacity: "",
        address: "",
        establishmentName: "",
        establishmentTypeId: "",
        comments: "",
        imageUrl: "",
        establishmentTypes: [],
        longitude: "",
        latitude: "",
        loadingStatus: false
    }
// Deletes image if user decides not to use it
    deleteImage = event => {
        event.preventDefault()
        if(window.confirm("Are you sure you want to delete this photo?")) {
        this.setState({ imageUrl: "" })
        // console.log("STATE AFTER DELETE RACK IN EDIT FORM", this.state)
    }
}

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    
    addNewRack = event => {
        if (this.state.address === "" || this.state.establishmentTypeId === "" || this.state.imageUrl === "" || this.state.establishmentName === "") {
            alert("Please fill out all fields and add a photo.")
        } else {
            event.preventDefault()
            this.setState({ loadingStatus: true })
            // this.sendLatLongToMap()

            // Converting address to lat and lon
            ExternalApi.getLocationIQData(this.state.address)
            .then(response => {
    
                const rack = {
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
                // console.log("LON AND LAT", response[0].lon, response[0].lat)
                return rack
            })
            .then(rackObj => Data.postRack(rackObj))
            .then(() => this.props.history.push("/myracks"))
        }
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
//TODO: on "add rack", if address==="" || if xCord,
//TODO: then run add rack with lat and long keys equal to X and Y Cord.
//TODO: otherwise, run the regular add rack 
//TODO: HOWEVER, will have to have reverse geocoding to convert lat/lon values to address!!!
//Getting lat annd lon from browser until line 105
    displayLocationInfo = (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        console.log(this.state)
        ExternalApi.getLocationIQAddress(this.state.latitude, this.state.longitude)
        .then(response => {
            this.setState({
                address: response.display_name
            })
        console.log(this.state)
    })
}

    getCurrentLocation = () => {
        console.log("AM I HERE?")
    if (navigator.geolocation) {
        // console.log("I can do it!")
        navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
      } else {
          alert("Geolocation not supported.")
      }
    }

    // Est types populates the dropdown so it doesn't show just numbers
    componentDidMount() {
        Data.getEstablishmentTypes()
            .then(types => this.setState({ establishmentTypes: types }))
    }


    render() {
        return (
            <>

                <h1 className="page-header">Add a Bike Rack</h1>
                    <div className="formgrid">
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
                            <label htmlFor="animalName">Name of Establishment:</label>
                            <br></br>
                            <input type="text" className="form-field" required onChange={this.handleFieldChange}
                                id="establishmentName" placeholder=" ex. Rosepepper" />
                            <br></br>

                            <label htmlFor="address">Address:</label>
                            <br></br>
                            <input type="text" className="form-field" required onChange={this.handleFieldChange}
                                id="address" placeholder="ex. 1907 Eastland Ave., Nashville, TN" value={this.state.address} />

                                <Tooltip title="Use Current Location" label="Use Current Location" placement="right" className="tooltiptext">
                                <button className="location-button" type="button" onClick={this.getCurrentLocation}>
                                <MyLocationIcon />
                                </button>
                                </Tooltip>
                            
                               {/* <span className="tooltiptext">Use Current Location</span> */}
                            <br></br>
                            <label htmlFor="establishmentTypeId">Establishment Type:</label>
                            <br></br>
                            <select
                                required
                                className="form-field"
                                onChange={this.handleFieldChange}
                                id="establishmentTypeId"
                                value={this.state.establishmentTypeId}
                            >
                                <option key="" value="">Select One</option>
                                {this.state.establishmentTypes.map(establishmentType =>
                                    // {console.log(establishmentType.id)},
                                    <option key={establishmentType.id} value={establishmentType.id}>
                                        {establishmentType.establishmentType}
                                    </option>
                                )}
                            </select>
                            <br></br>

                            <label htmlFor="capacity">Capacity:</label>
                            <br></br>
                            <input type="number" required onChange={this.handleFieldChange}
                                id="capacity" className="form-field" placeholder="ex. 6" />
                            <br></br>

                            <label htmlFor="comments">Comments:</label>
                            <br></br>
                            <input type="textfield" required onChange={this.handleFieldChange}
                                id="comments" rows="10" className="form-field" placeholder="ex. near side patio" />
                            <br></br>
                    </fieldset>
                </form>
                        </div>

                 <div className="form-buttons">
                <button type="button" className="button"  disabled={this.state.loadingStatus}
                    onClick={this.addNewRack}>Add Rack</button>
                </div>
            </>
        )
    }
}