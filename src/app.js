const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const e = require("express");

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Ali Bugra Topcuoglu'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Ali Bugra Topcuoglu'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText: 'This is sum helpfull text.',
        title: 'Help',
        name: 'Ali Bugra Topcuoglu'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send(error)
        }

        forecast(latitude, longitude, (error, response) => {
            if (error) {
                return  res.send(error)
            }
            res.send({
                forecast: response,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Ali Bugra Topcuoglu',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Ali Bugra Topcuoglu',
        errorMessage: 'Page not Found'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port '+port+'.')
})