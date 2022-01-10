const request = require("request");

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYWxpYnVncmF0IiwiYSI6ImNreTRia3E1OTA1ZnoycHMxaXNqNTl6cXAifQ.oXX1q7clwTquZD4TcFOumA&limit=1"

    request({url , json: true}, (error, { body }) =>{
        if(error){
            callback("Unable to connect to location service!", undefined)
        }else if(body.features.length === 0){
            callback("Unable to find location. Try another search!", undefined)

        }else{
            const longitude = body.features[0].geometry.coordinates[0]
            const latitude = body.features[0].geometry.coordinates[1]

            callback(undefined, {
                longitude: body.features[0].geometry.coordinates[0],
                latitude: body.features[0].geometry.coordinates[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode