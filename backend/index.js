import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/db.js";
import userRoute from "./routes/user.route.js"
import productRoute from "./routes/product.route.js"
import adminRoute from "./routes/admin.route.js"
import reviewRoute from "./routes/review.route.js"
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({})

const app = express();
const PORT = process.env.PORT || 5001;

//cors config
// const corsOption = {
//     origin: ["https://admin-dashboard-ev.netlify.app", "http://localhost:5173"],
//     credentials: true,
// };
const allowedOrigins = ['https://admin-dashboard-ev.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOption));

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/user", userRoute)
app.use("/admin", adminRoute)
app.use("/product", productRoute)
app.use("/review", reviewRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
