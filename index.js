require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const router = express.Router()
const app = express()

const port = process.env.PORT || 3004;

//----------------------------
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.POSTGRESURI,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();
//-----------------------------


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})
//añadir a la DB
app.post('/create', async (req, res) => {
    const {hora, temperatura, humedad, luminosidad, estado} = req.body

    client.query(`INSERT INTO mediciones (hora, temperatura, humedad, luminosidad, estado) VALUES('${hora}', ${temperatura} , ${humedad} , '${luminosidad}' , '${estado}')`)
    res.send('Funka apito')
})
//leer la DB
app.get('/read', async (req, res) => {
  const { rows } = await client.query('SELECT * FROM mediciones');
  res.send(rows);
});

//leer ID desde la DB
app.get('/id', async(req, res) => {
  const {rows} = await client.query('SELECT id FROM mediciones ORDER BY id DESC LIMIT 1')
  res.send(rows);
});

//leer HORA desde la DB
app.get('/timestamp', async(req, res) => {
  const {rows} = await client.query('SELECT hora FROM mediciones ORDER BY id DESC LIMIT 1')
  res.send(rows);
});

//leer TEMPERATURA desde la DB
app.get('/temp', async(req, res) => {
  const {rows} = await client.query('SELECT temperatura FROM mediciones ORDER BY id DESC LIMIT 1')
  res.send(rows);
});

//leer LUMINOSIDAD desde la DB
app.get('/luminosity', async(req, res) => {
  const {rows} = await client.query('SELECT luminosidad FROM mediciones ORDER BY id DESC LIMIT 1')
  res.send(rows);
});

//leer HUMEDAD desde la DB
app.get('/humidity', async(req, res) => {
  const {rows} = await client.query('SELECT humedad FROM mediciones ORDER BY id DESC LIMIT 1')
  res.send(rows);
});

//leer ESTADO desde la DB
app.get('/state', async(req, res) => {
  const {rows} = await client.query('SELECT estado FROM mediciones ORDER BY id DESC LIMIT 1')
  res.send(rows);
});
  
app.get('/read4', async (req, res) => {
  const { rows } = await client.query('SELECT * FROM mediciones ORDER BY id DESC LIMIT 4');
  res.send(rows);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



module.exports = app
