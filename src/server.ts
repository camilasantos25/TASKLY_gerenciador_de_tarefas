import express from "express";

const app = express();

app.use(express.json());

let tarefas = [
    {id: 1, titulo: "Estudar TypeScript", concluida: false},
    {id: 2, titulo: "Aprender Express", concluida: false}
];

let proximoId = 3;

app.get("/", (req, res) => {
    res.send("Minha primeira API Taskly!")
});

app.get("/tarefas", (req, res) => {
    res.json(tarefas);
});

app.get("/tarefas/:id", (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(tarefa => tarefa.id === id);

    if(!tarefa) {
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        });
    }
    res.json(tarefa);
});

app.post("/tarefas", (req, res) => {
    const { titulo } = req.body;
    const novaTarefa = {
        id: proximoId++,
        titulo: titulo,
        concluida: false
    };
    tarefas.push(novaTarefa);
    return res.status(201).json(novaTarefa);
});

app.put("/tarefas/:id", (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(tarefa => tarefa.id === id);

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
    tarefa.titulo = titulo;
    tarefa.concluida = concluida;
    return res.json(tarefa);
});

app.patch("/tarefas/:id", (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(tarefa => tarefa.id === id);

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
    tarefa.concluida = concluida;
    return res.json(tarefa);
});

app.delete("/tarefas/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = tarefas.findIndex(tarefa => tarefa.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        });
    }
    tarefas.splice(indice, 1);
    return res.status(200).json({
        mensagem: "Tarefa excluída com sucesso"
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});