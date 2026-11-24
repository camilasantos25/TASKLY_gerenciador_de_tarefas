import express, { type Request } from "express";
import "dotenv/config";
import {
    listarTarefas,
    buscarTarefa,
    criarTarefa,
    atualizarTarefa,
    atualizarStatus,
    excluirTarefa
} from "./services/tarefa.service.js";

const app = express();

app.use(express.json());

type CriarTarefaBody = {
    titulo: string;
};

type AtualizarTarefaBody = {
    titulo: string;
    concluida: boolean;
};

type AtualizarStatusBody = {
    concluida: boolean;
};

app.get("/", (req, res) => {
    res.send("Minha primeira API Taskly!")
});

app.get("/tarefas", async (req, res) => {
    const tarefasDoBanco = await listarTarefas();
    return res.json(tarefasDoBanco);
});

app.get("/tarefas/:id", async (req, res) => {
    const id = Number(req.params.id);
    
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensagem: "Informe um ID válido"
        });
    }

    const tarefa = await buscarTarefa(id);

    if (!tarefa) {
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        });
    }
    return res.json(tarefa);
});

app.post("/tarefas", async (req: Request<{}, {}, CriarTarefaBody>, res) => {
    const { titulo } = req.body;

    if (typeof titulo !== "string" || titulo.trim() === "") {
        return res.status(400).json({
            mensagem: "Informe um título válido!"
        });
    }

    const novaTarefa = await criarTarefa(titulo);
    return res.status(201).json(novaTarefa);
});

app.put("/tarefas/:id", async (req: Request<{ id: string }, {}, AtualizarTarefaBody>, res) => {
    const id = Number(req.params.id);
    
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensagem: "Informe um ID válido"
        });
    }

    const tarefa = await buscarTarefa(id);

    if (!tarefa) {
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        });
    }

    const { titulo, concluida } = req.body;

    if (
        typeof titulo !== "string" ||
        titulo.trim() === "" ||
        typeof concluida !== "boolean"
    ) {
        return res.status(400).json({
            mensagem: "Informe um titulo válido e concluida como true ou false"
        });
    }
    
    const tarefaAtualizada = await atualizarTarefa(id, titulo, concluida);
    return res.json(tarefaAtualizada);
});

app.patch("/tarefas/:id", async (req: Request<{ id: string }, {}, AtualizarStatusBody>, res) => {
    const id = Number(req.params.id);
    
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensagem: "Informe um ID válido"
        });
    }

    const tarefa = await buscarTarefa(id);

    if (!tarefa) {
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        });
    }

    const { concluida } = req.body;

    if (typeof concluida !== "boolean") {
        return res.status(400).json({
            mensagem: "O campo concluida deve ser true ou false"
        });
    }
    
    const tarefaAtualizada = await atualizarStatus(id, concluida);
    return res.json(tarefaAtualizada);
});

app.delete("/tarefas/:id", async (req, res) => {
    const id = Number(req.params.id);
    
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensagem: "Informe um ID válido"
        });
    }

    const tarefa = await buscarTarefa(id);

    if (!tarefa) {
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        });
    }

    await excluirTarefa(id);

    return res.status(200).json({
        mensagem: "Tarefa excluída com sucesso"
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});