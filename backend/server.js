import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import "colors";

import { connectDB } from "./connection.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorMiddleware from "./middlewares/errors.js";

const app = express();
connectDB();

app.use(express.json({
  limit: "10mb",
  verify: (req, res, buf) =>{
    req.rawBody = buf.toString();
  }
}));
app.use(cookieParser());
app.use(cors());
app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);
app.use(errorMiddleware);

// Handle Uncaught exceptions
process.on("uncaughtException", (err) =>{
  console.log(`ERROR: ${err}`);
  console.log(
    "An uncaught exception occured. The server will shut down".red.bgRed
  );
  process.exit(1);
});

const serverHandler = app.listen(process.env.PORT, () =>{
  console.log(
    `Server connected to port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handle Promise rejections
process.on("unhandledRejection", (err) =>{
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down server");
  serverHandler.close(() =>{
    process.exit(1);
  });
});