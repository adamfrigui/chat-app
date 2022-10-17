const express = require('express')

const router = express.Router()

const { findUser } = require('../controllers/UserController.js');


router.get('/:id', findUser)




module.exports = router;