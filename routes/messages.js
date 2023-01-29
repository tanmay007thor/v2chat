const { addMessages, getMessages } = require("../controllers/messageController");
const router = require("express").Router();
// router.get("" , () =>{
//     console.log('hey there')
// })
router.post("/addmsg/", addMessages);
router.post("/getmsg/", getMessages);

module.exports = router;
