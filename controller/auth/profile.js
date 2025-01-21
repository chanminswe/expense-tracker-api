const User = require("../../models/users");

const profile = async (req, res) => {
  try {
    const { userId, username } = req.user;
    if (!userId || !username) {
      return res.status(400).json({ message: "Expired Token!" });
    }

    const profile = await User.find({ _id: userId });

    if (!profile) {
      return res.status(400).json({ message: "Cannot find User!" });
    }

    return res
      .status(200)
      .json({ message: "Profile Info Retrieved Sucessful", profile });
  } catch (error) {
    console.error("Error occured at Profile Page", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = profile;
