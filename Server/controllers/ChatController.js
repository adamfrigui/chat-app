const ChatModel = require('../models/ChatModel')

exports.createChat = async (req, res) => {
    const newChat = new ChatModel({
        members: [req.body.senderID, req.body.receiverID]
    })
    try {
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }

}
exports.userChats = async (req, res) => {
    try {
        const chat = await ChatModel.find({ members: { $in: [req.params.userID] } })
        //$in : members should include the id of out request
        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.findChat = async (req, res) => {
    try {
        const chat = await ChatModel.findOne({
            members:{$all:[req.params.firstID,req.params.secondID]}
            //$all : members should include both ids of out request
        })
        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json(err);
    }
}