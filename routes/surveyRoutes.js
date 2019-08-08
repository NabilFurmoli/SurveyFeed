

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
        <body>
        <div style="text-align: center;">
            <h1>its our pleasure to keep you happy. your satisfaction is our priority!</h3>
        </div>
        </body>
    </html>
      `);
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
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






    
