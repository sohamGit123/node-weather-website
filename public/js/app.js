//console.log("Client side javascript file is loaded")

const weatherForm=document.querySelector('form')
const searchElement=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=searchElement.value

    const url='/weather?address=' + location
    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    // var internet=false
    // var reached=false
    fetch(url).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                //reached=true
                messageOne.textContent=data.error
                return console.log(data.error)
            }
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
            console.log(data.location)
            console.log(data.forecast)
            // internet=true
            // reached=true
        })
    })

    // if(internet!=true && reached!=true){
    //     messageOne.textContent='Check your internet connection!'
    // }
})