const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

function generateToken(id) {
  const payload = {
    id,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
}
class userController {
  //@desc Register a user
  //@route POST /API/AUTH/REGISTER
  //@access public
  async registerUser(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ errorMessage: "Fill all fields!" });
      }
      const userAvailable = await User.findOne({ username });
      if (userAvailable) {
        res.status(400).json({ errorMessage: "User already exist!" });
      }
      const hashedPassword = await bcrypt.hash(password, 8);
      const user = await User.create({
        username,
        password: hashedPassword,
      });
      if (user) {
        res.status(201).json({ _id: user.id, username: user.username });
      } else {
        res.status(400).json({ errorMessage: "User data is not valid!" });
      }
    } catch (error) {
      res.status(500).json({ errorMessage: "User data is not valid!" });
    }
  }

  //@desc login user
  //@route POST /API/AUTH/LOGIN
  //@access public
  async loginUser(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ errorMessage: "Fill all fields!" });
    }
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user.id);
      res.status(201).json({ token: `token ${token}` });
    } else {
      res.status(401).json({ errorMessage: "Not valid email or password!" });
    }
  }

  //@desc get current user
  //@route POST /API/AUTH/CURRENT
  //@access private
  currentUser(req, res) {
    try {
      res.json({ message: "Current user data" });
    } catch (error) {
      res.status(500);
    }
  }
}

const UserController = new userController();
module.exports = UserController;
