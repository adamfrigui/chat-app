const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    chatID: {
        type:String
    },
    senderID :{
        type:String
    },
    text:{
        type : String
    }
},
    { timestamps: true }
)

const MessageModel = mongoose.model("Message",MessageSchema);
module.exports = MessageModel;