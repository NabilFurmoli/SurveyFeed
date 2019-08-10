
const _ = require('lodash');
const {Path} = require('path-parser')
const {URL} = require('url') // from node by default.

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

  app.get('/api/surveys', requireLogin,  async (req, res) => {

    // fetch all surveys with this user id except dont inculde the recipients.
    const surveys = await Survey.find({_user: req.user.id}).select({
      recipients: false
    });
    res.send(surveys);
  })

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
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

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  })

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
      //console.log('surveyRoutes before send', mailer)
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






    
// const events = _.map(req.body, (event) => {
//   const pathName = new URL(event.url).pathname; // this parse just the path excluding the domain
//   const p = new Path('/api/surveys/:surveyId/:choice'); //p is an object that surveyid and choice  key and its actual values.
//   const match = p.test(pathName); // p.test returns { surveyId: '5d4e68845deb0d3ed4d470e8', choice: 'yes' }
  
//   if(match) {
//     return {email: event.email, surveyId: match.surveyId, choice: match.choice}
//   }
// })
// const compactEvents = _.compact(events); // deletes udefined indices of array
// const uniqueEvents = _.unionBy(compactEvents, 'email', 'surveyId')
// console.log(uniqueEvents);