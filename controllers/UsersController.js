const User = require('../models/user');
const viewPath = 'users';

exports.new = (req,res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: 'New User'
    });
};

exports.create = async (req,res) => {
    try{
        const user = await User.create(req.body);
        req.flash('success', 'The user was successfully created');
        res.redirect('/');
    } catch(error){
        console.log(error);
        req.flash('danger', error);
        //to take the user data back to him
        req.session.formData = req.body;
        res.redirect(`${viewPath}/register`)
    }
};