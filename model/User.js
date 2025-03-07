const mongoose = require("mongoose");

// Define Schema First
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});


// Now create the model
const Usermodel = mongoose.model("user", UserSchema);

module.exports = Usermodel;
