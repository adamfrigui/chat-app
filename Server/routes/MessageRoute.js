const express = require('express')

const router = express.Router()

const {addMessage ,getMessages} = require ('../controllers/MessageController.js');

//send a message
router.post('/',addMessage)

//get messages from a specific chat id
router.get('/:chatID',getMessages)
 

module.exports =  router;