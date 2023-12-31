const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;

  // check if user is available in DB
  const user = await User.findOne({ username });
  if (!user) res.status(400).send({ message: "Invalid username/password" });

  // check if password is correct
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    res.status(400).send({ message: "Invalid username/password" });

  const { password: hashedPassword, _id, ...userDetails } = user.toJSON();

  // generate JWT token
  const token = jwt.sign(
    {
      ...userDetails,
    },
    "secret",
    { expiresIn: "2 days" }
  );

  res.status(200).send({
    user: userDetails,
    token,
  });
};

const register = async (req, res) => {
  const { username, password, firstName, lastName, isAdmin } = req.body;
  if (!username || !password || !firstName || !lastName || !isAdmin) {
    res.status(400).send({ message: "all fields are required" });
  }

  try {
    const user = new User({
      username,
      password,
      firstName,
      lastName,
      isAdmin,
    });

    await user.save();

    res.status(200).send({ user });
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

const verify = async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  login,
  register,
  verify,
};
