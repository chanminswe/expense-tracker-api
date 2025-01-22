const bcrypt = require("bcryptjs");
const Users = require("../../models/users");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Both Username and Password are Necessary!" });
    }

    console.log(`${username} and ${password} received`);

    const checkUnique = await Users.findOne({ username });
    if (checkUnique) {
      return res.status(400).json({ message: "Username already exist!" });
    }

    const cryptPassword = await bcrypt.hash(password, 10);

    const createUser = await Users.create({
      username,
      password: cryptPassword,
    });

    if (!createUser) {
      return res
        .status(400)
        .json({ message: "Something went wrong while creating User" });
    }

    return res.json({ message: `${username} registered successfully!` });
  } catch (error) {
    console.log("Error Occured at register controller ", error.message);
    return res.status(500).json({ message: "Internal server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Both Username and Password are required!" });
    }

    const checkUser = await Users.findOne({ username });

    if (!checkUser) {
      return res.status(400).json({ message: "Username does not exists" });
    }

    const comparePassword = await bcrypt.compare(password, checkUser.password);

    if (!comparePassword) {
      return res.json(400).json({ message: "Your Credentials are incorrect!" });
    }

    const token = jwt.sign(
      { userId: checkUser._id, username: checkUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({ message: "Login sucessfully", jwt_Token: token });
  } catch (error) {
    console.error("Error Occured at Login Controller", error.message);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = { register, login };
