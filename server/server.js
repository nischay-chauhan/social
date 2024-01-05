import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

  app.use(express.json());
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  app.use(morgan("common"));
  app.use(bodyParser.json({ limit: "30mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
  app.use(cors());
  app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });

  //Register ke time file upload karenge toh usse handle aise kar sakte hai 
  app.post("/auth/register", upload.single("picture"), register);

  app.use("/auth" , authRoutes);

  const PORT = process.env.PORT || 6001;

  connectDB();

app.listen(process.env.PORT || PORT, () => console.log(`Server Port: ${PORT}`))

