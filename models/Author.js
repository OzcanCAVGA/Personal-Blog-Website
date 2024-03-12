const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const slugify = require('slugify')
const Schema = mongoose.Schema;



const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    columns: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Column"
        }
    ]
})

AuthorSchema.pre('save', function (next) {
    const author = this;
    bcrypt.hash(author.password, 10, (error, hash) => {
        author.password = hash;
        next();
    })
})


const Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;