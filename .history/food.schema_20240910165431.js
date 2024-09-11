const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    foodName: {
        type: String,
        required: true,
    },

});

module.exports = foodSchema;