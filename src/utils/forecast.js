// const url = 'https://api.darksky.net/forecast/0ca20221a68c468a7041caff7ea60431/37.8267,-112'

// request({url:url},(error,response)=>{

//     if(error){
//         console.log('unable to connect weather services')
//     }else if(response.body.error){
//         console.log('unable to find location')

//     }else{
//         const data = JSON.parse(response.body)
//        console.log(data.daily.data[0].summary +' It is currently '+data.currently.temperature+' degrees out.There is a '+data.currently.precipProbability+' % of rain')
//     }

// }) 

const request = require('request')

const forecast=(l1,l2,callback) => {
    const url = 'https://api.darksky.net/forecast/0ca20221a68c468a7041caff7ea60431/'+l1+','+l2

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('unable to connect location services', undefined)
        } else if (response.body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined,response.body.daily.data[0].summary +' It is currently '+response.body.currently.temperature+' degrees out.There is a '+response.body.currently.precipProbability+' % of rain')
            }
        

    })
}

module.exports=forecast
