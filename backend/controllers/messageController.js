const message = require('../model/messageModal')
const getMessages = async (req , res , next) =>{
    console.log('its working')
    res.status(200).json({ message: "hey there getmessage req" });

}

const addMessages = async(req , res ,next) =>{
    console.log('its working')
    res.status(200).json({ message: "hey there add message req" });


}

module.exports = {getMessages , addMessages}