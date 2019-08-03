

const RecipientShema = require('./Recepient');
const mongoose = require('mongoose');

//const Schema = mongoose.Schema; or below are same. line 5.
//shema sets up how user table should look like, it declares the columns in case of sql.
const {Schema} = mongoose;

const surveysSchema = new Schema({
    title:  String,
    subject: String,
    body: String, 
    recipients: [RecipientShema],
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    // this indicates a relationship between the surveya nd a user. from user model
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dateSent: Date,
    lastResponded: Date
});

// this creates the table with userSchema guidlines.
// "surveys" is the name of teh model or table.
mongoose.model('surveys', surveysSchema);