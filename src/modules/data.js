const remoteUrl="http://localhost:5002"

export default {
    getAllRacks() {
        return fetch(`${remoteUrl}/racks/?_expand=establishmentType`)
        .then(result => result.json())
    }
}
