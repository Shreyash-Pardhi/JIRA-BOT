import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",          // allow all origins dynamically
        credentials: true      // VERY IMPORTANT for cookies
    })
);

app.use("/api", routes);

export default app;