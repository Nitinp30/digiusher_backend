import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedAWSData } from "./seedAWS.ts";
dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("Connected to MongoDB");
    await seedAWSData();

    // Close the database connection
    mongoose.connection.close();
    console.log("Disconnected MongoDB");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
