

const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/secrets');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridkey);
    //console.log(keys);
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();

    //console.log('Mailer construction: ', this)
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;



// const sgMail = require('@sendgrid/mail'); // separate Node package
// const helpers = require('@sendgrid/helpers'); // separate Node package
// const keys = require('../config/secrets'); // some place where you store your API keys

// class Mailer extends helpers.classes.Mail {
//     // Through the use of Static methods from the Mail helper Class, you create a sendgrid compliant instance that can be send easily
//     constructor({ subject, recipients }, content) {
//         super();
//         this.setFrom('no-reply@emaily.com'); // uses the EmailAddress.create method
//         this.setSubject(subject);
//         this.addHtmlContent(content); // same as addContent, but more specific for HTML

//         this.recipients = recipients.map(({ email }) =>
//             helpers.classes.EmailAddress.create(email)
//         );

//         this.setTrackingSettings({
//             clickTracking: { enable: true, enableText: true },
//         });

//         this.addTo(this.recipients); // This uses the personalization method in the background
//     }

//     // To separate our data from what we send out, we create another function
//     async send() {
//         sgMail.setApiKey(keys.sendGridKey);

//         return await sgMail.send(this); // attach the current instance to be send out with SendGrid
//     }
// }

// module.exports = Mailer;