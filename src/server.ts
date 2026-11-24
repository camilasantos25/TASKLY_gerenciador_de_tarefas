import express from "express";
import "dotenv/config";
import tarefaRoutes from "./routes/tarefa.routes.js";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Minha primeira API Taskly!")
});

app.use("/tarefas", tarefaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});