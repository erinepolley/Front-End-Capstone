const remoteUrl="http://localhost:5002"

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

    //checks to see if user has an account
    checkUser(email, password) {
        // console.log("HELLOOOO???")
        return fetch(`${remoteUrl}/users?email=${email}&password=${password}`)
            .then(response => response.json())
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
    deleteRack(rackId) {
        return fetch(`${remoteUrl}/racks/${rackId}`,
        {
            method: "DELETE"
        })
        .then(response => response.json())
    }

}
