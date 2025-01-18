const bcrypt = require('bcrypt');

const register = (req, res) => {
  const { username, password } = req.body;
  console.log(`${username} and ${password} received`);
  res.json({ message: "Registered sucessfully" });
};

const login = (req, res) => {
  const { username, password } = req.body;
  console.log(`${username} and ${password} received`);
  res.json({ message: "Login sucessfully" });
};

module.exports = { register, login };
