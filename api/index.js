const express = require('express')

const app = express()
const port = process.env.PORT || 3001
const path = require('path')

require('dotenv').config()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json({
    type: "*/*"
}))


app.use(express.static(path.join(__dirname, '/../web')));


app.get('/home',(req,res)=>{
    //Envia index.html a la solicitud
    //res.sendFile(path.join(__dirname, '/../web', 'index.html'));
    res.send("QLQ, tamo al garo, o no tamo al garo?")
})


app.listen(port)