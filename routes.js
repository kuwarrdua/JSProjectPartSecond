const router = require('express').Router();

//our resource routes
(require('./routes/pages'))(router);
module.exports = router;