const { new: _new, index, show, create, edit, update, delete: _delete } = require('../controllers/CarsController');

function auth (req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).json({message: "You must authenticate before using this API call"});
    }
    next();
  }

module.exports = router => {
    router.get('/cars', auth, index); //public
    router.get('/cars/new', auth, _new); // authenticated
    router.post('/cars', auth, create);// authenticated
    router.post('/cars/update', auth, update);// authenticated
    router.post('/cars/delete', auth,  _delete);// authenticated
    router.get('/cars/:id/edit', auth, edit);// authenticated
    router.get('/cars/:id', show); // authenticated
};