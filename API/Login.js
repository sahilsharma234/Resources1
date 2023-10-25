const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sahil@123',
  database: 'student',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Define a signup endpoint
app.post('/signup', (req, res) => {
  const { email, password,firstname,lastname } = req.body;

  const sql = 'INSERT INTO users (email, password,firstname,lastname) VALUES (?, ?,?,?)';
  db.query(sql, [email, password,firstname,lastname], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Signup failed' });
    } else {
      res.status(201).json({ message: 'User signed up successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
