const mongoose = require("mongoose");

//const Schema = mongoose.Schema; or below are same. line 5.
//shema sets up how user table should look like, it declares the columns in case of sql.
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  profilePicture: String,
  credits: { type: Number, default: 0 }
});

// this creates the table with userSchema guidlines.
mongoose.model("users", userSchema);
