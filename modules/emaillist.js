const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Loginschema = new Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    }
});

// collection part
const emaillist = new mongoose.model("email_list", Loginschema);

module.exports = emaillist;