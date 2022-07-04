const mongoose = require("mongoose");
require("dotenv").config();

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URI, {
      useNewUrlParser: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    // Exit process with failure
    process.exit(1);
  }
};
