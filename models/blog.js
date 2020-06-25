const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true //This must exist
    },
    content: {
        type: String,
        required: false
    },
    status: {
       type: String,
       enum: ['DRAFT', 'PUBLISHED'],
       default: 'DRAFT'  
    }
}, {
    timestamps: true
});

//Query Helpers
BlogSchema.query.drafts = function() {
    return this.where({
        status: 'DRAFT'
    })
};
//virtual is an attribute that does not exist in our model itself
BlogSchema.virtual('synopsis')
.get(function () {
    const post = this.content;
    return post
    .replace(/(<([^>]+)>)/ig,"")
    .substring(0, 250);
});

BlogSchema.query.published = function() {
    return this.where({
        status: 'PUBLISHED'
    })
};

module.exports = mongoose.model('Blog', BlogSchema); 