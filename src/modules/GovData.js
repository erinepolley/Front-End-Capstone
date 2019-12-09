const nashGovUrl = "https://data.nashville.gov/resource/yjju-hypq.json/?status=Existing"

export default {
getData () {
    return fetch(`${nashGovUrl}`,
    {
        "headers": {
            "Accept": "application/json",
            "X-App-Token": "P7SZS21rPkPvHmuIvW4glESQf"
        }
    })
    .then(response => response.json())
}

}
