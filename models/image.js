const mongoose = require('mongoose');

//To add images to our database because heroku will behave weird with th images
const ImageSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    //mimetype is important to tell which base64 iamge would it bind to
    mimeType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Image', ImageSchema);