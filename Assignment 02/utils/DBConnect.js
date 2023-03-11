const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    mongoose.set("strictQuery", false);
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDb Connected: ${connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDatabase;
