const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Set upp handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve; exposes directory oon server (by default files arent accessible)
app.use(express.static(publicDirectoryPath)); 

// home page; default page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jharik A. Richardson'
    });
});

// about 
app.get('/about', (req, res) => {
   res.render('about', {
    title: 'About Me',
    name: 'Jharik A. Richardson'
   });
});

// help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jharik A. Richardson',
        helpText:'This is the help page.'
    });
});

// weather page
app.get('/weather', ({ query: {address} } = {}, res) => {
    if (!address) {
        return res.send({
            error: 'Unable to find location. Try another search.'
        });
    }
    geocode(address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(lat, long, (error, forecast) => {
            if (error) {
                return res.send({ error });
            }
            return res.send({
                forecast,
                location,
                address
            });
        });
    });
});

app.get('/products', ({ query: {search} } = {}, res) => {
    if(!search) {
       return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
});

// 404 on any request /help/
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jharik A. Richardson',
        errorMessage: 'Help page cannot be found'
    })
});

// 404 rendering; * = any page that hasnt been reached as yet (must be last)
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jharik A. Richardson',
        errorMessage: 'Page not found'
    })
});

// start server
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});