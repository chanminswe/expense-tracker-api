const getBalance = async (req, res) => {
  try {
    const { userId, username } = req.user;

    if ((!userId, !username)) {
      return res.status(403).json({ message: "Token Expired or invalid" });
    }
  } catch (error) {
    console.error("Error occured while trying to get Balance ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getBalance;
