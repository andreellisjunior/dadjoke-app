const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
require('./config/passport')(passport);

var app = express();
const PORT = process.env.PORT || 3000;
dotenv.config({ path: './config/config.env' });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes/index'));
app.use('/auth', require('./routes/auth'));

app.listen(PORT, console.log(`listening at ${PORT}`));

// import axios from 'axios';
// import dotenv from 'dotenv';
// import express from 'express';
// import fetch from 'node-fetch';
// import queryString from 'query-string';

// const app = express();
// dotenv.config();

// app.set('view-engine', 'ejs');

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(express.static('node_modules'));

// // Get API data
// const url = 'https://api.api-ninjas.com/v1/dadjokes?limit=1';
// const options = {
//   method: 'GET',
//   headers: {
//     'X-Api-Key': process.env.API_KEY,
//   },
// };

// // Render API data on the homepage
// app.get('/', async (req, res) => {
//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     res.render('index.ejs', { joke: JSON.stringify(data[0].joke) });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get('/login', (req, res) => {
//   res.render('login.ejs');
// });

// app.get('/signup', (req, res) => {
//   res.render('signup.ejs');
// });

// // // Google login URL
// // const stringifiedParams = queryString.stringify({
// //   client_id: process.env.CLIENT_ID,
// //   redirect_uri: 'http://localhost:3000',
// //   scope: ['https://www.googleapis.com/auth/userinfo.email'].join(' '), // space seperated string
// //   response_type: 'code',
// //   access_type: 'offline',
// //   prompt: 'consent',
// // });
// // const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

// // const urlParams = queryString.parse(globalThis.location.search);

// // if (urlParams.error) {
// //   console.log(`An error occurred: ${urlParams.error}`);
// // } else {
// //   console.log(`The code is: ${urlParams.code}`);
// // }

// // async function getAccessTokenFromCode(code) {
// //   const { data } = await axios({
// //     url: `https://oauth2.googleapis.com/token`,
// //     method: 'post',
// //     data: {
// //       client_id: process.env.CLIENT_ID,
// //       client_secret: process.env.CLIENT_SECRET,
// //       redirect_uri: 'https://www.example.com/authenticate/google',
// //       grant_type: 'authorization_code',
// //       code,
// //     },
// //   });
// //   console.log(data); // { access_token, expires_in, token_type, refresh_token }
// //   return data.access_token;
// // }

// app.listen(3000);
