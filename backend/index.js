import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/db.js";
import userRoute from "./routes/user.route.js"
import productRoute from "./routes/product.route.js"
import adminRoute from "./routes/admin.route.js"
import reviewRoute from "./routes/review.route.js"
import dotenv from "dotenv";
dotenv.config({})

const app = express();
const PORT = process.env.PORT || 5001;

//cors config
const corsOption = {
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
};

// middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// api routes
app.use("/user", userRoute)
app.use("/admin", adminRoute)
app.use("/product", productRoute)
app.use("/review", reviewRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
