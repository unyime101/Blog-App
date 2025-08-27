const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Loginschema = new Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const usr = new mongoose.model("users", Loginschema);

module.exports = usr;