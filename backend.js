const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const { engine } = require('express-handlebars');
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' });

connectDB()

const backend = express()

//Logging
if(process.env.NODE_ENV === 'deveopment'){
  backend.use(morgan('dev'))
}
//Handlebar
backend.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
backend.set('view engine', '.hbs');
backend.set('views', './views');

//routes
backend.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;

backend.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
