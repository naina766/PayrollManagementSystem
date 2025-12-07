import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    const existing = await User.findOne({ email: "hire-me@anshumat.org" });
    if (existing) {
      console.log("Seed users already exist");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("HireMe@2025!", 10);

    await User.create([
      { name: "Admin User", email: "hire-me@anshumat.org", password: hashedPassword, role: "admin" },
      { name: "Employee One", email: "employee1@example.com", password: hashedPassword, role: "employee" },
      { name: "Employee Two", email: "employee2@example.com", password: hashedPassword, role: "employee" },
    ]);

    console.log("Seed users created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
