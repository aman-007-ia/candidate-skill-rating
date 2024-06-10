// index.js

import express from "express";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";
import connectDB from "./config/db.config.js";
import helmet from "helmet";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Database Connection
connectDB();

// Routes
import Routes from "./routes/index.js";
app.use(Routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
