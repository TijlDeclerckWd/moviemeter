var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    movie: {type: Schema.Types.ObjectId, ref:'Movie'},
    date: {type: Date, default: Date.now},
    content: String,
    rating: Number
}, { usePushEach: true });

module.exports = mongoose.model('Review', schema);