const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

// PARSING MIDDELWEAR
app.use(bodyParser.urlencoded({ extended: false }));

// PARSE APPLICATION /JSON
app.use(bodyParser.json());

// EXPRESS HANDELBARS ENGINE
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
// // router
// app.use((req, res, next) => {
//   res.render('home')
// })


app.use(express.static('public'));

const pool = mysql.createPool({
  connectionLimit: 100,
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  host: 'localhost',
  user: 'root',
  password: 'Sidak123#&',
  database: 'userManagementSystem'
})
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('CONNECTED SUCCESSFULLY');
  console.log('CONNECTED AS ID' + connection.threadId);
})

// // SETTING THE ROUTES
const userRoutes = require('./server/routes/user');
app.use(userRoutes);
// app.use((req,res,next)=>{
//   res.render('home');
// })
const port = process.env.PORT || 2100;
require('dotenv').config();
app.listen(port, () => {
  console.log('LISTEN ON PORT ' + port);
})

