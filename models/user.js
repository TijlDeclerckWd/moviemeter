var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');


var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    ratings: [{type: Schema.Types.ObjectId, ref: 'Rating'}],
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    registerDate: Date,
    lastLogin: Date,
    top10: {
        filledIn: {type: Boolean, default: false},
        top10List: []
    }
}, { usePushEach: true });

// I still have to add the code for last logged in and the registerdate.

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);