import mongoose from "mongoose";
const connectDB = async () => {
  //try catch inorder to get error thrown by the mongoose/mongodb to be capture to better error handling
  try {
    const mongooseInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "MongoDB connected successfully! host :",
      mongooseInstance.connection.host,
    );
  } catch (error) {
    console.log("Error while connecting to remote Database :: ",error);
    process.exit(1);
  }
};

export default connectDB;
