import User from "../models/User.js";
import users from "./users.js";

const seedUsers = async () => {
  await User.deleteMany();
  await User.insertMany(users);
  console.log("10 Users seeded successfully.");
};

export default seedUsers;
