const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const QuestionSchema = new Schema({
    questionContent: { type: String, required: true },
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 }
})



module.exports = mongoose.model("Question",QuestionSchema);