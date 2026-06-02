import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import OpenAI from 'openai';
import cors from "cors";
import AIRouter from "./routes/chatgbt.ts";
dotenv.config(); // Load the .env file

const app = express();
const port = 5001;
app.use(bodyParser.json());
app.use(cors());
console.log("Registering AI router");
app.use("/chat", AIRouter);

// use middleware to parse json request bodies



app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
