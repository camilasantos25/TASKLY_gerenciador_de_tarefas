import express from "express";
import "dotenv/config";
import {
    listarTarefasController,
    buscarTarefaController,
    criarTarefaController,
    atualizarTarefaController,
    atualizarStatusController,
    excluirTarefaController
} from "./controllers/tarefa.controller.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Minha primeira API Taskly!")
});

app.get("/tarefas", listarTarefasController);

app.get("/tarefas/:id", buscarTarefaController);

app.post("/tarefas", criarTarefaController);

app.put("/tarefas/:id", atualizarTarefaController);

app.patch("/tarefas/:id", atualizarStatusController);

app.delete("/tarefas/:id", excluirTarefaController);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});