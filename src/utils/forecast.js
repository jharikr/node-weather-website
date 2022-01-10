const request = require ('postman-request');

const forecast = (lat, long, callback) => { //descontruct
    const url = 'http://api.weatherstack.com/current?access_key=8e76be4aa2936b68cee6cc34e61aa7f1&query='
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
        const { weather_descriptions: weatherDescription, temperature, feelslike: realFeel, wind_speed: windSpeed, wind_dir: windDirection, precip } = current; //desconstruct
        // callback(undefined, {
        //     weatherForecast: weatherDescription[0],
        //     temperature: temperature, 
        //     realFeel: feelslike
        // })
        callback(undefined, weatherDescription[0]
                    + '. It is currently ' 
                    + temperature
                    + ' degrees out. It feels like ' 
                    + realFeel
                    + ' degrees out. The current wind speed is ' 
                    + windSpeed 
                    + 'mph coming from the ' 
                    + windDirection 
                    + ' with a ' 
                    + precip 
                    + '% chance of rain.');
    });
}
module.exports = forecast;
