const bcrypt = require('bcryptjs') 
const User = require("../model/userModal");
const login = (req, res) => {
  //   res.status(200).json({ message: "hey there login req" });
};
const register = async (req, res) => {

    // try {
    //     const { username, email, password } = req.body;
    //     const usernameCheck = await User.findOne({ username });
    //     if (usernameCheck)
    //       return res.json({ msg: "Username already used", status: false });
    //     const emailCheck = await User.findOne({ email });
    //     if (emailCheck)
    //       return res.json({ msg: "Email already used", status: false });
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const user = await User.create({
    //       email,
    //       username,
    //       password: hashedPassword,
    //     });
    //     delete user.password;
    //     return res.json({ status: true, 'created' : "create" });
    //   } catch (ex) {
    //     res.send(ex)
    //   }
    res.end('suck programing')
    console.log(req.body.username)
    };
const getAllUser = (req, res) => {
  res
    .status(200)
    .json({ message: "hey there get all  user id  req", "req ": req.id });
};
const setAvatar = (req, res) => {
  res.status(200).json({ message: "hey there set avatar id  req" });
};
const logout = (req, res) => {
  res.status(200).json({ message: "hey there logout  req" });
};

module.exports = { login, register, getAllUser, setAvatar, logout };
