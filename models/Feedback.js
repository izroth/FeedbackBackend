const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FeedbackSchema = new Schema({
    Feedback_tile: {
        type: String,
    },
    user_id: {
        type: String,
    },
    Feedback_cat: {
        type: String,
        enum: ['UI', 'UX', 'FEATURE', 'BUG', 'ENHANCEMENT']
    },
    date: {
        type: Date,
        default: Date.now
    },
    update_status: {
        type:String,
        enum: ['SUGESSTION', 'IN PROGRESS', 'PLANNED', 'INLIVE']
    },
    Feedback_description: {
        type: String,
    },
    
});
module.exports = mongoose.model('Feedback', FeedbackSchema);
