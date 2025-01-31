import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import productRoutes from "./routes/ProductRoutes"
import cors from 'cors'

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.ALLOW_ORIGIN })); 

app.use("/api/products", productRoutes);
const PORT = process.env.PORT || 5020;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
