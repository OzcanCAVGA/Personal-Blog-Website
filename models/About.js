const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
    title: {
        type: String,


    },
    content: {
        type: String,


    }

})

const About = mongoose.model("About", AboutSchema);
module.exports = About;