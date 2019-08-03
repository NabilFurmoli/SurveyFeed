
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/secrets');



class Mailer extends helper.Mail {
    constructor({subject, recepients}, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridkey);

        this.from_email = new helper.Email('no-reply@surveyFeed.com')
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recepients = this.formatAddresses(recepients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recepients) {
        return recepients.map(({ email }) => {
            return new herlper.Email(email);
        })
    }

    addClickTracking () {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients () {
        const personalize = new helper.Personalization();

        this.recepients.forEach( recipinet => {
            personalize.addTo(recipinet);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = this.sgApi.API(request);
        return response;
    }
}



module.exports = Mailer;  