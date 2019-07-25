
const passport = require('passport');


// module.exports returns or exports a function that takes an argument.
// this fucntion is then imported in index.js so that its connected to the actual express app rout pipelines created in that file.
module.exports = (app) => {
    // with this route start the authentication process.
    // after user login its google account, google sends us a specific code
    // and redirects to the route we give as callbackURL above.then we handle the route in line 34.
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'] // we only ask for profile and email of user.
    }
    ))
    
    // now we call pass.authenticate again, this time it behaves diferently since passport sees that the redirected url includes a code. 
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
    });
};
