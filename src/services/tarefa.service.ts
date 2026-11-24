import  { prisma } from "../prisma.js";

export async function listarTarefas() {
    return await prisma.tarefa.findMany();
}

export async function buscarTarefa(id: number) {
    return await prisma.tarefa.findUnique({
        where: {
            id: id
        }
    });
}

export async function criarTarefa(titulo: string) {
    return await prisma.tarefa.create({
        data: {
            titulo: titulo
        }
    });
}

export async function atualizarTarefa(
    id: number,
    titulo: string,
    concluida: boolean
) {
    return await prisma.tarefa.update({
        where: {
            id: id
        },
        data: {
            titulo: titulo,
            concluida: concluida
        }
    });
}

export async function atualizarStatus(
    id: number,
    concluida: boolean
) {
    return await prisma.tarefa.update({
        where: {
            id: id
        },
        data: {
            concluida: concluida
        }
    });
}

export async function excluirTarefa(id: number) {
    return await prisma.tarefa.delete({
        where: {
            id: id
        }
    });
}