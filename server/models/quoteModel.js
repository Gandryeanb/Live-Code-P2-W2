const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    status: String,
    user : String,
    likes : [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote