import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {dbConnection} from "./database/dbConnection.js";
import {errorMiddleware} from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js";
import fileUpload from "express-fileupload";
import chatRouter from "./routes/chatRouter.js";
import translateRouter from "./routes/translateRouter.js";

const app = express();
dotenv.config({path: "./config/config.env"});

app.use(
    cors({
        // origin: [
        //     "http://localhost:5173",
        //     process.env.FRONTEND_URL
        // ],
        origin: "https://echobloom-frontend.onrender.com",
        methods: ["GET", "PUT", "DELETE", "POST"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.options("*", cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/chat", chatRouter);
app.use("/api/v1/translate", translateRouter);
app.use(
    fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
})
);

app.use("/api/v1/user",userRouter);
app.use("/api/v1/blog",blogRouter);

dbConnection();

app.use(errorMiddleware);

export default app;

