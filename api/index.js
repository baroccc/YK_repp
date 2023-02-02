const express = require('express')

const app = express()
const port = 3000

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json({
    type: "*/*"
}))

app.get('/', (req, res)=>{
    res.send("Hola mundo")
})

app.listen(port, () => {
    console.log(`Estoy ejecutandome en http://localhost:${port}`)
})
