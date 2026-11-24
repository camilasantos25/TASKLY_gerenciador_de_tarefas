import express from "express";
import "dotenv/config";
import tarefaRoutes from "./routes/tarefa.routes.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(loggerMiddleware);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Minha primeira API Taskly!")
});

app.use("/tarefas", tarefaRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});