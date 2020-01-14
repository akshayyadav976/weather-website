const express= require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()

const publicDir = path.join(__dirname,'../public')
const templateDir  = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDir))

app.set('view engine','hbs')
app.set('views',templateDir)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Akshay'
    })  
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Akshay'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'for help search google.com',
        title:'Help',
        name:'Akshay'
    })
})
app.get('/weather',(req,res) => {

    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }


    geocode(req.query.address,(error,{latitude,longitude,location})=>{

        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                 forecast: forecastData,
                 location, 
                address:req.query.address  
                 })
        })
    })

})


app.get('/products',(req,res) => {

    if(!req.query.search){
        return res.send({
            error:'You must provide search'
        })
    }

    res.send({
        products:[]   
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Akshay',
        errorMsg:'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Akshay',
        errorMsg:'Page not found'
    })
})

app.listen(3000,()=>{console.log('server is up on port 3000')})