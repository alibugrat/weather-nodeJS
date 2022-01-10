const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=e6e6853b21d22310ac5eac402e98cfda&query="+latitude+","+longitude

    request({url, json: true}, (error, { body }) =>{
        if(error){
            callback("Unable to connect to weather service!",undefined)
        }else if(body.error){
            callback("Unable to find location!",undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0]+". It's currently "+body.current.temperature+
                " degrees out. It's feels like "+body.current.feelslike+" degrees")
        }
    })
}

module.exports = forecast