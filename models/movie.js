var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: String,
    actors: String,
    director: String,
    length: Number,
    description: String,
    genre: String,
    country: String,
    year: Number,
    averageRating: Number,
    ratings: [{type: Schema.Types.ObjectId, ref: 'Rating'}],
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    pictureUrl: String,
    trailer: String
}, { usePushEach: true });

module.exports = mongoose.model('Movie', schema);

// schema.methods.calcAverageRating = function calcAverageRating(ratingList){
//     console.log(ratingList);
//     var length = ratingList.length;
//     this.averageRating = ratingList.reduce(function(sum, rating){
//         return sum + rating.rating
//     })/length;
// }