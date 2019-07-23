

let appClientId = '934781814221-89r6hem5lj3pf2hv4vdf9k6q854kshuj.apps.googleusercontent.com';
let appClientSecret = 'SlzBuqhyUpQkTBp5MDS9gBam';

const express = require('express');
const keys = require('./config/secrets');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();

passport.use(new GoogleStrategy(
    {
       clientID = keys.appGoogleClientID,
       clientSecret = keys.appGoogleClientSecret,
       callbackURL = '/auth/google/callback' 
    }, (accessToken) => {
        console.log(accessToken);
    }
));

app.get('/', (req, res) => {
    res.send({age: 22});
})

// TO Find the underlying port number heroku assignes us in runtime, if not 5000 by default
const PORT = process.env.PORT || 5000; 
app.listen(PORT)