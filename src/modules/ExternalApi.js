const nashGovUrl = "https://data.nashville.gov/resource/yjju-hypq.json/?status=Existing"
const locationIQUrl = "https://eu1.locationiq.com/v1/search.php?key=pk.3e4c309fdeda86286e9dcc98f0c5a94f"
export default {
getGovApiData () {
    return fetch(`${nashGovUrl}`,
    {
        "headers": {
            "Accept": "application/json",
            "X-App-Token": "P7SZS21rPkPvHmuIvW4glESQf"
        }
    })
    .then(response => response.json())
},

getLocationIQData (searchString) {
    return fetch(`${locationIQUrl}&q=${searchString}&format=json`)
    .then(response => response.json())
}





}