const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        + encodeURIComponent(address)
        +'.json?access_token=pk.eyJ1IjoiamhhcmlrcmljaGFyZHNvbiIsImEiOiJja3k0cG11OWUwY3ZiMnBudDNsaW5maG5kIn0.pUbW7blG4M-d-b8JgD81qg&limit=1';

    request({ url, json: true }, (error, response, { features } = {}) => {
        if (error) {
            return callback('Unable to connect to location services.', undefined);   
        } else if (features.length === 0) { //desconstruct
            return callback('Unable to find location. Try another address.', undefined);
        }
        callback(undefined, { //desconstruct
            lat: features[0].center[1],
            long: features[0].center[0],
            location: features[0].place_name
        })
    });
}

module.exports = geocode;