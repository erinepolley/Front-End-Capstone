import React, { Component } from 'react';
import Data from '../../modules/Data'
import ExternalApi from '../../modules/ExternalApi'
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Tooltip from '@material-ui/core/Tooltip'
import './RackForms.css'

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
        xCord: "",
        yCord: "",
        loadingStatus: false
    }

    // sendLatLongToMap() {
    //     ExternalApi.getLocationIQData(this.state.address)
    //         .then(object => {
    //             this.setState({
    //                 longitude: object[0].lon,
    //                 latitude: object[0].lat
    //             })
    //             console.log("LON AND LAT", this.state.longitude, this.state.latitude)
    //         })
    // }

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

                console.log("LON AND LAT", response[0].lon, response[0].lat)
                return rack
            })
            .then(rackObj =>  Data.postRack(rackObj))
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

    displayLocationInfo = (position) => {
        this.setState({
          xCord: position.coords.latitude,
          yCord: position.coords.longitude
        })
        console.log(this.state)
    }

    getCurrentLocation = () => {
        console.log("AM I HERE?")
    if (navigator.geolocation) {
        console.log("I can do it!")
        navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
      } else {
          console.log("Geolocation not supported.")
      }
    }

    componentDidMount() {
        Data.getEstablishmentTypes()
            .then(types => this.setState({ establishmentTypes: types }))
    }


    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">

                            <label htmlFor="animalName">Name of Establishment:</label>
                            <br></br>
                            <input type="text" className="form-field" required onChange={this.handleFieldChange}
                                id="establishmentName" placeholder="Rosepepper" />
                            <br></br>

                            <label htmlFor="address">Address:</label>
                            <br></br>
                            <input type="text" className="form-field" required onChange={this.handleFieldChange}
                                id="address" placeholder="1907 Eastland Ave., Nashville, TN" />

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
                            <input type="text" required onChange={this.handleFieldChange}
                                id="capacity" className="form-field" placeholder="6" />
                            <br></br>

                            <label htmlFor="comments">Comments:</label>
                            <br></br>
                            <input type="textfield" required onChange={this.handleFieldChange}
                                id="comments" className="form-field" placeholder="near side patio" />
                            <br></br>
                        </div>

                        <img className="uploaded-image" src={this.state.imageUrl} alt="" />

                    </fieldset>
                </form>
                <button onClick={this.uploadWidget.bind(this)} className="button">
                    Upload Photo
                        </button>

                <button type="button" className="button" disabled={this.state.loadingStatus}
                    onClick={this.addNewRack}>Add Rack</button>
            </>
        )
    }
}