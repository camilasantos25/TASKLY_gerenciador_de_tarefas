import { test, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";

import {
    listarTarefas,
    buscarTarefa,
    criarTarefa,
    atualizarTarefa,
    atualizarStatus,
    excluirTarefa
} from "../src/services/tarefa.service.js";

vi.mock("../src/services/tarefa.service.js");

beforeEach(() => {
    vi.resetAllMocks();
});

const tarefa = {
    id: 1,
    titulo: "Estudar backend",
    concluida: false
};

test("Deve listar as tarefas", async () => {
    vi.mocked(listarTarefas).mockResolvedValue([tarefa]);

    const resposta = await request(app).get("/tarefas");

    expect(resposta.status).toBe(200);
    expect(resposta.body).toEqual([tarefa]);
});

test("Deve buscar uma tarefa pelo ID", async () => {
    vi.mocked(buscarTarefa).mockResolvedValue(tarefa);

    const resposta = await request(app).get("/tarefas/1");

    expect(resposta.status).toBe(200);
    expect(resposta.body).toEqual(tarefa);
});

test("Deve criar uma tarefa", async () => {
    vi.mocked(criarTarefa).mockResolvedValue(tarefa);

    const resposta = await request(app)
        .post("/tarefas")
        .send({ titulo: tarefa.titulo });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toEqual(tarefa);
});

test("Deve atualizar uma tarefa", async () => {
    const atualizada = {
        id: 1,
        titulo: "Estudar TypeScript",
        concluida: true
    };

    vi.mocked(buscarTarefa).mockResolvedValue(tarefa);
    vi.mocked(atualizarTarefa).mockResolvedValue(atualizada);

    const resposta = await request(app)
        .put("/tarefas/1")
        .send({
            titulo: "Estudar TypeScript",
            concluida: true
        });

    expect(resposta.status).toBe(200);
    expect(resposta.body).toEqual(atualizada);
});

test("Deve atualizar o status de uma tarefa", async () => {
    const atualizada = {
        ...tarefa,
        concluida: true
    };

    vi.mocked(buscarTarefa).mockResolvedValue(tarefa);
    vi.mocked(atualizarStatus).mockResolvedValue(atualizada);

    const resposta = await request(app)
        .patch("/tarefas/1")
        .send({ concluida: true });

    expect(resposta.status).toBe(200);
    expect(resposta.body).toEqual(atualizada);
});

test("Deve excluir uma tarefa", async () => {
    vi.mocked(buscarTarefa).mockResolvedValue(tarefa);
    vi.mocked(excluirTarefa).mockResolvedValue(tarefa);

    const resposta = await request(app).delete("/tarefas/1");

    expect(resposta.status).toBe(200);
    expect(resposta.body).toEqual({
        mensagem: "Tarefa excluída com sucesso"
    });
});

test("Deve rejeitar um título inválido", async () => {
    const resposta = await request(app)
        .post("/tarefas")
        .send({ titulo: "" });

    expect(resposta.status).toBe(400);
    expect(criarTarefa).not.toHaveBeenCalled();
});

test("Deve retornar 404 para tarefa inexistente", async () => {
    vi.mocked(buscarTarefa).mockResolvedValue(null);

    const resposta = await request(app).get("/tarefas/999");

    expect(resposta.status).toBe(404);
});