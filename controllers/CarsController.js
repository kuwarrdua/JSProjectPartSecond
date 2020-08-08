// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/

const viewPath = 'cars';
const Car = require('../models/car');
const User = require('../models/User');
exports.index = async (req, res) => {
  try {
    console.log(req.session.passport);
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    const cars = await Car
      .find({user: user._id})
      .populate('user')
      .sort({updatedAt: 'desc'});
    res.render(`${viewPath}/index`, {
      pageTitle: 'All inventored cars',
      cars: cars
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying the inventored cars: ${error}`);
    res.redirect('/');
  }
};
exports.show = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    .populate('user');
    res.render(`${viewPath}/show`, {
      pageTitle: car.title,
      car: car
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying this car informatio: ${error}`);
    res.redirect('/');
  }
};
exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'Add new car'
  });
};
exports.create = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    const car = await Car.create({user: user._id, ...req.body});
    req.flash('success', 'Car information added successfully');
    res.redirect(`/cars/${car.id}`);
  } catch (error) {
    req.flash('danger', `There was an error adding this car information:  ${error}`);
    req.session.formData = req.body;
    res.redirect('/cars/new');
  }
};
exports.edit = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: car.title,
      formData: car
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing this car information: ${error}`);
    res.redirect(`/`);
  }
};
exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    let car = await Car.findById(req.body.id);
    if (!car) throw new Error('The car information could not be found');
    const attributes = {user: user._id, ...req.body};
    await Car.validate(attributes);
    await Car.findByIdAndUpdate(attributes.id, attributes);
    req.flash('success', 'The car information was updated successfully');
    res.redirect(`/cars/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this car information. Check your errors: ${error}`);
    res.redirect(`/cars/${req.body.id}/edit`);
  }
};
exports.delete = async (req, res) => {
  try {
    await Car.deleteOne({_id: req.body.id});
    req.flash('success', 'This car info/bio was deleted successfully');
    res.redirect(`/cars`);
  } catch (error) {
    req.flash('danger', `There was an error deleting this car info. Check the error: ${error}`);
    res.redirect(`/cars`);
  }
};