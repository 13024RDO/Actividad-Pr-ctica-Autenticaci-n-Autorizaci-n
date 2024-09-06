import cors from "cors";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import path from "path";
import { SECRET_KEY } from "./src/config/env.js";
import { PORT } from "./src/config/env.js";
import { sessionRoutes } from "./src/routes/routes.js";

const app = express();
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
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);
app.use(sessionRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);
