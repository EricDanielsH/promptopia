// used to connect it to database

import mongoose from "mongoose";

let isConnected = false; // tracks connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  // Check if we are connected
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  // If not already connected ->
  try {
    // try to establish the connection
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    });

    isConnected = true;
    console.log("MongoDB just connected");
  } catch (error) {
    console.log(error);
  }
};
