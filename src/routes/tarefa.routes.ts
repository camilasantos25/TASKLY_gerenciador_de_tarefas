import { Router } from "express";
import {
    listarTarefasController,
    buscarTarefaController,
    criarTarefaController,
    atualizarTarefaController,
    atualizarStatusController,
    excluirTarefaController
} from "../controllers/tarefa.controller.js";

const router = Router();

router.get("/", listarTarefasController);

router.get("/:id", buscarTarefaController);

router.post("/", criarTarefaController);

router.put("/:id", atualizarTarefaController);

router.patch("/:id", atualizarStatusController);

router.delete("/:id", excluirTarefaController);

export default router;