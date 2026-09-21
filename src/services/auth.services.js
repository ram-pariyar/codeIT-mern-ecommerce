import ResetPassword from "../models/ResetPassword.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import config from "../config/config.js";
import sendEmail from "../utils/email.js";

const register = async (input) => {
  const hashedPassword = await bcrypt.hash(input.password, 10);
  const user = await User.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
    phone: input.phone,
    address: input.address,
  });
  return {
    _id: user.id,
    name: user.name,
    address: user.address,
    email: user.email,
    phone: user.phone,
    roles: user.roles,
    isActive: user.isActive,
  };
};

const login = async (input) => {
  const user = await User.findOne({
    $or: [{ email: input?.email }, { phone: input?.phone }],
  });
  if (!user) {
    throw {
      message: "User not found",
    };
  }

  if (!user.isActive) {
    throw {
      statusCode: 403,
      message: "User disabled",
    };
  }
  const isPasswordMatch = await bcrypt.compare(input.password, user.password);
  if (!isPasswordMatch) {
    throw {
      message: "Invalid Credentials",
    };
  }
  return {
    _id: user.id,
    name: user.name,
    address: user.address,
    email: user.email,
    phone: user.phone,
    roles: user.roles,
    isActive: user.isActive,
  };
};

const forgotPassword = async (input) => {
  const user = await User.findOne({ email: input?.email });
  if (!user) {
    throw {
      statusCode: 404,
      message: "User not found.",
    };
  }

  const token = crypto.randomUUID();
  await ResetPassword.create({ user: user._id, token });
  const resetPasswordLink = `${config.appUrl}/reset-password?user=${user._id}&token=${token}`;
  await sendEmail({
    to: input.email,
    subject: "Reset Password",
    html: `
    <h1>Reset Password</h1>
    <p>Please Click the Link Below for Resetting Your Password</p>
    <a
      href="${resetPasswordLink}"
      style="
        background-color: blue;
        color: white;
        padding: 1rem 2.5rem;
        margin-top: 1rem;
      "
    >
      Reset Password
    </a>
    `,
  });
  return { message: "Email Sent Successfully" };
};

const resetPassword = async (input) => {
  const data = await ResetPassword.findOne({
    user: input.user,
    expiresAt: { $gt: Date.now() }, // expiresAt must be greater than current time
  }).sort({ createdAt: -1 }); // latest record

  if (!data || data.token != input.token) {
    throw {
      message: "Invalid Token or Token has Expired",
    };
  }

  if (data.isUsed) {
    throw {
      message: "Link Already Used",
    };
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  await User.findByIdAndUpdate(input.user, { password: hashedPassword });
  await ResetPassword.findByIdAndUpdate(data._id, { isUsed: true });

  return { message: "Password Updated Sucessfully" };
};

export default { login, register, resetPassword, forgotPassword };
