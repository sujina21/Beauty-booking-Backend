const mongoose = require('mongoose');

const nailSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    createdDate: {  
        type: Date,
        default: Date.now
    },
    hashtag:[String],
    avgRating: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Nail', nailSchema);