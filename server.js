const express = require('express');
const colors = require('colors'); 
const dotenv = require('dotenv');
const morgan = require('morgan')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db');

// load env vars
dotenv.config({path: './config/config.env'})

//connect to database
connectDB();

// Route files 
const books = require('./routes/bookstore.js')
const auth = require('./routes/auth.js')

const app = express()

//Body parser
app.use(express.json());

// Mount routers 
app.use('/api/v1/books',books);
app.use('/api/v1/auth',auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen( 
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
    );

    // Handle unhandled promise rejection

process.on(`unhandledRejection`, (err, promise) =>{
    console.log(`Error: ${err.message}`.red);
    // close server and exit process
    server.close(() => process.exit(1));
});


