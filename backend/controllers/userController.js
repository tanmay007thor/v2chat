const bcrypt = require("bcryptjs");
const { create } = require("../model/userModal");
const User = require("../model/userModal");
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "email is not found !", status: false });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "user is unauthoized !", status: false });
    }
    const isUser = await User.findOne({ username: username });
    return res
      .status(200)
      .json({ message: "user found", status: true, isUser });
  } catch (e) {
    console.log(e);
  }
};
const register = async (req, res) => {
  try {
    const { username, email, password } = await req.body;
    console.log(username, email);
    const checkUserName = await User.findOne({ username });
    if (checkUserName) {
      res
        .status(400)
        .json({ message: "username already taken ", status: false });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      res.status(400).json({ message: "email already taken ", status: false });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(201).json({
      message: "User Created Succesfully !",
      status: true,
      user,
    });
  } catch (e) {
    res.status(500).json({ message: "Server Error !", status: false });
  }
};
const getAllUser = async (req, res) => {
  try {
    const { id } = await req.params;
    const getUser = await User.findById(id).select([
      "username",
      "email",
      "isAvatarImageSet",
      "avatarImage",
    ]);
    res
      .status(200)
      .json({ message: "User Found Successfully", status: true, getUser });
  } catch (e) {
    res.status(500).send({ message: "Server error !", status: false });
  }
};
const setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );

    res
      .status(200)
      .json({
        message: "succesfully updated ",
        status: true,
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
  } catch (e) {
    res.status(500).json({ message: "server error", status: false });
  }
};
const logout = (req, res) => {
  res.status(200).json({ message: "hey there logout  req" });
  try {
  } catch (e) {
    res.status(500).json({ message: "server error", status: false });
  }
};

module.exports = { login, register, getAllUser, setAvatar, logout };
