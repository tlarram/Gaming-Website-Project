const express = require("express"); // import express from "express"
const app = express();
const port = 8000;
const cors = require('cors')
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

require('dotenv').config();
require("../server/config/mongoose.config");

const myFirstSecret = process.env.FIRST_SECRET_KEY;

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// configure express to allow post/put
app.use( express.json() );

app.use( express.urlencoded({ extended: true }) );


app.use(cookieParser());



const AllMyAuthorRoutes = require("../server/routes/routes");
AllMyAuthorRoutes(app);


app.listen( port, () => console.log(`Listening on port: ${port}`) );