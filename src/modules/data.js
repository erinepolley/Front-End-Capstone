const remoteUrl="http://localhost:5002"

export default {
    getAllRacks() {
        return fetch(`${remoteUrl}/racks`)
        .then(result => result.json())
    }
}