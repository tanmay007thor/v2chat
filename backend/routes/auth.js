const {
  login,
  register,
  getAllUser,
  setAvatar,
  logout,
} = require("../controllers/userController");

const router = require("express").Router();
// router.get("" , (res) =>{
//     console.log('hey its working')
// })
router.post("/login", login);
router.post("/register", register);
router.get("/getAllUser/:id", getAllUser);
router.post("/setAvatar/:id", setAvatar);
router.get("/logout/:id", logout);

module.exports = router;
