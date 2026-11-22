import express from "express";

const app = express();

app.use(express.json());

let tarefas = [
    {id: 1, titulo: "Estudar TypeScript", concluida: false},
    {id: 2, titulo: "Aprender Express", concluida: false}
];

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
        id: tarefas.length + 1,
        titulo: titulo,
        concluida: false
    };
    tarefas.push(novaTarefa);
    return res.status(201).json(novaTarefa);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});