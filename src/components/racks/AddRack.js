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
        imageUrl: "",
        establishmentTypes: [],
        loadingStatus: false
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    addNewRack = event => {
        event.preventDefault()
        this.setState({ loadingStatus: true })
        const rack = {
            userId: parseInt(localStorage.getItem("credentials")),
            capacity: parseInt(this.state.capacity),
            address: this.state.address,
            establishmentName: this.state.establishmentName,
            establishmentTypeId: this.state.establishmentTypeId,
            comments: this.state.comments,
            imageUrl: this.state.imageUrl,
            longitude: null,
            latitude: null

        }
        // console.log("USERID IN POST", rack.userId)
        Data.postRack(rack)
            .then(() => this.props.history.push("/myracks"))
    }

    uploadWidget = () => {
        window.cloudinary.openUploadWidget({ cloud_name: 'dbclxrl30', upload_preset: 'bwfzylp7', tags:['atag']},
        (error, result) => {
            // See what cloudinary returns
            console.log("RESULT FROM CLOUDINARY", result)
            console.log("IMAGE URL FROM CLOUDINARY", "https://res.cloudinary.com/dbclxrl30/image/upload/v1576090193/Bike%20Stash/" + result[0].public_id)
            this.setState({imageUrl: `https://res.cloudinary.com/dbclxrl30/image/upload/v1576090193/${result[0].public_id}`})
    })
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
                            >   <option key="" value="">Select One</option>
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
                        <img className="uploaded-image" src={this.state.imageUrl} alt="" />
                        <button onClick={this.uploadWidget.bind(this)} className="button">
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