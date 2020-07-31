const { new: _new, index, create } = require('../controllers/imagesController');
//multer provides libraries for dealing with uploads

const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage()
});

module.exports = router => {
    router.get('/images', index);
    router.get('/images/new', _new);
    router.post('/images', upload.single('image'), create);
};