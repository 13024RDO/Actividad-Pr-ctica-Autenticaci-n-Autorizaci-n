import cors from "cors";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import path from "path";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes.js";

config();

const app = express();
const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();

app.use(
  cors({
    origin: ["http://localhost:5500", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mi_secreto",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use("/auth", authRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);
