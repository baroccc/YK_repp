const express = require('express')

const app = express()
const port = process.env.PORT || 3000
const path = require('path')


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
    res.sendFile(path.join(__dirname, '/../web', 'index.html'));
})


app.listen(port)