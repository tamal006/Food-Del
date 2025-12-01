import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://tamalkumarkhan006_db_user:gnigGBI7iWCKgAQ6@cluster0.pswxhtz.mongodb.net/?appName=Cluster0')
    .then(() => {console.log("MongoDB connected successfully");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

export default connectDB;