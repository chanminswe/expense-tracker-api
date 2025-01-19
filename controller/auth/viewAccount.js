const Users = require("../../models/users");

const viewAccount = async (req, res) => {
  try {
    const userInfo = req.user;

    if (!userInfo) {
      return res.status(403).json({ message: "Unauthorized token!" });
    }

    const accountInfo = await Users.findById(userInfo.userId);

    if (!accountInfo) {
      return res.status(400).json({ message: "Couldn't find user account " });
    }
    return res.json({ accountInformation: accountInfo, user: req.user });
  } catch (error) {
    console.error("Error Occured at view Account controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = viewAccount;
