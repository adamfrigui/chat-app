const express = require('express')

const router = express.Router()

const {createChat,userChats,findChat} = require ('../controllers/ChatController.js');

router.post('/',createChat)
//find a chat of a specific user
router.get('/:userID',userChats)

//finding specific with specific person 
router.get('/find/:firstID/:secondID',findChat)

module.exports =  router;