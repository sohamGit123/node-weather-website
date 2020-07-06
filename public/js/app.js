//console.log("Client side javascript file is loaded")

// fetch('http://localhost:3000/weather?address=!').then((res)=>{
//     res.json().then((data)=>{
//         if(data.error){
//             return console.log(data.error)
//         }
//         console.log(data)
//     })
// })

const weatherForm=document.querySelector('form')
const searchElement=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=searchElement.value

    const url='http://localhost:3000/weather?address=' + location
    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    fetch(url).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
                return console.log(data.error)
            }
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
            console.log(data.location)
            console.log(data.forecast)
        })
    })
})