import React, { Component } from 'react';
import Data from '../../modules/Data'
import ExifData from "../pictures/Exif"
import Gps from "../pictures/Gps"
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
        loadingStatus: false,
        photoData: null
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleUpload = (e) => {
        e.preventDefault()
        this.props.history.push("/");
    }

    fileChangedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            filePath: URL.createObjectURL(event.target.files[0]),
            fileName: event.target.files[0].name,
            photoData: ExifData.getExifData(event.target.files[0])
        })

        console.log(this.state)
    }

    // uploadPhotoFile = (location) => {

    //     let photo = {
    //         fileName: this.state.fileName,
    //         takenDate:  this.convertDateTime(this.state.photoData.DateTime),
    //         uploadDate: new Date(),
    //         latitude: location.latitude,
    //         longitude: location.longitude,
    //         comment: "",
    //         userId: JSON.parse(localStorage.getItem("credentials"))[0].id
    //     }

        uploadHandler = (e) => {
            e.preventDefault()
            var Convertor = new Gps(this.state.photoData)
            let location = Convertor.getData()
            if (location.latitude.length !== 0 && location.longitude.length !== 0) {
                this.uploadPhotoFile(location)
            } else {
                alert("This photo doesn't contain location data!")
            }
        }

        // newLocation = (issue, latitude, longitude, user, date) => {
        //     const location = {
        //         issue: issue,
        //         latitude: latitude,
        //         longitude: longitude,
        //         username: user,
        //         date: date
        //     }
        //     return location
        // }


        addNewRack = event => {
            if (this.state.address === "" || this.state.establishmentTypeId === "" || this.state.imageUrl === "" || this.state.establishmentName === "") {
                alert("Please fill out all fields and add a photo.")
            } else {
                event.preventDefault()
                this.setState({ loadingStatus: true })
                const rack = {
                    userId: parseInt(localStorage.getItem("credentials")),
                    capacity: parseInt(this.state.capacity),
                    address: this.state.address,
                    establishmentName: this.state.establishmentName,
                    establishmentTypeId: parseInt(this.state.establishmentTypeId),
                    comments: this.state.comments,
                    imageUrl: this.state.imageUrl,
                    longitude: null,
                    latitude: null,
                    photoData: null

                }
                // console.log("USERID IN POST", rack.userId)
                Data.postRack(rack)
                    .then(() => this.props.history.push("/myracks"))
            }
        }

            // uploadWidget = () => {
            //     window.cloudinary.openUploadWidget({ cloud_name: 'dbclxrl30', upload_preset: 'bwfzylp7', tags:['atag']},
            //     (error, result) => {
            //         // See what cloudinary returns
            //         console.log("RESULT FROM CLOUDINARY", result)
            //         console.log("IMAGE URL FROM CLOUDINARY", "https://res.cloudinary.com/dbclxrl30/image/upload/v1576090193/Bike_Stash/" + result[0].public_id)
            //         this.setState({imageUrl: `https://res.cloudinary.com/dbclxrl30/image/upload/v1576090193/${result[0].public_id}`})
            //     })
            // }

            uploadChangedHandler = event => {
                this.setState({
                    photoData: ExifData.getExifData(event.target.files[0])
                })
                // this.uploadWidget.bind(this)
            }
        
        
        componentDidMount = () => {
            Data.getEstablishmentTypes()
                .then(types => this.setState({ establishmentTypes: types }))
        }

        render() {
            return (
                <>
                    <form onSubmit={this.uploadHandler}>
                        <fieldset>
                            <div className="formgrid">

                                <label htmlFor="establishmentName">Name of Establishment:</label>
                                <br></br>
                                <input type="text" required onChange={this.handleFieldChange}
                                    id="establishmentName" placeholder="Rosepepper" />
                                <br></br>

                                <label htmlFor="address">Address:</label>
                                <br></br>
                                <input type="text" required onChange={this.handleFieldChange}
                                    id="address" placeholder="1907 Eastland Ave" />
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
                                    id="capacity" placeholder="ex. 6" />
                                <br></br>

                                <label htmlFor="comments">Comments:</label>
                                <br></br>
                                <input type="textfield" required onChange={this.handleFieldChange}
                                    id="comments" placeholder="near side patio" />
                                <br></br>
                            </div>
                            <img className="uploaded-image" type="file" src={this.state.imageUrl} alt="" />
                            {/* Alex's code  */}
                        
                            {/* // onSubmit={this.uploadHandler} */}
                            
                                <formgroup>
                                    <h3>Upload issue photo</h3>
                                </formgroup>
                                <formgroup>
                                    <input data-name="upload-element"
                                        accept=".jpg,.jpeg,.tiff"
                                        title="Click here to upload document"
                                        className="_74090ebd-upload-uploadContainer"
                                        id="uploadedPhoto"
                                        type="file"
                                        onChange={this.fileChangedHandler} />
                                </formgroup>
                                {this.state.filePath ? (<>
                                    <img className="upload-photo" width="300" src={require("../photos/" + this.state.fileName)} alt="test"
                                    />
                                </>) : (<>
                                </>)
                                }
                                <formgroup>
                                    <button type="submit">Upload</button>
                                </formgroup>
                            

                            <button onClick={this.uploadChangedHandler} className="button">
                                Upload Photo
    
                            </button>

                            <button type="button" disabled={this.state.loadingStatus}
                                onClick={this.addNewRack}>Add Rack</button>
                        </fieldset>
                    </form>
                </>
            )
        }
    }
