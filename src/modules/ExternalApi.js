import Token from "../ApiKeys"

const nashGovUrl = "https://data.nashville.gov/resource/yjju-hypq.json/?status=Existing"
const locationIQUrl = `https://us1.locationiq.com/v1/`

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
    return fetch(`${locationIQUrl}search.php?key=${Token.locationIQToken}&q=${searchString}&format=json`)
    .then(response => response.json())
    // .then(response => console.log("RESPONSE FROM IQ", response))
},

getLocationIQAddress (lat, lon) {
    return fetch(`${locationIQUrl}reverse.php?key=${Token.locationIQToken}&lat=${lat}&lon=${lon}&format=json`)
    .then(response => response.json())
}



}