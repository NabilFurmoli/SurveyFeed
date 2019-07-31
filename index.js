

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/secrets');

require('./models/User');

//connecting to the database.
mongoose.connect(keys.mongoURI).then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });

// this says to just execute the required file here.
require('./services/passport');

const app  = new express();

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    // a key that we give and cookie-session encrypts our token.
    keys: [keys.cookieKey]  
}))

// this asks passport to make use of cookies to hundle authentication.
app.use(passport.initialize());
app.use(passport.session());

// authRoutes is a function imported from authRoutes.js file so that we can execute the auth routes.
// or we could have simply execute as: require('./routes/authRoutes')(app);
const authRoutes = require('./routes/authRoutes');
authRoutes(app);

app.get('/api/logout', function(req, res) {
    //removeFrom_usertabele(req);
    console.log("logging out");
    req.logout();
    res.redirect("/");
  });
// TO Find the underlying port number heroku assignes us in runtime, if not, 5000 by default
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log("listening....");
})

