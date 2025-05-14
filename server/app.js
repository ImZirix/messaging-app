// Dependencies
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CORS }));

// Routes

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 3000}`
  );
});
