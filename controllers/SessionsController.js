const User = require('../models/User');
const passport = require('passport');
const viewPath = 'sessions';

exports.new = (req, res) => {
  res.render(`${viewPath}/login`, {
    pageTitle: 'Login'
  });
};

// Step 1: Create an action that will authenticate the user using Passport
exports.create = (req, res, next) => {
   passport.authenticate('local', {
    successRedirect: '/cars',
    successFlash: 'You were successfully logged in to my website. Enjoy',
    failureRedirect: '/login',
    failureFlash: 'Invalid Credentials. Check them correctly and try again'
    //passport.authenticate sends back a function defination
})(req, res, next);
};

// Step 2: Log the user out
exports.delete = (req, res) => {
  req.logout();
  req.flash('success', 'You were logged out successfully. Thank you!');
  res.redirect('/');
};