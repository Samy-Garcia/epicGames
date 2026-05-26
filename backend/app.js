import express from "express";
import gameRoutes from "./src/routes/game.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    //permitir el envio de cookies y credenciales
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());

app.use("/api/games", gameRoutes);