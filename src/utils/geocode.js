const request=require('postman-request')
const geocode=(address,callback)=>{
    url="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic29oYW1zYXJrYXI5MTYiLCJhIjoiY2tjNmtlanpiMDI5azMwbGN5YzA5OGxtbyJ9.BC8e3lwMeOLetKxp9wafDw&limit=1"
    request({url, json: true},(err,{body}={})=>{
        if(err){
            callback("Unable to connect to geocoding service",undefined)
        }else if(body.features.length===0){
            callback("Unable to find location.Try another search.",undefined)
        }else{
            long=body.features[0].center[0]
            lat=body.features[0].center[1]
            loc=body.features[0].place_name
            callback(undefined,{longitude: long, latitude: lat, location: loc})
        }
    })
}
module.exports=geocode