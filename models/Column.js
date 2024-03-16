const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ColumnSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    miniContent: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    date: {
        type: Date,
        default: Date.now,
    },

});

const Column = mongoose.model("Column", ColumnSchema);
module.exports = Column;
