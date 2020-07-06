const request=require('postman-request')
const forecast=(long,lat,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=5d9981cc21a5f773b4c0f6b6a6047925&query=" + lat + "," + long + "&units=m"
    request({url, json: true},(err,{body}={})=>{
        if(err){
            callback("Unable to connect to weather service",undefined)
        }else if(body.error){
            callback("Can't generate latitude and longitude.Try another search.",undefined)
        }else{
            temp=body.current.temperature
            apparent_temp=body.current.feelslike
            weather_desc=body.current.weather_descriptions[0]
            humidity=body.current.humidity
            msg=weather_desc+". It is currently "+temp+" degrees out. It feels like "+apparent_temp+" degrees out." + " The humidity is " + humidity + "%."
            callback(undefined,msg)
        }
    })
}

module.exports=forecast