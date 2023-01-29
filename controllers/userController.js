const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModal");
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const isUser = await User.findOne({ username: username });

  try {
    if (!user) {
    return   res.status(400).json({ message: "user is not found !", status: false });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
     return  res.status(401).json({ message: "user is unauthoized !", status: false });
    }
    const token = jwt.sign(
      {
        name: user.username,
        id: user._id,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );
    return res
      .status(200)
      .json({ message: "user found succesfully !", status: true, isUser ,token : token });
  } catch (e) {
    console.log(e);
  }
};
const register = async (req, res) => {
  const { username, email, password } = await req.body;
  const checkUserName = await User.findOne({ username });
  const checkEmail = await User.findOne({ email });
  const hashPassword = await bcrypt.hash(password, 10);

  try {

    if (checkUserName) {
      return res
        .status(400)
        .json({ message: "username already taken ", status: false });
    }
    else if (checkEmail) {
      return res.status(400).json({ message: "email already taken ", status: false });
    }

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    const token = jwt.sign(
      {
        name: user.username,
        id: user._id,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );
    res.status(201).json({
      message: "User Created Succesfully !",
      status: true,
      user,
      token: token,
    });
  } catch (e) {
    console.log(e);
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
    const userId = await req.params.id;
    const avatarImage = 'jpeg';

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
      console.log(req.files)
    res.status(200).json({
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
  try {
    const id = req.params.id;
    if (!id) {
      res.status(402).json({ message: "not found id", status: false });
    }
    onlineUsers.delete({ id });
    res.status(200).json({ message: "Lougout User", status: true });
  } catch (e) {
    res.status(500).json({ message: "server error", status: false });
  }
};

module.exports = { login, register, getAllUser, setAvatar, logout };
