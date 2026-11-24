import "dotenv/config";
import express from "express";
import tarefaRoutes from "./routes/tarefa.routes.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/swagger.js";

const app = express();

app.use(loggerMiddleware);

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.send("Minha primeira API Taskly!");
});

app.use("/tarefas", tarefaRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;