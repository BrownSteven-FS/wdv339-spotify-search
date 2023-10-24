const mongoose = require("mongoose");

const database_name = process.env.MONGO_DATABASE_NAME || "spotify_db";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGO_URI}/${database_name}`,
      {
        // This is to prevent deprecation warnings
        useNewUrlParser: true,
        useUnifiedTopology: true,
        writeConcern: {
          w: "majority",
          j: true,
          wtimeout: 1000,
        },
      }
    );
    console.log(`MongoDB connected on host: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
