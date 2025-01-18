const mongoose = require("mongoose");

const DbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URl);
    console.log(`Data base connected ${connection.connection.host}`);
  } catch (error) {
    console.error("Error Connecting to the database!", error.message);
    process.exit(1);
  }
};

module.exports = DbConnection;
