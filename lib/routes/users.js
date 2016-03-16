'use strict';

var express = require('express');
var Users = require('../models/users');
var router = express.Router();
var loginUsers = require('../controller/loginUsers');

var data;
/* GET users listing. */
router.post('/', loginUsers.registers);

router.post('/login', loginUsers.login);

router.get('/', loginUsers.renderUsers);

router.get('/:id/verification', loginUsers.verifyUser);

router.get('/:id', loginUsers.getOneUser);

module.exports = router;