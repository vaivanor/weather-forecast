import express from "express";
import cors from "cors";
import helmet from "helmet";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const connectionString = process.env.MONGO_URI;
const port = 3000;

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith("http://localhost")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors."));
      }
    },
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    const connection = await MongoClient.connect(connectionString);
    const db = connection.db("sample_mflix");
    console.log("Connected to MongoDB.");

    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use("/", analyticsRoutes);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB.", error);
    process.exit(1);
  }
};

startServer();
