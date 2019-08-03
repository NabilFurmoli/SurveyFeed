


const mongoose = require('mongoose');

//const Schema = mongoose.Schema; or below are same. line 5.
//shema sets up how user table should look like, it declares the columns in case of sql.
const {Schema} = mongoose;

const recepientSchema = new Schema({
    emial:  String,
    responded: {type: Boolean, default: false},
});

module.exports =  recepientSchema;