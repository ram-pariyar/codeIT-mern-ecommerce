import express from "express";
import config from "./config/config.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
import connectDB from "./config/database.js";
import multer from "multer";
import connectCloudinary from "./config/cloudinary.js";
import sendEmail from "./utils/email.js";

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5000000 },
});
connectDB();
connectCloudinary();

app.get("/", async (req, res) => {
  res.json({
    status: "OK",
    name: "mern-20260719",
    version: "0.1.0",
    port: config.port,
  });
});

app.use(express.json());
app.use("/api/users", upload.single("image"), userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", upload.array("images", 5), productRouter);
app.use("/api/orders", orderRouter);

app.post("/send-email", async (req, res) => {
  try {
    await sendEmail({
      to: "bardewaram10@gmail.com",
      subject: "testing",
      html: "<h1>Testing</h1>",
    });
    res.send("email sent success");
  } catch (error) {
    console.log(error);
  }
});

app.listen(config.port, () => {
  console.log(`Server Running at Port: ${config.port}`);
});
