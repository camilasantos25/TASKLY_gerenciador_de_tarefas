import {type Request, type Response } from "express";
import {
    listarTarefas,
    buscarTarefa,
    criarTarefa,
    atualizarTarefa,
    atualizarStatus,
    excluirTarefa
} from "../services/tarefa.service.js";

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

export async function listarTarefasController(
    req: Request,
    res: Response
) {
    const tarefas = await listarTarefas();
    return res.json(tarefas);
}

export async function buscarTarefaController(
    req: Request<{ id: string }>,
    res: Response
) {
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
}

export async function criarTarefaController(
    req: Request<{}, {}, CriarTarefaBody>,
    res: Response
) {
    const { titulo } = req.body;

    if (typeof titulo !== "string" || titulo.trim() === "") {
        return res.status(400).json({
            mensagem: "Informe um título válido"
        });
    }

    const novaTarefa = await criarTarefa(titulo);
    return res.status(201).json(novaTarefa);
}

export async function atualizarTarefaController(
    req: Request<{ id: string }, {}, AtualizarTarefaBody>,
    res: Response
) {
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
            mensagem: "Informe um título válido e concluida como true ou false"
        });
    }

    const tarefaAtualizada = await atualizarTarefa(id, titulo, concluida);
    return res.json(tarefaAtualizada);
}

export async function atualizarStatusController(
    req: Request<{ id: string }, {}, AtualizarStatusBody>,
    res: Response
) {
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
}

export async function excluirTarefaController(
    req: Request<{ id: string }>,
    res: Response
) {
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
}