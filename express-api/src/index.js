require('dotenv').config();
const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express()

const port = process.env.PORT|| 5000

// Middleware to parse JSON in the request body
app.use(bodyParser.json());
app.use(cors())
// db connection
const db = mysql.createPool({
    host:process.env.HOST,
    user: process.env.USER ,
    password: process.env.PASSWORD ,
    database: process.env.DATABASE
})

db.getConnection((err, result) => {
    if(err) {
        console.log(err)
    }
    if(result) {
        console.log('database connected')
    }
})


app.get('/api/lagguges', (req, res) => {
   db.query('select * from stored_db', (err, result) => {
    if (err) {
      console.error('Error querying data: ' + err.message);
      res.status(500).json({ error: 'Internal Server Error' });
  } else {
      res.json(result);
  }
});
});


app.post("/api/lagguges", (req, res) => {
    const {
      first_name,
      last_name,
      phone_number,
      email,
      emergency_first_name,
      emergency_last_name,
      emergency_phone_number,
      leave_date,
      leave_time,
      leave_time_period,
      return_date,
      return_time,
      return_time_period,
      luggage_type,
      luggage_description,
      luggage_photo,
      luggage_location
    } = req.body;

    const sql = 'INSERT INTO stored_db (first_name, last_name, phone_number, email, emergency_first_name, emergency_last_name, emergency_phone_number, leave_date, leave_time, leave_time_period, return_date, return_time, return_time_period, luggage_type, luggage_description, luggage_photo, luggage_location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
        first_name,
        last_name,
        phone_number,
        email,
        emergency_first_name,
        emergency_last_name,
        emergency_phone_number,
        leave_date,
        leave_time,
        leave_time_period,
        return_date,
        return_time,
        return_time_period,
        luggage_type,
        luggage_description,
        luggage_photo,
        luggage_location
    ];
console.log(sql,values)
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data: ' + err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Data inserted successfully');
        res.json({ message: 'Data inserted successfully' });
      }
    });
  });
  
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})