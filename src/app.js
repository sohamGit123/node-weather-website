const geocode = require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const path=require('path')
const express=require('express')
const hbs=require('hbs')

const app=express()
const port=process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const templatesPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location 
app.set('views', templatesPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Soham Sarkar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Soham Sarkar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Soham Sarkar',
        text: 'Articles on building weather APIs'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
           return res.send({error})
        }
        forecast(longitude,latitude,(err,forecastData)=>{
            if(err){
               return res.send({err})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Soham Sarkar',
        msg: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Soham Sarkar',
        msg: 'page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})