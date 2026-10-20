import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const transactions = [];



app.get("/api/transactions", (req, res) => {
    res.json(transactions);
});

const PORT =  3000;

app.post("/api/transactions", (req, res) => {
    transactions.push(req.body);
    res.json({ message: "Transaction received successfully!", transaction: req.body });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});