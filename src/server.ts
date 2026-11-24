import express from "express";
import "dotenv/config";
import tarefaRoutes from "./routes/tarefa.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Minha primeira API Taskly!")
});

app.use("/tarefas", tarefaRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});