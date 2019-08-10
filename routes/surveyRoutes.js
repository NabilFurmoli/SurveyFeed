

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

  app.get('/api/surveys/thanks', (req, res) => {
    res.send(`
    <html>
  
          <body style=" font-family: Arial; color: grey; text-align: center; display: flex; justify-content: center; align-items: center;">
              <div style=" padding: 5vw; background-color: #e6fff8; box-shadow: 0px 0px 20px 1px #606b9b;">
                <h3>Its our pleasure to keep you happy. your satisfaction is our priority!</h3>
              </div>
          </body>
        
    </html>
      `);
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    console.log('req.body in app.post', req.body)
    const { title, subject, body, emails } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: emails.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Great place to send an email!
    console.log('surveyRoutes before mailer')
    const mailer = new Mailer(survey, surveyTemplate(survey));
    console.log('surveyRoutes after mailer')
    try {
      console.log('surveyRoutes before send', mailer)
      await mailer.send();
      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();
      console.log('surveyRoutes after send', user)
      res.send(user);

    } catch (err) {
      //console.log(err)
      res.status(422).send(err);
    }
  });
};






    
