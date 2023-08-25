const Feedbacks = require('../../models/Feedback')
const User = require('../../models/user')
const errors = {
    no_feedback: 'No feedback found',
    no_user: 'No user found',
    no_Feedback_cat: 'No Feedback category found',
    no_Feedback_tile: 'No Feedback title found',
    no_Feedback_description: 'No Feedback description found',
    no_update_status: 'No update status found',
}
const giveFeedback = async (req, res) => {
    try{
        const user = req.userid;
        const { Feedback_tile, Feedback_cat, Feedback_description, update_status } = req.body;
        let errors = [];
        if (!Feedback_tile) {
            errors.push({ msg: errors.no_Feedback_tile });
        }
        if (!Feedback_cat) {
            errors.push({ msg: errors.no_Feedback_cat });
        }
        if (!Feedback_description) {
            errors.push({ msg: errors.no_Feedback_description });
        }
        if (!update_status) {
            errors.push({ msg: errors.no_update_status });
        }
        
        if (Feedback_cat && !errors.includes({ msg: errors.no_Feedback_cat })) {
            if (Feedback_cat !== 'UI' && Feedback_cat !== 'UX' && Feedback_cat !== 'FEATURE' && Feedback_cat !== 'BUG' && Feedback_cat !== 'ENHANCEMENT') {
                errors.push({ msg: errors.no_Feedback_cat });
            }
        }
        if (update_status && !errors.includes({ msg: errors.no_update_status })) {
            if (update_status !== 'SUGESSTION' && update_status !== 'IN PROGRESS' && update_status !== 'PLANNED' && update_status !== 'INLIVE') {
                errors.push({ msg: errors.no_update_status });
            }
        }

        if (errors.length > 0) {
            res.render('giveFeedback', {
                errors,
                Feedback_tile,
                Feedback_cat,
                Feedback_description,
                update_status
            });
        }
        else {
            const newFeedback = new Feedbacks({
                Feedback_tile,
                user_id: user,
                Feedback_cat,
                Feedback_description,
                update_status
            });
            await newFeedback.save();
            res.status(200).json({ msg: "Feedback added successfully" });
        }


    }
    catch(err){
        console.log(err)
        res.status(400).json.Stringfy(err)

    }
}
module.exports = giveFeedback;
