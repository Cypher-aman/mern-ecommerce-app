import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/product.js";
import categoryRoute from "./routes/category.js";
import brandRoute from "./routes/brand.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

/* INITIAL SETUP */
dotenv.config();
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "build")));

/* APP ROUTES */
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

/* SERVER LISTENING */
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("Server started: ", PORT));
  });
