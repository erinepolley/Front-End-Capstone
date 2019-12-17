const remoteUrl = "http://localhost:5002"

export default {
    //on home page
    getAllRacks() {
        return fetch(`${remoteUrl}/racks/?_expand=establishmentType`)
            .then(result => result.json())
    },

    //on the "My Racks" page. 
    getMyRacks(userId) {
        return fetch(`${remoteUrl}/racks?userId=${userId}&&_expand=establishmentType`)
            .then(data => data.json())
    },
    //To edit this rack. Info in edit form
    getRackToEdit(rackId) {
        return fetch(`${remoteUrl}/racks/${rackId}/?_expand=establishmentType`)
            .then(result => result.json())
    },

    //checks to see if user has an account
    checkUser(email, password) {
        // console.log("HELLOOOO???")
        return fetch(`${remoteUrl}/users?email=${email}&password=${password}`)
            .then(response => response.json())
    },
    //in Signin.js to compare user-entered info to info in JSON 
    getAllUsers() {
        return fetch(`${remoteUrl}/users`)
            .then(response => response.json())
    },
//in Signup.js. To register a new user. 
    addNewUser(newUser) {
        return fetch(`${remoteUrl}/users`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(data => data.json())
    },
    //on "Add Rack"
    postRack(rackObj) {
        return fetch(`${remoteUrl}/racks`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(rackObj)
            }).then(data => data.json())
    },

    updateRack(editedRack) {
        return fetch(`${remoteUrl}/racks/${editedRack.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editedRack)
            }).then(data => data.json())
        // data.json());
    },

    deleteRack(rackId) {
        return fetch(`${remoteUrl}/racks/${rackId}`,
            {
                method: "DELETE"
            })
            .then(response => response.json())
    },

    getEstablishmentTypes() {
        return fetch(`${remoteUrl}/establishmentTypes`)
            .then(data => data.json())
    }

}
