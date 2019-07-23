

const express = require('express');
const keys = require('./config/secrets');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();

// we Ask passport to create an instance of google startegy. and we give it corresponding info.
passport.use(new GoogleStrategy(
    {
       clientID = keys.appGoogleClientID,
       clientSecret = keys.appGoogleClientSecret,
       callbackURL = '/auth/google/callback' 
    }, (accessToken) => { // just to see what is given back to us from google.
        console.log(accessToken);
    }
));

app.get('/', (req, res) => {
    res.send({age: 22});
})

// with this route start the authentication process.
app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'] // we only ask for profile and email of user.
    }
))

// TO Find the underlying port number heroku assignes us in runtime, if not 5000 by default
const PORT = process.env.PORT || 5000; 
app.listen(PORT)