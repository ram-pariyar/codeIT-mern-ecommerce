import connectDB from "../config/database.js";
import seedUsers from "./user.seeders.js";

const seed = async () => {
  try {
    await connectDB();
    await seedUsers();
    console.log("Users Seeded Sucessfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failde:", error);
    process.exit(1);
  }
};

seed();
