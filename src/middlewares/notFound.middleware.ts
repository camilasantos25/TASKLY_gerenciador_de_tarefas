import { type Request, type Response } from "express";

export function notFoundMiddleware(
    req: Request,
    res: Response
) {
    return res.status(404).json({
        mensagem: "Rota não encontrada"
    });
}