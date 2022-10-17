const User = require("../models/userModel");

exports.findUser = async (req, res) => {
    try {
        const user = await User.findOne({_id:req.params.id})
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}