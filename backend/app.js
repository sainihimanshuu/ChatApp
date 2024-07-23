import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./src/routes/user.routes.js";
import messageRouter from "./src/routes/message.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

export default app;
