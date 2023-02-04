require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const router = express.Router()
const { Pool } = require('pg')
const app = express()

const port = process.env.PORT || 3002;

//-----------------------------
const { Client } = require('pg');

const client = new Client({
  user: 'kdrmaqhb',
  host: 'peanut.db.elephantsql.com',
  database: 'kdrmaqhb',
  password: 'IiD8MHE7G_U4MnOYSmrk9z6VTKkS-t28',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

//-----------------------------


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})

app.post('/create', async (req, res) => {
    const {tiempo, temperatura, humedad, luminosidad, estado} = req.body
    const client = await pool.connect()
    try {
      await client.query(`INSERT INTO stats (tiempo, temperatura, humedad, luminosidad, estado) VALUES('${tiempo}', ${temperatura} , ${humedad} , ${luminosidad} , '${estado}')`)
    } finally {
      client.release()
    }
})
  
app.get('/read', async (req, res) => {
    try {
      const client = await pool.connect()
      const { rows } = await client.query('SELECT * FROM stats s')
      res.send(rows)
    } catch (error) {
      console.error(error)
      res.status(500).send({ error: 'Error reading from database' })
    } finally {
      client.release()
    }
});
  
app.get('/read_4', async (req, res) => {
    try {
      const client = await pool.connect()
      const { rows } = await client.query('SELECT * FROM stats ORDER BY id DESC LIMIT 4');
      res.send(rows)
    } catch (error) {
      console.error(error)
      res.status(500).send({ error: 'Error reading from database' })
    } finally {
      client.release()
    }
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app
