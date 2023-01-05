const request = require ('postman-request');

const forecast = (lat, long, callback) => { 
    const url = 'http://api.weatherstack.com/current?access_key='
        + process.env.WEATHERSTACK_API_KEY
        +'&query='
        + lat
        + ','
        + long
        +'&units=f';
    
    request({ url, json: true }, (err, response, { error, current } = {}) => {
        if (err)  {
            return callback('Unable to connect to weather services', undefined);
        } else if (error) {
            return callback('Unable to find location. Try another location', undefined);
            
        }
        const { weather_descriptions: weatherDescription, temperature, feelslike: realFeel, wind_speed: windSpeed, wind_dir: windDirection, precip } = current; 
        callback(undefined, weatherDescription[0]
                    + '. It is currently ' 
                    + temperature
                    + ' degrees and it feels like ' 
                    + realFeel
                    + ' degrees. The current wind speed is ' 
                    + windSpeed 
                    + 'mph coming from the ' 
                    + windDirection 
                    + ' with a ' 
                    + precip 
                    + '% chance of rain.');
    });
}
module.exports = forecast;
