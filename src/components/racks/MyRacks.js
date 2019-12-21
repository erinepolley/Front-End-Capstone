import React, { Component } from 'react'
import Data from '../../modules/Data'
import RackCard from './RackCard'
import './RackForms.css'





export default class MyRacks extends Component {
    state = {
        racks: [],
        hover: false
    }
    
    componentDidMount() {
        Data.getMyRacks(parseInt(localStorage.getItem("credentials")))
        .then(racksArray => {
            this.setState({
                racks: racksArray
            })
        })
    }
    
    deleteThisRack = rackId => {
        if(window.confirm("Are you sure you want to delete this bike rack?")) {
        // const userIdFromStorage = parseInt(localStorage.getItem("credentials"))
        // console.log("USER ID ON MY RACKS", userIdFromStorage)
        Data.deleteRack(rackId)
            .then(() => {
                Data.getMyRacks(parseInt(localStorage.getItem("credentials")))
                    .then(newRacks => {
                        this.setState({
                            racks: newRacks
                        })
                    })
            })
    }
}

    render() {
        return (
            <>
                <h1 className="page-header">My Bike Racks</h1>
                <h2 className="page-header">Racks That I've Added Around Town</h2>
                <div className="rack-cards">
                    {this.state.racks.map(rack =>
                        <RackCard
                            key={rack.id}
                            rack={rack}
                            deleteThisRack={this.deleteThisRack}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }


}