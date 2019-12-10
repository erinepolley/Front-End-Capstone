const remoteUrl="http://localhost:5002"

export default {
    getAllRacks() {
        return fetch(`${remoteUrl}/racks/?_expand=establishmentType`)
        .then(result => result.json())
    },
    //checks to see if user has an account
    checkUser(email, password) {
        // console.log("HELLOOOO???")
        return fetch(`${remoteUrl}/users?email=${email}&password=${password}`)
            .then(response => response.json())
    }
}
