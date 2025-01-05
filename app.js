import express from "express";
import userRoutes from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errMiddleware } from "./middleware/err.js";
import cors from "cors";

export const app = express();

config({
    path: "./data/config.env",
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
)

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/task", taskRouter);



app.get("/", (req, res) => {
    res.send("Nice working");
});

// using error Middleware
app.use(errMiddleware);