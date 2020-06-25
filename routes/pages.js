
const {home, about, contact} = require('../controllers/pagesController');

module.exports = router => {
    router.get('/', home);

    router.get('/about', about);

    router.get('/contact', contact);
};