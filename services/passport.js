const keys = require("../config/secrets");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const mongoose = require("mongoose");

// one parameter mangoose.model() reads from database
const User = mongoose.model("users");

// this is called by passport when we are done with second argument of GoogleStrategy,
// meaning after we are given a user modal back from database.
passport.serializeUser((user, done) => {
  // user.id is sent to browser as token to identify this user.
  // user.id is not google id, its the id that mongodb provided for that specific user model instance.
  // we will be using it from now on, since its more uniqe, user can auth with mutiple companies.
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  // userId is back from browser, its same user.id as we sent to browser(line 15)
  User.findById(userId).then(user => {
    // the user is found using the token.
    done(null, user);
  });
});

// we Ask passport to create an instance of google startegy. and we give it corresponding info.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GoogleClientID,
      clientSecret: keys.GoogleClientSecret,
      callbackURL: "/auth/google/callback", // this has to added into your google api.
      proxy: true // this makes sure the google redirection is to https instead of http.
    },
    async (accessToken, refreshToken, profile, done) => {
      // after we asked google for profile info in line 34 ,using the code given,
      // to us. thee passport got the progile info and now it calls the second argument of google strategy.
      // here we can store those user info into our database.
      console.log("profile", profile);
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        console.log("user already exist");
        // first parameter of done() is in case there was some error makeing the query
        return done(null, existingUser);
      }
      // add it to database
      // new User() creates new user isntance then save() adds it to the mongoDB.
      let user = await new User({
        googleId: profile.id,
        displayName: profile.displayName,
        profilePicture: profile.photos[0].value
      }).save();
      done(null, user);
    }
  )
);
