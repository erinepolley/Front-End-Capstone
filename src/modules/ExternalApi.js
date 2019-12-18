import Token from "../ApiKeys"

const nashGovUrl = "https://data.nashville.gov/resource/yjju-hypq.json/?status=Existing"
const locationIQUrl = `https://eu1.locationiq.com/v1/search.php?key=${Token.locationIQToken}`
export default {
getGovApiData () {
    return fetch(`${nashGovUrl}`,
    {
        "headers": {
            "Accept": "application/json",
            "X-App-Token": `${Token.nashvilleGovToken}`
        }
    })
    .then(response => response.json())
},

getLocationIQData (searchString) {
    return fetch(`${locationIQUrl}&q=${searchString}&format=json`)
    .then(response => response.json())
    // .then(response => console.log("RESPONSE FROM IQ", response))
}





}