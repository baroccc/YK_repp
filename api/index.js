require('dotenv').config()

const express = require('express')
const app = express()

const path = require('path')
require('dotenv').config()
const port = process.env.PORT || 3000

app.use(
    express.urlencoded({
        extended: false
    })
)

app.use(express.json({
    type: "*/*"
}))


app.use(express.static(path.join(__dirname, '/../web')));


app.get('/home',(req,res)=>{
    //Envia index.html a la solicitud
    res.sendFile(path.join(__dirname, '/../web', 'index.html'));
})


app.listen(port)
