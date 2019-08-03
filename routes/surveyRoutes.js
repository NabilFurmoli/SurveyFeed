
const mongoose = require('mongoose');
// one parameter mangoose.model() reads from database
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveytemplate = require('../services/EmailTemplate.js')

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits'); 

module.exports =  (app) => {
    app.post('/api/surveys', requireLogin, requireCredits, sendSurveyHundler);
}


const sendSurveyHundler = async (req, res) => {

    let EmailsArr = req.body.recepient.split(", ");
    let recepientsArr = [];

    for (let i = 0; i < EmailsArr.length; i++) {
        recepientsArr.push({email: EmailsArr[i].trim()});
    }

    let survey = await new Survey({
        title:  req.body.title,
        subject: req.body.subject,
        body: req.body.body, 
        recipients: recepientsArr,
        _user: req.user.id,
        dateSent: Date.now()
    });

    let mailer = new Mailer(survey, surveytemplate(survey));
    mailer.send();

}





    
